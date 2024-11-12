<script lang="ts">
	import Slider from '$lib/components/Slider/Slider.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';

	let val1 = $state(50);
	let val2 = $state(5);
</script>

<h1>Slider</h1>

<p>A slider component.</p>

<h2 id="properties">Properties</h2>

<Table columns="1fr 1fr 2fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>min</code></div>
		<div></div>
		<div>The minimum value of the slider.</div>
	</TableRow>

	<TableRow>
		<div><code>max</code></div>
		<div></div>
		<div>The maximum value of the slider.</div>
	</TableRow>

	<TableRow>
		<div><code>value</code></div>
		<div></div>
		<div>The current value of the slider.</div>
	</TableRow>

	<TableRow>
		<div><code>step</code></div>
		<div><code>1</code></div>
		<div>
			The step value of the slider. The value will be rounded to the nearest multiple of this
			number.
		</div>
	</TableRow>

	<TableRow>
		<div><code>dots</code></div>
		<div><code>false</code></div>
		<div>Whether to show dots on the slider track.</div>
	</TableRow>

	<TableRow>
		<div><code>disabled</code></div>
		<div><code>false</code></div>
		<div>Whether the slider is disabled.</div>
	</TableRow>
</Table>

<h2 id="usage">Usage</h2>

<h3 id="basic">Basic slider</h3>

<CodeBlock
	code={`<Slider 
    min={0} 
    max={100} 
    step={1} 
    bind:value 
/>`}
	language="svelte"
/>

<CodeResult>
	<Slider min={0} max={100} step={1} bind:value={val1} />
</CodeResult>

<h3 id="dots">with Dots</h3>

<p>
	This example also uses the <code>on:change</code> event instead of binding.
</p>

<CodeBlock
	code={`<Slider 
    min={0} 
    max={10} 
    dots
    value={progress}
    on:change={e => progress = e.detail}
/>`}
	language="svelte"
/>

<CodeResult>
	<Slider min={0} max={10} dots value={val2} on:change={(e) => (val2 = e.detail)} />
</CodeResult>
