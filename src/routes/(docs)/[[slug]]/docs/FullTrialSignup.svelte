<script lang="ts">
	import FullTrialSignup from '$lib/marketing/FullTrialSignup/FullTrialSignup.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
</script>

<h1>Full Trial Signup</h1>

<p>
	A closing call-to-action section: a title, a description, a button, and a row of reassurance
	checks (e.g. "No credit card required"). Use it as the last section before the footer.
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
		<div><code>"Start your trial today"</code></div>
		<div>The section heading.</div>
	</TableRow>

	<TableRow>
		<div><code>description</code></div>
		<div><code>''</code></div>
		<div>Optional paragraph under the title.</div>
	</TableRow>

	<TableRow>
		<div><code>badge</code></div>
		<div><code>null</code></div>
		<div>Small pill shown above the title.</div>
	</TableRow>

	<TableRow>
		<div><code>button</code></div>
		<div><code>null</code></div>
		<div>
			One or more <code>{'{ href, label, external? }'}</code> configs, rendered as large buttons.
		</div>
	</TableRow>

	<TableRow>
		<div><code>checks</code></div>
		<div><code>['14-day free trial', 'No credit card required', 'Cancel anytime']</code></div>
		<div>A row of short reassurance points, each shown with a check icon.</div>
	</TableRow>

	<TableRow>
		<div><code>accentColor</code></div>
		<div><code>var(--accent)</code></div>
		<div>
			Overrides the accent used by the background gradient, the badge, and the check icons, in light
			mode.
		</div>
	</TableRow>

	<TableRow>
		<div><code>accentColorDark</code></div>
		<div><code>accentColor</code></div>
		<div>
			Same as <code>accentColor</code>, used in dark mode. Falls back to
			<code>accentColor</code>, then the theme accent.
		</div>
	</TableRow>
</Table>

<p>
	Any other prop passed in (e.g. <code>id</code> or <code>class</code>) is forwarded to the root
	<code>{'<section>'}</code>.
</p>

<h2>Example</h2>

<CodeBlock
	code={`
		<FullTrialSignup
			badge="Open-source & free to try"
			title="Start your blog today"
			description="Join hundreds of bloggers and businesses building with Hyvor Blogs."
			button={{ href: '/console?signup', label: 'Start your blog →' }}
		/>
	`}
/>

<CodeResult white>
	<FullTrialSignup
		badge="Open-source & free to try"
		title="Start your blog today"
		description="Join hundreds of bloggers and businesses building with Hyvor Blogs."
		button={{ href: '/console?signup', label: 'Start your blog →' }}
	/>
</CodeResult>

<h2>Custom accent color</h2>

<CodeBlock
	code={`
		<FullTrialSignup
			accentColor="var(--red)"
			title="Start your blog today"
			button={{ href: '/console?signup', label: 'Start your blog →' }}
		/>
	`}
/>

<CodeResult white>
	<FullTrialSignup
		accentColor="var(--red)"
		title="Start your blog today"
		button={{ href: '/console?signup', label: 'Start your blog →' }}
	/>
</CodeResult>
