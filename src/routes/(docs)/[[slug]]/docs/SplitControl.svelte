<script lang="ts">
	import SplitControl from '$lib/components/SplitControl/SplitControl.svelte';
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import Label from '$lib/components/FormControl/Label.svelte';
	import Caption from '$lib/components/FormControl/Caption.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import Switch from '$lib/components/Switch/Switch.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
</script>

<h1>Split Control</h1>

<p>
	Split controls are commonly used in HYVOR for settings and configuration options. They are a
	combination of a label/caption (left side) and a control (right side) such as a text input,
	checkbox, or select. On mobile, the label/caption is displayed above the control.
</p>

<h2 id="props">Properties</h2>

<Table columns="1fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>label</code></div>
		<div>The label to display on the left side of the split control.</div>
	</TableRow>

	<TableRow>
		<div><code>caption</code></div>
		<div>
			The caption to display on the left side of the split control. This is displayed below the
			label, and is usually used to provide more information about the control.
		</div>
	</TableRow>

	<TableRow>
		<div><code>flex</code></div>
		<div>
			Set flex values of the left and right sides of the split control. The default value is <code
				>[1,2]</code
			>.
		</div>
	</TableRow>
</Table>

<h2 id="props">Slots</h2>

<Table columns="1fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>default</code></div>
		<div>The control to display on the right side of the split control.</div>
	</TableRow>

	<TableRow>
		<div><code>label</code></div>
		<div>
			This can be used instead of the <code>label</code> property.
		</div>
	</TableRow>

	<TableRow>
		<div><code>caption</code></div>
		<div>
			This can be used instead of the <code>caption</code> property.
		</div>
	</TableRow>

	<TableRow>
		<div><code>nested</code></div>
		<div>
			To nest split controls inside of other split controls. See <a href="#nested"
				>Nested Split Controls</a
			> below.
		</div>
	</TableRow>
</Table>

<h2 id="examples">Examples</h2>

<h3 id="basic-split-control">Basic Split Control</h3>

<CodeBlock
	code={`
    <SplitControl 
        label="Language"
        caption="The language to use for the site."
    >
        <TextInput />
    </SplitControl>
`}
/>

<CodeResult white>
	<SplitControl label="Language" caption="The language to use for the site.">
		<TextInput type="text" block value="English" />
	</SplitControl>
</CodeResult>

<h3 id="splots-for-label-caption">Using Slots for Label and Caption</h3>

<p>
	You can use slots for the label and caption if you need to add more complex content. <code
		>&lt;Label&gt;</code
	>
	and <code>&lt;Caption&gt;</code>
	components (see <a href="/form-control">Form Control</a>) or any other element/component can be
	used in the slots.
</p>

<CodeBlock
	code={`
    <SplitControl>
        <Label slot="label">Spam Detection</Label>
        <Caption slot="caption">Check for spam in comments</Caption>
        <Switch />
    </SplitControl>
`}
/>

<CodeResult white>
	<SplitControl>
		{#snippet label()}
			<Label>Spam Detection</Label>
		{/snippet}
		{#snippet caption()}
			<Caption>Check for spam in comments</Caption>
		{/snippet}
		<Switch />
	</SplitControl>
</CodeResult>

<h3 id="nested">Nested Split Controls</h3>

<p>
	You can nest split controls inside of other split controls by adding nested content inside the <code
		>nested</code
	> slot. The parent split control may or may not have a control on the right side. The nested split
	controls will be indented.
</p>

<CodeBlock
	code={`
    <SplitControl label="Guest Commenting" caption="Comment without logging in">
        <Switch />
        <div slot="nested">
            <SplitControl label="Guest Comment Moderation" caption="Moderate guest comments before they are published.">
                <Switch />
            </SplitControl>
        </div>
    </SplitControl>
`}
/>

<CodeResult white>
	<SplitControl label="Guest Commenting" caption="Comment without logging in">
		<Switch />
		{#snippet nested()}
			<div>
				<SplitControl
					label="Guest Comment Moderation"
					caption="Moderate guest comments before they are published."
				>
					<Switch />
				</SplitControl>
			</div>
		{/snippet}
	</SplitControl>
</CodeResult>

<h3 id="flex">Flex Property</h3>

<p>
	You can set the the flex values for the left and right sides of the split control using the <code
		>flex</code
	>
	property. The default value is
	<code>[1,2]</code>.
</p>

<CodeBlock
	code={`
    <SplitControl 
        label="Name"
        caption="The name of the site."
        flex={[1,1]}
    >
        <TextInput 
            type="text"
            value="HYVOR"
            block
        />
    </SplitControl>
`}
/>

<CodeResult white>
	<SplitControl label="Name" caption="The name of the site." flex={[1, 1]}>
		<TextInput type="text" value="HYVOR" block />
	</SplitControl>
</CodeResult>

<h3 id="column">Column Property</h3>

<p>
	You can set the split control to display as a column using the <code>column</code> property.
</p>

<CodeBlock
	code={`
    <SplitControl 
        label="Name"
        caption="The name of the site."
        column
    >
        <TextInput 
            type="text"
            value="HYVOR"
            block
        />
    </SplitControl>
`}
/>

<CodeResult white>
	<SplitControl label="Name" caption="The name of the site." column>
		<TextInput type="text" value="HYVOR" block />
	</SplitControl>
</CodeResult>
