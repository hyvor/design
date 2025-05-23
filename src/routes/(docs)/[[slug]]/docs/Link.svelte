<script lang="ts">
	import Link from '$lib/components/Link/Link.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import IconBoxArrowUpRight from '@hyvor/icons/IconBoxArrowUpRight';
	import IconHouse from '@hyvor/icons/IconHouse';
</script>

<h1>Link</h1>

<p>
	This component is a wrapper around the <code>&lt;a&gt;</code> tag. By default, we remove all
	styles from the default <code>{'<a>'}</code> tag. You can use this component to create links with
	styles like link color.
</p>

<h2 id="props">Properties</h2>

<Table columns="2fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>color</code></div>
		<div><code>link</code></div>
		<div>
			The color of the link. One of:

			<ul>
				<li><code>link</code></li>
				<li><code>accent</code></li>
				<li><code>text</code></li>
			</ul>
		</div>
	</TableRow>

	<TableRow>
		<div><code>underline</code></div>
		<div><code>true</code></div>
		<div>Whether the link should be underlined.</div>
	</TableRow>
</Table>

<p>
	All additional props you pass to this component will be passed to the <code>{'<a>'}</code> tag.
</p>

<h2 id="examples">Examples</h2>

<CodeBlock
	code={`
    <Link href="/" color="link">Link</Link>
    <Link href="/" color="accent">Accent Link</Link>
    <Link href="/" color="text">Text Link</Link>
    <Link href="/" color="link" underline={false}>No underline</Link>
`}
/>

<div class="no-link-color">
	<CodeResult gap={5}>
		<Link href="/" color="link">Link</Link>
		<Link href="/" color="accent">Accent Link</Link>
		<Link href="/" color="text">Text Link</Link>
		<Link href="/" color="link" underline={false}>No underline</Link>
	</CodeResult>
</div>

<h2 id="slots">Slots</h2>

<h3 id="start">Start Slot</h3>

<CodeBlock
	code={`
    <Link href="/"><IconHouse slot="start" />Home</Link>
    <Link href="/" underline={false}><IconHouse slot="start" />Home</Link>
`}
/>

<div class="no-link-color">
	<CodeResult gap={6}>
		<Link href="/">
			{#snippet start()}
				<IconHouse />
			{/snippet}
			Home
		</Link>
		<Link href="/" underline={false}>
			{#snippet start()}
				<IconHouse />
			{/snippet}
			Home
		</Link>
	</CodeResult>
</div>

<h3 id="end">End Slot</h3>

<CodeBlock
	code={`
    <Link href="/" target="_blank">
        Open
        <IconBoxArrowUpRight slot="end" />
    </Link>
    <Link href="/" target="_blank" underline={false} >
        Open
        <IconBoxArrowUpRight slot="end" />
    </Link>
`}
/>

<div class="no-link-color">
	<CodeResult gap={6}>
		<Link href="/" target="_blank"
			>Open{#snippet end()}
				<IconBoxArrowUpRight />
			{/snippet}</Link
		>
		<Link href="/" underline={false} target="_blank"
			>Open{#snippet end()}
				<IconBoxArrowUpRight />
			{/snippet}</Link
		>
	</CodeResult>
</div>
