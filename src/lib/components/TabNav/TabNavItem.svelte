<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  export let active = false;
  export let name: string;

  const activeStore = getContext("tab-nav-active") as Writable<string>;

  $: isActive = $activeStore === name || active;

  function handleClick() {
    activeStore.set(name);
  }
</script>

<button
  class="tab"
  class:active={isActive}
  on:click={handleClick}
  {...$$restProps}
  on:click
>
  {#if $$slots.start}
    <span class="start">
      <slot name="start" />
    </span>
  {/if}
  <slot />
  {#if $$slots.end}
    <span class="end">
      <slot name="end" />
    </span>
  {/if}
</button>

<style>
  .tab {
    position: relative;
    padding: 10px 15px;
    border-bottom: 3px solid #f1f1f1;
    cursor: pointer;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
  .tab.active {
    border-bottom-color: var(--accent);
    color: var(--accent);
  }
  .start {
    display: inline-flex;
    margin-right: 7px;
    align-items: center;
  }
  .end {
    display: inline-flex;
    margin-left: 4px;
    align-items: center;
  }
</style>
