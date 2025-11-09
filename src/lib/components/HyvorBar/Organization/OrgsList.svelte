<script lang="ts">
	import IconMessage from '$lib/components/IconMessage/IconMessage.svelte';
	import Loader from '$lib/components/Loader/Loader.svelte';
	import { onMount } from 'svelte';
	import { barOrganizations, getMyOrganizations, type BarOrganization } from '../bar.js';
	import ActionList from '$lib/components/ActionList/ActionList.svelte';
	import ActionListItem from '$lib/components/ActionList/ActionListItem.svelte';

	let loading = $state(true);
	let error = $state('');

	let {
		onSwitch
	}: {
		onSwitch: (org: BarOrganization) => void;
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
</script>

{#if loading}
	<Loader padding={40} block size="small" />
{:else if error}
	<IconMessage error iconSize={30}>
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
</style>
