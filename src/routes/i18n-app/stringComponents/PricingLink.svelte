<script lang="ts">
	import Link from '$lib/components/Link/Link.svelte';
	import { IconBoxArrowUpRight } from '@hyvor/icons';

	export let children: string;
</script>

<Link href="/pricing" target="_blank">
	{children}
	<IconBoxArrowUpRight slot="end" />
</Link>
