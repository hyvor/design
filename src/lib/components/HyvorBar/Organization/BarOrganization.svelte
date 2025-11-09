<script lang="ts">
	import Dropdown from '../../Dropdown/Dropdown.svelte';
	import Tooltip from '../../Tooltip/Tooltip.svelte';
	import {
		barOrganizationDropdownOpen,
		barUser,
		switchOrganization,
		type BarOrganization
	} from '../bar.js';
	import IconChevronExpand from '@hyvor/icons/IconChevronExpand';
	import OrgsList from './OrgsList.svelte';
	import toast from '$lib/components/Toast/toast.js';

	let disableTooltip = $state(false);
	let switching = $state(false);

	let props: {
		onSwitch: (org: BarOrganization) => void;
	} = $props();

	async function handleSwitch(org: BarOrganization) {
		barOrganizationDropdownOpen.set(false);
		switching = true;

		try {
			await switchOrganization(org);
		} catch (e) {
			toast.error('Failed to switch organization.');
			switching = false;
			return;
		}

		switching = false;
		props.onSwitch(org);
	}

	barOrganizationDropdownOpen.subscribe((value) => {
		if (value) disableTooltip = true;
	});
</script>

{#if $barUser}
	<Tooltip position="bottom" text="Switch Organization" disabled={disableTooltip}>
		<span class="wrap">
			<Dropdown
				bind:show={$barOrganizationDropdownOpen}
				align="center"
				width={275}
				contentPadding={0}
			>
				{#snippet trigger()}
					<button>
						{#if switching}
							<span class="switching">Switching...</span>
						{:else}
							{$barUser.current_organization_name}
						{/if}
						<IconChevronExpand size={12} />
					</button>
				{/snippet}
				{#snippet content()}
					<OrgsList onSwitch={handleSwitch} />
				{/snippet}
			</Dropdown>
		</span>
	</Tooltip>
{/if}

<style>
	.wrap {
		height: 100%;
		margin-left: 20px;
		margin-right: 20px;
		display: inline-flex;
		align-items: center;
	}
	button {
		height: 100%;
		padding: 0 15px;
		font-size: 14px;
		height: 24px;
		font-weight: 600;
		transition: 0.2s background-color;
		border: 1px solid var(--border);
		border-top: none;
		border-bottom: none;
	}
	button:hover {
		background-color: var(--hover);
	}

	.wrap :global(.dropdown),
	.wrap :global(.trigger) {
		display: inline-block;
		height: 100%;
	}

	.switching {
		opacity: 0.4;
		animation: switching-pulse 1.5s infinite;
	}
	@keyframes switching-pulse {
		0%,
		100% {
			opacity: 0.4;
		}
		50% {
			opacity: 0.8;
		}
	}
</style>
