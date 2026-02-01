<script lang="ts">
	import { toast } from '$lib/components/index.js';
	import Loader from '$lib/components/Loader/Loader.svelte';
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	import {
		getCloudContext,
		type OrganizationMember
	} from '../CloudContext/cloudContext.svelte.js';
	import { searchMembers } from './members.js';

	const { instance, organization } = getCloudContext();

	let search = $state('');
	let role = $derived(organization?.role);
	let focused = $state(false);
	let loading = $state(false);
	let members: undefined | OrganizationMember[] = $state(undefined);

	let searchTimeout: ReturnType<typeof setTimeout> | null = null;

	function handleKeyUp() {
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}

		if (search.trim() === '') {
			members = undefined;
			loading = false;
			return;
		}

		loading = true;

		searchTimeout = setTimeout(() => {
			searchMembers(search)
				.then((ms) => {
					members = ms;
				})
				.catch((e) => {
					toast.error('could not load members');
				})
				.finally(() => {
					loading = false;
				});
		}, 500);
	}
</script>

<div class="search-wrap">
	<TextInput
		placeholder="Search member by email..."
		bind:value={search}
		block
		onkeyup={handleKeyUp}
		onfocus={() => (focused = true)}
		onblur={() => (focused = false)}
	>
		{#snippet end()}
			{#if loading}
				<Loader size={12} colorTrack="transparent" />
			{/if}
		{/snippet}
	</TextInput>

	{#if members !== undefined && focused}
		<div class="search-results hds-box">
			{#each members as member}
				{member.user_email}
			{/each}
		</div>
	{/if}
</div>

<div class="invite-note">
	Looking for a user outside your organization?
	{#if role === 'admin' || role === 'manager'}
		<a href={instance + '/account/org/members?invite'} target="_blank" class="hds-link">
			Invite them
		</a>
	{:else}
		Ask an admin to invite them
	{/if} to your organization first.
</div>

<style>
	.invite-note {
		margin-top: 15px;
		color: var(--text-light);
		font-size: 14px;
	}
	.search-wrap {
		position: relative;
	}
	.search-results {
		position: absolute;
		top: 100%;
		width: 100%;
		padding: 15px;
		margin-top: 10px;
	}
</style>
