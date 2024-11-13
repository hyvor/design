<script lang="ts">
	import type { Toast } from './toast.ts';
	import Loader from '$lib/components/Loader/Loader.svelte';
	import {
		IconCheckCircleFill,
		IconXCircleFill,
		IconExclamationCircleFill,
		IconInfoCircleFill
	} from '@hyvor/icons';

	interface Props {
		toast: Toast;
	}

	let { toast }: Props = $props();

	let color = $derived(
		(
			{
				success: 'var(--green)',
				error: 'var(--red)',
				warning: 'var(--orange)',
				info: 'var(--blue)'
			} as any
		)[toast.type] || 'inherit'
	);
</script>

<span style:color>
	{#if toast.type === 'success'}
		<IconCheckCircleFill />
	{:else if toast.type === 'error'}
		<IconXCircleFill />
	{:else if toast.type === 'warning'}
		<IconExclamationCircleFill />
	{:else if toast.type === 'info'}
		<IconInfoCircleFill />
	{:else if toast.type === 'loading'}
		<Loader size="small" />
	{/if}
</span>

<style>
	span {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		animation: scale 0.2s ease-in-out;
	}

	@keyframes scale {
		0% {
			transform: scale(0.5);
			opacity: 0.4;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
