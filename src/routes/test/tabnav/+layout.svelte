<script lang="ts">
	import Base from '$lib/components/Base/Base.svelte';
	import TabNav from '$lib/components/TabNav/TabNav.svelte';
	import TabNavItem from '$lib/components/TabNav/TabNavItem.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<Base>
	<TabNav basePath="/test/tabnav">
		<TabNavItem name="index" index>Index</TabNavItem>
		<TabNavItem name="other">Other</TabNavItem>
	</TabNav>

	{@render children?.()}
</Base>
