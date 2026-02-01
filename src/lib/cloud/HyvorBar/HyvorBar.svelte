<script lang="ts">
	import BarUser from './BarUser.svelte';
	import BarProducts from './BarProducts/BarProducts.svelte';
	import BarSupport from './BarSupport.svelte';
	import { initBar, type BarConfig } from './bar.js';
	import BarUpdates from './BarUpdates.svelte';
	import IconCaretDownFill from '@hyvor/icons/IconCaretDownFill';
	import BarNotice from './BarNotice/BarNotice.svelte';
	import BarLicense from './BarNotice/BarLicense.svelte';
	import BarOrganization from './Organization/BarOrganization.svelte';
	import { cloudContextId, getCloudContext } from '../CloudContext/cloudContext.svelte.js';
	import { PRODUCTS } from './BarProducts/products.js';

	interface Props {
		config?: Partial<BarConfig>;

		/**
		 * where should clicking on the logo take the user?
		 * generally, it's `/console`
		 */
		url?: string;

		// set a custom logo URL
		// defaults to instance + '/api/public/logo/' + product + '.svg'
		// recommended to use this for self-hostable products
		logo?: string;
	}

	const { instance, deployment, component, organization } = $derived(getCloudContext());

	let {
		url = '/console',
		logo = `${instance}/api/public/logo/${component}.svg`,
		config = {}
	}: Props = $props();

	let mobileShow = $state(false);

	const configComplete: BarConfig = {
		...{
			name: null,
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

	cloudContextId.subscribe((id) => {
		if (id === 0) return; // CloudContext.svelte updates on each change (including first) to 1
		initBar();
	});

	function getName() {
		if (config.name) {
			return config.name;
		}
		return (PRODUCTS as any)[component]?.name || 'HYVOR';
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div id="bar" onclick={handleBarClick} class:mobile-show={mobileShow}>
	<div class="inner hds-box">
		<div class="left">
			<a class="logo" href={url}>
				<img src={logo} alt={component} width="20" height="20" />
				<span class="name">
					{getName()}
				</span>
			</a>
			<BarProducts mobile={mobileShow} />

			{#if organization}
				<BarOrganization />
			{/if}
			<BarLicense name={getName()} />
		</div>
		<div class="center"></div>
		<div class="right">
			<BarNotice />

			<div class="hidden-on-mobile">
				{#if deployment === 'cloud'}
					<BarSupport config={configComplete} mobile={mobileShow} />
					<BarUpdates />
				{/if}
			</div>

			{#if deployment === 'cloud'}
				<div class="mobile">
					<IconCaretDownFill />
				</div>
			{/if}

			<BarUser />
		</div>
	</div>

	{#if mobileShow}
		<div class="mobile-layer"></div>
	{/if}
</div>

<style>
	#bar {
		height: var(--hyvor-bar-height);
		padding: 0 15px;
		z-index: 100;
	}
	.inner {
		padding: 0px 29px;
		display: grid;
		align-items: center;
		grid-template-columns: 1fr auto 1fr;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		height: 100%;
	}
	.left {
		display: flex;
		align-items: center;
		height: 100%;
	}
	.center {
		height: 100%;
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
		justify-content: flex-end;
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
