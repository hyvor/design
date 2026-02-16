<script lang="ts">
	import { getCloudContext } from '../CloudContext/cloudContextState.svelte.js';
	import BarUserPicture from './BarUserPicture.svelte';

	const { user } = $derived(getCloudContext());
</script>

<div class="preview">
	<div class="left">
		<BarUserPicture />
	</div>
	<div class="right">
		<div class="username">
			{#if user.username}
				@{user.username}
			{:else if user.name}
				{user.name}
			{/if}
		</div>
		<div class="email">{user.email}</div>
	</div>
</div>

<style>
	.preview {
		display: flex;
		align-items: center;
		padding: 8px 14px;
	}
	.left {
		flex-shrink: 0;
		margin-right: 8px;
	}
	.right {
		flex: 1;
		line-height: 18px;
	}
	.username {
		font-weight: 600;
	}
	.email {
		color: var(--text-light);
		font-size: 14px;
	}
</style>
