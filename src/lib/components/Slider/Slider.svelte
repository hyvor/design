<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	interface Props {
		min: number;
		max: number;
		value: number;
		step?: number;
		// export let disabled = false;
		dots?: boolean;
		onchange?: (value: number) => void;
		valueFormat?: (value: number) => string;
	}

	let {
		min,
		max,
		value = $bindable(),
		step = 1,
		dots = false,
		onchange,
		valueFormat = (val) => val.toString()
	}: Props = $props();

	const dispatch = createEventDispatcher<{
		change: number;
	}>();

	function toStep(value: number) {
		return Math.max(min, Math.min(max, Math.round(value / step) * step));
	}

	let progress = $derived(((value - min) / (max - min)) * 100);

	let dragging = $state(false);
	let trackEl: HTMLDivElement | undefined = $state();

	function handleMousedown(event: MouseEvent) {
		dragging = true;
		handleMousemove(event);

		window.addEventListener('mousemove', handleMousemove);
		window.addEventListener('mouseup', handleMouseup);
	}

	function handleMouseup() {
		dragging = false;
		window.removeEventListener('mousemove', handleMousemove);
		window.removeEventListener('mouseup', handleMouseup);
	}

	function handleMousemove(event: MouseEvent) {
		if (!trackEl) return;
		if (dragging) {
			calcPosUpdateValue(trackEl, event.clientX);
		}
	}

	// touch events
	function handleTouchstart(event: TouchEvent) {
		dragging = true;
		handleTouchmove(event);

		window.addEventListener('touchmove', handleTouchmove);
		window.addEventListener('touchend', handleTouchend);
	}

	function handleTouchend() {
		dragging = false;
		window.removeEventListener('touchmove', handleTouchmove);
		window.removeEventListener('touchend', handleTouchend);
	}

	function handleTouchmove(event: TouchEvent) {
		if (!trackEl) return;
		if (dragging) {
			calcPosUpdateValue(trackEl, event.touches[0].clientX);
		}
	}

	function calcPosUpdateValue(trackEl: HTMLDivElement, clientX: number) {
		const rect = trackEl.getBoundingClientRect();
		const x = clientX - rect.left;
		const width = rect.width;
		const newValue = min + (x / width) * (max - min);
		value = toStep(newValue);
		dispatch('change', value);
		onchange?.(value);
	}
</script>

<div class="slider">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="track"
		bind:this={trackEl}
		class:dragging
		onmousedown={handleMousedown}
		ontouchstart={handleTouchstart}
	>
		<div class="progress" style="width: {progress}%"></div>
		<button class="handle" style="left: {progress}%">
			<span class="tip">
				{valueFormat(value)}
			</span>
		</button>

		{#if dots}
			{#each Array.from({ length: (max - min) / step + 1 }, (_, i) => i) as i}
				<div class="dot" style="left: {(i * 100) / ((max - min) / step)}%"></div>
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
