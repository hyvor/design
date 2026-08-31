<script>
	import Button from '$lib/components/Button/Button.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup/ButtonGroup.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import IconChevronLeft from '@hyvor/icons/IconChevronLeft';
	import IconChevronRight from '@hyvor/icons/IconChevronRight';
	import IconTypeBold from '@hyvor/icons/IconTypeBold';
	import IconTypeItalic from '@hyvor/icons/IconTypeItalic';
	import IconTypeUnderline from '@hyvor/icons/IconTypeUnderline';
	import IconCaretDownFill from '@hyvor/icons/IconCaretDownFill';
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

	<TableRow>
		<div><code>divider</code></div>
		<div><code>true</code></div>
		<div>
			Whether to show the thin divider line between adjacent filled buttons. Outline variants never
			show this divider since their borders already separate the buttons.
		</div>
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

<h2 id="divider">Divider</h2>

<p>
	By default, adjacent filled buttons are separated by a subtle divider line. Set
	<code>divider={false}</code> to remove it.
</p>

<CodeBlock
	code={`
    <ButtonGroup divider={false}>
        <Button color="accent">One</Button>
        <Button color="accent">Two</Button>
        <Button color="accent">Three</Button>
    </ButtonGroup>
`}
/>

<CodeResult white>
	<ButtonGroup divider={false}>
		<Button color="accent">One</Button>
		<Button color="accent">Two</Button>
		<Button color="accent">Three</Button>
	</ButtonGroup>
</CodeResult>

<h2 id="examples">Examples</h2>

<h3 id="mixed-variants">Mixed variants</h3>

<p>
	Variants can be combined too. For example, a solid primary action joined to a quieter
	<code>outline</code> secondary action.
</p>

<CodeBlock
	code={`
    <ButtonGroup>
        <Button color="accent">Save</Button>
        <Button variant="outline" color="gray">Save as draft</Button>
    </ButtonGroup>
`}
/>

<CodeResult white>
	<ButtonGroup>
		<Button color="accent">Save</Button>
		<Button variant="outline" color="gray">Save as draft</Button>
	</ButtonGroup>
</CodeResult>

<h3 id="split-button">Split button</h3>

<p>
	A primary action joined to a smaller menu trigger, a common pattern for "do this, or pick a
	variation".
</p>

<CodeBlock
	code={`
    <ButtonGroup>
        <Button color="accent">Merge pull request</Button>
        <Button color="accent">
            {#snippet start()}
                <IconCaretDownFill />
            {/snippet}
        </Button>
    </ButtonGroup>
`}
/>

<CodeResult white>
	<ButtonGroup>
		<Button color="accent">Merge pull request</Button>
		<Button color="accent">
			{#snippet start()}
				<IconCaretDownFill />
			{/snippet}
		</Button>
	</ButtonGroup>
</CodeResult>

<h3 id="icon-toolbar">Icon toolbar</h3>

<p>Icon-only buttons make a compact segmented toolbar, e.g. for text formatting.</p>

<CodeBlock
	code={`
    <ButtonGroup>
        <Button variant="outline" color="gray">
            {#snippet start()}
                <IconTypeBold />
            {/snippet}
        </Button>
        <Button variant="outline" color="gray">
            {#snippet start()}
                <IconTypeItalic />
            {/snippet}
        </Button>
        <Button variant="outline" color="gray">
            {#snippet start()}
                <IconTypeUnderline />
            {/snippet}
        </Button>
    </ButtonGroup>
`}
/>

<CodeResult white>
	<ButtonGroup>
		<Button variant="outline" color="gray">
			{#snippet start()}
				<IconTypeBold />
			{/snippet}
		</Button>
		<Button variant="outline" color="gray">
			{#snippet start()}
				<IconTypeItalic />
			{/snippet}
		</Button>
		<Button variant="outline" color="gray">
			{#snippet start()}
				<IconTypeUnderline />
			{/snippet}
		</Button>
	</ButtonGroup>
</CodeResult>

<h3 id="pager">Previous / Next pager</h3>

<CodeBlock
	code={`
    <ButtonGroup>
        <Button variant="outline" color="gray">
            {#snippet start()}
                <IconChevronLeft />
            {/snippet}
            Previous
        </Button>
        <Button variant="outline" color="gray">
            Next
            {#snippet end()}
                <IconChevronRight />
            {/snippet}
        </Button>
    </ButtonGroup>
`}
/>

<CodeResult white>
	<ButtonGroup>
		<Button variant="outline" color="gray">
			{#snippet start()}
				<IconChevronLeft />
			{/snippet}
			Previous
		</Button>
		<Button variant="outline" color="gray">
			Next
			{#snippet end()}
				<IconChevronRight />
			{/snippet}
		</Button>
	</ButtonGroup>
</CodeResult>

<h3 id="column-example">Column with mixed content</h3>

<CodeBlock
	code={`
    <ButtonGroup column>
        <Button color="accent">Account settings</Button>
        <Button variant="outline" color="gray">Billing</Button>
        <Button variant="outline" color="red">Delete account</Button>
    </ButtonGroup>
`}
/>

<CodeResult white>
	<ButtonGroup column>
		<Button color="accent">Account settings</Button>
		<Button variant="outline" color="gray">Billing</Button>
		<Button variant="outline" color="red">Delete account</Button>
	</ButtonGroup>
</CodeResult>
