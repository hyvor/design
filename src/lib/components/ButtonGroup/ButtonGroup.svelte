<script lang="ts">
	interface Props {
		column?: boolean;
		children?: import('svelte').Snippet;
	}

	let { column = false, children }: Props = $props();
</script>

<div class="button-group" class:column>
	{@render children?.()}
</div>

<style lang="scss">
	.button-group {
		display: inline-flex;
	}

	.button-group.column {
		flex-direction: column;
		align-items: stretch;
	}

	.button-group :global(> .button) {
		position: relative;
	}
	.button-group :global(> .button:hover),
	.button-group :global(> .button:focus-visible) {
		z-index: 1;
	}

	.button-group:not(.column) :global(> .button:not(:first-child)) {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
	.button-group:not(.column) :global(> .button:not(:last-child)) {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	.button-group.column :global(> .button:not(:first-child)) {
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}
	.button-group.column :global(> .button:not(:last-child)) {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	// for overlap borders inb buttons
	.button-group:not(.column) :global(> .button:not(:first-child)) {
		margin-left: -1px;
	}
	.button-group.column :global(> .button:not(:first-child)) {
		margin-top: -1px;
	}

	.button-group:not(.column)
		:global(> .button:not(.outline):not(.outline-fill):not(:first-child))::before {
		content: '';
		position: absolute;
		top: 22%;
		bottom: 22%;
		left: 0;
		width: 1px;
		background-color: currentColor;
		opacity: 0.25;
		pointer-events: none;
	}
	.button-group.column
		:global(> .button:not(.outline):not(.outline-fill):not(:first-child))::before {
		content: '';
		position: absolute;
		left: 22%;
		right: 22%;
		top: 0;
		height: 1px;
		background-color: currentColor;
		opacity: 0.25;
		pointer-events: none;
	}
</style>
