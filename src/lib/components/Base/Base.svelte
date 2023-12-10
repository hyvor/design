<script lang="ts">
	// import InternationalizationProvider from './../Internationalization/InternationalizationProvider.svelte';
	import DarkProvider from './../Dark/DarkProvider.svelte';
    import '../../index.js';
  import ToastProvider from "../Toast/ToastProvider.svelte";
</script>

<DarkProvider />
<ToastProvider />

<div id="base">
    <slot />
</div>
