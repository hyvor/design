<script lang="ts">
	interface Props {
		title: string;
		children?: import('svelte').Snippet;
	}

	let { title, children }: Props = $props();
</script>

<div class="link-list">
	<div class="title">{title}</div>
	<div class="links">
		{@render children?.()}
	</div>
</div>

<style>
	.link-list {
		flex: 1;
	}

	.title {
		font-weight: 600;
		text-transform: uppercase;
		margin-bottom: 10px;
	}

	.links {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.links :global(a) {
		margin-top: 12px;
	}
	.links :global(a:hover) {
		text-decoration: underline;
	}
</style>
