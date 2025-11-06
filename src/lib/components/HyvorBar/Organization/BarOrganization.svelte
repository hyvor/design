<script lang="ts">
	import Dropdown from '../../Dropdown/Dropdown.svelte';
	import Tooltip from '../../Tooltip/Tooltip.svelte';
	import { barUser, switchOrganization, type BarOrganization } from '../bar.js';
	import IconChevronExpand from '@hyvor/icons/IconChevronExpand';
	import OrgsList from './OrgsList.svelte';
	import toast from '$lib/components/Toast/toast.js';

	let showDropdown = $state(false);
	let showTooltip = $state(true);
	let switching = $state(false);

	let props: {
		onSwitch: (org: BarOrganization) => void;
	} = $props();

	async function handleSwitch(org: BarOrganization) {
		showDropdown = false;
		switching = true;

		try {
			await switchOrganization(org);
		} catch (e) {
			toast.error('Failed to switch organization.');
			switching = false;
			return;
		}

		props.onSwitch(org);
	}

	$effect(() => {
		if (showDropdown) {
			showTooltip = false;
		} else {
			setTimeout(() => {
				showTooltip = true;
			}, 3000);
		}
	});
</script>

{#if $barUser}
	<Tooltip position="bottom" text="Switch Organization" disabled={!showTooltip}>
		<span class="wrap">
			<Dropdown bind:show={showDropdown} align="center" width={275} contentPadding={0}>
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
