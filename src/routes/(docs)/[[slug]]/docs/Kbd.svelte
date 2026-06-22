<script lang="ts">
	import Kbd from '$lib/components/Kbd/Kbd.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import Button from '$lib/components/Button/Button.svelte';
</script>

<h1>Kbd</h1>

<p>
	The <code>{'<Kbd>'}</code> component renders keyboard shortcuts using the semantic
	<code>{'<kbd>'}</code>
	element. It handles platform-specific formatting. Mac uses symbols with no separator, other platforms
	use full names with <code>+</code>.
</p>

<h3 id="props">Properties</h3>

<Table columns="1fr 1fr 2fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>
	<TableRow>
		<div><code>keys</code></div>
		<div></div>
		<div>
			A single key string or an array of key strings. Modifier keys (<code>mod</code>,
			<code>ctrl</code>, <code>alt</code>, <code>shift</code>, <code>meta</code>) are recognized and
			formatted for the current platform.
		</div>
	</TableRow>
	<TableRow>
		<div><code>size</code></div>
		<div><code>small</code></div>
		<div>
			Size of the badge. Predefined values: <code>small</code>, <code>medium</code>,
			<code>large</code>. Any CSS <code>font-size</code> value (e.g. <code>"14px"</code>,
			<code>"1rem"</code>) is also accepted as a custom size.
		</div>
	</TableRow>
</Table>

<h3 id="sizes">Sizes</h3>

<CodeBlock
	code={`
    <Kbd keys="s" size="small" />
    <Kbd keys="s" size="medium" />
    <Kbd keys="s" size="large" />
    <Kbd keys="s" size="1.2rem" />
`}
/>

<CodeResult white>
	<div style="display: flex; gap: 8px; align-items: center;">
		<Kbd keys="s" size="small" />
		<Kbd keys="s" size="medium" />
		<Kbd keys="s" size="large" />
		<Kbd keys="s" size="1.2rem" />
	</div>
</CodeResult>

<h3 id="single-key">Single key</h3>

<CodeBlock
	code={`
    <Kbd keys="s" />
    <Kbd keys="Enter" />
    <Kbd keys="Escape" />
`}
/>

<CodeResult white>
	<Kbd keys="s" />
	<Kbd keys="Enter" />
	<Kbd keys="Escape" />
</CodeResult>

<h3 id="modifier-keys">Modifier keys</h3>

<p>
	Use <code>mod</code> for the platform's primary modifier — <strong>⌘</strong> on Mac,
	<strong>Ctrl</strong> elsewhere. Use <code>ctrl</code> for literal Control on all platforms.
</p>

<CodeBlock
	code={`
    <Kbd keys={['mod', 's']} />
    <Kbd keys={['mod', 'shift', 'k']} />
    <Kbd keys={['ctrl', 's']} />
    <Kbd keys={['alt', 'F4']} />
`}
/>

<CodeResult white>
	<Kbd keys={['mod', 's']} />
	&nbsp;
	<Kbd keys={['mod', 'shift', 'k']} />
	&nbsp;
	<Kbd keys={['ctrl', 's']} />
	&nbsp;
	<Kbd keys={['alt', 'F4']} />
</CodeResult>

<h3 id="inline-badge">Inline badge</h3>

<p>
	Pair a single-letter shortcut badge with a button using the <code>start</code> snippet. The badge sizes
	to a square for single characters.
</p>

<CodeBlock
	code={`
    <Button>
        {#snippet start()}
            <Kbd keys="p" />
        {/snippet}
        Publish
    </Button>
    <Button color="red">
        {#snippet start()}
            <Kbd keys="d" />
        {/snippet}
        Delete
    </Button>
`}
/>

