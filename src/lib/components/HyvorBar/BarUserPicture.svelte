<script lang="ts">
	import { barUser } from './bar.js';
</script>

{#if $barUser}
	{#if $barUser.picture_url}
		<img src={$barUser.picture_url} alt={$barUser.name} />
	{:else}
		<span class="user-placeholder">
			{$barUser.name ? $barUser.name[0].toUpperCase() : '?'}
		</span>
	{/if}
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
