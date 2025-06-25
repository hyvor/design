<script>
	import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte";
	import DetailCard from "$lib/components/DetailCard/DetailCard.svelte";
	import DetailCards from "$lib/components/DetailCard/DetailCards.svelte";
	import Tag from "$lib/components/Tag/Tag.svelte";
	import CodeResult from "./Helper/CodeResult.svelte";

</script>
<h1>Detail Card</h1>

<p>
    Detail cards are used to display some key information about a specific entity.
</p>

<h2 id="example">Example</h2>

<h3 id="single-card">Single Card</h3>

<CodeBlock code={`
    <DetailCard
        label="To"
        content="support@hyvor.com" 
    />
`} />

<DetailCard
    label="To"
    content="support@hyvor.com" 
/>

<h3 id="single-card">Card Grid</h3>

<CodeBlock code={`
    <DetailCards min={200}>
        <DetailCard label="From" content="user@example.com" />
        <DetailCard label="To"content="support@hyvor.com" />
        <DetailCard label="Subject" content="Hello, HYVOR Support!" />
        <DetailCard label="Status">
            <Tag color="green" size="small">Sent</Tag>
        </DetailCard>
    </DetailCards>
`} />

<DetailCards min={200}>
    <DetailCard
        label="From"
        content="user@example.com" 
    />
    <DetailCard
        label="To"
        content="support@hyvor.com" 
    />
    <DetailCard
        label="Subject"
        content="Hello, HYVOR Support!" 
    />
    <DetailCard
        label="Status"
    >
        <Tag color="green" size="small">Sent</Tag>
    </DetailCard>
</DetailCards>