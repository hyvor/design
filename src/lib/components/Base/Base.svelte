<script lang="ts">
	import DarkProvider from './../Dark/DarkProvider.svelte';
    import '../../index.js';
</script>

<DarkProvider />

<div id="base">
    <slot />
</div>
