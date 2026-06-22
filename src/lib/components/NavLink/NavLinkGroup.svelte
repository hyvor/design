<script lang="ts">
	import { setContext, type Snippet } from "svelte";

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

    setContext('navlink-group', true);
</script>

{@render children?.()}