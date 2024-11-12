<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Button from '../Button/Button.svelte';
	import Loader from './Loader.svelte';



	interface Props {
		text: string;
		show: boolean; // has more
		loading: boolean; // whether loading
		height?: number;
		divProps?: Record<string, any>;
		loaderProps?: ComponentProps<Loader>;
		buttonProps?: ComponentProps<Button>;
	}

	let {
		text,
		show,
		loading,
		height = 50,
		divProps = {},
		loaderProps = {},
		buttonProps = {}
	}: Props = $props();
</script>

{#if show}
	<div class="load-button" style:height="{height}px" {...divProps}>
		{#if loading}
			<Loader {...loaderProps} />
		{:else}
			<Button size="small" on:click {...buttonProps}>
				{text}
			</Button>
		{/if}
	</div>
{/if}

<style>
	.load-button {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
