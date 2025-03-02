<script>
	import Button from '$lib/components/Button/Button.svelte';
	import ButtonGroup from '$lib/components/Button/ButtonGroup.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import Loader from '$lib/components/Loader/Loader.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import IconSearch from '@hyvor/icons/IconSearch';
	import IconCaretDown from '@hyvor/icons/IconCaretDown';
	import IconBoxArrowUpRight from '@hyvor/icons/IconBoxArrowUpRight';

	let loading = false;
</script>

<h1>Button</h1>

<p>
	Buttons are used to trigger an action or event, such as submitting a form, opening a dialog,
	canceling an action, or performing a delete operation.
</p>

<h2 id="props">Properties</h2>

<Table columns="2fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>size</code></div>
		<div><code>medium</code></div>
		<div>
			The <a href="#size">size</a> of the button. One of:

			<ul>
				<li><code>x-small</code></li>
				<li><code>small</code></li>
				<li><code>medium</code></li>
				<li><code>large</code></li>
			</ul>
		</div>
	</TableRow>

	<TableRow>
		<div><code>color</code></div>
		<div><code>accent</code></div>
		<div>
			The <a href="#color">color</a> of the button. One of:

			<ul>
				<li><code>accent</code></li>
				<li><code>gray</code></li>
				<li><code>green</code></li>
				<li><code>red</code></li>
				<li><code>blue</code></li>
				<li><code>orange</code></li>
			</ul>
		</div>
	</TableRow>

	<TableRow>
		<div><code>variant</code></div>
		<div><code>fill</code></div>
		<div>
			The <a href="#color">variant</a> of the button. One of:

			<ul>
				<li><code>fill</code></li>
				<li><code>outline</code></li>
				<li><code>outline-fill</code></li>
				<li><code>invisible</code></li>
			</ul>
		</div>
	</TableRow>

	<TableRow>
		<div><code>block</code></div>
		<div><code>false</code></div>
		<div>Whether the button should be displayed as a block element.</div>
	</TableRow>

	<TableRow>
		<div><code>align</code></div>
		<div><code>center</code></div>
		<div>
			The alignment of the content when using <code>block</code>. Can be
			<code>start</code>
			or <code>center</code>
		</div>
	</TableRow>

	<TableRow>
		<div><code>as</code></div>
		<div><code>button</code></div>
		<div>
			The element to render the button as. Can be <code>button</code> or
			<code>a</code>.
		</div>
	</TableRow>

	<TableRow>
		<div><code>button</code></div>
		<div></div>
		<div>
			A reference to the native <code>{'<button>'}</code> element (bindable).
		</div>
	</TableRow>
</Table>

All other properties will be forwarded to the underlying element.

<h3 id="size">Size</h3>

<CodeBlock
	code={`
    <Button size="x-small">X-Small Button</Button>
    <Button size="small">Small Button</Button>
    <Button size="medium">Medium Button</Button>
    <Button size="large">Large Button</Button>
`}
/>

<CodeResult style="display:flex;flex-direction:column;gap:15px;align-items:flex-start">
	<Button size="x-small">X-Small Button</Button>
	<Button size="small">Small Button</Button>
	<Button size="medium">Medium Button</Button>
	<Button size="large">Large Button</Button>
</CodeResult>

<h3 id="color">Variants and Colors</h3>

<h4>Fill</h4>

<CodeBlock
	code={`
    <Button color="accent" variant="fill">Fill Accent</Button>
    <Button color="gray" variant="fill">Fill Gray</Button>
    <Button color="green" variant="fill">Fill Green</Button>
    <Button color="red" variant="fill">Fill Red</Button>
    <Button color="blue" variant="fill">Fill Blue</Button>
    <Button color="orange" variant="fill">Fill Orange</Button>
    <Button color="input" variant="fill">Fill Button</Button>
`}
/>

<CodeResult style="display:flex;flex-direction:column;gap:15px;align-items:flex-start" white>
	<Button color="accent" variant="fill">Fill Accent</Button>
	<Button color="gray" variant="fill">Fill Gray</Button>
	<Button color="green" variant="fill">Fill Green</Button>
	<Button color="red" variant="fill">Fill Red</Button>
	<Button color="blue" variant="fill">Fill Blue</Button>
	<Button color="orange" variant="fill">Fill Orange</Button>
	<Button color="input" variant="fill">Fill Input</Button>
