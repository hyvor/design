<script lang="ts">
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import NavLink from '$lib/components/NavLink/NavLink.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import Box from '$lib/components/Box/Box.svelte';
	import IconColumns from '@hyvor/icons/IconColumns';
	import IconChat from '@hyvor/icons/IconChat';
	import IconFile from '@hyvor/icons/IconFile';
	import IconCoin from '@hyvor/icons/IconCoin';
	import IconExclamationCircle from '@hyvor/icons/IconExclamationCircle';

	let active = $state('overview');
	let active2 = $state('overview');
</script>

<h1>Nav Link</h1>

<p>
	The <code>{'<NavLink>'}</code> component is used in navigation (ex: in Console). All additional
	properties are sent directly to the underlying HTML
	<code>{'<a>'}</code> element.
</p>

<h2 id="props">Properties</h2>

<Table columns="2fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div>active</div>
		<div><code>false</code></div>
		<div>If the link is active (boolean)</div>
	</TableRow>
</Table>

<h2 id="slots">Slots</h2>
<Table columns="1fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
	</TableRow>

	<TableRow>
		<div><code>default</code></div>
		<div>The default content of the Nav Link.</div>
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

<h2>Examples</h2>

<CodeBlock
	code={`
    <NavLink href="/" active>Overview</NavLink>
    <NavLink href="/">Comments</NavLink>
    <NavLink href="/">Pages</NavLink>
    <NavLink href="/" disabled>Disabled</NavLink>
`}
/>

<div class="no-link-color">
	<CodeResult gap={5} white>
		<div style="padding: 15px 0;width:100%" class="hds-box">
			<NavLink
				href="javascript:void(0)"
				active={active === 'overview'}
				onclick={() => (active = 'overview')}>Overview</NavLink
			>
			<NavLink
				href="javascript:void(0)"
				active={active === 'comments'}
				onclick={() => (active = 'comments')}>Comments</NavLink
			>
			<NavLink
				href="javascript:void(0)"
				active={active === 'pages'}
				onclick={() => (active = 'pages')}>Pages</NavLink
			>
			<!-- disabled state -->
			<NavLink href="javascript:void(0)" disabled>Disabled</NavLink>
		</div>
	</CodeResult>
</div>

<h3>With Slots</h3>

<CodeBlock
	code={`
    <NavLink href="/" active>
        {#snippet start()}
            <IconColumns />
        {/snippet}
        Overview
    </NavLink>

    <NavLink href="/">
        {#snippet start()}
            <IconChat />
        {/snippet}
        Comments
    </NavLink>

    <NavLink href="/">
        {#snippet start()}
            <IconFile />
        {/snippet}
        Pages
    </NavLink>

    <NavLink href="/">
        {#snippet start()}
            <IconCoin />
        {/snippet}
        Billing
        {#snippet end()}
            <IconExclamationCircle />
        {/snippet}
    </NavLink>
`}
/>

<div class="no-link-color">
	<CodeResult gap={5} white>
		<Box style="width:100%">
			<div style="padding: 15px 0">
				<NavLink
					href="javascript:void(0)"
					active={active2 === 'overview'}
					onclick={() => (active2 = 'overview')}
				>
					{#snippet start()}
						<IconColumns></IconColumns>
					{/snippet}
					Overview
				</NavLink>

				<NavLink
					href="javascript:void(0)"
					active={active2 === 'comments'}
					onclick={() => (active2 = 'comments')}
				>
					{#snippet start()}
						<IconChat></IconChat>
					{/snippet}
					Comments
				</NavLink>

				<NavLink
					href="javascript:void(0)"
					active={active2 === 'pages'}
					onclick={() => (active2 = 'pages')}
				>
					{#snippet start()}
						<IconFile></IconFile>
					{/snippet}
					Pages
				</NavLink>

				<NavLink
					href="javascript:void(0)"
					active={active2 === 'billing'}
					onclick={() => (active2 = 'billing')}
					disabled
				>
					{#snippet start()}
						<IconCoin></IconCoin>
					{/snippet}
					Billing
					{#snippet end()}
						<IconExclamationCircle style="color:var(--orange)"></IconExclamationCircle>
					{/snippet}
				</NavLink>
			</div>
		</Box>
	</CodeResult>
</div>
