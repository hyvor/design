<script>
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import Usage from '$lib/components/Usage/Usage.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
</script>

<h1>Usage</h1>

<p>A simple component to show usage of a metric (e.g. storage) in a bar.</p>

<h2 id="props">Properties</h2>

<Table columns="2fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>name</code></div>
		<div></div>
		<div>The name of the metric.</div>
	</TableRow>

	<TableRow>
		<div><code>current</code></div>
		<div></div>
		<div>Current value of the metric.</div>
	</TableRow>

	<TableRow>
		<div><code>limit</code></div>
		<div></div>
		<div>Maximum value of the metric.</div>
	</TableRow>

	<TableRow>
		<div><code>bytes</code></div>
		<div><code>false</code></div>
		<div>Whether to format the values are in bytes.</div>
	</TableRow>

	<TableRow>
		<div><code>warningPercentage</code></div>
		<div><code>85</code></div>
		<div>Percentage at which the color changes to orange.</div>
	</TableRow>

	<TableRow>
		<div><code>dangerPercentage</code></div>
		<div><code>95</code></div>
		<div>Percentage at which the color changes to red.</div>
	</TableRow>

	<TableRow>
		<div><code>notIncludedText</code></div>
		<div>Your license does not include this feature.</div>
		<div>Text to show when the feature is not included in the license (limit is 0).</div>
	</TableRow>
</Table>

<h2 id="examples">Examples</h2>

<CodeBlock
	code={`
<Usage name="Storage" current={100000000} limit={1000000000} bytes />
<Usage name="Users" current={85} limit={100} />
<Usage name="Websites" current={10} limit={10} />
<Usage name="Websites" current={0} limit={0} />
`}
/>

<CodeResult>
	<Usage name="Storage" current={100000000} limit={1000000000} bytes />
	<Usage name="Users" current={85} limit={100} />
	<Usage name="Websites" current={10} limit={10} />
	<Usage name="Websites" current={0} limit={0} />
</CodeResult>
