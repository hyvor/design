<script>
	import Textarea from '$lib/components/Textarea/Textarea.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import IconPen from '@hyvor/icons/IconPen';
	import Loader from '$lib/components/Loader/Loader.svelte';

	let val1 = '';
</script>

<h1>Textarea</h1>

<p>
	<code>{'<Textarea>'}</code> is a multi-line text input control. It is a wrapper around the
	native
	<code>{'<textarea>'}</code>
	element. The
	<a href="/#events">default events</a> are forwarded from the input element.
</p>

<h2 id="props">Properties</h2>

<Table columns="2fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>state</code></div>
		<div><code>default</code></div>
		<div>
			The state of the input. One of:
			<ul>
				<li><code>default</code></li>
				<li><code>success</code></li>
				<li><code>warning</code></li>
				<li><code>error</code></li>
			</ul>
		</div>
	</TableRow>

	<TableRow>
		<div><code>rows</code></div>
		<div><code>5</code></div>
		<div>The number of rows to display.</div>
	</TableRow>

	<TableRow>
		<div><code>cols</code></div>
		<div><code>40</code></div>
		<div>The number of columns to display.</div>
	</TableRow>

	<TableRow>
		<div><code>block</code></div>
		<div><code>false</code></div>
		<div>Whether the textarea should be displayed as a block element.</div>
	</TableRow>

	<TableRow>
		<div><code>textarea</code></div>
		<div></div>
		<div>
			A reference to the native <code>{'<textarea>'}</code> element (bindable).
		</div>
	</TableRow>
</Table>

<p>
	All other properties are passed through to the native <code>{'<textarea>'}</code> element.
</p>

<h2 id="slots">Slots</h2>

<Table columns="2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>start</code></div>
		<div>Content to be displayed at the start of the input.</div>
	</TableRow>

	<TableRow>
		<div><code>end</code></div>
		<div>Content to be displayed at the end of the input.</div>
	</TableRow>
</Table>

<h2 id="examples">Examples</h2>

<h3 id="basic">Basic</h3>

<CodeBlock
	code={`<Textarea 
    bind:value={myVal}
    placeholder="Enter some text"
/>
`}
/>

<h3 id="state">State</h3>

<CodeBlock
	code={`
    <Textarea placeholder="Default" />
    <Textarea placeholder="Success" state="success" />
    <Textarea placeholder="Warning" state="warning" />
    <Textarea placeholder="Error" state="error" />
`}
/>

<CodeResult gap={10}>
	<Textarea placeholder="Default" />
	<Textarea placeholder="Success" state="success" />
	<Textarea placeholder="Warning" state="warning" />
	<Textarea placeholder="Error" state="error" />
</CodeResult>

<h3 id="block">Block</h3>

<CodeBlock code={`<Textarea placeholder="Block Textarea" block />`} />

<CodeResult>
	<Textarea placeholder="Block Textarea" block />
</CodeResult>

<h3 id="cols-rows">Custom cols/rows</h3>

<CodeBlock code={`<Textarea placeholder="Custom cols/rows" cols={60} rows={10} />`} />

<CodeResult>
	<Textarea placeholder="Custom cols/rows" cols={20} rows={6} />
</CodeResult>

<h3 id="slots">Slots</h3>

<CodeBlock
	code={`
    <Textarea placeholder="Write a post">
        <IconPen slot="start" color="var(--text-light)" />
        <Loader slot="end" size="small" colorTrack="var(--accent-light)"/>
    </Textarea>
`}
/>

<CodeResult>
	<Textarea placeholder="Write a post">
		{#snippet start()}
			<IconPen color="var(--text-light)" />
		{/snippet}
		{#snippet end()}
			<Loader size="small" colorTrack="var(--accent-light)" />
		{/snippet}
	</Textarea>
</CodeResult>
