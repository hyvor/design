<script lang="ts">
	import { barUser, getInstance } from '$lib/cloud/HyvorBar/bar.js';
	import Loader from '$lib/components/Loader/Loader.svelte';
	import TextInput from '$lib/components/TextInput/TextInput.svelte';

	let search = $state('');
	let role = $derived($barUser?.current_organization?.role);
	let focused = $state(false);
</script>

<div class="search-wrap">
	<TextInput
		placeholder="Search member by email..."
		bind:value={search}
		block
		onfocus={() => (focused = true)}
		onblur={() => (focused = false)}
	/>

	{#if search.trim() !== '' && focused}
		<div class="search-results hds-box">
			<Loader padding={40} block />
		</div>
	{/if}
</div>

<div class="invite-note">
	Looking for a user outside your organization?
	{#if role === 'admin' || role === 'manager'}
		<a href={getInstance() + '/account/org/members?invite'} target="_blank" class="hds-link"
			>Invite them</a
		>
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
