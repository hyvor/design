<script lang="ts">
	import ConfirmModalProvider from './../Modal/ConfirmModalProvider.svelte';
	// import InternationalizationProvider from './../Internationalization/InternationalizationProvider.svelte';
	import DarkProvider from './../Dark/DarkProvider.svelte';
    import '../../index.js';
  import ToastProvider from "../Toast/ToastProvider.svelte";
</script>

<DarkProvider />
<ToastProvider />

<ConfirmModalProvider />

<div id="base">
    <slot />
</div>
