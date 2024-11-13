<script lang="ts">
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import { IconSearch } from '@hyvor/icons';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';

	let value1 = $state('');
</script>

<h1>Text Input</h1>

<p>
	Text inputs are used to collect text from the user. They are commonly used in forms and settings
	pages.
</p>

<h2 id="props">Props</h2>

<Table columns="1fr 1fr 2fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>state</code></div>
		<div><code>default</code></div>
		<div>
			The state of the text input. This will change the border color of the text input. States can
			be one of:
			<ul>
				<li><code>default</code></li>
				<li><code>success</code></li>
				<li><code>warning</code></li>
				<li><code>error</code></li>
			</ul>
		</div>
	</TableRow>

	<TableRow>
		<div><code>size</code></div>
		<div><code>medium</code></div>
		<div>
			The size of the text input. Sizes can be one of:
			<ul>
				<li><code>x-small</code>(height: 20px)</li>
				<li><code>small</code>(height: 26px)</li>
				<li><code>medium</code>(height: 30px)</li>
				<li><code>large</code>(height: 36px)</li>
			</ul>
		</div>
	</TableRow>

	<TableRow>
		<div><code>block</code></div>
		<div><code>false</code></div>
		<div>
			If <code>true</code>, the text input will take the full width of its parent.
		</div>
	</TableRow>

	<TableRow>
		<div><code>value</code></div>
		<div><code>undefined</code></div>
		<div>The value of the text input. This is a bindable property.</div>
	</TableRow>

	<TableRow>
		<div><code>input</code></div>
		<div></div>
		<div>
			A reference to the native <code>{'<input>'}</code> element (bindable).
		</div>
	</TableRow>
</Table>

<h2 id="examples">Examples</h2>

<h3 id="basic">Basic</h3>

<CodeBlock
	code={`
    <TextInput placeholder="Basic text input" bind:value={myValue} />
    The value is "{myValue}"
`}
/>

<CodeResult white>
	<TextInput placeholder="Basic text input" bind:value={value1} />
	<div style="margin-top: 5px;">
		The value is "{value1}"
	</div>
</CodeResult>

<h3 id="sizes">Sizes</h3>

<CodeBlock
	code={`
    <TextInput placeholder="X-Small" size="x-small" />
    <TextInput placeholder="Small" size="small" />
    <TextInput placeholder="Medium (default)" />
    <TextInput placeholder="Large" size="large" />
`}
/>

<CodeResult white>
	<div class="sizes">
		<TextInput placeholder="X-Small" size="x-small" />
		<TextInput placeholder="Small" size="small" />
		<TextInput placeholder="Medium (default)" />
		<TextInput placeholder="Large" size="large" />
	</div>
</CodeResult>

<h3 id="states">States</h3>

<CodeBlock
	code={`
    <TextInput 
        placeholder="This is a default text input" 
        state="default" 
        block 
    />
    <TextInput 
        placeholder="This is a success text input" 
        state="success" 
        block 
    />
    <TextInput 
        placeholder="This is a warning text input" 
        state="warning"
        block
    />
    <TextInput 
        placeholder="This is an error text input" 
        state="error"
        block 
    />
`}
/>

<CodeResult white>
	<div class="states">
		<TextInput placeholder="This is a default text input" state="default" block />
		<TextInput placeholder="This is a success text input" state="success" block />
		<TextInput placeholder="This is a warning text input" state="warning" block />
		<TextInput placeholder="This is an error text input" state="error" block />
	</div>
</CodeResult>

<h3 id="with-starting-slot">with Starting Slot</h3>

<CodeBlock
	code={`
    <TextInput placeholder="Search">
        <IconSearch slot="start" />
    </TextInput>
`}
/>

<CodeResult white>
	<TextInput placeholder="Search">
		{#snippet start()}
			<IconSearch />
		{/snippet}
	</TextInput>
</CodeResult>

<h3 id="with-ending-slot">with Ending Slot</h3>

<CodeBlock
	code={`
    <TextInput placeholder="Delay" type="number">
        <span slot="end">minutes</span>
    </TextInput>
`}
/>

<CodeResult white>
	<TextInput placeholder="Delay" type="number">
		{#snippet end()}
			<span>minutes</span>
		{/snippet}
	</TextInput>
</CodeResult>

<p>
	The ending slot is useful with the <a href="/loader">Loader</a> component to indicate a loading state,
	for example in a search input.
</p>

<style>
	.sizes {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;
	}
	.sizes :global(.input-wrap) {
		width: 300px;
		max-width: 100%;
	}
	.states :global(.input-wrap:not(:last-child)) {
		margin-bottom: 15px;
	}
</style>
