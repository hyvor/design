<script lang="ts">
	import TabNavItem from '$lib/components/TabNav/TabNavItem.svelte';
	import TabNav from '$lib/components/TabNav/TabNav.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import { IconGear, IconSearchHeart, IconLink45deg } from '@hyvor/icons';
	import Tag from '$lib/components/Tag/Tag.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import Button from '$lib/components/Button/Button.svelte';

	let active1 = $state('settings');
</script>

<h1>Tab Nav</h1>

<p>
	To create a tab navigation, use the <code>{'<TabNav>'}</code> and
	<code>{'<TabNavItem>'}</code> components.
</p>

<h2 id="props-slots">Properties and Slots</h2>

<h3 id="action-list">TabNav</h3>

<h4 id="action-list-props">Properties</h4>

<Table columns="1fr 2fr">
	<TableRow head>
		<div>Name</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>active</code></div>
		<div>The name of the active tab.</div>
	</TableRow>
</Table>

<h4 id="action-list-slots">Slots</h4>

<Table columns="1fr 2fr">
	<TableRow head>
		<div>Name</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>default</code></div>
		<div>The content of the tab nav.</div>
	</TableRow>
</Table>

<h3 id="action-list">TabNavItem</h3>

<h4 id="action-list-props">Properties</h4>

<Table columns="1fr 2fr">
	<TableRow head>
		<div>Name</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>name</code></div>
		<div>The name of the tab.</div>
	</TableRow>

	<TableRow>
		<div><code>active</code></div>
		<div>
			Set to <code>true</code> to make the tab active (optional). Only use if you want to control the
			active tab from outside.
		</div>
	</TableRow>
</Table>

<h4 id="action-list-slots">Slots</h4>

<Table columns="1fr 2fr">
	<TableRow head>
		<div>Name</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>default</code></div>
		<div>The content of the tab.</div>
	</TableRow>

	<TableRow>
		<div><code>start</code></div>
		<div>The content of the start slot (left side).</div>
	</TableRow>

	<TableRow>
		<div><code>end</code></div>
		<div>The content of the end slot (right side).</div>
	</TableRow>
</Table>

<h2 id="usage">Usage</h2>

<CodeBlock
	code={`
    <` +
		`script lang="ts">
        import { TabNav, TabNavItem } from '@hyvor/design';
        let active = 'settings';
    </` +
		`script>

    <TabNav bind:active={active}>
        <TabNavItem name="settings">
            <IconGear slot="start" />
            Settings
        </TabNavItem>
        <TabNavItem name="seo">
            <IconSearchHeart slot="start" />
            SEO
            <Tag size="x-small" color="green" slot="end">80%</Tag>
        </TabNavItem>
        <TabNavItem name="links">
            <IconLink45deg slot="start" />
            Links
        </TabNavItem>
    </TabNav>
`}
/>

<CodeResult>
	<TabNav bind:active={active1}>
		<TabNavItem name="settings">
			{#snippet start()}
				<IconGear />
			{/snippet}
			Settings
		</TabNavItem>
		<TabNavItem name="seo">
			{#snippet start()}
				<IconSearchHeart />
			{/snippet}
			SEO
			{#snippet end()}
				<Tag size="x-small" color="green">80%</Tag>
			{/snippet}
		</TabNavItem>
		<TabNavItem name="links">
			{#snippet start()}
				<IconLink45deg />
			{/snippet}
			Links
		</TabNavItem>
	</TabNav>

	<p>
		Active tab is {active1}
	</p>

	<Button on:click={() => (active1 = 'seo')}>Set SEO as active</Button>
</CodeResult>
