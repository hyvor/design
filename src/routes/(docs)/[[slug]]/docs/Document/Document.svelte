<script>
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
</script>

<h1>Document</h1>
<p>
	This component is used for documents such as privacy policy, terms of service, etc. It supports
	headings, paragraphs, lists, and hr tags.
</p>

<CodeBlock
	code={`
    <` +
		`script lang="ts">
        import { Document } from '@hyvor/design/marketing';
    </` +
		`script>

    <Document title="Titles goes here" subtitle="Subtitle goes here">

        <p>Content goes here</p>
        <h2 id="heading-2">Heading 2</h2>
        
    </Document>
`}
	language="svelte"
/>
