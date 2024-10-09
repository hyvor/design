<script lang="ts">
  import { setContext } from "svelte";

  export let title: string | undefined = undefined;
  export let divider: boolean = false;
  export let selection: undefined | "single" | "multi" = undefined;

  $: if (selection !== undefined)
    setContext("action-list-selection", selection);
</script>

<div class="action-list-group" class:has-divider={divider}>
  {#if divider}
    <div class="divider"></div>
  {/if}

  {#if title}
    <div class="title">{title}</div>
  {/if}

  <slot />
</div>

<style>
  .divider {
    border-bottom: 2px solid var(--border);
    margin-bottom: 14px;
  }
  .title {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--text-light);
    padding: 0 14px;
    margin-bottom: 6px;
  }
  .action-list-group:not(:first-child) {
    margin-top: 12px;
  }
</style>
