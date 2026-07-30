<script lang="ts">
	import { getCloudContext } from '$lib/cloud/CloudContext/cloudContextState.svelte.js';
	import Tag from '$lib/components/Tag/Tag.svelte';
	import Tooltip from '$lib/components/Tooltip/Tooltip.svelte';
	import IconBuilding from '@hyvor/icons/IconBuilding';
	import type { Component } from 'svelte';
	import { PRODUCTS } from '../BarProducts/products.js';

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
		tagColor: 'green' | 'blue' | 'red' | 'orange' | 'default';
		tagIcon?: Component;
	}

	let mainConfig: Config | null = $derived.by(() => {
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
			if (license.complimentary_licenses.length > 0) {
				// if the org has a complimentary license, we do not show the "Expired" tag to prevent confusing the user
				return null;
			}

			return {
				name: `License Expired`,
				tooltip: `Your organization's license for ${name} has expired. Please renew or upgrade to continue using the service.`,
				tagColor: 'red'
			};
		}

		return null;
	});

	let complimentaryConfig: Config | null = $derived.by(() => {
		if (!license) {
			return null;
		}

		if (!license.complimentary_licenses.length) {
			return null;
		}

		// for now, we only care about the 1st one
		// we may later add other licenses
		const complimentaryLicense = license.complimentary_licenses[0];
		const providerName = PRODUCTS[complimentaryLicense.provider].name;

		return {
			name: 'Complimentary',
			tooltip: `Your organization has a complimentary license for ${name} thanks to your ${providerName} ${complimentaryLicense.type}.`,
			tagColor: 'default'
		};
	});
</script>

<div class="outer">
	{#if mainConfig}
		<a class="wrap" href="/console/billing">
			<Tooltip position="bottom">
				{#snippet tooltip()}
					{mainConfig.tooltip}
				{/snippet}
				<Tag color={mainConfig.tagColor}>
					{#snippet start()}
						{#if mainConfig.tagIcon}
							<mainConfig.tagIcon size={10} />
						{/if}
					{/snippet}
					{mainConfig.name}
				</Tag>
			</Tooltip>
		</a>
	{/if}

	{#if mainConfig && complimentaryConfig}
		<span class="pls">+</span>
	{/if}

	{#if complimentaryConfig}
		<a class="wrap complimentary" href="/console/billing">
			<Tooltip position="bottom">
				{#snippet tooltip()}
					{complimentaryConfig.tooltip}
				{/snippet}
				<Tag color={complimentaryConfig.tagColor}>
					{complimentaryConfig.name}
				</Tag>
			</Tooltip>
		</a>
	{/if}
</div>

<style>
	.outer {
		display: flex;
		align-items: center;
		padding: 0 20px;
	}

	.wrap {
		display: inline-flex;
		align-items: center;
	}

	.pls {
		display: inline-flex;
		margin: 0 6px;
		color: var(--text-light);
		font-size: 12px;
		font-weight: normal;
	}
</style>
