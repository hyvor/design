<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Button from '../Button/Button.svelte';
	import Loader from './Loader.svelte';

	export let text: string;
	export let show: boolean; // has more
	export let loading: boolean; // whether loading

	export let height: number = 50;

	export let divProps: Record<string, any> = {};
	export let loaderProps: ComponentProps<Loader> = {};
	export let buttonProps: ComponentProps<Button> = {};
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
