<script lang="ts">
	import Dropdown from '$lib/components/Dropdown/Dropdown.svelte';
	import IconChevronExpand from '@hyvor/icons/IconChevronExpand';
	import OrgsList from './OrgsList.svelte';
	import { barOnOrganizationSwitch, switchOrganization } from '../bar.js';
	import toast from '$lib/components/Toast/toast.js';
	import type { DropdownAlign } from '$lib/components/Dropdown/dropdown.types.js';
	import {
		getCloudContext,
		type CloudContextOrganization
	} from '$lib/cloud/CloudContext/cloudContext.svelte.js';

	/**
	 * This component depends on data from HyvorBar
	 * So, only use this component where there is a HyvorBar on the page
	 * Ex: use in Consoles, but not in Marketing pages
	 */

	interface Props {
		show?: boolean;
		style?: 'bordered' | 'plain';
		dropdownAlign?: DropdownAlign;
		manageButton?: boolean;
	}

	let {
		show = $bindable(false),
		style = 'plain',
		dropdownAlign = 'center',
		manageButton = true
	}: Props = $props();
	let switching = $state(false);

	async function handleSwitch(org: CloudContextOrganization) {
		show = false;
		switching = true;

		try {
			await switchOrganization(org.id);
		} catch (e) {
			toast.error('Failed to switch organization.');
			return;
		} finally {
			switching = false;
		}

		$barOnOrganizationSwitch?.(org, 'bar');
	}

	function handleCreateOrgStart() {
		show = false;
	}

	const { organization } = getCloudContext();
</script>

<Dropdown bind:show align={dropdownAlign} width={275} contentPadding={0}>
	{#snippet trigger()}
		<button class:bordered={style === 'bordered'} class:switching>
			{#if switching && false}
				<span class="switching">Switching...</span>
			{:else}
				{organization ? organization.name : 'Organization'}
			{/if}
			<IconChevronExpand size={12} />
		</button>
	{/snippet}
	{#snippet content()}
		<OrgsList onSwitch={handleSwitch} onCreateStart={handleCreateOrgStart} {manageButton} />
	{/snippet}
</Dropdown>

<style>
	button {
		height: 100%;
		font-size: 14px;
		height: 24px;
		font-weight: 600;
		transition: 0.2s background-color;
		padding: 0 15px;
		border-radius: 20px;
	}
	button.bordered {
		border: 1px solid var(--border);
		border-top: none;
		border-bottom: none;
		border-radius: 0;
	}
	button:hover {
		background-color: var(--hover);
	}

	button.switching {
		pointer-events: none;
		opacity: 0.3;
		animation: switching-pulse 1.5s infinite;
	}
	@keyframes switching-pulse {
		0%,
		100% {
			opacity: 0.3;
		}
		50% {
			opacity: 0.5;
		}
	}
</style>
