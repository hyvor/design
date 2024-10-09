<script lang="ts">
  export let checked: boolean = false;
  export let input = {} as HTMLInputElement;
</script>

<label class="switch-wrap">
  <span class="switch">
    <input
      type="checkbox"
      bind:checked
      bind:this={input}
      {...$$restProps}
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
    />
    <span class="slider"></span>
  </span>
  {#if $$slots.default}
    <span class="message">
      <slot />
    </span>
  {/if}
</label>

<style>
  .switch-wrap {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  .message {
    margin-left: 8px;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 24px;
    vertical-align: middle;
  }

  input {
    opacity: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--input);
    transition: 0.2s;
    border-radius: 30px;
  }

  .slider:hover {
    box-shadow: 0 0 0 2px var(--accent-light);
  }

  .slider:before {
    position: absolute;
    content: "";
    border-radius: 50%;
    background-color: var(--accent-text);
    transition: 0.1s;
    width: 18px;
    height: 18px;
    left: 3px;
    top: 3px;
    bottom: 3px;
  }

  input:checked + .slider {
    background-color: var(--accent);
  }

  input:focus-visible + .slider {
    box-shadow: 0 0 0 3px var(--accent-light);
  }

  .switch:active .slider,
  input:active + .slider {
    box-shadow: 0 0 0 3px var(--accent-light);
  }

  input:checked + .slider:before {
    transform: translateX(16px);
  }
</style>
