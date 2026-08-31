<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import { confetti } from '$lib/components/Confetti/confetti.js';
	import Modal from '$lib/components/Modal/Modal.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableCell from '$lib/components/Table/TableCell.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeResult from './Helper/CodeResult.svelte';

	const triggerConfetti = () => {
		confetti();
	};

	let showModal = $state(false);
</script>

<h1 id="confetti">Confetti</h1>
<p>
	Confetti is a small animation to add a confetti effect in your SvelteKit application. You can
	trigger the confetti by calling the <code>confetti</code> function and passing the options as you like.
</p>

<h2 id="options">Options</h2>
<Table columns="1fr 2fr 1fr">
	<TableRow head>
		<TableCell>Option</TableCell>
		<TableCell>Description</TableCell>
		<TableCell>Default</TableCell>
	</TableRow>

	<TableRow>
		<TableCell><code>particleCount</code></TableCell>
		<TableCell>The number of particles to generate</TableCell>
		<TableCell><code>200</code></TableCell>
	</TableRow>

	<TableRow>
		<TableCell><code>duration</code></TableCell>
		<TableCell
			>Safety cap in milliseconds. The animation normally ends on its own once every particle has
			fallen off the bottom of the screen.</TableCell
		>
		<TableCell><code>12000</code></TableCell>
	</TableRow>

	<TableRow>
		<TableCell><code>zIndex</code></TableCell>
		<TableCell
			>The <code>z-index</code> of the confetti canvas. The default sits above modals and toasts.</TableCell
		>
		<TableCell><code>20000000</code></TableCell>
	</TableRow>
</Table>

<h2 id="usage">Usage</h2>

<CodeBlock
	code={`
 <` +
		`script>
    import { confetti } from '$lib/components/Confetti/confetti.js';
    const triggerConfetti = () => {
    // Bursts from the centre and ends once every particle has fallen off screen
    // Options (all optional): particleCount = 200, duration = 12000, zIndex = 20000000
    confetti();
	    };
</` +
		`script>

<Button onclick={triggerConfetti}>Trigger Confetti</Button>
`}
/>

<CodeResult>
	<Button onclick={triggerConfetti}>Trigger Confetti</Button>
</CodeResult>

<h2 id="from-a-modal">Triggering from a modal</h2>
<p>
	The confetti canvas uses a high <code>z-index</code>, so it renders above overlays such as modals
	and toasts. This means you can fire it straight from a modal action button.
</p>

<CodeResult>
	<Button onclick={() => (showModal = true)}>Open modal</Button>

	<Modal title="Congratulations!" bind:show={showModal}>
		Press the button below to celebrate.

		{#snippet footer()}
			<div>
				<Button variant="invisible" onclick={() => (showModal = false)}>Cancel</Button>
				<Button
					onclick={() => {
						confetti({ zIndex: 1 });
					}}>Celebrate</Button
				>
			</div>
		{/snippet}
	</Modal>
</CodeResult>
