<script lang="ts">
	import FAQ from '$lib/marketing/FAQ/FAQ.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import CodeResult from './Helper/CodeResult.svelte';

	const faqItems = [
		{ q: 'Is there a free trial?', a: 'Yes, every plan starts with a 14-day free trial.' },
		{ q: 'Can I cancel anytime?', a: 'Yes, there are no long-term contracts.' },
		{
			q: 'Do you offer discounts?',
			a: 'Yes, see our <a href="/pricing">pricing page</a> for details.'
		},
		{
			q: 'Is my data secure?',
			a: 'Yes, see our <a href="/security">security page</a> for details.'
		}
	];
</script>

<h1>FAQ</h1>

<p>
	A two-column accordion of frequently asked questions. Unlike the other homepage sections, this one
	isn't full-bleed, so wrap it in your own heading and a <code>.hds-container</code>, as shown in
	the example.
</p>

<h2>Properties</h2>

<Table columns="1fr 1fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>items</code></div>
		<div></div>
		<div>
			Required. An array of <code>{'{ q, a }'}</code>. <code>a</code> is rendered as HTML, and used verbatim
			as the rich schema's answer text.
		</div>
	</TableRow>

	<TableRow>
		<div><code>columns</code></div>
		<div><code>2</code></div>
		<div>
			<code>1</code> or <code>2</code>. Items are split left-to-right, top-to-bottom within each
			column. Regardless of this setting, the layout always collapses to a single column below
			768px, so mobile visitors never see a cramped two-column grid.
		</div>
	</TableRow>

	<TableRow>
		<div><code>richSchema</code></div>
		<div><code>true</code></div>
		<div>
			Emits a <code>FAQPage</code> JSON-LD rich schema into <code>{'<svelte:head>'}</code>,
			generated straight from <code>items</code>, for Google's FAQ rich results.
		</div>
	</TableRow>
</Table>

<h2>Example</h2>

<CodeBlock
	code={`
		<div class="hds-container">
			<h2>Frequently asked questions</h2>
			<FAQ
				items={[
					{ q: 'Is there a free trial?', a: 'Yes, every plan starts with a 14-day free trial.' },
					{ q: 'Can I cancel anytime?', a: 'Yes, there are no long-term contracts.' },
					{
						q: 'Do you offer discounts?',
						a: 'Yes, see our <a href="/pricing">pricing page</a> for details.'
					},
					{
						q: 'Is my data secure?',
						a: 'Yes, see our <a href="/security">security page</a> for details.'
					}
				]}
			/>
		</div>
	`}
/>

<CodeResult white>
	<div class="hds-container">
		<h2 class="faq-title">Frequently asked questions</h2>
		<FAQ items={faqItems} />
	</div>
</CodeResult>

<style>
	.faq-title {
		text-align: center;
	}
</style>
