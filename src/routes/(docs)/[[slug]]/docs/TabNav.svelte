<script lang="ts">
	import TabNavItem from '$lib/components/TabNav/TabNavItem.svelte';
	import TabNav from '$lib/components/TabNav/TabNav.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import IconGear from '@hyvor/icons/IconGear';
	import IconSearchHeart from '@hyvor/icons/IconSearchHeart';
	import IconLink45deg from '@hyvor/icons/IconLink45deg';
	import Tag from '$lib/components/Tag/Tag.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import IconBoxArrowUpRight from '@hyvor/icons/IconBoxArrowUpRight';

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
		<div><code>basePath</code></div>
		<div>
			The base URL path. When set, tabs become active based on the current URL instead of the
			<code>active</code> prop on <code>TabNavItem</code>.
		</div>
	</TableRow>

	<TableRow>
		<div><code>pathname</code></div>
		<div>
			The current URL pathname (optional), e.g. <code>page.url.pathname</code> from
			<code>$app/state</code>. Only used with <code>basePath</code>. Falls back to
			<code>window.location.pathname</code> when not passed - pass it in SvelteKit apps for a correctly
			server-rendered active tab.
		</div>
	</TableRow>

	<TableRow>
		<div><code>goto</code></div>
		<div>
			SvelteKit's <code>goto</code> function (optional), e.g. from
			<code>$app/navigation</code>. Only used with <code>basePath</code>. Enables client-side
			navigation - falls back to a normal navigation when not passed.
		</div>
	</TableRow>

	<TableRow>
		<div><code>replaceState</code></div>
		<div>
			Whether to replace the current history entry when navigating, instead of pushing a new one.
			Only used with <code>basePath</code> and <code>goto</code>.
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

<h2 id="usage">Usage with URLs</h2>

<p>
	<code>TabNav</code> does not depend on SvelteKit, so it also works in non-SvelteKit Svelte apps.
	In a SvelteKit app, pass <code>pathname</code> and <code>goto</code> so that the active tab is rendered
	correctly on the server and tab clicks navigate client-side without a full page reload. If they are
	not passed, a normal (full-page) navigation is used instead.
</p>

<CodeBlock
	language="svelte"
	code={`
    <` +
		`script lang="ts">
        import { TabNav, TabNavItem } from '@hyvor/design';
        import { page } from '$app/state';
        import { goto } from '$app/navigation';
    </` +
		`script>

    <TabNav basePath="/settings" pathname={page.url.pathname} {goto}>
        <TabNavItem name="settings" index>
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
`}
/>

<a href="/test/tabnav" target="_blank">
	<Button color="input">
		View Demo
		{#snippet end()}
			<IconBoxArrowUpRight size={14} />
		{/snippet}
	</Button>
</a>

<h2 id="usage">Manual usage</h2>

<CodeBlock
	language="svelte"
	code={`
    <` +
		`script lang="ts">
        import { TabNav, TabNavItem } from '@hyvor/design';
        let active = 'settings';
    </` +
		`script>

    <TabNav>
        <TabNavItem name="settings" active={active === 'settings'} onclick={() => active = 'settings'}>
            {#snippet start()}
                <IconGear />
            {/snippet}
            Settings
        </TabNavItem>
        <TabNavItem name="seo" active={active === 'seo'} onclick={() => active = 'seo'}>
            {#snippet start()}
                <IconSearchHeart />
            {/snippet}
            SEO
            {#snippet end()}
                <Tag size="x-small" color="green">80%</Tag>
            {/snippet}
        </TabNavItem>
        <TabNavItem name="links" active={active === 'links'} onclick={() => active = 'links'}>
            {#snippet start()}
                <IconLink45deg />
            {/snippet}
            Links
        </TabNavItem>
    </TabNav>
`}
/>

<CodeResult>
	<TabNav>
		<TabNavItem
			name="settings"
			active={active1 === 'settings'}
			onclick={() => (active1 = 'settings')}
		>
			{#snippet start()}
				<IconGear />
			{/snippet}
			Settings
		</TabNavItem>
		<TabNavItem name="seo" active={active1 === 'seo'} onclick={() => (active1 = 'seo')}>
			{#snippet start()}
				<IconSearchHeart />
			{/snippet}
			SEO
			{#snippet end()}
				<Tag size="x-small" color="green">80%</Tag>
			{/snippet}
		</TabNavItem>
		<TabNavItem name="links" active={active1 === 'links'} onclick={() => (active1 = 'links')}>
			{#snippet start()}
				<IconLink45deg />
			{/snippet}
			Links
		</TabNavItem>
	</TabNav>

	<p>
		Active tab is {active1}
	</p>

	<Button onclick={() => (active1 = 'seo')}>Set SEO as active</Button>
</CodeResult>
