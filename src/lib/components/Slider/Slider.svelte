<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let min: number;
  export let max: number;
  export let value: number;
  export let step = 1;
  // export let disabled = false;
  export let dots = false;

  const dispatch = createEventDispatcher<{
    change: number;
  }>();

  function toStep(value: number) {
    return Math.max(min, Math.min(max, Math.round(value / step) * step));
  }

  $: progress = ((value - min) / (max - min)) * 100;

  let dragging = false;
  let trackEl: HTMLDivElement;

  function handleMousedown(event: MouseEvent) {
    dragging = true;
    handleMousemove(event);

    window.addEventListener("mousemove", handleMousemove);
    window.addEventListener("mouseup", handleMouseup);
  }

  function handleMouseup() {
    dragging = false;
    window.removeEventListener("mousemove", handleMousemove);
  }

  function handleMousemove(event: MouseEvent) {
    if (dragging) {
      const rect = trackEl.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const width = rect.width;
      const newValue = min + (x / width) * (max - min);
      value = toStep(newValue);
      dispatch("change", value);
    }
  }
</script>

<div class="slider">
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="track"
    bind:this={trackEl}
    class:dragging
    on:mousedown={handleMousedown}
  >
    <div class="progress" style="width: {progress}%"></div>
    <button class="handle" style="left: {progress}%">
      <span class="tip">
        {value}
      </span>
    </button>

    {#if dots}
      {#each Array.from({ length: (max - min) / step + 1 }, (_, i) => i) as i}
        <div
          class="dot"
          style="left: {(i * 100) / ((max - min) / step)}%"
        ></div>
      {/each}
    {/if}
  </div>
</div>

<style>
  .track {
    background-color: var(--input);
    height: 10px;
    border-radius: 20px;
    position: relative;
  }
  .handle {
    background-color: var(--accent);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: grab;
    z-index: 1;
    transition: 0.2s box-shadow;
  }
  .handle:hover {
    box-shadow: 0 0 0 2px var(--accent-light);
  }
  .tip {
    position: absolute;
    bottom: 100%;
    margin-bottom: 3px;
    left: 50%;
    transform: translateX(-50%);
    padding: 3px 6px;
    border-radius: 5px;

    /* from Tooltip */
    --local-bg: #24292f;
    --local-color: #fff;

    background-color: var(--local-bg);
    color: var(--local-color);
    display: none;
  }

  .dot {
    background-color: var(--accent-light);
    z-index: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .handle:hover .tip,
  .track.dragging .tip {
    display: block;
  }

  .track.dragging,
  .track.dragging .handle {
    cursor: grabbing;
  }

  .track.dragging .handle {
    box-shadow: 0 0 0 3px var(--accent-light);
  }
</style>
