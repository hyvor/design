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
		var hdsStored = localStorage.getItem('hds-dark');
		var hsdIsDarkMode = hdsStored
			? !!hdsStored
			: window.matchMedia('(prefers-color-scheme: dark)').matches;
		if (hsdIsDarkMode) {
			document.documentElement.classList.add('dark');
		}
	</script>
</svelte:head>
