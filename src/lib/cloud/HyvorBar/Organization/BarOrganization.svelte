<script lang="ts">
	import { Tooltip } from '$lib/components/index.js';
	import { barOrganizationCreating, barOrganizationDropdownOpen } from '../bar.js';
	import CreateOrganization from './CreateOrganization.svelte';
	import OrganizationButton from './OrganizationButton.svelte';

	let disableTooltip = $state(false);

	let props: {} = $props();

	barOrganizationDropdownOpen.subscribe((value) => {
		if (value) disableTooltip = true;
	});
</script>

<Tooltip position="bottom" text="Switch Organization" disabled={disableTooltip}>
	<div class="wrap">
		<OrganizationButton bind:show={$barOrganizationDropdownOpen} style="bordered" />
	</div>
</Tooltip>

<CreateOrganization bind:show={$barOrganizationCreating} />

<style>
	.wrap {
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
	}
</style>
