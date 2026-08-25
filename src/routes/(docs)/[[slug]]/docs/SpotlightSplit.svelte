<script lang="ts">
	import SpotlightSplit from '$lib/marketing/SpotlightSplit/SpotlightSplit.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import GdprSeal from '$lib/marketing/Seal/GdprSeal.svelte';
	import CcpaSeal from '$lib/marketing/Seal/CcpaSeal.svelte';
	import SsoSeal from '$lib/marketing/Seal/SsoSeal.svelte';
	import IsoSeal from '$lib/marketing/Seal/IsoSeal.svelte';
	import IconQuote from '@hyvor/icons/IconQuote';
</script>

<h1>Spotlight Split</h1>

<p>
	A dark, full-width section with an animated grid background that lights up around the cursor: a
	text column (title, description, a small stat row, a button) on one side, and a free-form
	<code>content</code> snippet on the other. It isn't tied to any one topic: the content side can hold
	compliance seals, a logo wall, a quote, stat cards, or anything else that fits a dark panel.
</p>

<h2>Properties</h2>

<Table columns="1fr 1fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>title</code></div>
		<div></div>
		<div><b>Required.</b> The section heading. <code>string | Snippet</code>.</div>
	</TableRow>

	<TableRow>
		<div><code>description</code></div>
		<div><code>''</code></div>
		<div>Optional paragraph under the title.</div>
	</TableRow>

	<TableRow>
		<div><code>stats</code></div>
		<div><code>[]</code></div>
		<div>
			A row of short strings shown as small highlights, e.g. <code>"99.9% Uptime"</code>.
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
		<div><code>content</code></div>
		<div></div>
		<div>
			<b>Required.</b> Snippet for the other column. Not limited to any particular shape; lay out whatever
			fits (a grid of icons, a logo wall, a single quote, stat cards, ...).
		</div>
	</TableRow>

	<TableRow>
		<div><code>reverse</code></div>
		<div><code>false</code></div>
		<div>Swaps the text and content columns (content on the left).</div>
	</TableRow>

	<TableRow>
		<div><code>background</code></div>
		<div><code>var(--accent)</code></div>
		<div>
			The section's background color. Any CSS color works: a hex value (<code>"#574443"</code>),
			another theme variable (<code>"var(--red)"</code>), <code>rgb()</code>/<code>hsl()</code>,
			etc.
		</div>
	</TableRow>

	<TableRow>
		<div><code>highlightColor</code></div>
		<div><code>rgba(255, 238, 217, 0.9)</code></div>
		<div>
			Color of the grid lines that light up around the cursor. Pair it with <code>background</code>.
		</div>
	</TableRow>
</Table>

<h2>Example: compliance seals</h2>

<p>
	The use case this section was first built for: an enterprise/security callout. The seal badges (<code
		>GdprSeal</code
	>, <code>CcpaSeal</code>, <code>SsoSeal</code>, <code>IsoSeal</code>) ship as ready-made presets
	built on the generic <code>Seal</code> component, which takes a
	<code>size</code>, an optional <code>pending</code> state (dashed border, muted colors, e.g. for a certification
	that's still in progress), and any content as children.
</p>

<CodeBlock
	code={`
		<SpotlightSplit
			title="Enterprise-ready."
			description="Enterprise-grade security and compliance, without adding complexity to your publishing workflow."
			stats={['> 99.9% Uptime', 'Priority Support']}
			button={{ href: 'https://hyvor.com/enterprise', label: 'Contact Sales', external: true }}
			background="#574443"
		>
			{#snippet content()}
				<div class="seal-grid">
					<GdprSeal />
					<CcpaSeal />
					<SsoSeal />
					<IsoSeal />
				</div>
			{/snippet}
		</SpotlightSplit>
	`}
/>

<CodeResult white>
	<SpotlightSplit
		title="Enterprise-ready."
		description="Enterprise-grade security and compliance, without adding complexity to your publishing workflow."
		stats={['> 99.9% Uptime', 'Priority Support']}
		button={{ href: 'https://hyvor.com/enterprise', label: 'Contact Sales', external: true }}
		background="#574443"
	>
		{#snippet content()}
			<div class="seal-grid">
				<GdprSeal />
				<CcpaSeal />
				<SsoSeal />
				<IsoSeal />
			</div>
		{/snippet}
	</SpotlightSplit>
</CodeResult>

<h2>Example: a quote, reversed</h2>

<p>
	The same section works for unrelated content too, here a single pull quote, with
	<code>reverse</code> putting it on the left.
</p>

<CodeBlock
	code={`
		<SpotlightSplit
			title="Built by writers, for writers."
			description="Every part of the editor was shaped by feedback from people who publish daily."
			button={{ href: '/console?signup', label: 'Start writing' }}
			background="#2b2440"
			highlightColor="rgba(216, 200, 255, 0.9)"
			reverse
		>
			{#snippet content()}
				<div class="quote hds-box">
					<IconQuote size={22} />
					<p>"The fastest editor I've used for long-form posts, by a wide margin."</p>
					<span>A Hyvor Blogs user</span>
				</div>
			{/snippet}
		</SpotlightSplit>
	`}
/>

<CodeResult white>
	<SpotlightSplit
		title="Built by writers, for writers."
		description="Every part of the editor was shaped by feedback from people who publish daily."
		button={{ href: '/console?signup', label: 'Start writing' }}
		background="#2b2440"
		highlightColor="rgba(216, 200, 255, 0.9)"
		reverse
	>
		{#snippet content()}
			<div class="quote hds-box">
				<IconQuote size={22} />
				<p>"The fastest editor I've used for long-form posts, by a wide margin."</p>
				<span>A Hyvor Blogs user</span>
			</div>
		{/snippet}
	</SpotlightSplit>
</CodeResult>

<style>
	.seal-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}

	.quote {
		width: 320px;
		max-width: 100%;
		padding: 28px;
		color: var(--text-light);
	}

	.quote p {
		font-size: 17px;
		line-height: 1.6;
		color: var(--text);
		margin: 14px 0 10px;
	}

	.quote span {
		font-size: 13px;
	}
</style>
