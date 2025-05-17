<script lang="ts">
	import { onMount } from 'svelte';
	import { setInitialState } from '../../stores/dark.js';

	onMount(() => {
		setInitialState();
	});
</script>

<svelte:head>
	<script>
		// to prevent white screen on page load
		// until the dark mode is initialized from the store
		const isDarkMode = !!localStorage.getItem("hds-dark");
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		}
	</script>
</svelte:head>
