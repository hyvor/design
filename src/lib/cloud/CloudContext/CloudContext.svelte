<script lang="ts">
	import { setCloudContext, type CloudContext } from './cloudContext.svelte.js';

	interface Props {
		context: CloudContext;
		children: import('svelte').Snippet;
	}

	let { context, children }: Props = $props();

	setCloudContext(context);
</script>

{@render children()}
