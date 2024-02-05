<script lang="ts">
    import Link from '$lib/components/Link/Link.svelte';

    export let children: string;
</script>

<Link href="/pricing">
    {children}
</Link>