<CodeResult white>
	<div style="display: flex; gap: 8px; align-items: center;">
		<Button>
			{#snippet start()}
				<Kbd keys="p" />
			{/snippet}
			Publish
		</Button>
		<Button color="red">
			{#snippet start()}
				<Kbd keys="d" />
			{/snippet}
			Delete
		</Button>
		<Button color="gray">
			{#snippet start()}
				<Kbd keys="e" />
			{/snippet}
			Edit
		</Button>
	</div>
</CodeResult>

<h3 id="above-button">Above button</h3>

<p>To show the shortcut above the button label, wrap both in a flex column.</p>

<CodeBlock
	code={`
    <div style="display: inline-flex; flex-direction: column; align-items: center; gap: 4px;">
        <Kbd keys="p" />
        <Button>Publish</Button>
    </div>
`}
/>

<CodeResult white>
	<div style="display: flex; gap: 16px; align-items: flex-end;">
		<div style="display: inline-flex; flex-direction: column; align-items: center; gap: 4px;">
			<Kbd keys="p" />
			<Button>Publish</Button>
		</div>
		<div style="display: inline-flex; flex-direction: column; align-items: center; gap: 4px;">
			<Kbd keys="d" />
			<Button color="red">Delete</Button>
		</div>
		<div style="display: inline-flex; flex-direction: column; align-items: center; gap: 4px;">
			<Kbd keys="e" />
			<Button color="gray">Edit</Button>
		</div>
	</div>
</CodeResult>

<h3 id="overlapping">Overlapping</h3>

<p>
	For a badge that overlaps the top edge of the button, use <code>position: relative</code> on the
	wrapper and <code>position: absolute</code> on the <code>{'<Kbd>'}</code>.
</p>

<CodeBlock
	code={`
    <div style="position: relative; display: inline-block; margin-top: 1em;">
        <Kbd style="position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%);" keys="p" />
        <Button>Publish</Button>
    </div>
`}
/>

<CodeResult white>
	<div style="display: flex; gap: 16px; align-items: center; margin-top: 1.2em;">
		<div style="position: relative; display: inline-block;">
			<Kbd
				style="position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%);"
				keys="p"
			/>
			<Button>Publish</Button>
		</div>
		<div style="position: relative; display: inline-block;">
			<Kbd
				style="position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%);"
				keys="d"
			/>
			<Button color="red">Delete</Button>
		</div>
		<div style="position: relative; display: inline-block;">
			<Kbd
				style="position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%);"
				keys="e"
			/>
			<Button color="gray">Edit</Button>
		</div>
	</div>
</CodeResult>

<h3 id="modifier-keys-reference">Modifier key reference</h3>

<Table columns="1fr 1fr 1fr 2fr">
	<TableRow head>
		<div>Key</div>
		<div>Mac</div>
		<div>Other</div>
		<div>Notes</div>
	</TableRow>
	<TableRow>
		<div><code>mod</code></div>
		<div>⌘</div>
		<div>Ctrl</div>
		<div>Platform primary modifier</div>
	</TableRow>
	<TableRow>
		<div><code>ctrl</code></div>
		<div>⌃</div>
		<div>Ctrl</div>
		<div>Always literal Control</div>
	</TableRow>
	<TableRow>
		<div><code>alt</code></div>
		<div>⌥</div>
		<div>Alt</div>
		<div></div>
	</TableRow>
	<TableRow>
		<div><code>shift</code></div>
		<div>⇧</div>
		<div>Shift</div>
		<div></div>
	</TableRow>
	<TableRow>
		<div><code>meta</code></div>
		<div>⌘</div>
		<div>Win</div>
		<div>OS/Super key</div>
	</TableRow>
</Table>

<h3 id="platform">Platform formatting</h3>

<p>
	On Mac, modifiers are shown as symbols with no separator and in canonical order (Control → Option
	→ Shift → Command). On other platforms, full names are joined with <code>+</code>.
</p>

<CodeBlock
	code={`
    <!-- Mac:   ⇧⌘K  -->
    <!-- Other: Shift + Ctrl + K -->
    <Kbd keys={['mod', 'shift', 'k']} />
`}
/>

<CodeResult white>
	<Kbd keys={['mod', 'shift', 'k']} />
</CodeResult>

<h3 id="accessibility">Accessibility</h3>

<p>
	The component adds an <code>aria-label</code> that spells out symbols as words, so screen readers
	announce <em>"Shift plus Command plus K"</em> rather than reading glyph names.
</p>
