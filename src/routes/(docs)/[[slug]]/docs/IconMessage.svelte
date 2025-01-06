<script lang="ts">
	import IconMessage from '$lib/components/IconMessage/IconMessage.svelte';
	import IconSearch from '@hyvor/icons/IconSearch';
	import IconPencilSquare from '@hyvor/icons/IconPencilSquare';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import { FormControl, Radio, toast } from '$lib/components/index.js';

	let i1Type = $state('empty');
</script>

<h1 id="icon-message">Icon Message</h1>
<p>
	Icon Message is a component that can be used to show a message with an icon in the center of the
	page.
</p>

<h2 id="props">Props</h2>

<Table columns="2fr 2fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>size</code></div>
		<div><code>medium</code></div>
		<div>
			Preset sizes for the icon and padding.
			<code>small</code>, <code>medium</code>, <code>large</code>.
		</div>
	</TableRow>

	<TableRow>
		<div><code>icon</code></div>
		<div><code>null</code></div>
		<div>The icon to show.</div>
	</TableRow>

	<TableRow>
		<div><code>message</code></div>
		<div><code>null</code></div>
		<div>The message to show.</div>
	</TableRow>

	<TableRow>
		<div><code>iconColor</code></div>
		<div><code>null</code></div>
		<div>The color of the icon.</div>
	</TableRow>

	<TableRow>
		<div><code>iconSize</code></div>
		<div><code>null</code></div>
		<div>The size of the icon.</div>
	</TableRow>

	<TableRow>
		<div><code>padding</code></div>
		<div><code>null</code></div>
		<div>The padding of the icon message container.</div>
	</TableRow>

	<TableRow>
		<div><code>empty</code></div>
		<div><code>false</code></div>
		<div>Whether to show the empty template.</div>
	</TableRow>

	<TableRow>
		<div><code>error</code></div>
		<div><code>false</code></div>
		<div>Whether to show the error template.</div>
	</TableRow>

	<TableRow>
		<div><code>cta</code></div>
		<div><code>null</code></div>
		<div>
			<a href="#cta">Call to action</a> button.
		</div>
	</TableRow>
</Table>

<h2 id="usage">Usage</h2>

<h3 id="sizes">Sizes</h3>

<FormControl>
	<div style="margin-bottom: 8px;font-size:14px;color:var(--text-light);">Choose type:</div>
	<Radio name="i1-type" bind:group={i1Type} value="empty">Empty</Radio>
	<Radio name="i1-type" bind:group={i1Type} value="error">Error</Radio>
</FormControl>

<CodeBlock
	code={`
    <IconMessage ${i1Type} size="small" />
    <IconMessage ${i1Type} size="medium" />
    <IconMessage ${i1Type} size="large" />
`}
/>

{#key i1Type}
	<CodeResult>
		<IconMessage empty={i1Type === 'empty'} error={i1Type === 'error'} size="small" />
	</CodeResult>

	<br />

	<CodeResult>
		<IconMessage empty={i1Type === 'empty'} error={i1Type === 'error'} size="medium" />
	</CodeResult>

	<br />

	<CodeResult>
		<IconMessage empty={i1Type === 'empty'} error={i1Type === 'error'} size="large" />
	</CodeResult>
{/key}

<h3 id="custom">Custom Icon and Message</h3>

<p>
	You can use custom icons and messages with Icon Message, as well as custom padding, colors, and
	sizes.
</p>

<CodeBlock
	code={`
    <IconMessage 
        icon={IconSearch} 
        iconColor="var(--accent-dark)" 
        padding={20} 
        iconSize={50}
    >
        Nothing to search here
    </IconMessage>
`}
/>

<CodeResult>
	<div class="box">
		<IconMessage
			icon={IconSearch}
			message="Nothing to search here"
			iconColor="var(--accent-dark)"
			padding={20}
			iconSize={50}
		></IconMessage>
	</div>
</CodeResult>

<h2 id="templates">Templates</h2>

<p>
	Icon Message has two templates: <code>empty</code> and <code>error</code>. You can use them by
	setting <code>empty</code> or <code>error</code> prop to
	<code>true</code>.
</p>

<h3>Error</h3>

<CodeBlock
	code={`
    <IconMessage error /> 
`}
/>

<CodeResult>
	<div class="box">
		<IconMessage error />
	</div>
	<style>
		.box {
			/* add padding */
			padding: 20px;
		}
	</style>
</CodeResult>

<h3>Empty</h3>

<CodeBlock
	code={`
    <IconMessage empty />
`}
/>

<CodeResult>
	<IconMessage empty />
</CodeResult>

<h2 id="examples">Using Slots</h2>

<CodeBlock
	code={`
    <IconMessage iconColor="var(--green)">
        <div>
            There are no results to show.
        </div>
        <IconInbox slot="icon" size={60} />    
    </IconMessage>
`}
/>

<CodeResult>
	<div class="box">
		<IconMessage iconColor="var(--blue)">
			<div>Start Writing Something</div>
			{#snippet icon()}
				<IconPencilSquare size={60} />
			{/snippet}
		</IconMessage>
	</div>

	<style>
		.box {
			/* add padding */
			padding: 20px;
		}
	</style>
</CodeResult>

<h2 id="cta">Call to Action</h2>

<p>
	You can add a call to action button using the <code>cta</code> prop.
</p>

<CodeBlock
	code={`
    <IconMessage
        error
        cta={{
            text: "Try again",
            onClick: (e) => {
                toast.info("Trying again...");
            },
            props: { color: "red" },
        }}
    />
`}
/>

<CodeResult>
	<IconMessage
		error
		cta={{
			text: 'Try again',
			onClick: (e) => {
				toast.info('Trying again...');
			},
			props: { color: 'red' }
		}}
	>
		Failed to load updates.
	</IconMessage>
</CodeResult>

<p>
	For custom UIs, you can use the <code>cta</code> slot.
</p>
