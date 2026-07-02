<script>
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import ColorPicker from '$lib/components/ColorPicker/ColorPicker.svelte';
	import CodeResult from './Helper/CodeResult.svelte';

	let color1 = $state('#000000');
	let inputTimes1 = $state(0);
	let changedTimes1 = $state(0);

	let color2 = $state('#00000066');
	let inputTimes2 = $state(0);
	let changedTimes2 = $state(0);
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
        oninput={() => inputTimes++}
        onchange={() => changedTimes++}
    />

    <p>Color: {color}, Changed {times} times</p>
`}
/>

<CodeResult>
	<ColorPicker bind:color={color1} oninput={() => inputTimes1++} onchange={() => changedTimes1++} />

	<div style="margin-top: 4px;font-size:14px;color:var(--text-light)">
		Color: {color1}, inputs: {inputTimes1}, changes: {changedTimes1}
	</div>
</CodeResult>

<h3 id="alpha">With Alpha</h3>

<CodeBlock
	code={`
    <ColorPicker bind:color={color} alpha />
`}
/>

<CodeResult>
	<ColorPicker
		bind:color={color2}
		oninput={() => inputTimes2++}
		onchange={() => changedTimes2++}
		alpha
	/>
	<div style="margin-top: 4px;font-size:14px;color:var(--text-light)">
		Color: {color2}, inputs: {inputTimes2}, changes: {changedTimes2}
	</div>
</CodeResult>
