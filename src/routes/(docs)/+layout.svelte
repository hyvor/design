<script lang="ts">
	import Base from '$lib/components/Base/Base.svelte';
	import './docs.css';
	// import '$lib/components/CodeBlock/prism.scss';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<Base dark={true}>
	{@render children?.()}
</Base>
