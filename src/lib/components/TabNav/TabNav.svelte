<script lang="ts">
  import { onMount, setContext } from "svelte";
  import { writable } from "svelte/store";

  export let active: string;

  const activeStore = writable(active);
  setContext("tab-nav-active", activeStore);

  $: active, activeStore.set(active);

  onMount(() => {
    const unsubscribe = activeStore.subscribe((value) => {
      active = value;
    });
    return unsubscribe;
  });
</script>

<div class="tab-nav" {...$$restProps}>
  <slot />
</div>

<style>
  div {
    display: flex;
  }
</style>
