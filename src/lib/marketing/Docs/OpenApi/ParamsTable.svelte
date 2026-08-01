<script lang="ts">
	import Table from '../../../components/Table/Table.svelte';
	import TableRow from '../../../components/Table/TableRow.svelte';
	import TableCell from '../../../components/Table/TableCell.svelte';
	import { describeType, type ParameterObject } from './openapi.js';

	interface Props {
		title: string;
		params: ParameterObject[];
	}

	let { title, params }: Props = $props();
</script>

{#if params.length}
	<h4>{title}</h4>
	<Table columns="1fr 1fr 2fr" style="bordered">
		<TableRow head>
			<TableCell>Name</TableCell>
			<TableCell>Type</TableCell>
			<TableCell>Description</TableCell>
		</TableRow>
		{#each params as param (param.name)}
			<TableRow>
				<TableCell>
					<code>{param.name}</code>
					{#if param.required}<span class="required" title="required">*</span>{/if}
				</TableCell>
				<TableCell><span class="type">{describeType(param.schema)}</span></TableCell>
				<TableCell>{param.description ?? ''}</TableCell>
			</TableRow>
		{/each}
	</Table>
{/if}

<style>
	h4 {
		margin: 20px 0 8px;
		font-size: 13px;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--text-light);
	}
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
</style>
