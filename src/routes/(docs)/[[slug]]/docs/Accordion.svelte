<script lang="ts">
	import Accordion from '$lib/components/Accordion/Accordion.svelte';
	import IconLayers from '@hyvor/icons/IconLayers';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
</script>

<h1>Accordion</h1>
<p>
	This component can be used to expand and collapse sections of content, making it easier to
	navigate and manage large amounts of information.
</p>

<h2>Properties</h2>
<Table columns="2fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>title</code></div>
		<div></div>
		<div>The title of the accordion item.</div>
	</TableRow>

	<TableRow>
		<div><code>content</code></div>
		<div></div>
		<div>The content of the accordion item. This can include HTML strings.</div>
	</TableRow>

	<TableRow>
		<div><code>open</code></div>
		<div><code>false</code></div>
		<div>A bindable boolean indicating whether the accordion item is open or closed.</div>
	</TableRow>

	<TableRow>
		<div><code>icon</code></div>
		<div></div>
		<div>An icon component to display alongside the title.</div>
	</TableRow>
</Table>

<h2>Example</h2>

<CodeBlock
	code={`
      <Accordion title="What is Accordion?" icon={IconLayers}>
         Accordion is a UI component that allows users to expand and collapse sections of content, making
         it easier to navigate and manage large amounts of information.
      </Accordion>
   `}
/>

<CodeResult white>
	<Accordion title="What is Accordion?" icon={IconLayers}>
		Accordion is a UI component that allows users to expand and collapse sections of content, making
		it easier to navigate and manage large amounts of information.
	</Accordion>
</CodeResult>
