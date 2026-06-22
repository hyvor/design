<script lang="ts">
	import { setContext, onMount, type Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	setContext('navlink-group', true);

	let container: HTMLDivElement;
	let indicator: HTMLDivElement;
	let hoverIndicator: HTMLDivElement;
	let visible = $state(false);
	let hoverVisible = $state(false);
	let firstRender = true;
	let hoverFirstRender = true;

	function positionIndicator(el: HTMLDivElement, target: HTMLElement, isFirstRender: boolean) {
		const rect = target.getBoundingClientRect();

		el.style.transition = isFirstRender ? 'none' : '';
		el.style.top = `${rect.top}px`;
		el.style.left = `${rect.left}px`;
		el.style.width = `${rect.width}px`;
		el.style.height = `${rect.height}px`;
	}

	function updateIndicator() {
		if (!container || !indicator) return;

		const activeLink = container.querySelector<HTMLElement>('.nav-link.active');

		if (!activeLink) {
			visible = false;
			return;
		}

		positionIndicator(indicator, activeLink, firstRender);
		visible = true;

		if (firstRender) {
			firstRender = false;
		}
	}

	function updateHoverIndicator(target: HTMLElement | null) {
		if (!hoverIndicator) return;

		if (!target || target.classList.contains('active') || target.classList.contains('disabled')) {
			hoverVisible = false;
			return;
		}

		positionIndicator(hoverIndicator, target, hoverFirstRender);
		hoverVisible = true;

		if (hoverFirstRender) {
			hoverFirstRender = false;
		}
	}

	function onMouseOver(event: MouseEvent) {
		const target = (event.target as HTMLElement).closest<HTMLElement>('.nav-link');
		updateHoverIndicator(target);
	}

	function onMouseLeave() {
		hoverVisible = false;
	}

	onMount(() => {
		updateIndicator();

		const observer = new MutationObserver(updateIndicator);
		observer.observe(container, {
			attributes: true,
			attributeFilter: ['class'],
			subtree: true
		});

		container.addEventListener('mouseover', onMouseOver);
		container.addEventListener('mouseleave', onMouseLeave);

		window.addEventListener('resize', updateIndicator);
		window.addEventListener('scroll', updateIndicator, true);

		return () => {
			observer.disconnect();
			container.removeEventListener('mouseover', onMouseOver);
			container.removeEventListener('mouseleave', onMouseLeave);
			window.removeEventListener('resize', updateIndicator);
			window.removeEventListener('scroll', updateIndicator, true);
		};
	});
</script>

<div class="nav-link-group" bind:this={container}>
	<div
		class="nav-link-group-indicator hover"
		class:visible={hoverVisible}
		bind:this={hoverIndicator}
	></div>
	<div class="nav-link-group-indicator active" class:visible bind:this={indicator}></div>
	{@render children?.()}
</div>

<style>
	.nav-link-group {
		position: relative;
		z-index: 0;
		width: 100%;
	}

	.nav-link-group-indicator {
		position: fixed;
		top: 0;
		left: 0;
		width: 0;
		height: 0;
		pointer-events: none;
		opacity: 0;
		z-index: 0;
		transition:
			top 0.2s ease,
			left 0.2s ease,
			width 0.2s ease,
			height 0.2s ease,
			opacity 0.2s ease;
	}

	.nav-link-group-indicator.visible {
		opacity: 1;
	}

	.nav-link-group-indicator.active {
		background-color: var(--accent-lightest);
		border-left: 3px solid var(--accent);
	}

	.nav-link-group-indicator.hover {
		z-index: 0;
		background-color: var(--hover);
		transition:
			top 0.1s ease,
			left 0.1s ease,
			width 0.1s ease,
			height 0.1s ease,
			opacity 0.1s ease;
	}

	:global(:root.dark) .nav-link-group-indicator.active {
		background-color: color-mix(in srgb, var(--accent-lightest), transparent 80%);
	}

	:global(.nav-link.group) {
		position: relative;
		z-index: 1;
	}
</style>
