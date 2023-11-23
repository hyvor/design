<script lang="ts">
	// import InternationalizationProvider from './../Internationalization/InternationalizationProvider.svelte';
	import DarkProvider from './../Dark/DarkProvider.svelte';
    import '../../index.js';
</script>

<DarkProvider />

<div id="base">
    <slot />
</div>
