<script lang="ts">
    import { setContext } from 'svelte'
    import { writable } from 'svelte/store';

    export let active: string;

    const activeStore = writable(active);
    setContext('tab-nav-active', activeStore);

    $: active = $activeStore;
</script>

<div 
    class="tab-nav"
    {...$$restProps}
>
    <slot />
</div>


<style>
    div {
        display: flex;
    }
</style>