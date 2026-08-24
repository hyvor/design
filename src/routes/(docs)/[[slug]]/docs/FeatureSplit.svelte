<script lang="ts">
	import FeatureSplit from '$lib/marketing/FeatureSplit/FeatureSplit.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import IconImage from '@hyvor/icons/IconImage';
</script>

<h1>Feature Split</h1>

<p>
	A two-column section: text (eyebrow, title, description, bullets, a button) on one side and a
	visual on the other. Stack a few of these to walk through a product's main features, alternating
	<code>flip</code> to keep the page from feeling one-sided.
</p>

<h2>Properties</h2>

<Table columns="1fr 1fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>eyebrow</code></div>
		<div></div>
		<div>
			Small label above the title, e.g. <code>"Post Editor"</code>. Required unless
			<code>left</code> is used.
		</div>
	</TableRow>

	<TableRow>
		<div><code>title</code></div>
		<div></div>
		<div>
			The section heading. <code>string | Snippet</code>, same as <a href="/hero">Hero</a>'s
			<code>title</code>.
		</div>
	</TableRow>

	<TableRow>
		<div><code>description</code></div>
		<div></div>
		<div>A paragraph under the title.</div>
	</TableRow>

	<TableRow>
		<div><code>bullets</code></div>
		<div><code>[]</code></div>
		<div>
			A list of short feature bullets, each shown with a check icon, or a Snippet to render
			something else in that spot entirely (e.g. a stat row or a mini form).
			<code>interactiveBullets</code> only applies to the <code>string[]</code> form.
		</div>
	</TableRow>

	<TableRow>
		<div><code>button</code></div>
		<div><code>null</code></div>
		<div>
			One or more <code>{'{ href, label, external? }'}</code> configs, rendered as outline buttons.
		</div>
	</TableRow>

	<TableRow>
		<div><code>visual</code></div>
		<div></div>
		<div>
			<b>Required.</b> Snippet for the other column: an image, a code block, a mock UI, etc.
			Receives
			<code>activeBullet: number</code> when <code>interactiveBullets</code> is on, so the visual can
			switch state to match the selected bullet.
		</div>
	</TableRow>

	<TableRow>
		<div><code>interactiveBullets</code></div>
		<div><code>false</code></div>
		<div>
			Makes the bullets clickable tabs that auto-advance every 5s once the section scrolls into
			view.
		</div>
	</TableRow>

	<TableRow>
		<div><code>flip</code></div>
		<div><code>false</code></div>
		<div>Swaps the text and visual columns (visual on the left).</div>
	</TableRow>

	<TableRow>
		<div><code>altBg</code></div>
		<div><code>false</code></div>
		<div>
			Gives the section an alternate background, to visually separate it from the ones around it.
		</div>
	</TableRow>

	<TableRow>
		<div><code>overlap</code></div>
		<div><code>false</code></div>
		<div>
			Lets the visual bleed under the text column (e.g. a visual with a negative margin), while
			keeping the text readable on top.
		</div>
	</TableRow>

	<TableRow>
		<div><code>max</code></div>
		<div><code>false</code></div>
		<div>
			Uses the wider <code>hds-container-max</code> instead of the default
			<code>hds-container</code>.
		</div>
	</TableRow>

	<TableRow>
		<div><code>left</code></div>
		<div></div>
		<div>
			Snippet that replaces the entire text column, when <code>eyebrow</code>/<code>title</code
			>/<code>description</code>/<code>bullets</code>/<code>button</code> aren't flexible enough.
		</div>
	</TableRow>

	<TableRow>
		<div><code>after</code></div>
		<div></div>
		<div>Snippet rendered full-width, below the split.</div>
	</TableRow>
</Table>

<h2>Example</h2>

<CodeBlock
	code={`
		<FeatureSplit
			eyebrow="Post Editor"
			title="Write without friction"
			description="A clean, distraction-free editor with everything you need to write and format posts."
			bullets={[
				'Markdown shortcuts for all the formatting you need',
				'Paste, drag and drop, or pick images from Unsplash',
				'Syntax highlighting for 100+ languages'
			]}
			button={{ href: '/console?signup', label: 'Start writing' }}
			interactiveBullets
		>
			{#snippet visual(activeBullet)}
				<div class="visual-placeholder hds-box">
					<IconImage size={40} />
					<span>Active bullet: {activeBullet + 1}</span>
				</div>
			{/snippet}
		</FeatureSplit>
	`}
/>

<CodeResult white>
	<FeatureSplit
		eyebrow="Post Editor"
		title="Write without friction"
		description="A clean, distraction-free editor with everything you need to write and format posts."
		bullets={[
			'Markdown shortcuts for all the formatting you need',
			'Paste, drag and drop, or pick images from Unsplash',
			'Syntax highlighting for 100+ languages'
		]}
		button={{ href: '/console?signup', label: 'Start writing' }}
		interactiveBullets
	>
		{#snippet visual(activeBullet)}
			<div class="visual-placeholder hds-box">
				<IconImage size={40} />
				<span>Active bullet: {activeBullet + 1}</span>
			</div>
		{/snippet}
	</FeatureSplit>
</CodeResult>

<h2>Custom content instead of bullets</h2>

<p>
	Pass a Snippet as <code>bullets</code> to render something other than a checklist in that spot, here,
	a small stat row.
</p>

<CodeBlock
	code={`
		<FeatureSplit
			eyebrow="Optimizations"
			title="Built for speed"
			description="All official themes are optimized for speed."
		>
			{#snippet bullets()}
				<div class="stats">
					<div><strong>99</strong><span>Lighthouse score</span></div>
					<div><strong>&lt;200ms</strong><span>Time to first byte</span></div>
				</div>
			{/snippet}
			{#snippet visual()}
				<div class="visual-placeholder hds-box">
					<IconImage size={40} />
				</div>
			{/snippet}
		</FeatureSplit>
	`}
/>

<CodeResult white>
	<FeatureSplit
		eyebrow="Optimizations"
		title="Built for speed"
		description="All official themes are optimized for speed."
	>
		{#snippet bullets()}
			<div class="stats">
				<div><strong>99</strong><span>Lighthouse score</span></div>
				<div><strong>&lt;200ms</strong><span>Time to first byte</span></div>
			</div>
		{/snippet}
		{#snippet visual()}
			<div class="visual-placeholder hds-box">
				<IconImage size={40} />
			</div>
		{/snippet}
	</FeatureSplit>
</CodeResult>

<style>
	.visual-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
		height: 220px;
		color: var(--text-light);
		font-size: 13px;
	}

	.stats {
		display: flex;
		gap: 32px;
		margin-bottom: 32px;
	}

	.stats strong {
		display: block;
		font-size: 28px;
		font-family: var(--font-serif);
	}

	.stats span {
		color: var(--text-light);
		font-size: 13px;
	}
</style>
