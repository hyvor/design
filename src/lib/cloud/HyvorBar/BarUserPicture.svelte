<script lang="ts">
	import UserPicture from '../@components/UserPicture.svelte';
	import { getCloudContext } from '../CloudContext/cloudContext.svelte.js';

	const { user } = $derived(getCloudContext());
</script>

<UserPicture pictureUrl={user.picture_url} name={user.username || user.name || ''} size={30} />

{#if user.picture_url}
	<img src={user.picture_url} alt={user.name} />
{:else}
	<span class="user-placeholder">
		{user.name ? user.name[0].toUpperCase() : '?'}
	</span>
{/if}

<style>
	img {
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
	.user-placeholder {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		color: var(--text);
		font-size: 14px;
		background-color: var(--input);
	}
</style>
