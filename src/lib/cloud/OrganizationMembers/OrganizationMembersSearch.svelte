<script lang="ts">
	import { clickOutside, IconMessage, toast } from '$lib/components/index.js';
	import Loader from '$lib/components/Loader/Loader.svelte';
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	import { getCloudContext, type OrganizationMember } from '../CloudContext/cloudContext.svelte.js';
	import { searchMembers } from './members.js';
	import { dropdownSlide } from '$lib/components/Dropdown/dropdownSlide.js';
	import UserPicture from '../@components/UserPicture.svelte';
	import IconButton from '$lib/components/IconButton/IconButton.svelte';

	interface Props {
		selectedUserId?: number;
	}
	let { selectedUserId = $bindable(undefined) }: Props = $props();

	const { instance, organization } = getCloudContext();

	let search = $state('');
	let role = $derived(organization?.role);
	let showable = $state(false);
	let loading = $state(false);
	let members: undefined | OrganizationMember[] = $state(undefined);

	let selectedMember = $state(null as null | OrganizationMember);

	let searchTimeout: ReturnType<typeof setTimeout> | null = null;

	function handleKeyUp() {
		showable = true;

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

	function handleSelect(member: OrganizationMember) {
		selectedMember = member;
		selectedUserId = member.user_id;
		showable = false;
	}

	function handleDeselect() {
		selectedMember = null;
		selectedUserId = undefined;
	}
</script>

{#if selectedMember}
	<div class="selected-wrap">
		<div class="selected-user">
			<UserPicture
				pictureUrl={selectedMember.user_picture_url}
				name={selectedMember.user_username || selectedMember.user_email}
				size={30}
			/>

			<div class="user-data">
				<div class="username">
					@{selectedMember.user_username}
				</div>
				<div class="email">{selectedMember.user_email}</div>
			</div>
		</div>
		<div>
			<IconButton size="small" color="input" onclick={handleDeselect}>&times;</IconButton>
		</div>
	</div>
{:else}
	<div
		class="search-wrap"
		use:clickOutside={{
			callback: () => (showable = false)
		}}
	>
		<TextInput
			placeholder="Search member by email..."
			bind:value={search}
			block
			onkeyup={handleKeyUp}
		>
			{#snippet end()}
				{#if loading}
					<Loader size={12} colorTrack="transparent" />
				{/if}
			{/snippet}
		</TextInput>

		{#if members !== undefined && showable}
			<div class="search-results hds-box" transition:dropdownSlide>
				{#if members.length}
					{#each members as member}
						<button class="member-row" onclick={() => handleSelect(member)}>
							<UserPicture
								pictureUrl={member.user_picture_url}
								name={member.user_username || member.user_email}
								size={30}
							/>

							<div class="user-data">
								<div class="username">
									@{member.user_username}
								</div>
								<div class="email">{member.user_email}</div>
							</div>

							<div class="role">
								{member.role}
							</div>
						</button>
					{/each}
				{:else}
					<IconMessage empty padding={30} iconSize={35} message="No members found" />
				{/if}
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
{/if}

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
		margin-top: 10px;
		overflow: auto;
		z-index: 10;
		max-height: 300px;
	}

	.member-row {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 15px 25px;
		transition: 0.1s background-color;
		cursor: pointer;
		text-align: left;
		width: 100%;
		border-radius: 20px;
	}

	.member-row:hover {
		background-color: var(--hover);
	}

	.username {
		font-weight: 600;
	}
	.email {
		color: var(--text-light);
		font-size: 14px;
	}

	.user-data {
		flex: 1;
	}

	.role {
		text-transform: uppercase;
		color: var(--text-light);
		font-size: 13px;
		font-weight: 600;
	}

	.selected-wrap {
		display: flex;
		align-items: center;
	}

	.selected-user {
		display: flex;
		flex: 1;
		align-items: center;
		gap: 6px;
	}
</style>
