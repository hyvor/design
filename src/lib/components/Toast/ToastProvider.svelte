<script lang="ts">
	import { flip } from 'svelte/animate';
	import ToastMessage from './ToastMessage.svelte';
	import { toastStore } from './toast.js';
	import { useCleaner } from './cleaner.js';

	useCleaner();
</script>

<div id="toasts-wrap">
	{#each $toastStore as toast (toast.id)}
		<div class="toast-item" animate:flip={{ duration: 200 }}>
			<ToastMessage {toast} />
		</div>
	{/each}
</div>

<style>
	#toasts-wrap {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 20000000;
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		gap: 10px;
		padding: 10px 0 24px;
		pointer-events: none;
	}
</style>
