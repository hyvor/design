<script>
	import Link from '$lib/components/Link/Link.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
</script>

<h1 id="console-loader">Console Loader</h1>
<p>
	The Console Loader is a component that displays a loader with an animation in the console. Refer
	this link to test the <Link href="/animation">Console Loader component</Link>. This component
	covers the entire viewport and is used to indicate that a process is ongoing, such as loading
	data. This uses a fixed position (<code>position: fixed</code>).
</p>
<CodeBlock
	code={`
   	<ConsoleLoader 
    	logo="https://hyvor.com/api/public/logo/core.svg" 
    	size={100} 
    />
`}
/>
