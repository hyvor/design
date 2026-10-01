<script lang="ts">
	import Base from '$lib/components/Base/Base.svelte';
	import Docs from '$lib/marketing/Docs/Docs.svelte';
	import type { PageProps } from './$types.js';

	let { data }: PageProps = $props();
</script>

<Base>
	<Docs {...data} />
</Base>
