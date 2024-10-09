<script lang="ts">
  export let as: "button" | "a" = "button";
  export let size: "x-small" | "small" | "medium" | "large" = "medium";
  export let color:
    | "accent"
    | "gray"
    | "green"
    | "red"
    | "blue"
    | "orange"
    | "input" = "accent";
  export let block: boolean = false;
  export let variant:
    | "fill"
    | "fill-light"
    | "outline"
    | "invisible"
    | "outline-fill" = "fill";
  export let align: "start" | "center" = "center";

  export let button = {} as HTMLButtonElement | HTMLAnchorElement;
</script>

<svelte:element
  this={as}
  class="button {size} {color} {variant} {align}"
  class:block
  on:keyup
  on:keydown
  on:keypress
  on:focus
  on:blur
  on:click
  on:mouseover
  on:mouseenter
  on:mouseleave
  on:change
  role="button"
  tabindex="0"
  bind:this={button}
  {...$$restProps}
>
  <span class="button-content">
    {#if $$slots.start}
      <span class="slot start"><slot name="start" /></span>
    {/if}

    <slot></slot>

    {#if $$slots.end}
      <span class="slot end"><slot name="end" /></span>
    {/if}
  </span>

  {#if $$slots.action}
    <span class="action">
      <slot name="action" />
    </span>
  {/if}
</svelte:element>

<style lang="scss">
  .slot.start {
    margin-right: 6px;
    display: inline-flex;
    align-items: center;
    &:empty {
      margin-right: 0;
    }
  }

  .slot.end {
    margin-left: 6px;
    display: inline-flex;
    align-items: center;
    &:empty {
      margin-left: 0;
    }
  }

  .button {
    position: relative;
    display: inline-flex;
    align-items: center;
    font-weight: 600;
    font-size: 14px;
    border-radius: 20px;
    cursor: pointer;

    --local-hover-shadow-size: 2.5px;
    --local-hover-shadow-color: var(--accent-light);
    &:active {
      --local-hover-shadow-size: 4px;
    }

    &.block {
      display: flex;
      width: 100%;
    }

    &:hover {
      box-shadow: 0 0 0 var(--local-hover-shadow-size)
        var(--local-hover-shadow-color);
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 0 calc(var(--local-hover-shadow-size) + 1px)
        var(--local-hover-shadow-color);
    }
  }

  .button-content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
  .button.start .button-content {
    justify-content: flex-start;
  }

  .action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 6px;
  }

  /* Sizes */
  .button.x-small {
    height: 20px;
    padding: 0 8px;
    font-size: 12px;
    --local-hover-shadow-size: 1px;
    &:active {
      --local-hover-shadow-size: 2px;
    }
  }

  .button.small {
    height: 26px;
    padding: 0 12px;

    --local-hover-shadow-size: 2px;
    &:active {
      --local-hover-shadow-size: 3px;
    }

    .slot.start {
      margin-right: 4px;
    }
    .slot.end {
      margin-left: 4px;
    }
  }
  .button.medium {
    height: 30px;
    padding: 0 14px;
  }
  .button.large {
    height: 36px;
    padding: 0 20px;
    --local-hover-shadow-size: 3px;
    &:active {
      --local-hover-shadow-size: 5px;
    }
  }

  .button {
    &.fill {
      &.accent {
        background-color: var(--accent);
        color: var(--accent-text);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: var(--accent-light);
      }

      &.gray {
        background-color: var(--gray-dark);
        color: var(--text-white);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: var(--gray-light);
      }

      &.green {
        background-color: var(--green-dark);
        color: var(--text-white);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: var(--green-light);
      }

      &.red {
        background-color: var(--red-dark);
        color: var(--text-white);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: var(--red-light);
      }

      &.blue {
        background-color: var(--blue-dark);
        color: var(--text-white);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: var(--blue-light);
      }

      &.orange {
        background-color: var(--orange-dark);
        color: var(--text-white);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: var(--orange-light);
      }

      &.input {
        background-color: var(--input);
        color: var(--text);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: var(--input-hover);
      }
    }

    &.fill-light {
      &.accent {
        background-color: var(--accent-light);
        color: var(--accent);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: var(--accent-lightest);
      }

      &.gray {
        background-color: var(--gray-light);
        color: var(--gray-dark);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: color-mix(
          in srgb,
          var(--gray-light) 40%,
          transparent
        );
      }

      &.green {
        background-color: var(--green-light);
        color: var(--green-dark);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: color-mix(
          in srgb,
          var(--green-light) 40%,
          transparent
        );
      }

      &.red {
        background-color: var(--red-light);
        color: var(--red-dark);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: color-mix(
          in srgb,
          var(--red-light) 40%,
          transparent
        );
      }

      &.blue {
        background-color: var(--blue-light);
        color: var(--blue-dark);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: color-mix(
          in srgb,
          var(--blue-light) 40%,
          transparent
        );
      }

      &.orange {
        background-color: var(--orange-light);
        color: var(--orange-dark);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: color-mix(
          in srgb,
          var(--orange-light) 40%,
          transparent
        );
      }
    }

    &.outline {
      border: 1px solid;
      &.accent {
        background-color: transparent;
        border-color: var(--accent);
        color: var(--accent);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: var(--accent-light);
      }

      &.gray {
        background-color: transparent;
        border-color: var(--gray-dark);
        color: var(--gray-dark);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: var(--gray-light);
      }

      &.green {
        background-color: transparent;
        border-color: var(--green-dark);
        color: var(--green-dark);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: var(--green-light);
      }

      &.red {
        background-color: transparent;
        border-color: var(--red-dark);
        color: var(--red-dark);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: var(--red-light);
      }

      &.blue {
        background-color: transparent;
        border-color: var(--blue-dark);
        color: var(--blue-dark);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: var(--blue-light);
      }

      &.orange {
        background-color: transparent;
        border-color: var(--orange-dark);
        color: var(--orange-dark);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: var(--orange-light);
      }
    }

    &.outline-fill {
      border: 1px solid;

      &.accent {
        background-color: var(--accent-light);
        border-color: var(--accent);
        color: var(--accent);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: color-mix(
          in srgb,
          var(--accent-light) 40%,
          transparent
        );
      }

      &.gray {
        background-color: var(--gray-light);
        border-color: var(--gray-dark);
        color: var(--gray-dark);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: var(--gray-light);
      }

      &.green {
        background-color: var(--green-light);
        border-color: var(--green-dark);
        color: var(--green-dark);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: var(--green-light);
      }

      &.red {
        background-color: var(--red-light);
        border-color: var(--red-dark);
        color: var(--red-dark);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: var(--red-light);
      }

      &.blue {
        background-color: var(--blue-light);
        border-color: var(--blue-dark);
        color: var(--blue-dark);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: var(--blue-light);
      }

      &.orange {
        background-color: var(--orange-light);
        border-color: var(--orange-dark);
        color: var(--orange-dark);
        transition: 0.2s box-shadow;
        --local-hover-shadow-color: var(--orange-light);
      }
    }

    &.invisible {
      background-color: transparent;
      transition: 0.2s background-color;

      &.accent {
        &:hover {
          background-color: var(--accent-light);
          box-shadow: none !important;
        }
      }

      &.gray {
        &:hover {
          background-color: var(--gray-light);
          box-shadow: none !important;
          color: var(--gray-dark);
        }
      }

      &.green {
        &:hover {
          background-color: var(--green-light);
          box-shadow: none !important;
          color: var(--green-dark);
        }
      }

      &.red {
        &:hover {
          background-color: var(--red-light);
          box-shadow: none !important;
          color: var(--red-dark);
        }
      }

      &.blue {
        &:hover {
          background-color: var(--blue-light);
          box-shadow: none !important;
          color: var(--blue-dark);
        }
      }

      &.orange {
        &:hover {
          background-color: var(--orange-light);
          box-shadow: none !important;
          color: var(--orange-dark);
        }
      }

      &.input {
        &:hover {
          background-color: var(--input);
          box-shadow: none !important;
          color: var(--text);
        }
      }
    }
  }

  :global(:root.dark) .button.light {
    background-color: #2e2e2e;
  }

  .button.invisible {
    background-color: transparent;
    color: var(--text);
    transition: 0.2s background-color;
    &:hover {
      background-color: var(--accent-light);
      box-shadow: none !important;
    }

    /*styles for disabled state*/
    &[disabled] {
      background-color: transparent;
      color: var(--text);
      box-shadow: none !important;
      cursor: not-allowed;
      opacity: 0.2;

      &:hover {
        background-color: transparent;
        box-shadow: none !important;
        color: var(--text);
      }
    }
  }

  /*Styles for button disabled state*/
  .button[disabled] {
    cursor: not-allowed;
    opacity: 0.2;
    box-shadow: none !important;

    &:hover {
      box-shadow: none !important;
    }
  }
</style>
