<script lang="ts">
	import Base from '$lib/components/Base/Base.svelte';
	import TabNav from '$lib/components/TabNav/TabNav.svelte';
	import TabNavItem from '$lib/components/TabNav/TabNavItem.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<Base>
	<TabNav basePath="/test/tabnav" pathname={page.url.pathname} {goto}>
		<TabNavItem name="index" index>Index</TabNavItem>
		<TabNavItem name="other">Other</TabNavItem>
	</TabNav>

	{@render children?.()}
</Base>
