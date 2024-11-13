<script lang="ts">
	import { afterNavigate, onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { IconList } from '@hyvor/icons';
	import { onMount } from 'svelte';
	import { clickOutside } from '../../../components/index.js';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let navEl: HTMLElement | undefined = $state();

	interface Active {
		name: string;
		category: string | null;
	}

	let active: Active | null = $state(null);

	function setActive() {
		const activeEl = navEl?.querySelector('a.active');

		if (!activeEl || !(activeEl instanceof HTMLElement)) {
			active = null;
			return;
		}

		const category =
			(activeEl.closest('.nav-category')?.querySelector('.name') as HTMLElement)?.innerText || null;

		active = {
			name: activeEl.innerText,
			category
		};
	}

	onMount(() => {
		setActive();
	});

	afterNavigate(() => {
		setActive();
		hideNavOnMobile();
	});

	let mobileNavShown = false;

	function handleMobileClick(e: any) {
		e.stopPropagation();
		if (!navEl) return;
		if (navEl.style.display !== 'block') {
			navEl.style.display = 'block';
			mobileNavShown = true;
		} else {
			navEl.style.display = 'none';
			mobileNavShown = false;
		}
	}

	function handleNavOutsideClick() {
		if (!navEl) return;
		if (mobileNavShown) {
			navEl.style.display = 'none';
			mobileNavShown = false;
		}
	}

	function hideNavOnMobile() {
		if (!navEl) return;
		if (window.innerWidth < 992) {
			navEl.style.display = 'none';
		}
	}
</script>

<div class="docs-nav">
	{#if active}
		<button class="mobile hds-box" onclick={handleMobileClick}>
			<div class="left">
				{#if active.category}
					<span class="category">{active.category}</span> &raquo;
				{/if}
				<span class="name">{active.name}</span>
			</div>
			<IconList size={18} />
		</button>
	{/if}

	<nav
		class="hds-box nav-inner"
		bind:this={navEl}
		use:clickOutside={{
			callback: handleNavOutsideClick
		}}
	>
		{@render children?.()}
	</nav>
</div>

<style lang="scss">
	.docs-nav {
		width: 220px;
		top: var(--header-height, 0);
		padding: 25px 0;
		position: sticky;
		flex-shrink: 0;
		align-self: flex-start;
		max-height: calc(100vh - var(--header-height));
	}

	nav {
		padding: 15px 0;
		overflow-y: auto;
		max-height: calc(100vh - var(--header-height) - 50px);
	}

	.mobile {
		display: none;
		padding: 10px 20px;
		cursor: pointer;
		&:hover {
			background-color: var(--hover);
		}
		.left {
			flex: 1;
		}
	}

	@media (max-width: 992px) {
		.mobile {
			display: flex;
			width: 100%;
			text-align: left;
		}

		.nav-inner {
			display: none;
		}

		.docs-nav {
			width: 100%;
			position: relative;
			top: 0;
			padding: 0 15px;
			margin: 20px 0;
			max-height: initial;
			order: 1;
		}

		nav {
			padding: 0;
			max-height: initial;
			position: absolute;
			width: calc(100% - 30px);
			margin-top: 10px;
			max-height: 500px;
			z-index: 100;
		}
	}
</style>
