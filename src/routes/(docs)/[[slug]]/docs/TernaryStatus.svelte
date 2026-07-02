<script lang="ts">
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import TernaryStatus from '$lib/components/TernaryStatus/TernaryStatus.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import IconStarFill from '@hyvor/icons/IconStarFill';
	import IconHeartFill from '@hyvor/icons/IconHeartFill';
</script>

<h1>TernaryStatus</h1>

<p>
	The <code>{'<TernaryStatus>'}</code> component displays a positive, negative, or neutral status with
	an icon and label. It is designed for comparison tables and feature lists where you need to communicate
	yes / no / partial support at a glance.
</p>

<h2 id="props">Properties</h2>

<Table columns="1fr 1fr 2fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>
	<TableRow>
		<div><code>status</code></div>
		<div></div>
		<div>
			One of <code>positive</code>, <code>negative</code>, or
			<code>neutral</code>. Controls the default icon and color.
		</div>
	</TableRow>
	<TableRow>
		<div><code>text</code></div>
		<div><code>Yes</code>/<code>No</code></div>
		<div>
			Defaults to <code>"Yes"</code> for positive and
			<code>"No"</code> for negative. Defaults to an empty string for neutral. Pass
			<code>text=""</code> to suppress the label entirely.
		</div>
	</TableRow>
	<TableRow>
		<div><code>showIcon</code></div>
		<div><code>true</code></div>
		<div>
			Set to <code>false</code> to hide the icon and show only the text label.
		</div>
	</TableRow>
	<TableRow>
		<div><code>iconSize</code></div>
		<div><code>20</code></div>
		<div>Size of the default icon in pixels.</div>
	</TableRow>
	<TableRow>
		<div><code>fontSize</code></div>
		<div></div>
		<div>CSS font-size value applied to the component (e.g. <code>"14px"</code>).</div>
	</TableRow>
	<TableRow>
		<div><code>color</code></div>
		<div></div>
		<div>
			Overrides the default color. Defaults are <code>var(--green)</code> for positive,
			<code>var(--red)</code> for negative, and <code>var(--text)</code> for neutral.
		</div>
	</TableRow>
	<TableRow>
		<div><code>icon</code></div>
		<div></div>
		<div>Replaces the default icon.</div>
	</TableRow>
</Table>

<h2 id="examples">Examples</h2>

<h3 id="examples-default">Default statuses</h3>

<CodeBlock
	code={`
    <TernaryStatus status="positive" />
    <TernaryStatus status="negative" />
    <TernaryStatus status="neutral" text="Depends on host" />
`}
/>

<CodeResult gap={12}>
	<TernaryStatus status="positive" />
	<TernaryStatus status="negative" />
	<TernaryStatus status="neutral" text="Depends on host" />
</CodeResult>

<h3 id="examples-no-icon">Without icon</h3>

<p>
	Set <code>showIcon={false}</code> to render text only — useful when you want a cleaner look or the
	icon adds no extra meaning in context.
</p>

<CodeBlock
	code={`
    <TernaryStatus status="positive" showIcon={false} />
    <TernaryStatus status="negative" showIcon={false} />
    <TernaryStatus status="neutral" text="Plugin required" showIcon={false} />
`}
/>

<CodeResult gap={12}>
	<TernaryStatus status="positive" showIcon={false} />
	<TernaryStatus status="negative" showIcon={false} />
	<TernaryStatus status="neutral" text="Plugin required" showIcon={false} />
</CodeResult>

<h3 id="examples-custom-text">Custom text</h3>

<CodeBlock
	code={`
    <TernaryStatus status="positive" text="Included" />
    <TernaryStatus status="negative" text="Not available" />
    <TernaryStatus status="neutral" text="Plugin required" />
`}
/>

<CodeResult gap={12}>
	<TernaryStatus status="positive" text="Included" />
	<TernaryStatus status="negative" text="Not available" />
	<TernaryStatus status="neutral" text="Plugin required" />
</CodeResult>

<h3 id="examples-sizes">Icon size &amp; font size</h3>

<CodeBlock
	code={`
    <TernaryStatus status="positive" iconSize={16} fontSize="13px" />
    <TernaryStatus status="positive" />
    <TernaryStatus status="positive" iconSize={28} fontSize="18px" />
`}
/>

<CodeResult gap={12}>
	<TernaryStatus status="positive" iconSize={16} fontSize="13px" />
	<TernaryStatus status="positive" />
	<TernaryStatus status="positive" iconSize={28} fontSize="18px" />
</CodeResult>

<h3 id="examples-color">Custom color</h3>

<CodeBlock
	code={`
    <TernaryStatus status="positive" color="var(--accent)" />
    <TernaryStatus status="negative" color="var(--orange)" text="Limited" />
    <TernaryStatus status="neutral" text="Coming soon" color="var(--blue)" />
`}
/>

<CodeResult gap={12}>
	<TernaryStatus status="positive" color="var(--accent)" />
	<TernaryStatus status="negative" color="var(--orange)" text="Limited" />
	<TernaryStatus status="neutral" text="Coming soon" color="var(--blue)" />
</CodeResult>

<h3 id="examples-custom-icon">Custom icon</h3>

<p>Use the <code>icon</code> snippet to replace the default icon entirely.</p>

<CodeBlock
	code={`
    <TernaryStatus status="positive" text="Top pick">
        {#snippet icon()}
            <IconStarFill size={20} />
        {/snippet}
    </TernaryStatus>

    <TernaryStatus status="positive" text="Loved by users">
        {#snippet icon()}
            <IconHeartFill size={20} />
        {/snippet}
    </TernaryStatus>
`}
/>

<CodeResult gap={12}>
	<TernaryStatus status="positive" text="Top pick">
		{#snippet icon()}
			<IconStarFill size={20} />
		{/snippet}
	</TernaryStatus>

	<TernaryStatus status="positive" text="Loved by users">
		{#snippet icon()}
			<IconHeartFill size={20} />
		{/snippet}
	</TernaryStatus>
</CodeResult>
