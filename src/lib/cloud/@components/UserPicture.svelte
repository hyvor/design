<script lang="ts">
	interface Props {
		pictureUrl: string | null;
		name: string;
		size?: number;
	}

	let { pictureUrl, name, size = 30 }: Props = $props();
</script>

{#if pictureUrl}
	<img src={pictureUrl} alt={name} style="width: {size}px; height: {size}px;" />
{:else}
	<span class="user-placeholder" style="width: {size}px; height: {size}px;">
		{name ? name[0].toUpperCase() : '?'}
	</span>
{/if}

<style>
	img {
		border-radius: 50%;
	}
	.user-placeholder {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		color: var(--text);
		font-size: 14px;
		background-color: var(--input);
	}
</style>
