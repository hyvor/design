<script lang="ts">
	import { onMount } from 'svelte';
	import Step from './Step.svelte';
	import type { Steps } from './steps.svelte.js';

	interface Props {
		steps: Steps;
	}

	let { steps }: Props = $props();

	onMount(() => {
		steps.init();
	});
</script>

<div class="loader">
	{#each steps.steps as step, i}
		<Step status={steps.statusOf(i)}>{step.text}</Step>
	{/each}
</div>

<style>
	.loader {
		padding: 40px;
		width: 350px;
		margin: auto;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
