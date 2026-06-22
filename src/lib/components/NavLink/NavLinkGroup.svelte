<script lang="ts">
	import { setContext, onMount, type Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		activeBackground?: string;
		activeBorderColor?: string;
		hoverBackground?: string;
	}

	let {
		children,
		activeBackground = 'var(--accent-lightest)',
		activeBorderColor = 'var(--accent)',
		hoverBackground = 'var(--hover)'
	}: Props = $props();

	setContext('navlink-group', true);

	let container: HTMLDivElement;
	let indicator: HTMLDivElement;
	let hoverIndicator: HTMLDivElement;
	let visible = $state(false);
	let hoverVisible = $state(false);
	let firstRender = true;
	let hoverFirstRender = true;
	let hoverTarget: HTMLElement | null = null;

	function positionIndicator(el: HTMLDivElement, target: HTMLElement, instant: boolean) {
		const rect = target.getBoundingClientRect();

		el.style.transition = instant ? 'none' : '';
		el.style.top = `${rect.top}px`;
		el.style.left = `${rect.left}px`;
		el.style.width = `${rect.width}px`;
		el.style.height = `${rect.height}px`;
	}

	function updateIndicator(instant = false) {
		if (!container || !indicator) return;

		const activeLink = container.querySelector<HTMLElement>('.nav-link.active');

		if (!activeLink) {
			visible = false;
			return;
		}

		positionIndicator(indicator, activeLink, firstRender || instant);
		visible = true;

		if (firstRender) {
			firstRender = false;
		}
	}

	function updateHoverIndicator(target: HTMLElement | null, instant = false) {
		if (!hoverIndicator) return;

		if (!target || target.classList.contains('active') || target.classList.contains('disabled')) {
			hoverVisible = false;
			return;
		}

		positionIndicator(hoverIndicator, target, hoverFirstRender || instant);
		hoverVisible = true;

		if (hoverFirstRender) {
			hoverFirstRender = false;
		}
	}

	function onMouseOver(event: MouseEvent) {
		hoverTarget = (event.target as HTMLElement).closest<HTMLElement>('.nav-link');
		updateHoverIndicator(hoverTarget);
	}

	function onMouseLeave() {
		hoverTarget = null;
		hoverVisible = false;
	}

	function onScrollOrResize() {
		updateIndicator(true);

		if (hoverVisible && hoverTarget) {
			updateHoverIndicator(hoverTarget, true);
		}
	}

	onMount(() => {
		updateIndicator();

		const observer = new MutationObserver(() => updateIndicator());
		observer.observe(container, {
			attributes: true,
			attributeFilter: ['class'],
			subtree: true
		});

		container.addEventListener('mouseover', onMouseOver);
		container.addEventListener('mouseleave', onMouseLeave);

		window.addEventListener('resize', onScrollOrResize);
		window.addEventListener('scroll', onScrollOrResize, true);

		return () => {
			observer.disconnect();
			container.removeEventListener('mouseover', onMouseOver);
			container.removeEventListener('mouseleave', onMouseLeave);
			window.removeEventListener('resize', onScrollOrResize);
			window.removeEventListener('scroll', onScrollOrResize, true);
		};
	});
</script>

<div
	class="nav-link-group"
	bind:this={container}
	style:--nlg-active-bg={activeBackground}
	style:--nlg-active-border={activeBorderColor}
	style:--nlg-hover-bg={hoverBackground}
>
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
		background-color: var(--nlg-active-bg);
		border-left: 3px solid var(--nlg-active-border);
	}

	.nav-link-group-indicator.hover {
		z-index: 0;
		background-color: var(--nlg-hover-bg);
		transition:
			top 0.1s ease,
			left 0.1s ease,
			width 0.1s ease,
			height 0.1s ease,
			opacity 0.1s ease;
	}

	:global(:root.dark) .nav-link-group-indicator.active {
		background-color: color-mix(in srgb, var(--nlg-active-bg), transparent 80%);
	}

	:global(.nav-link.group) {
		position: relative;
		z-index: 1;
	}
</style>
