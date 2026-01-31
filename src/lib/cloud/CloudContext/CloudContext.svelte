<script lang="ts">
	import { fade } from 'svelte/transition';
	import {
		incrementCloudContextId,
		setCloudContext,
		type CloudContext as CloudContextType
	} from './cloudContext.svelte.js';
	import { onMount } from 'svelte';
	import { track } from '$lib/marketing/index.js';

	interface Props {
		context: CloudContextType;
		children: import('svelte').Snippet;
		style?: string;
	}

	let { context, children, style }: Props = $props();

	setCloudContext(() => context);

	$effect(() => {
		if (context) {
			incrementCloudContextId();
		}
	});

	onMount(() => {
		track.identify(context.user.id.toString(), {
			name: context.user.name ?? undefined,
			avatar: context.user.picture_url ?? undefined
		});
	});
</script>

<div transition:fade={{ duration: 200 }} {style}>
	{@render children()}
</div>

<style>
	div {
		--hyvor-bar-height: 50px;
	}
</style>
