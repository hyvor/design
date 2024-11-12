<script lang="ts">
	import { run } from 'svelte/legacy';

	import Modal from './Modal.svelte';
	import { confirmStore } from './confirm.js';
	import Button from './../Button/Button.svelte';
	import ButtonGroup from './../Button/ButtonGroup.svelte';

	let show = $state(true);

	function handleCancel() {
		$confirmStore!.onCancel();
	}

	function handleConfirm() {
		$confirmStore!.onConfirm();
	}

	run(() => {
		if (!show) {
			handleCancel();
			show = true;
		}
	});
</script>

{#if $confirmStore}
	<Modal title={$confirmStore.title} bind:show size="small" loading={$confirmStore.loading}>
		{#if typeof $confirmStore.content === 'string'}
			{$confirmStore.content}
		{:else}
			{@const SvelteComponent = $confirmStore.content}
			<SvelteComponent {...$confirmStore.contentProps || {}} />
		{/if}

		{#snippet footer()}
			
				<ButtonGroup>
					<Button variant="invisible" on:click={handleCancel}>
						{$confirmStore.cancelText || 'Cancel'}
					</Button>
					<Button color={$confirmStore.danger ? 'red' : 'accent'} on:click={handleConfirm}>
						{$confirmStore.confirmText || 'Confirm'}
					</Button>
				</ButtonGroup>
			
			{/snippet}
	</Modal>
{/if}
