<script lang="ts">
	import type { Component } from 'svelte';

	interface Props {
		icon: Component;
		title: string;
		description: string;
		color?: string;
	}

	let { icon, title, description, color = 'var(--accent)' }: Props = $props();

	const SvelteComponent = $derived(icon);
</script>

<li class="feature">
	<div class="icon-bg" style:color aria-hidden="true">
		<SvelteComponent size={30} />
	</div>
	<div class="content">
		<h4 class="title">{title}</h4>
		<p class="description">{description}</p>
	</div>
</li>

<style>
	.feature {
		position: relative;
		width: calc(33.33% - 15px);
		list-style: none;
		overflow: hidden;
	}

	.content {
		position: relative;
		z-index: 1;
	}

	.icon-bg {
		position: absolute;
		top: 0;
		right: 4px;
		z-index: 0;
		opacity: 0.14;
		pointer-events: none;
	}

	.title {
		font-weight: 600;
		font-size: 20px;
		margin: 0;
	}

	.description {
		font-size: 16px;
		margin: 10px 0 0;
		color: var(--text-light);
	}

	@media (max-width: 992px) {
		.feature {
			width: 100%;
			text-align: center;
		}

		.icon-bg {
			display: none;
		}
	}
</style>
