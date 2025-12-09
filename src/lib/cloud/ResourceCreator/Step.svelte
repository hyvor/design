<script lang="ts">
	import Loader from '$lib/components/Loader/Loader.svelte';
	import IconCheckCircleFill from '@hyvor/icons/IconCheckCircleFill';
	import type { Snippet } from 'svelte';
	import type { StepStatus } from './steps.svelte.js';

	interface Props {
		children: Snippet;
		status: StepStatus;
	}

	let { children, status }: Props = $props();
</script>

<div class="step">
	<div class="loader">
		{#if status === 'current'}
			<Loader size={12} />
		{:else if status === 'done'}
			<IconCheckCircleFill size={12} style="color:var(--green)" />
		{:else}
			<span class="dot"></span>
		{/if}
	</div>
	<div class="content">
		{@render children()}
	</div>
</div>

<style>
	.step {
		display: flex;
		align-items: center;
	}
	.dot {
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background-color: #ddd;
	}
	.loader {
		width: 35px;
		display: inline-flex;
		justify-content: center;
	}
</style>
