<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import ColorPicker from '$lib/components/ColorPicker/ColorPicker.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import SplitControl from '$lib/components/SplitControl/SplitControl.svelte';
	import InputGroup from '$lib/components/FormControl/InputGroup.svelte';
	import Radio from '$lib/components/Radio/Radio.svelte';

	let color1 = $state('#000000');
	let inputTimes1 = $state(0);
	let changedTimes1 = $state(0);

	let color2 = $state('#00000066');
	let inputTimes2 = $state(0);
	let changedTimes2 = $state(0);

	let color3 = $state('#ff5722');
	let paPosition: 'top' | 'bottom' | 'left' | 'right' = $state('bottom');
	let paAlign: 'start' | 'center' | 'end' = $state('start');
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

<h2 id="positioning">Positioning and Alignment</h2>

<p>
	Use <code>position</code> and <code>align</code> to control where the picker popover opens
	relative to the swatch. They work the same way as the <a href="/dropdown#props">Dropdown</a> props.
</p>

<CodeBlock
	code={`
    <ColorPicker bind:color={color} position="bottom" align="start" />
`}
/>

<CodeResult>
	<SplitControl label="Position" caption="Side the popover opens on">
		<InputGroup>
			<Radio name="cpPosition" value="top" bind:group={paPosition}>Top</Radio>
			<Radio name="cpPosition" value="bottom" bind:group={paPosition}>Bottom</Radio>
			<Radio name="cpPosition" value="left" bind:group={paPosition}>Left</Radio>
			<Radio name="cpPosition" value="right" bind:group={paPosition}>Right</Radio>
		</InputGroup>
	</SplitControl>

	<SplitControl label="Align" caption="Alignment along that side">
		<InputGroup>
			<Radio name="cpAlign" value="start" bind:group={paAlign}>Start</Radio>
			<Radio name="cpAlign" value="center" bind:group={paAlign}>Center</Radio>
			<Radio name="cpAlign" value="end" bind:group={paAlign}>End</Radio>
		</InputGroup>
	</SplitControl>

	<div style="margin:120px 0; text-align: center;">
		<ColorPicker bind:color={color3} position={paPosition} align={paAlign} />
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
