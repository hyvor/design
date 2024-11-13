<script lang="ts">
	import Link from '$lib/components/Link/Link.svelte';
	import { IconBoxArrowUpRight } from '@hyvor/icons';

	interface Props {
		children: string;
	}

	let { children }: Props = $props();
</script>

<Link href="/pricing" target="_blank">
	{children}
	{#snippet end()}
		<IconBoxArrowUpRight />
	{/snippet}
</Link>
