<script lang="ts">
	import UserPicture from '../@components/UserPicture.svelte';
	import { getCloudContext } from '../CloudContext/cloudContextState.svelte.js';

	const { user } = $derived(getCloudContext());
</script>

<UserPicture pictureUrl={user.picture_url} name={user.username || user.name || ''} size={30} />
