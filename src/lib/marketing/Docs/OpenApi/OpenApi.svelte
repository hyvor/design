<script lang="ts">
	import Loader from '../../../components/Loader/Loader.svelte';
	import Callout from '../../../components/Callout/Callout.svelte';
	import Operation from './Operation.svelte';
	import { groupOperations, loadOpenApi, methodColor } from './openapi.js';

	interface Props {
		// path (or URL) to an OpenAPI 3.x JSON document. $refs are dereferenced client-side.
		path: string;
		// base URL used to build the example curl requests.
		// falls back to the spec's servers[0].url, then to an empty string.
		baseUrl?: string;
	}

	let { path, baseUrl }: Props = $props();

	async function load() {
		const { doc, schemaNames } = await loadOpenApi(path);
		const groups = groupOperations(doc);
		const resolvedBaseUrl = baseUrl ?? doc.servers?.[0]?.url ?? '';
		return { groups, schemaNames, baseUrl: resolvedBaseUrl };
	}

	const dataPromise = $derived(load());
</script>

<div class="openapi">
	{#await dataPromise}
		<Loader block padding="large" />
	{:then { groups, schemaNames, baseUrl: resolvedBaseUrl }}
		<nav class="top-nav">
			{#each groups as group (group.key)}
				<a href="#{group.key}">{group.title}</a>
			{/each}
		</nav>

		<div class="operations">
			{#each groups as group (group.key)}
				<section>
					<h2 id={group.key}>{group.title}</h2>

					<nav class="section-nav">
						{#each group.operations as operation (operation.id)}
							<a href="#{operation.id}" class="op-link">
								<span class="op-method {methodColor(operation.method)}"
									>{operation.method.toUpperCase()}</span
								>
								<span class="op-path">{operation.path}</span>
							</a>
						{/each}
					</nav>

					{#each group.operations as operation (operation.id)}
						<Operation {operation} baseUrl={resolvedBaseUrl} {schemaNames} />
					{/each}
				</section>
			{/each}
		</div>
	{:catch error}
		<Callout type="danger" title="Failed to load API reference">
			{error instanceof Error ? error.message : String(error)}
		</Callout>
	{/await}
</div>

<style>
	.top-nav {
		position: sticky;
		top: var(--header-height);
		z-index: 5;
		display: flex;
		flex-wrap: wrap;
		gap: 4px 18px;
		padding: 14px 0;
		margin-bottom: 10px;
		background-color: var(--box-background);
		border-bottom: 1px solid var(--border);
	}
	.top-nav a {
		font-size: 13px;
		font-weight: 600;
		color: var(--text-light);
		white-space: nowrap;
	}
	.top-nav a:hover {
		color: var(--text);
		text-decoration: underline;
	}

	.section-nav {
		display: flex;
		flex-wrap: wrap;
		gap: 6px 16px;
		margin: 10px 0 20px;
		padding-bottom: 16px;
		border-bottom: 1px solid var(--border);
	}
	.op-link {
		display: flex;
		align-items: baseline;
		gap: 6px;
		font-size: 12px;
		text-decoration: none;
		color: var(--text);
	}
	.op-link:hover .op-path {
		text-decoration: underline;
	}
	.op-method {
		font-family: monospace;
		font-size: 10px;
		font-weight: 700;
		flex-shrink: 0;
	}
	.op-method.blue {
		color: var(--blue-dark);
	}
	.op-method.green {
		color: var(--green-dark);
	}
	.op-method.orange {
		color: var(--orange-dark);
	}
	.op-method.red {
		color: var(--red-dark);
	}
	.op-method.default {
		color: var(--gray-dark);
	}
	.op-path {
		font-family: monospace;
		font-size: 12px;
		word-break: break-all;
		color: var(--text-light);
	}

	.operations h2 {
		margin: 40px 0 0;
		font-size: 22px;
	}
	.operations section:first-child h2 {
		margin-top: 0;
	}
</style>
