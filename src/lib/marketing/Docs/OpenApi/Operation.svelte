<script lang="ts">
	import CodeBlock from '../../../components/CodeBlock/CodeBlock.svelte';
	import Tag from '../../../components/Tag/Tag.svelte';
	import ParamsTable from './ParamsTable.svelte';
	import SchemaFields from './SchemaFields.svelte';
	import {
		buildCurl,
		describeType,
		methodColor,
		unwrapArraySchema,
		type Operation,
		type SchemaNameMap
	} from './openapi.js';

	interface Props {
		operation: Operation;
		baseUrl: string;
		schemaNames?: SchemaNameMap;
	}

	let { operation, baseUrl, schemaNames }: Props = $props();

	const curl = $derived(buildCurl(operation, baseUrl));

	const body = $derived(
		operation.requestBodySchema ? unwrapArraySchema(operation.requestBodySchema) : undefined
	);
	const response = $derived(
		operation.response?.schema ? unwrapArraySchema(operation.response.schema) : undefined
	);
</script>

<div class="operation" id={operation.id}>
	<div class="spec">
		<div class="op-heading">
			<Tag size="small" color={methodColor(operation.method)}>{operation.method.toUpperCase()}</Tag>
			<code class="op-path">{operation.path}</code>
		</div>

		{#if operation.summary}
			<p class="summary">{operation.summary}</p>
		{/if}
		{#if operation.description}
			<p>{operation.description}</p>
		{/if}

		<ParamsTable title="Path Parameters" params={operation.pathParams} />
		<ParamsTable title="Query Parameters" params={operation.queryParams} />
		<ParamsTable title="Headers" params={operation.headerParams} />

		{#if body}
			<h4>
				Body
				<span class="type-label">{describeType(operation.requestBodySchema, schemaNames)}</span>
				{#if operation.requestBodyRequired}<span class="required-label">required</span>{/if}
			</h4>
			<SchemaFields schema={body.itemSchema} {schemaNames} />
		{/if}

		{#if response}
			<h4>
				Response
				<span class="type-label">{describeType(operation.response?.schema, schemaNames)}</span>
			</h4>
			<SchemaFields schema={response.itemSchema} {schemaNames} />
		{/if}
	</div>

	<div class="example">
		<div class="example-sticky">
			<div class="example-label">Example request</div>
			<CodeBlock code={curl} language="sh" />
		</div>
	</div>
</div>

<style>
	.operation {
		display: grid;
		grid-template-columns: 1fr 420px;
		gap: 40px;
		padding: 30px 0;
		border-top: 1px solid var(--border);
	}
	.op-heading {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 12px;
	}
	.op-path {
		font-size: 15px;
		font-weight: 600;
	}
	.summary {
		font-weight: 600;
		margin: 0 0 8px;
	}
	.spec p {
		line-height: var(--line-height-content);
		margin: 0 0 8px;
	}
	h4 {
		margin: 20px 0 8px;
		font-size: 13px;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--text-light);
	}
	.required-label {
		text-transform: none;
		letter-spacing: normal;
		color: var(--red-dark);
		font-weight: 400;
		margin-left: 6px;
	}
	.type-label {
		text-transform: none;
		letter-spacing: normal;
		font-family: monospace;
		font-weight: 400;
		color: var(--text-light);
		margin-left: 6px;
	}
	.example-sticky {
		position: sticky;
		top: 75px;
	}
	.example-label {
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--text-light);
		margin-bottom: 8px;
	}

	@media (max-width: 992px) {
		.operation {
			grid-template-columns: 1fr;
			gap: 15px;
		}
		.example-sticky {
			position: static;
		}
	}
</style>
