<script lang="ts">
	import Table from '$lib/components/Table/Table.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import Tag from '$lib/components/Tag/Tag.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import { IconCheck, IconHourglass, IconJournal, IconJournalText } from '@hyvor/icons';
	import Loader from '$lib/components/Loader/Loader.svelte';
</script>

<h1>Tag</h1>

<p>
	The <code>{'<Tag>'}</code> component is used to display a a category, a label, or a status.
</p>

<h3 id="props">Properties</h3>

<Table columns="1fr 1fr 2fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>size</code></div>
		<div><code>medium</code></div>
		<div>
			The size of the tag. The accepted values are
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
		<div><code>default</code></div>
		<div>
			Color of the tag. The accepted values are
			<ul>
				<li><code>default</code></li>
				<li><code>green</code></li>
				<li><code>red</code></li>
				<li><code>blue</code></li>
				<li><code>orange</code></li>
			</ul>
		</div>
	</TableRow>

	<TableRow>
		<div><code>outline</code></div>
		<div><code>false</code></div>
		<div>
			Set to <code>true</code> to use the outline style.
		</div>
	</TableRow>

	<TableRow>
		<div><code>fill</code></div>
		<div><code>false</code></div>
		<div>
			Used with <code>outline</code>. Set to <code>true</code> to use the outline fill style.
		</div>
	</TableRow>

	<TableRow>
		<div><code>interactive</code></div>
		<div><code>false</code></div>
		<div>
			Set to <code>true</code> to make the tag interactive (hover effect and pointer cursor).
		</div>
	</TableRow>

	<TableRow>
		<div><code>disabled</code></div>
		<div><code>false</code></div>
		<div>
			Set to <code>true</code> to disable the tag.
		</div>
	</TableRow>

	<TableRow>
		<div><code>bg</code></div>
		<div></div>
		<div>Custom background color</div>
	</TableRow>

	<TableRow>
		<div><code>fg</code></div>
		<div></div>
		<div>Custom text color</div>
	</TableRow>
</Table>

<h3 id="default-style">Default Style</h3>

<CodeBlock
	code={`
    <Tag>Default</Tag>
    <Tag color="accent">Accent</Tag>
    <Tag color="green">Green</Tag>
    <Tag color="red">Red</Tag>
    <Tag color="blue">Blue</Tag>
    <Tag color="orange">Orange</Tag>
`}
/>

<CodeResult white>
	<Tag>Default</Tag>
	<Tag color="accent">Accent</Tag>
	<Tag color="green">Green</Tag>
	<Tag color="red">Red</Tag>
	<Tag color="blue">Blue</Tag>
	<Tag color="orange">Orange</Tag>
</CodeResult>

<h3 id="outline-style">Outline style</h3>

<CodeBlock
	code={`
    <Tag outline>Default</Tag>
    <Tag outline color="accent">Accent</Tag>
    <Tag outline color="green">Green</Tag>
    <Tag outline color="red">Red</Tag>
    <Tag outline color="blue">Blue</Tag>
    <Tag outline color="orange">Orange</Tag>
`}
/>

<CodeResult white>
	<Tag outline>Default</Tag>
	<Tag outline color="accent">Accent</Tag>
	<Tag outline color="green">Green</Tag>
	<Tag outline color="red">Red</Tag>
	<Tag outline color="blue">Blue</Tag>
	<Tag outline color="orange">Orange</Tag>
</CodeResult>

<h3 id="outline-fill-style">Outline fill style</h3>

<CodeBlock
	code={`
    <Tag outline fill>Default</Tag>
    <Tag outline fill color="accent">Accent</Tag>
    <Tag outline fill color="green">Green</Tag>
    <Tag outline fill color="red">Red</Tag>
    <Tag outline fill color="blue">Blue</Tag>
    <Tag outline fill color="orange">Orange</Tag>
`}
/>

<CodeResult white>
	<Tag outline fill>Default</Tag>
	<Tag outline fill color="accent">Accent</Tag>
	<Tag outline fill color="green">Green</Tag>
	<Tag outline fill color="red">Red</Tag>
	<Tag outline fill color="blue">Blue</Tag>
	<Tag outline fill color="orange">Orange</Tag>
</CodeResult>

<h3 id="sizes">Sizes</h3>

<CodeBlock
	code={`
    <Tag size="x-small">Extra Small</Tag>
    <Tag size="small">Small</Tag>
    <Tag size="medium">Medium</Tag>
    <Tag size="large">Large</Tag>
`}
/>

<CodeResult white>
	<Tag size="x-small">Extra Small</Tag>
	<Tag size="small">Small</Tag>
	<Tag size="medium">Medium</Tag>
	<Tag size="large">Large</Tag>
</CodeResult>

<h3 id="slots">Slots</h3>

<p>Start and end slots can be used to add icons or other elements to the tag.</p>

<CodeBlock
	code={`
    <Tag>
        <IconJournalText slot="start" size={12} />
        Draft
    </Tag>
`}
/>