</CodeResult>

<h4>Fill-Light</h4>

<CodeBlock
	code={`
    <Button color="accent" variant="fill-light">Fill Accent</Button>
    <Button color="gray" variant="fill-light">Fill Gray</Button>
    <Button color="green" variant="fil-light">Fill Green</Button>
    <Button color="red" variant="fill-light">Fill Red</Button>
    <Button color="blue" variant="fill-light">Fill Blue</Button>
    <Button color="orange" variant="fill-light">Fill Orange</Button>
`}
/>

<CodeResult style="display:flex;flex-direction:column;gap:15px;align-items:flex-start" white>
	<Button color="accent" variant="fill-light">Fill Accent</Button>
	<Button color="gray" variant="fill-light">Fill Gray</Button>
	<Button color="green" variant="fill-light">Fill Green</Button>
	<Button color="red" variant="fill-light">Fill Red</Button>
	<Button color="blue" variant="fill-light">Fill Blue</Button>
	<Button color="orange" variant="fill-light">Fill Orange</Button>
</CodeResult>

<h4>Outline</h4>

<CodeBlock
	code={`
    <Button color="accent" variant="outline">Outline Accent</Button>
    <Button color="gray" variant="outline">Outline Gray</Button>
    <Button color="green" variant="outline">Outline Green</Button>
    <Button color="red" variant="outline">Outline Red</Button>
    <Button color="blue" variant="outline">Outline Blue</Button>
    <Button color="orange" variant="outline">Outline Orange</Button>
`}
/>

<CodeResult style="display:flex;flex-direction:column;gap:15px;align-items:flex-start" white>
	<Button color="accent" variant="outline">Outline Accent</Button>
	<Button color="gray" variant="outline">Outline Gray</Button>
	<Button color="green" variant="outline">Outline Green</Button>
	<Button color="red" variant="outline">Outline Red</Button>
	<Button color="blue" variant="outline">Outline Blue</Button>
	<Button color="orange" variant="outline">Outline Orange</Button>
</CodeResult>

<h4>Outline Fill</h4>

<CodeBlock
	code={`
    <Button color="accent" variant="outline-fill">Outline-fill Accent</Button>
    <Button color="gray" variant="outline-fill">Outline-fill Gray</Button>
    <Button color="green" variant="outline-fill">Outline-fill Green</Button>
    <Button color="red" variant="outline-fill">Outline-fill Red</Button>
    <Button color="blue" variant="outline-fill">Outline-fill Blue</Button>
    <Button color="orange" variant="outline-fill">Outline-fill Orange</Button>
`}
/>

<CodeResult style="display:flex;flex-direction:column;gap:15px;align-items:flex-start" white>
	<Button color="accent" variant="outline-fill">Outline-fill Accent</Button>
	<Button color="gray" variant="outline-fill">Outline-fill Gray</Button>
	<Button color="green" variant="outline-fill">Outline-fill Green</Button>
	<Button color="red" variant="outline-fill">Outline-fill Red</Button>
	<Button color="blue" variant="outline-fill">Outline-fill Blue</Button>
	<Button color="orange" variant="outline-fill">Outline-fill Orange</Button>
</CodeResult>

<h4>Invisible</h4>

<CodeBlock
	code={`
    <Button color="accent" variant="invisible">Invisible Accent</Button>
    <Button color="gray" variant="invisible">Invisible Gray</Button>
    <Button color="green" variant="invisible">Invisible Green</Button>
    <Button color="red" variant="invisible">Invisible Red</Button>
    <Button color="blue" variant="invisible">Invisible Blue</Button>
    <Button color="orange" variant="invisible">Invisible Orange</Button>
    <Button color="input" variant="invisible">Invisible Input</Button>
`}
/>

