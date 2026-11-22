<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import { getCloudContext } from '../CloudContext/cloudContextState.svelte.js';
	import UpgradeModal from './UpgradeModal.svelte';

	interface Props {
		/** current usage */
		used: number;
		/** the limit. -1 / null / undefined = unlimited (nothing is rendered) */
		limit: number | undefined | null;
		/**
		 * The license property this limit is about (the key in the license, ex: "languages").
		 * Passed to the billing component so that the matching plans and add-ons are highlighted.
		 */
		focus: string;
		/** Label before the numbers */
		label?: string;
		/** Text of the button */
		buttonText?: string;
		/** Title of the upgrade modal */
		modalTitle?: string | Snippet;
		/** Component whose billing is shown. Defaults to the CloudContext's component */
		component?: string;
		/** Size of the button */
		buttonSize?: 'x-small' | 'small' | 'medium' | 'large';
		/** Size of the upgrade modal */
		modalSize?: 'small' | 'medium' | 'large';
		/** Render even when the deployment is not cloud */
		showOnPrem?: boolean;
		/** Custom formatter of the numbers (ex: bytes) */
		format?: (value: number) => string;
	}

	let {
		used,
		limit,
		focus,
		label = 'Usage',
		buttonText = 'Upgrade',
		modalTitle,
		component,
		buttonSize = 'small',
		modalSize = 'large',
		showOnPrem = false,
		format = (v) => String(v)
	}: Props = $props();

	const context = $derived(getCloudContext());

	let show = $state(false);

	const hasLimit = $derived(limit != null && limit >= 0);
	const visible = $derived(hasLimit && (showOnPrem || context.deployment === 'cloud'));
	const reached = $derived(hasLimit && used >= (limit as number));
</script>

{#if visible}
	<div class="usage-limit">
		<span class="text" class:reached>
			{label}: {format(used)}/{format(limit as number)}
		</span>
		<Button size={buttonSize} color="input" onclick={() => (show = true)}>
			{buttonText}
		</Button>
	</div>

	{#if show}
		<UpgradeModal bind:show {focus} {component} size={modalSize} title={modalTitle ?? buttonText} />
	{/if}
{/if}

<style>
	.usage-limit {
		display: inline-flex;
		align-items: center;
		gap: 10px;
	}
	.text {
		font-size: 14px;
		color: var(--text-light);
	}
	.text.reached {
		color: var(--red);
		font-weight: 600;
	}
</style>
