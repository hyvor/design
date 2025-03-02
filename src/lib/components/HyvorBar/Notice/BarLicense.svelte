<script lang="ts">
	import Tag from '$lib/components/Tag/Tag.svelte';
	import Tooltip from '$lib/components/Tooltip/Tooltip.svelte';
	import { barLicense } from '../bar.js';

	let { name } = $props();

	function daysDiff(unix: number) {
		const date = new Date(unix * 1000);
		const now = new Date();

		const diffTime = date.valueOf() - now.valueOf();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		return Math.max(diffDays, 1);
	}

	function remainingTrialDays(endsAt: number | undefined | null) {
		if (!endsAt) {
			return 1;
		}
		return daysDiff(endsAt);
	}

	function remainingCancelAtDAys(cancelAt: number | undefined | null) : null | number {
		if (!cancelAt) {
			return null;
		}
		return daysDiff(cancelAt);
	}

	let trialDays = $derived(remainingTrialDays($barLicense?.trial_ends_at));
	let cancelAtDays = $derived(remainingCancelAtDAys($barLicense?.subscription?.cancel_at));
</script>

{#if $barLicense}
	<a class="wrap" href="/console/billing">
		{#if $barLicense.type === 'subscription'}
			<Tooltip
				position="bottom"
			>
				{#snippet tooltip()}
					Your current subscription plan for {name}. Click to manage it.
				{/snippet}
				<Tag color="blue" size="small">
					{$barLicense.subscription!.plan_readable}
					{#if cancelAtDays}
						(until {cancelAtDays}d)
					{/if}
				</Tag>
			</Tooltip>
		{:else if $barLicense.type === 'custom'}
			<Tooltip
				text="A custom license is applied to your account for {name}."
				position="bottom"
			>
				<Tag color="green" size="small">Custom License</Tag>
			</Tooltip>
		{:else if $barLicense.type === 'expired'}
			<Tooltip
				text="Your license for {name} has expired. Please renew or upgrade to continue using the service."
				position="bottom"
			>
				<Tag color="red" size="small">License Expired</Tag>
			</Tooltip>
		{:else if $barLicense.type === 'trial'}
			<Tooltip
				text="You are currently using a trial license for {name}. It will expire in {trialDays} day{trialDays ===
				1
					? ''
					: 's'}."
				position="bottom"
			>
				<Tag color="orange" size="small">
					Trial License ({trialDays}d)
				</Tag>
			</Tooltip>
		{/if}
	</a>
{/if}

<style>
	.wrap {
		display: inline-flex;
		align-items: center;
		margin-left: 15px;
	}
</style>
