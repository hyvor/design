<script lang="ts">
	import Select, { type Option } from '$lib/components/Select/Select.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import FormControl from '$lib/components/FormControl/FormControl.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';

	// country options for the select dropdown
	const countryOptions = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
		{ value: 'uk', label: 'United Kingdom' },
		{ value: 'au', label: 'Australia' },
		{ value: 'in', label: 'India' }
	];

	let address = {
		country: ''
	};
</script>

<h1>Select</h1>
<p>
	The <code>Select</code> component is a wrapper around the native <code>&lt;select&gt;</code> element.
</p>

<h2>Usage</h2>

<p>You can use the <code>Select</code> component, with the following props:</p>
<ul>
	<li><code>value</code>: The selected value.</li>
	<li><code>options</code>: An array of options to display.</li>
	<li>
		<code>state</code>: The state of the select, which can be <code>default</code>,
		<code>error</code>, <code>success</code>, or <code>warning</code>.
	</li>
	<li><code>placeholder</code>: Placeholder text for the select.</li>
	<li>
		<code>size</code>: Size of the select (<code>small</code>, <code>medium</code>,
		<code>large</code>, <code>x-small</code>). By default, it is <code>medium</code>.
	</li>
	<li>
		<code>block</code>: Whether the select should take the full width. By default, it is true.
	</li>
</ul>

<h2>Example</h2>
<CodeBlock
	language="svelte"
	code={`
		<Select
			bind:value={address.country}
			options={countryOptions}
			placeholder="Select a country"
			size="large"
			block
		/>
`}
/>

<CodeResult>
	<FormControl>
		<Select
			bind:value={address.country}
			options={countryOptions}
			placeholder="Select a country"
			size="large"
			block
		/>
	</FormControl>
</CodeResult>
