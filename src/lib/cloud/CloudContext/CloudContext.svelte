<script lang="ts">
	import { fade } from 'svelte/transition';
	import {
		incrementCloudContextId,
		setCloudContext,
		type CloudContext
	} from './cloudContext.svelte.js';

	interface Props {
		context: CloudContext;
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
</script>

<div transition:fade={{ duration: 200 }} {style}>
	{@render children()}
</div>
