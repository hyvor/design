<script lang="ts">
	import Base from '$lib/components/Base/Base.svelte';
	import './docs.css';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<Base>
	{@render children?.()}
</Base>
