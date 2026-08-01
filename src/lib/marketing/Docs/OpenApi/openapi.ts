import { dereference } from '@apidevtools/json-schema-ref-parser';

// @apidevtools/json-schema-ref-parser calls Buffer.isBuffer(...) internally to detect
// binary/text input, even when we hand it an already-parsed plain JS object - it never
// actually needs a real Buffer for that case, so a minimal shim is enough to stop it
// throwing "Buffer is not defined" in the browser.
const globalWithBuffer = globalThis as { Buffer?: { isBuffer: (v: unknown) => boolean } };
if (typeof globalWithBuffer.Buffer === 'undefined') {
	globalWithBuffer.Buffer = { isBuffer: () => false };
}

export type HttpMethod = 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace';

const HTTP_METHODS: HttpMethod[] = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'];

// a minimal, permissive JSON Schema shape - just enough to render docs & examples
export interface JsonSchema {
	type?: string;
	format?: string;
	title?: string;
	description?: string;
	properties?: Record<string, JsonSchema>;
	required?: string[];
	items?: JsonSchema;
	enum?: (string | number | boolean)[];
	oneOf?: JsonSchema[];
	anyOf?: JsonSchema[];
	allOf?: JsonSchema[];
	additionalProperties?: boolean | JsonSchema;
	nullable?: boolean;
	default?: unknown;
	example?: unknown;
	maxLength?: number;
	minLength?: number;
	minimum?: number;
	maximum?: number;
	pattern?: string;
	[key: string]: unknown;
}

export interface ParameterObject {
	name: string;
	in: 'path' | 'query' | 'header' | 'cookie';
	required?: boolean;
	description?: string;
	schema?: JsonSchema;
}

export interface OperationObject {
	operationId?: string;
	summary?: string;
	description?: string;
	parameters?: ParameterObject[];
	requestBody?: {
		required?: boolean;
		description?: string;
		content?: Record<string, { schema?: JsonSchema }>;
	};
	responses?: Record<
		string,
		{ description?: string; content?: Record<string, { schema?: JsonSchema }> }
	>;
}

export interface OpenApiDocument {
	openapi?: string;
	info?: { title?: string; description?: string; version?: string };
	servers?: { url: string; description?: string }[];
	paths: Record<string, Record<string, OperationObject>>;
	components?: { schemas?: Record<string, JsonSchema> };
}

export interface Operation {
	id: string;
	method: HttpMethod;
	path: string;
	operationId?: string;
	summary?: string;
	description?: string;
	pathParams: ParameterObject[];
	queryParams: ParameterObject[];
	headerParams: ParameterObject[];
	requestBodySchema?: JsonSchema;
	requestBodyRequired: boolean;
	response?: { description?: string; schema?: JsonSchema };
}

export interface OperationGroup {
	key: string;
	title: string;
	operations: Operation[];
}

// maps a dereferenced schema object back to the name it had under components.schemas
// (eg. the `SendingProfileObject` schema object -> "SendingProfileObject"), so that
// repeated/nested references to the same named object can be labelled and folded
// instead of being inlined in full every time they occur.
export type SchemaNameMap = Map<JsonSchema, string>;

export interface LoadedOpenApi {
	doc: OpenApiDocument;
	schemaNames: SchemaNameMap;
}

export async function loadOpenApi(path: string): Promise<LoadedOpenApi> {
	// fetch the JSON ourselves and dereference the in-memory object, rather than handing
	// the library a URL - its HTTP resolver relies on Node's Buffer, which isn't available
	// in the browser
	const response = await fetch(path);
	if (!response.ok) {
		throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
	}
	const schema = await response.json();
	const doc = (await dereference(schema)) as unknown as OpenApiDocument;

	// $RefParser resolves every occurrence of the same $ref to the exact same object
	// instance, so object identity can be used to recognize a named schema wherever
	// it shows up in the tree.
	const schemaNames: SchemaNameMap = new Map();
	for (const [name, s] of Object.entries(doc.components?.schemas ?? {})) {
		if (s && typeof s === 'object') schemaNames.set(s, name);
	}

	return { doc, schemaNames };
}

