<script>
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import ColorPicker from '$lib/components/ColorPicker/ColorPicker.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';

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

<h2 id="props">Properties</h2>

<Table columns="2fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>color</code></div>
		<div><code>#000000</code></div>
		<div>The selected color (bindable).</div>
	</TableRow>

	<TableRow>
		<div><code>size</code></div>
		<div><code>30</code></div>
		<div>Size (width and height) of the color swatch button in pixels.</div>
	</TableRow>

	<TableRow>
		<div><code>show</code></div>
		<div><code>false</code></div>
		<div>Whether the picker popover is open (bindable).</div>
	</TableRow>

	<TableRow>
		<div><code>alpha</code></div>
		<div><code>false</code></div>
		<div>Whether to allow an alpha channel.</div>
	</TableRow>

	<TableRow>
		<div><code>align</code></div>
		<div><code>start</code></div>
		<div>
			Alignment of the picker popover relative to the swatch. One of:
			<ul>
				<li><code>start</code></li>
				<li><code>center</code></li>
				<li><code>end</code></li>
			</ul>
		</div>
	</TableRow>

	<TableRow>
		<div><code>position</code></div>
		<div><code>bottom</code></div>
		<div>
			Position of the picker popover relative to the swatch. One of:
			<ul>
				<li><code>top</code></li>
				<li><code>bottom</code></li>
				<li><code>left</code></li>
				<li><code>right</code></li>
			</ul>
		</div>
	</TableRow>
</Table>

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
