<script lang="ts">
	import IconChevronExpand from '@hyvor/icons/IconChevronExpand';
	import DropdownContent from '$lib/components/Dropdown/DropdownContent.svelte';
	import OrganizationSwitcher from '$lib/cloud/OrganizationSwitcher/OrganizationSwitcher.svelte';
	import OrganizationCreator from '$lib/cloud/OrganizationCreator/OrganizationCreator.svelte';
	import { getCloudContext } from '$lib/cloud/CloudContext/cloudContext.svelte.js';

	let disableTooltip = $state(false);

	let props: {} = $props();

	// barOrganizationDropdownOpen.subscribe((value) => {
	// 	if (value) disableTooltip = true;
	// });

	const { organization } = $derived(getCloudContext());

	let show = $state(false);
	let trigger = $state({} as HTMLButtonElement);
</script>

<button class="wrap" onclick={() => (show = true)} bind:this={trigger}>
	<div class="data">
		<div class="name">{organization?.name}</div>
	</div>
	<IconChevronExpand size={14} />
</button>

{#if show}
	<DropdownContent bind:show align="center" width={300} {trigger} padding={0}>
		<OrganizationSwitcher bind:show />
	</DropdownContent>
{/if}

<!-- 
<Tag color="red" size="small">License Expired</Tag> -->

<!-- <Tooltip position="bottom" text="Switch Organization" disabled={disableTooltip}>
	<div class="wrap">
		<OrganizationButton bind:show={$barOrganizationDropdownOpen} style="bordered" />
	</div>
</Tooltip> -->

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
