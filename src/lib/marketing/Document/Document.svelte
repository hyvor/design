<script lang="ts">
	import { onMount } from 'svelte';
	import FeatureSectionTitle from './DocumentTitle.svelte';
	import { page } from '$app/stores';
	import DocumentTitle from './DocumentTitle.svelte';

	interface Props {
		title: string;
		subtitle: string;
		children?: import('svelte').Snippet;
	}

	let { title, subtitle, children }: Props = $props();

	function linkifyHeadings() {
		var hs = document.querySelectorAll('h2[id],h3[id],h4[id]');
		for (var i = 0; i < hs.length; i++) {
			var h = hs[i];

			var icon = document.createElement('a');
			icon.className = 'heading-anchor-link';
			icon.innerHTML =
				'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16"><path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/><path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/></svg>';
			icon.tabIndex = -1;
			h.appendChild(icon);

			var id = h.getAttribute('id');
			var link = document.createElement('a');
			link.className = 'heading-anchor';
			link.setAttribute('href', '#' + id);
			link.innerHTML = h.innerHTML;
			h.innerHTML = link.outerHTML;
		}
	}

	onMount(() => {
		const unsubscribe = page.subscribe(() => {
			linkifyHeadings();
		});

		return () => {
			unsubscribe();
		};
	});
</script>

<section>
	<div class="hds-container container">
		<DocumentTitle {title} {subtitle} />
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

		content :global(a.heading-anchor-link) {
			position: absolute;
			right: 100%;
			margin-right: 7px;
			opacity: 0;
			top: 50%;
			transform: translateY(-50%);
			display: inline-flex;
			align-items: center;
		}

		content {
			:global(.heading-anchor:hover + .heading-anchor-link) {
				opacity: 1;
			}

			:global(h2 a:not(.heading-anchor-link)),
			:global(h3 a:not(.heading-anchor-link)),
			:global(h4 a:not(.heading-anchor-link)),
			:global(h5 a:not(.heading-anchor-link)),
			:global(h6 a:not(.heading-anchor-link)) {
				text-decoration: none;
				color: inherit;
			}
		}
	}
</style>
