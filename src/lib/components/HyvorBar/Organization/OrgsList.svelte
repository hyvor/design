<script lang="ts">
	import IconMessage from '$lib/components/IconMessage/IconMessage.svelte';
	import Loader from '$lib/components/Loader/Loader.svelte';
	import { onMount } from 'svelte';
	import {
		barOrganizationCreating,
		barOrganizations,
		getMyOrganizations,
		instance,
		type BarOrganization
	} from '../bar.js';
	import ActionList from '$lib/components/ActionList/ActionList.svelte';
	import ActionListItem from '$lib/components/ActionList/ActionListItem.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import IconPlus from '@hyvor/icons/IconPlus';
	import IconBoxArrowUpRight from '@hyvor/icons/IconBoxArrowUpRight';

	let loading = $state(true);
	let error = $state('');

	let {
		onSwitch,
		onCreateStart
	}: {
		onSwitch: (org: BarOrganization) => void;
		onCreateStart: () => void;
	} = $props();

	onMount(() => {
		if ($barOrganizations.length > 0) {
			loading = false;
			return;
		}

		getMyOrganizations()
			.then((data) => {
				barOrganizations.set(data);
			})
			.catch((err) => {
				error = 'Failed to load organizations.';
			})
			.finally(() => {
				loading = false;
			});
	});

	function handleCreate() {
		barOrganizationCreating.set(true);
		onCreateStart();
	}
</script>

{#if loading}
	<Loader padding={40} block size="small" />
{:else if error}
	<IconMessage error iconSize={30} padding={40}>
		{error}
	</IconMessage>
{:else}
	<div class="list-wrap">
		<ActionList>
			{#each $barOrganizations as org}
				<ActionListItem on:select={() => onSwitch(org)}>
					{org.name}
					{#snippet end()}
						<span class="role">
							{org.role.toUpperCase()}
						</span>
					{/snippet}
				</ActionListItem>
			{/each}
		</ActionList>
	</div>

	<div class="manage-create">
		<Button size="small" onclick={handleCreate}>
			Create
			{#snippet end()}
				<IconPlus />
			{/snippet}
		</Button>
		<Button
			size="small"
			as="a"
			href={$instance + '/account/org'}
			color="input"
			target="_blank"
			rel="noopener noreferrer"
		>
			Manage
			{#snippet end()}
				<IconBoxArrowUpRight size={12} />
			{/snippet}
		</Button>
	</div>
{/if}

<style>
	.role {
		font-size: 10px;
		color: var(--text-light);
		font-weight: 600;
	}
	.list-wrap {
		max-height: 300px;
		overflow-y: auto;
		padding: 10px;
	}
	.manage-create {
		border-top: 1px solid var(--border);
		padding: 10px;
		display: flex;
		gap: 10px;
		align-items: center;
		justify-content: center;
	}
	.manage-create :global(a) {
		text-decoration: none !important;
	}
</style>
