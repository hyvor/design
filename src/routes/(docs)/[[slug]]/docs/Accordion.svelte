<script lang="ts">
	import Accordion from '$lib/components/Accordion/Accordion.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import CodeResult from './Helper/CodeResult.svelte';

	let show = $state(true);
	let loading = $state(false);

	function onButtonClick() {
		loading = true;
		setTimeout(() => {
			loading = false;
			show = false;
		}, 1000);
	}
</script>

<h1>Accordion</h1>
<p>
	A collapsible section with a header, content area, and an optional footer action button. Commonly
	used for step-by-step flows where each step is confirmed with a button.
</p>

<h2>Properties</h2>
<Table columns="2fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>show</code></div>
		<div><code>false</code></div>
		<div>Whether the accordion is expanded.</div>
	</TableRow>

	<TableRow>
		<div><code>title</code></div>
		<div></div>
		<div>The title shown in the header.</div>
	</TableRow>

	<TableRow>
		<div><code>belowTitle</code></div>
		<div></div>
		<div>A snippet or string shown below the title.</div>
	</TableRow>

	<TableRow>
		<div><code>buttonText</code></div>
		<div></div>
		<div>The text of the footer action button.</div>
	</TableRow>

	<TableRow>
		<div><code>buttonDisabled</code></div>
		<div></div>
		<div>Whether the footer action button is disabled.</div>
	</TableRow>

	<TableRow>
		<div><code>onButtonClick</code></div>
		<div></div>
		<div>Called when the footer action button is clicked.</div>
	</TableRow>

	<TableRow>
		<div><code>onToggle</code></div>
		<div></div>
		<div>Called when the header is clicked to expand or collapse the accordion.</div>
	</TableRow>

	<TableRow>
		<div><code>toggleLocked</code></div>
		<div><code>false</code></div>
		<div>When true, clicking the header does not toggle the accordion.</div>
	</TableRow>

	<TableRow>
		<div><code>complete</code></div>
		<div></div>
		<div>Marks the accordion as complete, applying the <code>complete</code> style.</div>
	</TableRow>

	<TableRow>
		<div><code>footer</code></div>
		<div><code>true</code></div>
		<div>Whether to show the footer with the action button.</div>
	</TableRow>

	<TableRow>
		<div><code>loading</code></div>
		<div><code>false</code></div>
		<div>
			Shows a loader next to the footer action button and disables it. Bindable with
			<code>bind:loading</code>.
		</div>
	</TableRow>
</Table>

<h2>Example</h2>

<CodeBlock
	code={`
      <Accordion
         title="Step 1"
         show={show}
         buttonText="Continue"
         onButtonClick={() => (show = false)}
         onToggle={() => (show = !show)}
      >
         Content of the accordion.
   `}
/>

<CodeResult white>
	<Accordion
		title="Step 1"
		{show}
		{loading}
		buttonText="Continue"
		{onButtonClick}
		onToggle={() => (show = !show)}
	>
		<div class="p" style="padding: 1rem;">Content of the accordion.</div>
	</Accordion>
</CodeResult>
