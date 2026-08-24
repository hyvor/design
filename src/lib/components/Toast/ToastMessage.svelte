<script lang="ts">
	import ToastIcon from './ToastIcon.svelte';
	import type { Toast } from './toast.ts';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	interface Props {
		toast: Toast;
	}

	let { toast }: Props = $props();
</script>

<div
	class="toast"
	in:fly={{ y: 20, duration: 250, easing: cubicOut }}
	out:fade={{ duration: 150 }}
>
	{#if toast.type !== 'blank'}
		<div class="icon-wrap">
			<ToastIcon {toast} />
		</div>
	{/if}

	<div class="message-wrap">
		{#if typeof toast.message === 'string' || toast.message === null}
			{@html toast.message}
		{:else}
			<toast.message {toast} />
		{/if}
	</div>
</div>

<style>
	.toast {
		box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
		border-radius: var(--box-radius);
		background-color: var(--box-background);
		padding: 8px 20px;
		display: flex;
		align-items: center;
		max-width: 350px;
		pointer-events: initial;
	}
	.icon-wrap {
		margin-right: 8px;
		display: inline-flex;
		align-items: center;
	}
</style>