function slugify(text: string) {
	return text
		.toLowerCase()
		.replace(/[{}]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

// finds path segments that are common to every path in the doc (eg. "api", "console")
// so that grouping/titles can ignore that shared, uninformative prefix
function commonSegmentPrefix(paths: string[]): string[] {
	const segmentLists = paths.map((p) => p.split('/').filter(Boolean));
	if (segmentLists.length === 0) return [];

	const prefix: string[] = [];
	const first = segmentLists[0];

	for (let i = 0; i < first.length; i++) {
		const segment = first[i];
		if (segment.startsWith('{')) break;
		if (segmentLists.every((segments) => segments[i] === segment)) {
			prefix.push(segment);
		} else {
			break;
		}
	}

	return prefix;
}

export function titleCase(segment: string): string {
	const overrides: Record<string, string> = { api: 'API', id: 'ID', url: 'URL' };
	return segment
		.split('-')
		.map((word) => overrides[word] ?? word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export function groupOperations(doc: OpenApiDocument): OperationGroup[] {
	const paths = Object.keys(doc.paths ?? {});
	const prefix = commonSegmentPrefix(paths);
	const groups = new Map<string, OperationGroup>();

	for (const path of paths) {
		const item = doc.paths[path];
		const segments = path.split('/').filter(Boolean);
		const rest = segments.slice(prefix.length);
		const groupSegment = rest.find((s) => !s.startsWith('{')) ?? rest[0] ?? path;
		const groupKey = groupSegment;

		if (!groups.has(groupKey)) {
			groups.set(groupKey, {
				key: groupKey,
				title: titleCase(groupKey),
				operations: []
			});
		}

		for (const method of HTTP_METHODS) {
			const op = item[method];
			if (!op) continue;

			const parameters = op.parameters ?? [];
			const content = op.requestBody?.content?.['application/json'];

			let response: Operation['response'];
			const responses = op.responses ?? {};
			const responseEntry = responses['200'] ?? responses['201'] ?? responses['default'];
			const responseContent = responseEntry?.content?.['application/json'];
			if (responseEntry && (responseEntry.description || responseContent?.schema)) {
				response = { description: responseEntry.description, schema: responseContent?.schema };
			}

			groups.get(groupKey)!.operations.push({
				id: slugify(`${method}-${path}`),
				method,
				path,
				operationId: op.operationId,
				summary: op.summary,
				description: op.description,
				pathParams: parameters.filter((p) => p.in === 'path'),
				queryParams: parameters.filter((p) => p.in === 'query'),
				headerParams: parameters.filter((p) => p.in === 'header'),
				requestBodySchema: content?.schema,
				requestBodyRequired: op.requestBody?.required ?? false,
				response
			});
		}
	}

	return Array.from(groups.values()).filter((g) => g.operations.length > 0);
}

export function methodColor(method: HttpMethod): 'blue' | 'green' | 'orange' | 'red' | 'default' {
	switch (method) {
		case 'get':
			return 'blue';
		case 'post':
			return 'green';
		case 'patch':
		case 'put':
			return 'orange';
		case 'delete':
			return 'red';
		default:
			return 'default';
	}
}

export function describeType(schema?: JsonSchema, schemaNames?: SchemaNameMap): string {
	if (!schema) return 'any';

	// named object schemas (eg. "SendingProfileObject") are shown by name rather than
	// inlined as a generic "object" - scalars/enums keep showing their literal values
	if (schema.type === 'object' && schemaNames?.has(schema)) {
		return schemaNames.get(schema)!;
	}

	if (schema.oneOf?.length) return schema.oneOf.map((s) => describeType(s, schemaNames)).join(' | ');
	if (schema.anyOf?.length) return schema.anyOf.map((s) => describeType(s, schemaNames)).join(' | ');
	if (schema.allOf?.length) return schema.allOf.map((s) => describeType(s, schemaNames)).join(' & ');
	if (schema.enum) return schema.enum.map((v) => JSON.stringify(v)).join(' | ');

	if (schema.type === 'array') {
		return `${describeType(schema.items, schemaNames)}[]`;
	}

	if (schema.type === 'object') {
		if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
			return `object<string, ${describeType(schema.additionalProperties, schemaNames)}>`;
		}
		return 'object';
	}

	return schema.type ?? 'any';
}

// unwraps a top-level "array of X" schema (eg. a `SendingProfileObject[]` response) so
// callers can render the item schema's fields directly, with the array-ness shown separately
export function unwrapArraySchema(schema: JsonSchema): { isArray: boolean; itemSchema: JsonSchema } {
	if (schema.type === 'array' && schema.items) {
		return { isArray: true, itemSchema: schema.items };
	}
	return { isArray: false, itemSchema: schema };
}

const STRING_EXAMPLES: [RegExp, string][] = [
	[/e-?mail/i, 'jane@example.com'],
	[/subdomain/i, 'my-newsletter'],
	[/domain/i, 'example.com'],
	[/^(website|.*url|.*logo)$/i, 'https://example.com'],
	[/name/i, 'My List'],
	[/^id$/i, '123']
];

function stringExample(propName: string, schema: JsonSchema): string {
	if (schema.format === 'date-time') return new Date().toISOString();
	for (const [pattern, example] of STRING_EXAMPLES) {
		if (pattern.test(propName)) return example;
	}
	return 'string';
}

export function exampleValue(schema: JsonSchema | undefined, propName = ''): unknown {
	if (!schema) return null;
	if (schema.example !== undefined) return schema.example;
	if (schema.default !== undefined) return schema.default;
	if (schema.enum?.length) return schema.enum[0];
	if (schema.oneOf?.length) return exampleValue(schema.oneOf[0], propName);
	if (schema.anyOf?.length) return exampleValue(schema.anyOf[0], propName);
	if (schema.allOf?.length) return exampleValue(schema.allOf[schema.allOf.length - 1], propName);

	switch (schema.type) {
		case 'object': {
			const props = schema.properties ?? {};
			const keys = schema.required?.length ? schema.required : Object.keys(props);
			if (keys.length) {
				const obj: Record<string, unknown> = {};
				for (const key of keys) {
					obj[key] = exampleValue(props[key], key);
				}
				return obj;
			}
			if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
				return { key: exampleValue(schema.additionalProperties, 'key') };
			}
			return {};
		}
		case 'array':
			return [exampleValue(schema.items, propName)];
		case 'integer':
		case 'number':
			return 0;
		case 'boolean':
			return true;
		case 'string':
			return stringExample(propName, schema);
		default:
			return null;
	}
}

export function paramExample(param: ParameterObject): string {
	const value = exampleValue(param.schema, param.name);
	return value === null || value === undefined ? 'value' : String(value);
}

export function buildUrl(baseUrl: string, operation: Operation): string {
	let path = operation.path;
	for (const param of operation.pathParams) {
		path = path.replace(`{${param.name}}`, encodeURIComponent(paramExample(param)));
	}

	const query = operation.queryParams
		.map((p) => `${encodeURIComponent(p.name)}=${encodeURIComponent(paramExample(p))}`)
		.join('&');

	const url = baseUrl.replace(/\/$/, '') + path;
	return query ? `${url}?${query}` : url;
}

export function buildCurl(operation: Operation, baseUrl: string): string {
	const url = buildUrl(baseUrl, operation);
	const lines = [`curl -X ${operation.method.toUpperCase()} '${url}' \\`];

	lines.push(`  -H 'Authorization: Bearer YOUR_API_KEY' \\`);

	for (const param of operation.headerParams) {
		lines.push(`  -H '${param.name}: ${paramExample(param)}' \\`);
	}

	if (operation.requestBodySchema) {
		lines.push(`  -H 'Content-Type: application/json' \\`);
		const body = exampleValue(operation.requestBodySchema);
		const json = JSON.stringify(body, null, 2);
		lines.push(`  -d '${json}'`);
	} else {
		// remove the trailing continuation backslash of the last header line
		lines[lines.length - 1] = lines[lines.length - 1].replace(/\s*\\$/, '');
	}

	return lines.join('\n');
}
