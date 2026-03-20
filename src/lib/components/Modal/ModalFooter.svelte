<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from '../Button/Button.svelte';
	import ButtonGroup from '../Button/ButtonGroup.svelte';
	import type { Footer } from './modal-types.ts';

	interface Props {
		show: boolean;
		footer: Footer;
	}

	let { show = $bindable(), footer }: Props = $props();

	const dispatch = createEventDispatcher();
</script>

<ButtonGroup>
	{#if footer.cancel !== false}
		<Button
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
			variant="fill"
			color={footer.confirm?.danger ? 'red' : 'accent'}
			on:click={() => dispatch('confirm')}
			{...footer.confirm?.props}
		>
			{footer.confirm?.text || 'Confirm'}
		</Button>
	{/if}
</ButtonGroup>
