<script lang="ts">
	import Modal from './Modal.svelte';
	import { confirmStore } from './confirm.js';
	import Button from './../Button/Button.svelte';
	import ButtonGroup from './../Button/ButtonGroup.svelte';

	let show = true;

	function handleCancel() {
		$confirmStore!.onCancel();
	}

	function handleConfirm() {
		$confirmStore!.onConfirm();
	}

	$: {
		if (!show) {
			handleCancel();
			show = true;
		}
	}
</script>

{#if $confirmStore}
	<Modal title={$confirmStore.title} bind:show size="small" loading={$confirmStore.loading}>
		{#if typeof $confirmStore.content === 'string'}
			{$confirmStore.content}
		{:else}
			<svelte:component this={$confirmStore.content} {...$confirmStore.contentProps || {}} />
		{/if}

		<svelte:fragment slot="footer">
			<ButtonGroup>
				<Button variant="invisible" on:click={handleCancel}>
					{$confirmStore.cancelText || 'Cancel'}
				</Button>
				<Button color={$confirmStore.danger ? 'red' : 'accent'} on:click={handleConfirm}>
					{$confirmStore.confirmText || 'Confirm'}
				</Button>
			</ButtonGroup>
		</svelte:fragment>
	</Modal>
{/if}
