<script>
	import Icon from "../lib/Icon.svelte";
	import { onMount } from "svelte";

	let loading = $state(true);

	onMount(() => {
		console.log("onMount");
		setTimeout(() => {
			console.log("loading false");
			loading = false;
		}, 500);
	});
</script>

{#if loading}
	<p>Loading...</p>
{:else}
	<Icon name="amazon" size={100} />
{/if}

