<script lang="ts">
	import IconChevronExpand from '@hyvor/icons/IconChevronExpand';
	import DropdownContent from '$lib/components/Dropdown/DropdownContent.svelte';
	import OrganizationSwitcher from '$lib/cloud/OrganizationSwitcher/OrganizationSwitcher.svelte';
	import OrganizationCreator from '$lib/cloud/OrganizationCreator/OrganizationCreator.svelte';
	import { getCloudContext } from '$lib/cloud/CloudContext/cloudContext.svelte.js';
	import Tooltip from '$lib/components/Tooltip/Tooltip.svelte';

	let disableTooltip = $state(false);

	const { organization } = $derived(getCloudContext());

	let show = $state(false);
	let trigger = $state({} as HTMLButtonElement);

	$effect(() => {
		if (show) {
			disableTooltip = true;
		} else {
			setTimeout(() => {
				disableTooltip = false;
			}, 1000);
		}
	});
</script>

<Tooltip
	position="bottom"
	text="Switch Organization"
	disabled={disableTooltip}
	style="height: 100%"
>
	<button class="wrap" onclick={() => (show = true)} bind:this={trigger}>
		<div class="data">
			<div class="name">{organization?.name}</div>
		</div>
		<IconChevronExpand size={14} />
	</button>
</Tooltip>

{#if show}
	<DropdownContent bind:show align="start" width={300} {trigger} padding={0}>
		<OrganizationSwitcher bind:show />
	</DropdownContent>
{/if}

<OrganizationCreator />

<style>
	.wrap {
		height: 100%;
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding: 0 15px;
		border-left: 1px solid var(--border);
		border-right: 1px solid var(--border);
		margin-left: 10px;
		transition: 0.05s background-color;
	}

	.wrap:hover {
		background-color: var(--hover);
	}

	.data {
		height: 100%;
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		line-height: 16px;
	}

	.name {
		font-size: 14px;
		font-weight: 600;
	}

	/* .wrap {
		height: 100%;
		margin-left: 20px;
		margin-right: 20px;
		display: inline-flex;
		align-items: center;
	}

	.wrap :global(.dropdown),
	.wrap :global(.trigger) {
		display: inline-block;
		height: 100%;
	} */
</style>
