<script lang="ts">
	import Select, { type Option } from '$lib/components/Select/Select.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import FormControl from '$lib/components/FormControl/FormControl.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import TableCell from '$lib/components/Table/TableCell.svelte';
	import Label from '$lib/components/FormControl/Label.svelte';
	import SplitControl from '$lib/components/SplitControl/SplitControl.svelte';

	const roleOptions: Option[] = [
		{ value: 'admin', label: 'Administrator' },
		{ value: 'editor', label: 'Editor' },
		{ value: 'viewer', label: 'Viewer' },
		{ value: 'billing', label: 'Billing Manager' }
	];

	let user = {
		role: '',
		status: 'active'
	};
</script>

<h1>Select</h1>
<p>
	The <code>Select</code> component is a wrapper around the native <code>&lt;select&gt;</code> element.
</p>

<h2>Usage</h2>

<p>You can use the <code>Select</code> component, with the following props:</p>

<Table columns="1fr 1fr 2fr" hover>
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>
	<TableRow>
		<div><code>value</code></div>
		<div></div>
		<div>The selected value</div>
	</TableRow>
	<TableRow>
		<div><code>options</code></div>
		<div></div>
		<div>An array of options to display.</div>
	</TableRow>

	<TableRow>
		<div><code>state</code></div>
		<div><code>default</code></div>
		<div>
			The state of the select, which can be one of the following:
			<ul>
				<li><code>default</code></li>
				<li><code>error</code></li>
				<li><code>success</code></li>
				<li><code>warning</code></li>
			</ul>
		</div>
	</TableRow>

	<TableRow>
		<div><code>placeholder</code></div>
		<div></div>
		<div>Placeholder text for the select.</div>
	</TableRow>

	<TableRow>
		<div><code>size</code></div>
		<div><code>medium</code></div>
		<div>
			Size of the select:
			<ul>
				<li><code>x-small</code></li>
				<li><code>small</code></li>
				<li><code>medium</code></li>
				<li><code>large</code></li>
			</ul>
		</div>
	</TableRow>
</Table>

<h2>Example</h2>
<CodeBlock
	language="svelte"
	code={`
		<Select
			bind:value={user.role}
			options={roleOptions}
			placeholder="Select a role"
		/>
`}
/>

<CodeResult>
	<FormControl>
		<Select bind:value={user.role} options={roleOptions} placeholder="Select a role" />
	</FormControl>
</CodeResult>

<h3>Sizes</h3>
<CodeBlock
	language="svelte"
	code={`
	<FormControl>
		<Label>X-Small</Label>
		<Select size="x-small" options={roleOptions} placeholder="Select a role" />
	</FormControl>
	<FormControl>
		<Label>Small</Label>
		<Select size="small" options={roleOptions} placeholder="Select a role" />
	</FormControl>

	<FormControl>
		<Label>Medium</Label>
		<Select size="medium" options={roleOptions} placeholder="Select a role" />
	</FormControl>

	<FormControl>
		<Label>Large</Label>
		<Select size="large" options={roleOptions} placeholder="Select a role" />
	</FormControl>
`}
/>

<CodeResult>
	<FormControl>
		<Label>X-Small</Label>
		<Select size="x-small" options={roleOptions} placeholder="Select a role" />
	</FormControl>
	<br />

	<FormControl label="Small">
		<Label>Small</Label>
		<Select size="small" options={roleOptions} placeholder="Select a role" />
	</FormControl>
	<br />

	<FormControl label="Medium">
		<Label>Medium</Label>
		<Select size="medium" options={roleOptions} placeholder="Select a role" />
	</FormControl>
	<br />

	<FormControl label="Large">
		<Label>Large</Label>
		<Select size="large" options={roleOptions} placeholder="Select a role" />
	</FormControl>
</CodeResult>
