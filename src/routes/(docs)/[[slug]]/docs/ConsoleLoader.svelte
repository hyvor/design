<script>
	import Link from '$lib/components/Link/Link.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import TableCell from '$lib/components/Table/TableCell.svelte';
</script>

<h1 id="console-loader">Console Loader</h1>
<p>
	The Console Loader is a component that displays a loader with an animation in the console. Refer
	this link to test the <Link href="/animation">Console Loader component</Link>. This component
	covers the entire viewport and is used to indicate that a process is ongoing, such as loading
	data. This uses a fixed position (<code>position: fixed</code>).
</p>

<h2 id="props">Props</h2>
<p>The Console Loader component accepts the following props:</p>

<Table columns="1fr 2fr">
	<TableRow head>
		<TableCell>Prop</TableCell>
		<TableCell>Description</TableCell>
	</TableRow>
	<TableRow>
		<TableCell><code>logo</code></TableCell>
		<TableCell
			>The URL of the logo to be displayed in the loader. This prop is required.</TableCell
		>
	</TableRow>
	<TableRow>
		<TableCell><code>size</code></TableCell>
		<TableCell>The size of the logo in pixels. The default is <code>100</code>.</TableCell>
	</TableRow>
</Table>
<CodeBlock
	code={`
   	<ConsoleLoader 
    	logo="https://hyvor.com/api/public/logo/core.svg" 
    	size={100} 
    />
`}
/>
