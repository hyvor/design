<script lang="ts">
	import Checkbox from '$lib/components/Checkbox/Checkbox.svelte';
	import IconCheck from '@hyvor/icons/IconCheck';

	interface Props {
		selection: 'none' | 'single' | 'multi';
		selected: boolean;
	}

	let { selection, selected = $bindable(false) }: Props = $props();
</script>

{#if selection !== 'none'}
	<span class="selected">
		{#if selection === 'multi'}
			<span style="transform:scale(0.9);transform-origin:top">
				<Checkbox checked={selected} tabindex="-1" />
			</span>
		{:else if selected}
			<IconCheck />
		{/if}
	</span>
{/if}

<style>
	.selected {
		width: 30px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}
</style>
