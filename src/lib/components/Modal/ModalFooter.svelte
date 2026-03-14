<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from '../Button/Button.svelte';
	import ButtonGroup from '../Button/ButtonGroup.svelte';
	import type { Footer } from './modal-types.ts';

	interface Props {
		show: boolean;
		footer: Footer;
		disabled?: boolean;
	}

	let { show = $bindable(), footer, disabled = false }: Props = $props();

	const dispatch = createEventDispatcher();
</script>

<ButtonGroup>
	{#if footer.cancel !== false}
		<Button
			disabled={disabled || footer.cancel?.disabled}
			variant="invisible"
			on:click={() => {
				show = false;
				dispatch('cancel');
			}}
			{...footer.cancel?.props}
		>
			{footer.cancel?.text || 'Cancel'}
		</Button>
	{/if}

	{#if footer.confirm !== false}
		<Button
			disabled={disabled || footer.confirm?.disabled}
			variant="fill"
			color={footer.confirm?.danger ? 'red' : 'accent'}
			on:click={() => dispatch('confirm')}
			{...footer.confirm?.props}
		>
			{footer.confirm?.text || 'Confirm'}
		</Button>
	{/if}
</ButtonGroup>