<CodeResult white>
	<div style="margin-bottom: 10px;">
		<Tag size="x-small" color="orange">
			{#snippet start()}
						<IconJournalText  size={10} />
					{/snippet}
			Draft
		</Tag>
		<Tag size="x-small" color="green">
			{#snippet start()}
						<IconCheck  size={12} />
					{/snippet}
			Published
		</Tag>
		<Tag size="x-small" color="blue">
			{#snippet start()}
						<IconHourglass  size={10} />
					{/snippet}
			Scheduled
		</Tag>
	</div>

	<div style="margin-bottom: 10px;">
		<Tag size="small" color="orange">
			{#snippet start()}
						<IconJournalText  size={11} />
					{/snippet}
			Draft
		</Tag>
		<Tag size="small" color="green">
			{#snippet start()}
						<IconCheck  size={14} />
					{/snippet}
			Published
		</Tag>
		<Tag size="small" color="blue">
			{#snippet start()}
						<IconHourglass  size={11} />
					{/snippet}
			Scheduled
		</Tag>
	</div>

	<div style="margin-bottom: 10px;">
		<Tag color="orange">
			{#snippet start()}
						<IconJournalText  size={12} />
					{/snippet}
			Draft
		</Tag>
		<Tag color="green">
			{#snippet start()}
						<IconCheck  size={14} />
					{/snippet}
			Published
		</Tag>
		<Tag color="blue">
			{#snippet start()}
						<IconHourglass  size={12} />
					{/snippet}
			Scheduled
		</Tag>
	</div>

	<div style="margin-bottom: 10px;">
		<Tag size="large" color="orange">
			{#snippet start()}
						<IconJournalText  size={14} />
					{/snippet}
			Draft
		</Tag>
		<Tag size="large" color="green">
			{#snippet start()}
						<IconCheck  size={16} />
					{/snippet}
			Published
		</Tag>
		<Tag size="large" color="blue">
			{#snippet start()}
						<IconHourglass  size={14} />
					{/snippet}
			Scheduled
		</Tag>
		<div style="margin-bottom: 10px;"></div>
	</div></CodeResult
>

<CodeBlock
	code={`
    <Tag>
        Loading<Loader size="small" slot="end" invert />
    </Tag>
`}
/>

<CodeResult>
	<Tag>
		Loading
		{#snippet end()}
				<Loader size="small"  colorTrack="transparent" />
			{/snippet}
	</Tag>
</CodeResult>

<h3 id="interactive">Interactive</h3>

<p>
	Set the <code>interactive</code> property to <code>true</code> to add a hover effect and a pointer
	cursor.
</p>

<CodeBlock
	code={`
    <Tag interactive>Default</Tag>
    <Tag interactive color="green">Green</Tag>
    <Tag interactive color="red">Red</Tag>
    <Tag interactive color="blue">Blue</Tag>
    <Tag interactive color="orange">Orange</Tag>

    <Tag interactive outline>Default</Tag>
    <Tag interactive outline color="green">Green</Tag>
    <Tag interactive outline color="red">Red</Tag>
    <Tag interactive outline color="blue">Blue</Tag>
    <Tag interactive outline color="orange">Orange</Tag>
`}
/>

<CodeResult white>
	<Tag interactive>Default</Tag>
	<Tag interactive color="accent">Accent</Tag>
	<Tag interactive color="green">Green</Tag>
	<Tag interactive color="red">Red</Tag>
	<Tag interactive color="blue">Blue</Tag>
	<Tag interactive color="orange">Orange</Tag>

	<div style:height="10px"></div>

	<Tag interactive outline>Default</Tag>
	<Tag interactive outline color="accent">Accent</Tag>
	<Tag interactive outline color="green">Green</Tag>
	<Tag interactive outline color="red">Red</Tag>
	<Tag interactive outline color="blue">Blue</Tag>
	<Tag interactive outline color="orange">Orange</Tag>
</CodeResult>

<h3 id="disabled">Disabled</h3>

<p>
	Set the <code>disabled</code> property to <code>true</code> to disable the tag.
</p>

<CodeBlock
	code={`
    <Tag disabled>Default</Tag>
    <Tag disabled color="accent">Accent</Tag>
    <Tag disabled color="green">Green</Tag>
    <Tag disabled color="red">Red</Tag>
    <Tag disabled color="blue">Blue</Tag>
    <Tag disabled color="orange">Orange</Tag>

    <Tag disabled outline>Default</Tag>
    <Tag disabled outline color="green">Green</Tag>
    <Tag disabled outline color="red">Red</Tag>
    <Tag disabled outline color="blue">Blue</Tag>
    <Tag disabled outline color="orange">Orange</Tag>
`}
/>

<CodeResult white>
	<Tag disabled>Default</Tag>
	<Tag disabled color="accent">Accent</Tag>
	<Tag disabled interactive color="green">Green</Tag>
	<Tag disabled interactivecolor="red">Red</Tag>
	<Tag disabled color="blue">Blue</Tag>
	<Tag disabled color="orange">Orange</Tag>

	<div style:height="10px"></div>

	<Tag disabled outline>Default</Tag>
	<Tag disabled outline color="accent">Accent</Tag>
	<Tag disabled outline color="green">Green</Tag>
	<Tag disabled outline color="red">Red</Tag>
	<Tag disabled outline color="blue">Blue</Tag>
	<Tag disabled outline color="orange">Orange</Tag>
</CodeResult>

<h3 id="custom">Custom colors</h3>

<p>
	You can use the <code>bg</code> and <code>fg</code> properties to set custom background and text colors.
</p>

<CodeBlock
	code={`
    <Tag 
        bg="var(--green-light)" 
        fg="var(--green)"
    >Custom</Tag>
`}
/>

<CodeResult white>
	<Tag bg="var(--green-light)" fg="var(--green)">Custom</Tag>
</CodeResult>
