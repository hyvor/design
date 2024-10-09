<script lang="ts">
	import BarUser from './BarUser.svelte';
	import { onMount } from 'svelte';
	import BarProducts, { PRODUCTS } from './BarProducts.svelte';
	import BarSupport from './BarSupport.svelte';
	import { loadBarUser, type BarConfig, type BarProduct } from './bar.js';
	import BarUpdates from './BarUpdates.svelte';
	import { IconCaretDownFill } from '@hyvor/icons';

	export let instance = 'https://hyvor.com';
	export let product: BarProduct;

	export let config: Partial<BarConfig> = {};

	let mobileShow = false;

	const configComplete: BarConfig = {
		...{
			docs: true,
			chat: true,
			twitter: null,
			g2: null
		},
		...config
	};

	function handleBarClick(e: MouseEvent) {
		if (mobileShow && e.target instanceof Element && e.target.closest('.dropdown .trigger')) {
			return;
		}
		if (window.innerWidth <= 600) {
			mobileShow = !mobileShow;
		}
	}

	onMount(() => {
		loadBarUser(instance, product);
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div id="bar" on:click={handleBarClick} class:mobile-show={mobileShow}>
	<div class="inner hds-box">
		<div class="left">
			<a class="logo" href="/">
				<svelte:component this={PRODUCTS[product].logo} size={20} />
				<span class="name">
					{PRODUCTS[product].name}
				</span>
			</a>
		</div>
		<div class="right">
			<div class="hidden-on-mobile">
				<BarSupport config={configComplete} {product} mobile={mobileShow} />
				<BarProducts mobile={mobileShow} />
				<BarUpdates {instance} {product} />
			</div>

			<div class="mobile">
				<IconCaretDownFill />
			</div>

			<BarUser {instance} />
		</div>
	</div>

	{#if mobileShow}
		<div class="mobile-layer"></div>
	{/if}
</div>

<style>
	#bar {
		height: 50px;
		padding: 0 15px;
		z-index: 100;
	}
	.inner {
		padding: 10px 29px;
		display: flex;
		align-items: center;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		height: 100%;
	}
	.left {
		display: flex;
		align-items: center;
		flex: 1;
	}
	.logo {
		display: flex;
		align-items: center;
		text-decoration: none;
		gap: 5px;
		font-weight: 600;
	}
	.right {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.hidden-on-mobile {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.mobile {
		display: none;
	}

	@media (max-width: 600px) {
		.mobile {
			display: block;
		}
		#bar {
			cursor: pointer;
		}
		.hidden-on-mobile {
			display: none;
			animation: 0.2s slideIn;
		}
		#bar.mobile-show .hidden-on-mobile {
			display: flex;
			position: fixed;
			top: 60px;
			z-index: 100;
			left: 15px;
			right: 15px;
			flex-direction: column;
		}
		.mobile-layer {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.5);
			z-index: 99;
			backdrop-filter: blur(3px);
		}
		#bar.mobile-show :global(button.button) {
			background-color: #fff;
		}
	}

	@keyframes slideIn {
		from {
			transform: translateY(-20px);
		}
		to {
			transform: translateY(0);
		}
	}
</style>
