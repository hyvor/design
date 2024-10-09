<script>
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import Text from '$lib/components/Text/Text.svelte';
</script>

<h1>Text</h1>

<p>Text is a component that renders text with different styles.</p>

<h2 id="props">Properties</h2>

<Table columns="1fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>small</code></div>
		<div>Make the text smaller.</div>
	</TableRow>

	<TableRow>
		<div><code>light</code></div>
		<div>
			Use <code>var(--text-light)</code> color.
		</div>
	</TableRow>

	<TableRow>
		<div><code>normal</code></div>
		<div>
			Use <code>400</code> font weight.
		</div>
	</TableRow>

	<TableRow>
		<div><code>bold</code></div>
		<div>
			Use <code>600</code> font weight.
		</div>
	</TableRow>
</Table>

<h2 id="usage">Usage</h2>

<CodeBlock
	code={`
    <Text>Normal Text</Text>
    <Text small>Small Text</Text>
    <Text light>Light Text</Text>
    <Text small light>Small & Light Text</Text>
    <Text normal>Normal Weight Text</Text>
    <Text bold>Bold Text</Text>
`}
/>

<CodeResult style="display:flex;flex-direction:column;gap:10px;">
	<Text>Normal Text</Text>
	<Text small>Small Text</Text>
	<Text light>Light Text</Text>
	<Text small light>Small & Light Text</Text>
	<Text normal>Normal Weight Text</Text>
	<Text bold>Bold Text</Text>
</CodeResult>
