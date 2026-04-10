<script lang="ts">
	import Select, { type Option } from '$lib/components/Select/Select.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import FormControl from '$lib/components/FormControl/FormControl.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import IconSearch from '@hyvor/icons/IconSearch';

	const roleOptions: Option[] = [
		{ value: 'admin', label: 'Administrator' },
		{ value: 'editor', label: 'Editor' },
		{ value: 'viewer', label: 'Viewer' },
		{ value: 'billing', label: 'Billing Manager' }
	];

	let user = $state({
		role: '',
		status: 'active'
	});

	let sizeValue = $state('');
	let slotValue = $state('');
	let region = $state('');
	let disabledValue = $state('');
</script>

<h1>Select</h1>
<p>
	The <code>Select</code> component is a wrapper around the native <code>&lt;select&gt;</code> element.
</p>

<h2>Properties</h2>

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
		<div><code>[]</code></div>
		<div>
			An array of options to display. Optional when using custom <code>children</code>.
		</div>
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

	<TableRow>
		<div><code>block</code></div>
		<div><code>true</code></div>
		<div>Whether the select should take the full width of its container.</div>
	</TableRow>

	<TableRow>
		<div><code>disabled</code></div>
		<div><code>false</code></div>
		<div>Whether the select is disabled.</div>
	</TableRow>

	<TableRow>
		<div><code>block</code></div>
		<div><code>true</code></div>
		<div>Whether the select should take the full width of its container.</div>
	</TableRow>
</Table>

<h2>Examples</h2>

<h3 id="options">Using Options</h3>

<CodeBlock
	language="svelte"
	code={`
<` +
		`script lang="ts">
	const roleOptions = [
		{ value: 'admin', label: 'Administrator' },
		{ value: 'editor', label: 'Editor' },
		{ value: 'viewer', label: 'Viewer' },
		{ value: 'billing', label: 'Billing Manager' }
	];
	let role = $state('admin');
<` +
		`/script>

<Select
	bind:value={role}
	options={roleOptions}
	placeholder="Select a role"
/>
`}
/>

<CodeResult>
	<FormControl>
		<Select bind:value={user.role} options={roleOptions} placeholder="Select a role" />
	</FormControl>
	<p class="selected">Currently selected value: {user.role}</p>
</CodeResult>

<h3>Sizes</h3>
<CodeBlock
	language="svelte"
	code={`
	<Select size="x-small" options={roleOptions} placeholder="Select a role" />
	<Select size="small" options={roleOptions} placeholder="Select a role" />
	<Select size="medium" options={roleOptions} placeholder="Select a role" />
	<Select size="large" options={roleOptions} placeholder="Select a role" />
`}
/>

<CodeResult>
	<div class="wrapper-for-select">
		<Select
			size="x-small"
			bind:value={sizeValue}
			options={roleOptions}
			placeholder="Select a role"
		/>
	</div>

	<div class="wrapper-for-select">
		<Select size="small" bind:value={sizeValue} options={roleOptions} placeholder="Select a role" />
	</div>

	<div class="wrapper-for-select">
		<Select
			size="medium"
			bind:value={sizeValue}
			options={roleOptions}
			placeholder="Select a role"
		/>
	</div>

	<div class="wrapper-for-select">
		<Select size="large" bind:value={sizeValue} options={roleOptions} placeholder="Select a role" />
	</div>
</CodeResult>

<h3 id="snippets">Snippets</h3>

<p>
	The <code>Select</code> component supports custom snippets for adding icons or other elements
	inside the select. Available snippets include: <code>start</code> and <code>end</code>.
</p>
<CodeBlock
	language="svelte"
	code={`
	<Select options={roleOptions} placeholder="Select a role">
		{#snippet start()}
			<IconSearch />
		{/snippet}
	</Select>
`}
/>

<CodeResult>
	<Select bind:value={slotValue} options={roleOptions} placeholder="Select a role">
		{#snippet start()}
			<IconSearch size={13} />
		{/snippet}
	</Select>
	<p class="selected">Currently selected value: {slotValue}</p>
</CodeResult>

<h3>Custom Children</h3>
<p>
	For advanced use cases, you can pass custom children to the <code>Select</code> component instead
	of using the <code>options</code> prop. This lets you use native
	<code>&lt;option&gt;</code> and <code>&lt;optgroup&gt;</code> elements directly, allowing for grouped
	options, disabled options, or any other native select features.
</p>
<CodeBlock
	language="svelte"
	code={`
	<Select bind:value={region}>
		{#snippet children()}
			<option value="" disabled>Select a region</option>
			<optgroup label="Americas">
				<option value="us-east">US East</option>
				<option value="us-west">US West</option>
				<option value="ca-central">Canada Central</option>
			</optgroup>
			<optgroup label="Europe">
				<option value="eu-west">EU West</option>
				<option value="eu-central">EU Central</option>
			</optgroup>
			<optgroup label="Asia Pacific">
				<option value="ap-southeast">AP Southeast</option>
				<option value="ap-northeast">AP Northeast</option>
			</optgroup>
		{/snippet}
	</Select>
`}
/>

<CodeResult>
	<Select bind:value={region}>
		{#snippet children()}
			<option value="" disabled selected={!region}>Select a region</option>
			<optgroup label="Americas">
				<option value="us-east">US East</option>
				<option value="us-west">US West</option>
				<option value="ca-central">Canada Central</option>
			</optgroup>
			<optgroup label="Europe">
				<option value="eu-west">EU West</option>
				<option value="eu-central">EU Central</option>
			</optgroup>
			<optgroup label="Asia Pacific">
				<option value="ap-southeast">AP Southeast</option>
				<option value="ap-northeast">AP Northeast</option>
			</optgroup>
		{/snippet}
	</Select>
	<p class="selected">Currently selected value: {region}</p>
</CodeResult>

<h3>Other input props</h3>
<CodeBlock
	language="svelte"
	code={`
	<Select 
		bind:value={value}
		placeholder="Select a role"
		options={roleOptions} 
		disabled
	/>
`}
/>

<CodeResult>
	<Select bind:value={disabledValue} placeholder="Select a role" options={roleOptions} disabled />
</CodeResult>

<style>
	.wrapper-for-select {
		margin-bottom: 15px;
	}

	.wrapper-for-select:last-child {
		margin-bottom: 0;
	}

	.selected {
		margin-bottom: 0;
		font-size: 14px;
		color: var(--text-light);
	}
</style>
