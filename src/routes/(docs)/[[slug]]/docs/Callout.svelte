<script lang="ts">
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import Callout from '$lib/components/Callout/Callout.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
</script>

<h1>Callout</h1>

<p>The callout/alert component is used to highlight important information.</p>

<h2 id="props">Properties</h2>

<Table columns="1fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Description</div>
	</TableRow>
	<TableRow>
		<div><code>type</code></div>
		<div>
			Defines the type of callout (used for colors). Can be one of:
			<ul>
				<li><code>soft</code> (default)</li>
				<li><code>info</code></li>
				<li><code>warning</code></li>
				<li><code>success</code></li>
				<li><code>danger</code></li>
			</ul>
		</div>
	</TableRow>

	<TableRow>
		<div><code>title</code></div>
		<div>Title of the callout</div>
	</TableRow>

	<TableRow>
		<div><code>showIcon</code></div>
		<div>
			Whether to show an icon. Defaults to <code>true</code>, showing the icon matching
			<code>type</code> unless a custom <code>icon</code> snippet is given. Set to
			<code>false</code> to hide the icon entirely.
		</div>
	</TableRow>

	<TableRow>
		<div><code>fg</code></div>
		<div>
			Custom text/border color, overriding <code>type</code>. If <code>bg</code> is not also set, a matching
			background is derived from it.
		</div>
	</TableRow>

	<TableRow>
		<div><code>bg</code></div>
		<div>
			Custom background color, overriding <code>type</code>. If <code>fg</code> is not also set, a matching
			text/border color is derived from it.
		</div>
	</TableRow>

	<TableRow>
		<div><code>wrapperProps</code></div>
		<div>
			Additional props (e.g. <code>class</code>, <code>id</code>, other HTML attributes) applied to
			the wrapper <code>&lt;div&gt;</code> element.
		</div>
	</TableRow>
</Table>

<h2 id="slots">Slots</h2>

<Table columns="1fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Description</div>
	</TableRow>
	<TableRow>
		<div><code>default</code></div>
		<div>Content of the callout</div>
	</TableRow>
	<TableRow>
		<div><code>icon</code></div>
		<div>
			Icon to display before the content, or before the title if there is one. Overrides the default
			icon for <code>type</code>.
		</div>
	</TableRow>
	<TableRow>
		<div><code>title</code></div>
		<div>Title of the callout</div>
	</TableRow>
</Table>

<h2 id="examples">Examples</h2>

<h3 id="examples-types">Types</h3>

<CodeBlock
	code={`
    <Callout type="soft">This is a soft callout.</Callout>
    <Callout type="info">This is an info callout.</Callout>
    <Callout type="warning">This is a warning callout.</Callout>
    <Callout type="success">This is a success callout.</Callout>
    <Callout type="danger">This is a danger callout.</Callout>
`}
/>

<CodeResult style="gap:10px;display:flex;flex-direction:column">
	<Callout type="soft">This is a soft callout.</Callout>
	<Callout type="info">This is an info callout.</Callout>
	<Callout type="warning">This is a warning callout.</Callout>
	<Callout type="success">This is a success callout.</Callout>
	<Callout type="danger">This is a danger callout.</Callout>
</CodeResult>

<p>
	Each <code>type</code> shows a matching icon by default. Set <code>showIcon={false}</code> to hide it.
</p>

<CodeBlock
	code={`
    <Callout type="info" showIcon={false}>This is an info callout without an icon.</Callout>
`}
/>

<CodeResult>
	<Callout type="info" showIcon={false}>This is an info callout without an icon.</Callout>
</CodeResult>

<h3 id="examples-with-title">Callout with Title</h3>

<CodeBlock
	code={`
    <Callout type="info">
        {#snippet title()}
            <div>This is a title</div>
        {/snippet}
        This is a callout with a title.
    </Callout>
`}
/>

<CodeResult>
	<Callout type="info">
		{#snippet title()}
			<div>This is a title</div>
		{/snippet}
		This is a callout with a title.
	</Callout>
</CodeResult>

<h3 id="examples-with-icon">Callout with Icon</h3>

<CodeBlock
	code={`
    <Callout type="info">
        {#snippet icon()}
            <div>👋</div>
        {/snippet}
        This is a callout with an icon.
    </Callout>
`}
/>

<CodeResult>
	<Callout type="info">
		{#snippet icon()}
			<div>👋</div>
		{/snippet}
		This is a callout with an icon.
	</Callout>
</CodeResult>

<h3 id="examples-with-icon-and-title">Callout with Icon and Title</h3>

<CodeBlock
	code={`
    <Callout type="danger">
        {#snippet icon()}
            <div>⛔️</div>
        {/snippet}
        {#snippet title()}
            <div>This is a title</div>
        {/snippet}
        This is a callout with an icon and a title.
    </Callout>
`}
/>

<CodeResult>
	<Callout type="danger">
		{#snippet icon()}
			<div>⛔️</div>
		{/snippet}
		{#snippet title()}
			<div>This is a title</div>
		{/snippet}
		This is a callout with an icon and a title.
	</Callout>
</CodeResult>

<h3 id="examples-with-icon-and-title">Callout with Title Prop</h3>

<CodeBlock
	code={`
    <Callout type="info">
        {#snippet icon()}
            <div>👋</div>
        {/snippet}
        {#snippet title()}
            <div>hi there</div>
        {/snippet}
        This is a callout with an icon and a title.
    </Callout>
`}
/>

<CodeResult>
	<Callout type="info" title="hi there">
		{#snippet icon()}
			<div>👋</div>
		{/snippet}
		This is a callout with an icon and a title.
	</Callout>
</CodeResult>

<h3 id="examples-custom-color">Custom Foreground / Background</h3>

<p>
	Use <code>fg</code> and/or <code>bg</code> to go outside the built-in <code>type</code>s. Set just
	one and a matching pair is derived automatically; set both for full control.
</p>

<CodeBlock
	code={`
    <Callout fg="#7c3aed">Only "fg" is set, "bg" is derived from it.</Callout>
    <Callout bg="#d9f2e6">Only "bg" is set, "fg" is derived from it.</Callout>
    <Callout fg="#7c3aed" bg="#efe6fc">Both "fg" and "bg" are set explicitly.</Callout>
`}
/>

<CodeResult style="gap:10px;display:flex;flex-direction:column">
	<Callout fg="#7c3aed">Only "fg" is set, "bg" is derived from it.</Callout>
	<Callout bg="#d9f2e6">Only "bg" is set, "fg" is derived from it.</Callout>
	<Callout fg="#7c3aed" bg="#efe6fc">Both "fg" and "bg" are set explicitly.</Callout>
</CodeResult>

<h3 id="examples-multi-paragraph">Multi-paragraph Callout</h3>

<CodeBlock
	code={`
    <Callout type="info" title="Heads up">
        <p>This is the first paragraph of the callout.</p>
        <p>This is the second paragraph, to check that the line height and spacing between paragraphs look right.</p>
        <p>And a third one, just to be sure it holds up with more content.</p>
    </Callout>
`}
/>

<CodeResult>
	<Callout type="info" title="Heads up">
		<p>This is the first paragraph of the callout.</p>
		<p>
			This is the second paragraph, to check that the line height and spacing between paragraphs
			look right.
		</p>
		<p>And a third one, just to be sure it holds up with more content.</p>
	</Callout>
</CodeResult>
