<script lang="ts">
  import Caption from "../FormControl/Caption.svelte";
  import Label from "../FormControl/Label.svelte";

  export let label: string = "";
  export let caption: string = "";

  export let column: boolean = false;
  export let flex: number[] = [1, 2];
</script>

<div class="split-control" class:has-nested={$$slots.nested} class:column>
  <div class="left" style:flex={flex[0]}>
    <div class="label-wrap">
      {#if $$slots.label}
        <slot name="label" />
      {:else}
        <Label>{label}</Label>
      {/if}
    </div>

    {#if $$slots.caption || caption}
      <div class="caption-wrap">
        {#if $$slots.caption}
          <slot name="caption" />
        {:else if caption}
          <Caption>{caption}</Caption>
        {/if}
      </div>
    {/if}
  </div>

  {#if $$slots.default}
    <div class="right" style:flex={flex[1]}>
      <slot></slot>
    </div>
  {/if}
</div>

{#if $$slots.nested}
  <div class="nested">
    <slot name="nested"></slot>
  </div>
{/if}

<style lang="scss">
  .split-control {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid var(--accent-lightest);
    line-height: 1.3;
    &:last-child,
    &.has-nested {
      border-bottom: none;
    }
    &.column {
      flex-direction: column;
      .right {
        padding-top: 0;
      }
    }
  }

  .nested {
    margin-left: 40px;
    padding-top: 0;
    padding-left: 15px;
    border-left: 2px solid var(--accent-light);
    margin-bottom: 15px;
  }

  .left {
    padding: 15px;
  }

  .right {
    padding: 15px;
    min-width: 0;
  }

  .caption-wrap {
    margin-top: 4px;
  }
</style>
