<script lang="ts">
	import type { BarUpdate } from '$lib/components/HyvorBar/bar.js';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { isCloud } from '../cloud.js';
	import IconMegaphone from '@hyvor/icons/IconMegaphone';

	let notificationUpdate: BarUpdate | null = $state(null);

	interface Props {
		instance: string;
		product: string;
	}

	let { instance, product }: Props = $props();

	function set(u: BarUpdate) {
		notificationUpdate = u;
		document.documentElement.style.setProperty('--header-height', '85px');
	}

	onMount(() => {
		if (!isCloud(false)) return;

		fetch(instance + '/api/public/updates/notification?type=' + product)
			.then((response) => response.json())
			.then((data) => {
				if (data.update) {
					set(data.update);
				}
			});
	});
</script>

{#if notificationUpdate}
	<a
		class="header-notification"
		href={notificationUpdate.url}
		target="_blank"
		transition:slide={{ duration: 300 }}
	>
		<IconMegaphone size={12} />&nbsp;&nbsp;
		{notificationUpdate.title}&nbsp;&nbsp;&rarr;
	</a>
{/if}

<style>
	.header-notification {
		display: block;
		background-color: var(--accent);
		color: var(--accent-text);
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		cursor: pointer;
		font-weight: 600;
		transition: opacity 0.2s;
	}
	.header-notification:hover {
		opacity: 0.8;
	}
</style>
