<script lang="ts">
	import { fade } from 'svelte/transition';
	import { setCloudContext, type CloudContext } from './cloudContext.svelte.js';

	interface Props {
		context: CloudContext;
		children: import('svelte').Snippet;
		style?: string;
	}

	let { context, children, style }: Props = $props();

	setCloudContext(context);
</script>

<div transition:fade={{ duration: 200 }} {style}>
	{@render children()}
</div>
