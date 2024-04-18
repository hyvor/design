<script lang="ts">
  import type { ComponentType } from "svelte";

  export let name: string;
</script>

<div class="nav-category">
  <div class="name">
    <span class="button-content">
      {#if $$slots.start}
        <span class="slot start"><slot name="start" /></span>
      {/if}

      {#if $$slots.end}
        <span class="slot end"><slot name="end" /></span>
      {/if}
    </span>
    {name}
  </div>
  <div class="nav-items">
    <slot />
  </div>
</div>

<style>
  .nav-category {
    margin-bottom: 20px;
  }

  .name {
    font-weight: 600;
    padding: 10px 25px;
    display: flex;
    align-items: center;
  }

  .slot.start {
    margin-right: 5px;
    margin-left: 0;
    display: flex;
  }
</style>
