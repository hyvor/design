<script>
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
</script>

<h1>Usage Limit & Upgrade Modal</h1>

<p>
	<code>UsageLimit</code> shows the usage of a license property (e.g. "Usage: 1/2") with an upgrade
	button next to it. Clicking the button opens <code>UpgradeModal</code>, which loads the billing
	component of HYVOR Core (plans and add-ons) focused on the given license property. Both must be
	used inside <code>CloudContext</code>.
</p>

<CodeBlock
	code={`
    import { UsageLimit } from '@hyvor/design/cloud';

    <UsageLimit
        used={languages.length}
        limit={license.languages}
        focus="languages"
        label="Languages"
    />
`}
/>

<p>
	Nothing is rendered when the limit is <code>-1</code>, <code>null</code>, or
	<code>undefined</code> (unlimited), or when the deployment is not <code>cloud</code> (unless
	<code>showOnPrem</code> is set). The count turns red when the limit is reached.
</p>

<h2 id="usage-limit-props">UsageLimit properties</h2>

<Table columns="2fr 2fr 4fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>used</code></div>
		<div></div>
		<div>Current usage.</div>
	</TableRow>

	<TableRow>
		<div><code>limit</code></div>
		<div></div>
		<div>The limit. <code>-1</code>, <code>null</code>, or <code>undefined</code> = unlimited.</div>
	</TableRow>

	<TableRow>
		<div><code>focus</code></div>
		<div></div>
		<div>
			The license property (key in the license, e.g. <code>languages</code>). Plans and add-ons for
			this property are highlighted in the modal.
		</div>
	</TableRow>

	<TableRow>
		<div><code>label</code></div>
		<div><code>Usage</code></div>
		<div>Text before the numbers.</div>
	</TableRow>

	<TableRow>
		<div><code>buttonText</code></div>
		<div><code>Upgrade</code></div>
		<div>Text of the button.</div>
	</TableRow>

	<TableRow>
		<div><code>modalTitle</code></div>
		<div>buttonText</div>
		<div>Title of the modal (string or snippet).</div>
	</TableRow>

	<TableRow>
		<div><code>component</code></div>
		<div>CloudContext component</div>
		<div>The component whose billing is shown (e.g. <code>blogs</code>).</div>
	</TableRow>

	<TableRow>
		<div><code>buttonSize</code></div>
		<div><code>small</code></div>
		<div>Size of the button.</div>
	</TableRow>

	<TableRow>
		<div><code>modalSize</code></div>
		<div><code>large</code></div>
		<div>Size of the modal.</div>
	</TableRow>

	<TableRow>
		<div><code>showOnPrem</code></div>
		<div><code>false</code></div>
		<div>Render even if the deployment is not <code>cloud</code>.</div>
	</TableRow>

	<TableRow>
		<div><code>format</code></div>
		<div><code>String</code></div>
		<div>Formats the numbers (e.g. for bytes).</div>
	</TableRow>
</Table>

<h2 id="upgrade-modal">UpgradeModal</h2>

<p>
	Use <code>UpgradeModal</code> directly to open the upgrade flow from anywhere (e.g. a "limit reached"
	message).
</p>

<CodeBlock
	code={`
    import { UpgradeModal } from '@hyvor/design/cloud';

    let show = $state(false);

    {#if show}
        <UpgradeModal bind:show focus="blogs" title="Blogs" />
    {/if}
`}
/>

<Table columns="2fr 2fr 4fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>show</code></div>
		<div></div>
		<div>Bindable. Whether the modal is open.</div>
	</TableRow>

	<TableRow>
		<div><code>focus</code></div>
		<div></div>
		<div>The license property to highlight.</div>
	</TableRow>

	<TableRow>
		<div><code>title</code></div>
		<div><code>Upgrade</code></div>
		<div>Modal title (string or snippet).</div>
	</TableRow>

	<TableRow>
		<div><code>component</code></div>
		<div>CloudContext component</div>
		<div>The component whose billing is shown.</div>
	</TableRow>

	<TableRow>
		<div><code>size</code></div>
		<div><code>large</code></div>
		<div>Modal size.</div>
	</TableRow>

	<TableRow>
		<div><code>params</code></div>
		<div><code>{'{}'}</code></div>
		<div>Extra query params sent to the billing component script.</div>
	</TableRow>

	<TableRow>
		<div><code>scriptPath</code></div>
		<div><code>/js/billing-component-iframe.js</code></div>
		<div>Path of the billing script on the HYVOR instance.</div>
	</TableRow>

	<TableRow>
		<div><code>onclose</code></div>
		<div></div>
		<div>Called when the modal is closed.</div>
	</TableRow>
</Table>
