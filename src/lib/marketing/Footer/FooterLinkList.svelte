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
		min-width: 0;
	}

	.title {
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--footer-muted, var(--text-light));
		margin-bottom: 14px;
		overflow-wrap: break-word;
	}

	.links {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		min-width: 0;
	}

	.links :global(a) {
		font-size: 14px;
		color: var(--footer-text, var(--text-light));
		margin-top: 10px;
		max-width: 100%;
		overflow-wrap: break-word;
	}
	.links :global(a:hover) {
		color: var(--footer-text-strong, var(--text));
		text-decoration: underline;
	}
</style>
