<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		const coreUrl = `${location.protocol}//${location.hostname.split('.').slice(-2).join('.')}`;
		const script = document.createElement('script');
		script.src = coreUrl + '/js/visit.js';
		script.async = true;
		document.body.appendChild(script);
	});

	afterNavigate(() => {
		const event = new CustomEvent('svelte:navigated');
		window.dispatchEvent(event);
	});
</script>
