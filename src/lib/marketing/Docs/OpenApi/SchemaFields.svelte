<script lang="ts">
	import Table from '../../../components/Table/Table.svelte';
	import TableRow from '../../../components/Table/TableRow.svelte';
	import TableCell from '../../../components/Table/TableCell.svelte';
	import { describeType, type JsonSchema, type SchemaNameMap } from './openapi.js';
	import SchemaFields from './SchemaFields.svelte';

	interface Props {
		schema?: JsonSchema;
		schemaNames?: SchemaNameMap;
	}

	let { schema, schemaNames }: Props = $props();

	interface Field {
		name: string;
		schema: JsonSchema;
		required: boolean;
	}

	const fields = $derived.by((): Field[] => {
		if (!schema?.properties) return [];
		const required = new Set(schema.required ?? []);
		return Object.entries(schema.properties).map(([name, s]) => ({
			name,
			schema: s,
			required: required.has(name)
		}));
	});

	// a property "folds" when it's an object (or array of objects) with its own fields,
	// so nested/named schemas don't get inlined in full every time they're referenced
	function nestedSchema(s: JsonSchema): JsonSchema | undefined {
		if (s.type === 'object' && s.properties) return s;
		if (s.type === 'array' && s.items?.type === 'object' && s.items.properties) return s.items;
		return undefined;
	}

	function nestedName(s: JsonSchema): string | undefined {
		return schemaNames?.get(s);
	}
</script>

{#if fields.length}
	<Table columns="1fr 1fr 2fr" style="bordered">
		<TableRow head>
			<TableCell>Field</TableCell>
			<TableCell>Type</TableCell>
			<TableCell>Details</TableCell>
		</TableRow>
		{#each fields as field (field.name)}
			{@const nested = nestedSchema(field.schema)}
			<TableRow>
				<TableCell>
					<code>{field.name}</code>
					{#if field.required}<span class="required" title="required">*</span>{/if}
				</TableCell>
				<TableCell><span class="type">{describeType(field.schema, schemaNames)}</span></TableCell>
				<TableCell>
					{#if field.schema.enum}
						<div class="enum">
							{#each field.schema.enum as value (String(value))}
								<code class="enum-value">{JSON.stringify(value)}</code>
							{/each}
						</div>
					{/if}
					{#if field.schema.description}
						<div class="meta">{field.schema.description}</div>
					{/if}
					{#if field.schema.default !== undefined}
						<div class="meta">
							Default: <code>{JSON.stringify(field.schema.default)}</code>
						</div>
					{/if}
					{#if field.schema.pattern}
						<div class="meta">Pattern: <code>{field.schema.pattern}</code></div>
					{/if}
					{#if field.schema.maxLength !== undefined}
						<div class="meta">Max length: {field.schema.maxLength}</div>
					{/if}
					{#if field.schema.minLength !== undefined}
						<div class="meta">Min length: {field.schema.minLength}</div>
					{/if}
					{#if nested}
						<details class="nested">
							<summary>Show {nestedName(nested) ?? ''} fields</summary>
							<SchemaFields schema={nested} {schemaNames} />
						</details>
					{/if}
				</TableCell>
			</TableRow>
		{/each}
	</Table>
{/if}

<style>
	code {
		font-size: 13px;
		font-weight: 600;
	}
	.required {
		color: var(--red-dark);
		margin-left: 2px;
	}
	.type {
		font-family: monospace;
		font-size: 12px;
		color: var(--text-light);
	}
	.enum {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		margin-bottom: 4px;
	}
	.enum-value {
		font-size: 11px;
		font-weight: 400;
		background: var(--accent-lightest);
		padding: 1px 6px;
		border-radius: 8px;
	}
	.meta {
		font-size: 12px;
		color: var(--text-light);
	}
	.meta code {
		font-size: 11px;
		font-weight: 400;
	}
	.nested {
		margin-top: 6px;
		font-size: 13px;
	}
	.nested summary {
		cursor: pointer;
		color: var(--link);
		font-size: 12px;
	}
	.nested :global(.table) {
		margin-top: 8px;
	}
</style>
