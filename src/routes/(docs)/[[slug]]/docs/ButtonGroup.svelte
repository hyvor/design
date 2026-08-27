<script>
	import Button from '$lib/components/Button/Button.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup/ButtonGroup.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
</script>

<h1>Button Group</h1>

<p>
	<code>ButtonGroup</code> visually connects a set of related <code>Button</code>s into a single
	control. <code>Button</code>s are passed in as children - <code>ButtonGroup</code> only decides
	how they are laid out and joined together; each <code>Button</code> keeps its own
	<code>color</code>
	and <code>variant</code>.
</p>

<CodeBlock
	code={`
    <ButtonGroup>
        <Button variant="outline" color="gray">Button 1</Button>
        <Button variant="outline" color="gray">Button 2</Button>
        <Button variant="outline" color="gray">Button 3</Button>
    </ButtonGroup>
`}
/>

<CodeResult white>
	<ButtonGroup>
		<Button variant="outline" color="gray">Button 1</Button>
		<Button variant="outline" color="gray">Button 2</Button>
		<Button variant="outline" color="gray">Button 3</Button>
	</ButtonGroup>
</CodeResult>

<p>It works the same way with any color or variant, including <code>fill</code>:</p>

<CodeBlock
	code={`
    <ButtonGroup>
        <Button color="accent">One</Button>
        <Button color="accent">Two</Button>
        <Button color="accent">Three</Button>
    </ButtonGroup>
`}
/>

<CodeResult white>
	<ButtonGroup>
		<Button color="accent">One</Button>
		<Button color="accent">Two</Button>
		<Button color="accent">Three</Button>
	</ButtonGroup>
</CodeResult>

<h2 id="props">Properties</h2>

<Table columns="2fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>column</code></div>
		<div><code>false</code></div>
		<div>Whether to stack the buttons in a column instead of a row.</div>
	</TableRow>
</Table>

<h2 id="column">Column</h2>

<p>
	Set the <code>column</code> attribute to stack the buttons instead of placing them side by side.
</p>

<CodeBlock
	code={`
    <ButtonGroup column>
        <Button variant="outline" color="gray">Button 1</Button>
        <Button variant="outline" color="gray">Button 2</Button>
        <Button variant="outline" color="gray">Button 3</Button>
    </ButtonGroup>
`}
/>

<CodeResult white>
	<ButtonGroup column>
		<Button variant="outline" color="gray">Button 1</Button>
		<Button variant="outline" color="gray">Button 2</Button>
		<Button variant="outline" color="gray">Button 3</Button>
	</ButtonGroup>
</CodeResult>
