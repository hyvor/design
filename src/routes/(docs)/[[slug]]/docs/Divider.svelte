<script lang="ts">
	import Divider from '$lib/components/Divider/Divider.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
</script>

<h1>Divider</h1>

<p>This is a horizontal line used to divide sections.</p>

<h2 id="props">Properties</h2>

<Table columns="2fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>color</code></div>
		<div><code>var(--accent-lightest)</code></div>
		<div>The color of the divider.</div>
	</TableRow>

	<TableRow>
		<div><code>height</code></div>
		<div><code>1</code></div>
		<div>The height of the divider in pixels (px).</div>
	</TableRow>

	<TableRow>
		<div><code>width</code></div>
		<div><code>100</code></div>
		<div>The width of the divider as a percentage (%).</div>
	</TableRow>

	<TableRow>
		<div><code>margin</code></div>
		<div><code>0</code></div>
		<div>The margin of the divider in pixels (px).</div>
	</TableRow>

	<TableRow>
		<div><code>align</code></div>
		<div><code>center</code></div>
		<div>
			The alignment of the divider
			<ul>
				<li><code>start</code></li>
				<li><code>center</code></li>
				<li><code>end</code></li>
			</ul>
		</div>
	</TableRow>
</Table>

<h2>Examples</h2>

<p>Here, we have a simple divider with the default settings.</p>

<CodeBlock
	code={`
    <Divider />
`}
/>

<CodeResult white>
	<Divider />
</CodeResult>

<p>
	with <code>align="center"</code>
</p>

<CodeBlock
	code={`
    <Divider 
        color=var(--red-light) 
        height={3} 
        width={50} 
        margin={3} 
        align="center"
    />
`}
/>

<CodeResult white>
	<Divider color="var(--red-light)" height={3} width={50} margin={3} align="center" />
</CodeResult>

<p>
	with <code>align="start"</code>
</p>

<CodeBlock
	code={`
    <Divider 
        color=var(--blue-light) 
        height={2} 
        width={80} 
        margin={5} 
        align="start"
    />
`}
/>

<CodeResult white>
	<Divider color="var(--blue-light)" height={2} width={80} margin={5} align="start" />
</CodeResult>

<CodeBlock
	code={`
    <Divider 
        color="var(--green-light)"
        height={4} 
        width={70} 
        margin={7} 
        align="end"
    />
`}
/>

<CodeResult white>
	<Divider color="var(--green-light)" height={4} width={70} margin={7} align="end" />
</CodeResult>

<style>
</style>
