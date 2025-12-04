<script lang="ts">
	import Tooltip from '../../Tooltip/Tooltip.svelte';
	import { barOrganizationDropdownOpen, barUser, type BarOrganization } from '../bar.js';
	import OrganizationButton from './OrganizationButton.svelte';

	let disableTooltip = $state(false);

	let props: {} = $props();

	barOrganizationDropdownOpen.subscribe((value) => {
		if (value) disableTooltip = true;
	});
</script>

{#if $barUser}
	<Tooltip position="bottom" text="Switch Organization" disabled={disableTooltip}>
		<div class="wrap">
			<OrganizationButton bind:show={$barOrganizationDropdownOpen} style="bordered" />
		</div>
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

	.wrap :global(.dropdown),
	.wrap :global(.trigger) {
		display: inline-block;
		height: 100%;
	}
</style>
