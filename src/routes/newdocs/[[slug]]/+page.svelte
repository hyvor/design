<script lang="ts">
	import Base from '$lib/components/Base/Base.svelte';
	import FullDocs from '$lib/marketing/Docs/FullDocs.svelte';
	import Header from '$lib/marketing/Header/Header.svelte';
	import type { PageProps } from './$types.js';

	let { data }: PageProps = $props();
</script>

<Base>
	<Header />
	<FullDocs {...data} />
</Base>
