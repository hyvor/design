<script lang="ts">
	import { getContext } from 'svelte';

	// export let children: string;

	const myContext = getContext('my-context');
</script>

{myContext}