<CodeResult style="display:flex;flex-direction:column;gap:15px;align-items:flex-start" white>
	<Button color="accent" variant="invisible">Invisible Accent</Button>
	<Button color="gray" variant="invisible">Invisible Gray</Button>
	<Button color="green" variant="invisible">Invisible Green</Button>
	<Button color="red" variant="invisible">Invisible Red</Button>
	<Button color="blue" variant="invisible">Invisible Blue</Button>
	<Button color="orange" variant="invisible">Invisible Orange</Button>
	<Button color="input" variant="invisible">Invisible Input</Button>
	<Button color="gray" variant="invisible" disabled>Invisible Disabled</Button>
</CodeResult>

<h2 id="slots">Slots</h2>

<ul>
	<li>
		<p>
			<code>default</code> - The content (label) of the button.
		</p>
		<CodeBlock code={`<Button>Search</Button>`} />
		<CodeResult>
			<Button>Search</Button>
		</CodeResult>
	</li>
	<li>
		<code>start</code> - Placed before the content (e.g. icon).

		<CodeBlock
			code={`
                <Button>
                    <IconSearch slot="start" />
                    Search
                </Button>
            `}
		/>

		<CodeResult>
			<Button>
				{#snippet start()}
					<IconSearch />
				{/snippet}
				Search
			</Button>
		</CodeResult>
	</li>
	<li>
		<code>end</code> - Placed after the content (e.g. icon).

		<CodeBlock
			code={`
                <Button>
                    Search
                    <IconSearch slot="end" />
                </Button>
            `}
		/>

		<CodeResult>
			<Button>
				Search
				{#snippet end()}
					<IconSearch />
				{/snippet}
			</Button>
		</CodeResult>
	</li>
	<li>
		<code>action</code> - Placed after the content, locked to the right side of the button. This
		is useful with the <code>block</code> property.

		<CodeBlock
			code={`
                <Button block color="gray">
                    <IconSearch slot="start" />
                    Search
                    <IconCaretDown slot="action" />
                </Button>
            `}
		/>

		<CodeResult>
			<Button block color="gray">
				{#snippet start()}
					<IconSearch />
				{/snippet}
				Search
				{#snippet action()}
					<IconCaretDown />
				{/snippet}
			</Button>
		</CodeResult>
	</li>
</ul>

<h2 id="examples">Examples</h2>

<h3 id="button-link">Button Link</h3>

<p>
	The <code>as</code> property can be used to render the button as a link.
</p>

<CodeBlock
	code={`
        <Button as="a" href="https://hyvor.com" target="_blank">
            HYVOR <IconBoxArrowUpRight slot="end" />
        </Button>
    `}
/>

<CodeResult>
	<Button as="a" href="https://hyvor.com" style="text-decoration:none" target="_blank">
		HYVOR {#snippet end()}
			<IconBoxArrowUpRight />
		{/snippet}
	</Button>
</CodeResult>

<h3 id="button-with-loader">Button with Loader</h3>

<p>
	The <a href="/loader">Loader</a> component can be used to indicate a loading state.
</p>

<CodeBlock
	code={`
        <Button>
            Submit
            <Loader slot="action" size="small" invert />
        </Button>
    `}
/>

<CodeResult>
	<Button>
		Submit
		{#snippet action()}
			<Loader size="small" invert />
		{/snippet}
	</Button>
</CodeResult>

<h3>Conditional Slots</h3>
<CodeBlock
	code={`
    <Button>
        <svelte:fragment slot="start">{#if loading}<Loader  />{/if}</svelte:fragment>
        Button
    </Button>
`}
/>

<CodeResult>
	<Button>
		{#snippet start()}
			{#if loading}<Loader />{/if}
		{/snippet}
		Button
	</Button>
</CodeResult>

<h3>Disabled Button</h3>

<p>
	You can use the <code>disabled</code> attribute to disable a button.
</p>
<CodeBlock
	code={`
    <Button disabled>Disabled Button</Button>
`}
/>

<CodeResult>
	<Button disabled>Disabled Button</Button>
</CodeResult>

<h2 id="group">Button Group</h2>

<p>
	You can use the <code>ButtonGroup</code> component to group buttons together.
</p>

<CodeBlock
	code={`
    <ButtonGroup>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
    </ButtonGroup>
`}
/>

<CodeResult>
	<ButtonGroup>
		<Button>Button 1</Button>
		<Button>Button 2</Button>
		<Button>Button 3</Button>
	</ButtonGroup>
</CodeResult>
