<script lang="ts">
	import { getCloudContext } from '../CloudContext/cloudContext.svelte.js';

	const cloudContext = getCloudContext();
</script>

{#if cloudContext.user.picture_url}
	<img src={cloudContext.user.picture_url} alt={cloudContext.user.name} />
{:else}
	<span class="user-placeholder">
		{cloudContext.user.name ? cloudContext.user.name[0].toUpperCase() : '?'}
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
