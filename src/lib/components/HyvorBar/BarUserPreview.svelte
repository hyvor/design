<script lang="ts">
	import { barUser } from './bar.js';
	import BarUserPicture from './BarUserPicture.svelte';
</script>

{#if $barUser}
	<div class="preview">
		<div class="left">
			<BarUserPicture />
		</div>
		<div class="right">
			<div class="username">
				{#if $barUser.username}
					@{$barUser.username}
				{:else if $barUser.name}
					{$barUser.name}
				{/if}
			</div>
			<div class="email">{$barUser.email}</div>
		</div>
	</div>
{/if}

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
	img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
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
