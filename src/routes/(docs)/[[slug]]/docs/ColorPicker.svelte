<script>
	import Callout from '$lib/components/Callout/Callout.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import ColorPicker from '$lib/components/ColorPicker/ColorPicker.svelte';

	let color1 = $state('#000000');
	let inputTimes1 = $state(0);
	let changedTimes1 = $state(0);
</script>

<h1>Color Picker</h1>

<h2>Usage</h2>

<CodeBlock
	code={`
    <` +
		`script lang="ts">
        import { ColorPicker } from "@hyvor/design/components";

        let color = '#000000';
        let inputTimes = 0;
        let changedTimes = 0;
    <` +
		`/script>

    <ColorPicker
        bind:color={color}
        on:input={() => inputTimes++}
        on:change={() => changedTimes++}
    />

    <p>Color: {color}, Changed {times} times</p>
`}
/>

<ColorPicker bind:color={color1} on:input={() => inputTimes1++} on:change={() => changedTimes1++} />

<div style="margin-top: 4px;font-size:14px;color:var(--text-light)">
	Color: {color1}, inputs: {inputTimes1}, changes: {changedTimes1}
</div>
