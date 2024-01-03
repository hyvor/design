<script lang="ts">
    import IconMessage from '$lib/components/IconMessage/IconMessage.svelte';
    import { IconInbox, IconSearch } from '@hyvor/icons';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte";
    import CodeResult from "./Helper/CodeResult.svelte";
    import Table from "$lib/components/Table/Table.svelte";
    import TableRow from "$lib/components/Table/TableRow.svelte";
</script>

<h1 id="icon-message">Icon Message</h1>
<p>Icon Message is a component that can be used to show a message with an icon in the center of the page.</p>

<h2 id="props">Props</h2>

<Table columns="2fr 2fr 3fr">

    <TableRow head>
        <div>Name</div>
        <div>Default</div>
        <div>Description</div>
    </TableRow>

    <TableRow>
        <div><code>icon</code></div>
        <div><code>null</code></div>
        <div>
            The icon to show.
        </div>
    </TableRow>

    <TableRow>
        <div><code>message</code></div>
        <div><code>null</code></div>
        <div>
            The message to show.
        </div>
    </TableRow>

    <TableRow>
        <div><code>iconColor</code></div>
        <div><code>null</code></div>
        <div>
            The color of the icon.
        </div>
    </TableRow>

    <TableRow>
        <div><code>iconSize</code></div>
        <div><code>100</code></div>
        <div>
            The size of the icon.
        </div>
    </TableRow>

    <TableRow>
        <div><code>padding</code></div>
        <div><code>0</code></div>
        <div>
            The padding of the icon message container.
        </div>
    </TableRow>

    <TableRow>
        <div><code>empty</code></div>
        <div><code>false</code></div>
        <div>
            Whether to show the empty template.
        </div>
    </TableRow>

    <TableRow>
        <div><code>error</code></div>
        <div><code>false</code></div>
        <div>
            Whether to show the error template.
        </div>
    </TableRow>
</Table>

<h2 id="usage">Usage</h2>

<p>Set icon and message as you prefer.</p>

<CodeBlock code={`
    <IconMessage 
        icon={IconSearch} 
        message="Nothing to search here" 
        iconColor=var(--accent-dark) 
        padding={20} 
        iconSize={50} >
    </IconMessage>
`} />

<CodeResult>
    <div class="box">
        <IconMessage 
            icon={IconSearch} 
            message="Nothing to search here" 
            iconColor=var(--accent-dark) 
            padding={20} 
            iconSize={50} >
        </IconMessage>
    </div>
   
</CodeResult>

<h2 id="templates">Templates</h2>

<p>
    Icon Message has two templates: <code>empty</code> and <code>error</code>. 
    You can use them by setting <code>empty</code> or <code>error</code> prop to <code>true</code>.
</p>

<Table columns="2fr 5fr">
    <TableRow head>
        <div>Template Name</div>
        <div style="text-align:center">Preview</div>
    </TableRow>

    <TableRow>
        <div>Empty</div>
        <div>
            <IconMessage empty />
        </div>
    </TableRow>

    <TableRow>
        <div>Error</div>
        <div>
            <IconMessage error />
        </div>
    </TableRow>
</Table>

<h3>Error</h3>

<CodeBlock code={`
    <IconMessage error /> 
`} />

<CodeResult>
    <div class="box">
        <IconMessage error/>
    </div>
    <style>
        .box {
            /* add padding */
            padding: 20px;
        }
        .icon {
            /* add padding */
            padding-bottom: 20px;
        }
    </style>
</CodeResult>

<h3>Empty</h3>

<CodeBlock code={`
    <IconMessage empty />
`} />

<CodeResult>
    <IconMessage empty />
</CodeResult>

<h2 id="examples">Using Slots</h2>

<CodeBlock code={`
    <IconMessage iconColor=var(--green)>
        <div slot="message">
            There are no results to show.
        </div>
        <IconInbox slot="icon" size={100} />    
    </IconMessage>
`} />

<CodeResult>
    <div class="box">
    <IconMessage iconColor=var(--green)>
        <div slot="message">
            There are no results to show.
        </div>
        <IconInbox slot="icon" size={100} />    
    </IconMessage>
</div>

<style>
    .box {
        /* add padding */
        padding: 20px;
    }
</style>
</CodeResult>

