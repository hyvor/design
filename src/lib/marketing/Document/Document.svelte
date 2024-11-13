<script lang="ts">
	import FeatureSectionTitle from './DocumentTitle.svelte';

	interface Props {
		title: string;
		subtitle: string;
		children?: import('svelte').Snippet;
	}

	let { title, subtitle, children }: Props = $props();
</script>

<section>
	<div class="hds-container container">
		<FeatureSectionTitle {title} />
		<div class="date">{subtitle}</div>
		<content>{@render children?.()}</content>
	</div>
</section>

<style lang="scss">
	* {
		line-height: 30px;
	}

	.container {
		margin: 0 auto 20px auto;
		padding: 30px 15px 20px 15px;

		:global(.wrap) {
			margin-top: 0 !important;
		}
		.date {
			text-align: center;
			margin: 15px 0 60px 0;
			color: var(--text-light);
		}

		content :global(h2) {
			font-size: 32px !important;
			font-weight: 600;
			margin-top: 40px;
			position: relative;
		}

		content :global(h3) {
			font-size: 24px;
			font-weight: 600;
			margin-top: 40px;
		}

		content :global(p) {
			margin-top: 20px;
		}

		content :global(ul) {
			margin-top: 20px;
		}

		content :global(ol) {
			margin-top: 20px;
		}

		content :global(hr) {
			margin: 40px 0;
			border: none;
			height: 1px;
			background-color: var(--border);
		}

		content :global(a) {
			color: var(--link);
			text-decoration: underline;
		}
	}
</style>
