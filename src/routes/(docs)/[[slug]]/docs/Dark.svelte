<script lang="ts">
	import DarkToggle from '$lib/components/Dark/DarkToggle.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
</script>

<h1>Dark Mode</h1>

<p>
	HDS comes with in-built dark mode support. This is enabled by the <code>{'<Base>'}</code>
	component (See <a href="/#install">Usage</a> for more details).
</p>

<h2 id="css">CSS</h2>

<p>
	When the dark mode is enabled, the <code>:root</code>/<code>{'<html>'}</code>
	element will have a <code>dark</code> class. You can use this to add custom styles for dark mode.
</p>

<CodeBlock
	code={`
    :global(:root.dark) .my-element {
        /* Your styles here */
    }
`}
	language="css"
/>

<h2 id="svelte">Svelte</h2>

<p>
	The dark mode status is stored in a Svelte store named <code>dark</code>. You can use it in your
	Svelte components to add conditional dark mode support, or to subscribe to dark mode changes.
</p>

<CodeBlock
	code={`
    <` +
		`script>
        import { dark } from "@hyvor/design/stores";
    </script>

    {#if $dark}
        <p>Dark mode enabled</p>
    {/if}
`}
	language="svelte"
/>

<h2 id="toggle">Toggle Dark Mode</h2>

<p>
	Use the <code>DarkToggle</code> component to add a toggle button for dark mode.
</p>

<CodeBlock
	code={`
    <DarkToggle />
`}
	language="svelte"
/>

<CodeResult>
	<DarkToggle />
</CodeResult>

<p>You may alternatively update the <code>dark</code> store manually.</p>
