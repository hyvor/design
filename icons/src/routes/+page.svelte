<script>
	import Icon from "../lib/Icon.svelte";
	import { onMount } from "svelte";

	let loading = $state(true);

	onMount(() => {
		setTimeout(() => {
			loading = false;
		}, 1000);
	});
</script>

{#if loading}
	<p>Loading...</p>
{:else}
	<Icon name="amazon" size={100} />
{/if}

