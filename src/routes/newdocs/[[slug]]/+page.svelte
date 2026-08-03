<script lang="ts">
	import Base from '$lib/components/Base/Base.svelte';
	import Docs from '$lib/marketing/Docs/Docs.svelte';
	import Header from '$lib/marketing/Header/Header.svelte';
	import type { PageProps } from './$types.js';

	let { data }: PageProps = $props();
</script>

<Base>
	<Header />
	<Docs {...data} />
</Base>
