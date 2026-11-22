<script lang="ts">
	import type { Snippet } from 'svelte';
	import Modal from '$lib/components/Modal/Modal.svelte';
	import { getCloudContext } from '../CloudContext/cloudContextState.svelte.js';

	interface Props {
		show: boolean;
		/**
		 * The license property to focus on (the key in the license, ex: "languages").
		 * The billing component highlights the matching plans and add-ons.
		 */
		focus: string;
		/** Modal title */
		title?: string | Snippet;
		/**
		 * The component whose billing is shown. Defaults to the current component
		 * of the CloudContext (ex: "blogs")
		 */
		component?: string;
		/** Modal size */
		size?: 'small' | 'medium' | 'large';
		/** Extra query params sent to the billing component script */
		params?: Record<string, string>;
		/** Path of the billing component script in the HYVOR instance */
		scriptPath?: string;
		/** Called when the modal is closed */
		onclose?: () => void;
	}

	let {
		show = $bindable(),
		focus,
		title = 'Upgrade',
		component,
		size = 'large',
		params = {},
		scriptPath = '/js/billing-component-iframe.js',
		onclose
	}: Props = $props();

	const context = getCloudContext();

	let wrap: HTMLDivElement | undefined = $state();

	// loads the billing component of HYVOR Core (same as the billing page of a product),
	// focused on the given license property
	$effect(() => {
		if (!wrap || !show) {
			return;
		}

		const query = new URLSearchParams({
			...params,
			component: component ?? context.component,
			focus
		});

		const script = document.createElement('script');
		script.src = context.instance + scriptPath + '?' + query;
		wrap.appendChild(script);

		const container = wrap;
		return () => {
			script.parentNode?.removeChild(script);
			container.querySelector('iframe')?.remove();
		};
	});
</script>

<Modal bind:show {title} {size} {onclose}>
	<div class="content" bind:this={wrap}></div>
</Modal>

<style>
	.content {
		margin: -10px -20px;
	}
</style>
