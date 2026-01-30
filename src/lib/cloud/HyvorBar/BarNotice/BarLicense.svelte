<script lang="ts">
	import { getCloudContext } from '$lib/cloud/CloudContext/cloudContext.svelte.js';
	import Tag from '$lib/components/Tag/Tag.svelte';
	import Tooltip from '$lib/components/Tooltip/Tooltip.svelte';
	import IconBuilding from '@hyvor/icons/IconBuilding';
	import type { Component } from 'svelte';

	let { name } = $props();

	const { license } = $derived(getCloudContext());

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

	function remainingCancelAtDAys(cancelAt: number | undefined | null): null | number {
		if (!cancelAt) {
			return null;
		}
		return daysDiff(cancelAt);
	}

	interface Config {
		name: string;
		tooltip: string;
		tagColor: 'green' | 'blue' | 'red' | 'orange';
		tagIcon?: Component;
	}

	let config: Config | null = $derived.by(() => {
		if (!license) {
			return null;
		}

		if (license.type === 'enterprise_contract') {
			return {
				name: 'Enterprise',
				tooltip:
					'An enterprise license is applied to your organization. Click to view more details.',
				tagColor: 'blue',
				tagIcon: IconBuilding
			};
		}

		if (license.type === 'subscription') {
			const planName = license.subscription?.plan_readable_name || '';
			const cancelAtDays = remainingCancelAtDAys(license.subscription?.cancel_at);
			const cancelAt = cancelAtDays ? ` (until ${cancelAtDays}d)` : '';

			return {
				name: planName + cancelAt,
				tooltip: `Your organization's current subscription plan for ${name}. Click to manage it.`,
				tagColor: 'blue'
			};
		}

		if (license.type === 'trial') {
			const trialDays = remainingTrialDays(license.trial_ends_at);
			const s = trialDays === 1 ? '' : 's';

			return {
				name: `Trial License (${trialDays}d)`,
				tooltip: `You organization is currently using a trial license for ${name}. It will expire in ${trialDays} day${s}.`,
				tagColor: 'orange'
			};
		}

		if (license.type === 'expired') {
			return {
				name: `License Expired`,
				tooltip: `Your organization's license for ${name} has expired. Please renew or upgrade to continue using the service.`,
				tagColor: 'red'
			};
		}

		return null;
	});
</script>

{#if config}
	<a class="wrap" href="/console/billing">
		<Tooltip position="bottom">
			{#snippet tooltip()}
				{config.tooltip}
			{/snippet}
			<Tag color={config.tagColor}>
				{#snippet start()}
					{#if config.tagIcon}
						<config.tagIcon size={10} />
					{/if}
				{/snippet}
				{config.name}
			</Tag>
		</Tooltip>
	</a>
{/if}

<style>
	.wrap {
		display: inline-flex;
		align-items: center;
		margin-left: 20px;
	}
</style>
