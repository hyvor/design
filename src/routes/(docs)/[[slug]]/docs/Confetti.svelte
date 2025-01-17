<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import { confetti } from '$lib/components/Confetti/confetti.js';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeResult from './Helper/CodeResult.svelte';

	const triggerConfetti = () => {
		// Start confetti with particles falling from top
		confetti({ particleCount: 200, duration: 3000 });
	};
</script>

<h1 id="confetti">Confetti</h1>
<p>
	Confetti is a small animation to add a confetti effect in your SvelteKit application. You can
	trigger the confetti by calling the <code>confetti</code> function and passing the options as you like.
</p>

<h2 id="options">Options</h2>
<Table columns="1fr 2fr 1fr">
	<TableRow head>
		<td>Option</td>
		<td>Description</td>
		<td>Default</td>
	</TableRow>

	<TableRow>
		<td><code>particleCount</code></td>
		<td>The number of particles to generate</td>
		<td><code>150</code></td>
	</TableRow>

	<TableRow>
		<td><code>duration</code></td>
		<td>The duration of the confetti animation in milliseconds</td>
		<td><code>5000</code></td>
	</TableRow>
</Table>

<h2 id="usage">Usage</h2>

<CodeBlock
	code={`
 <` +
		`script>
    import { confetti } from '$lib/components/Confetti/confetti.js';
    const triggerConfetti = () => {
    // Starts confetti with particles falling from top
    //You can pass options to the confetti function as you like, the default is particleCount = 150, duration = 5000
    confetti({ particleCount: 200, duration: 3000 });
	    };
</` +
		`script>

    <Button on:click={triggerConfetti}>Trigger Confetti</Button>
`}
/>

<CodeResult>
	<Button on:click={triggerConfetti}>Trigger Confetti</Button>
</CodeResult>
