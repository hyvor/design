<script lang="ts">
	import Modal from './../../../lib/components/Modal/Modal.svelte';
    import Button from './../../../lib/components/Button/Button.svelte';
    import Table from "$lib/components/Table/Table.svelte";
    import TableRow from "$lib/components/Table/TableRow.svelte";
    import CodeBlock from "./../../../lib/components/CodeBlock/CodeBlock.svelte";
    import CodeResult from "./Helper/CodeResult.svelte";
    import toast from './../../../lib/components/Toast/toast.js';
    import TabNavItem from "../../../lib/components/TabNav/TabNavItem.svelte";
    import { IconLink45deg, IconSearch } from "@hyvor/icons";
    import TabNav from "../../../lib/components/TabNav/TabNav.svelte";
    import { confirm } from './../../../lib/components/Modal/confirm.js';
    import ConfirmContent1 from "./Modal/ConfirmContent1.svelte";

    let show1 = false;

    let show2 = false;
    let show3 = false;
    let show4 = false;

    let show5 = false;

    let show6 = false;

    async function handleConfirm1() {

        const confirmed = await confirm({
            title: 'Confirm to delete',
            content: 'Please confirm that you want to delete this item. This action cannot be undone.',
            danger: true,
        })

        if (confirmed) {
            toast.success('Item deleted')
        }
    }

    async function handleConfirm2() {

        const confirmed = await confirm({
            title: 'Confirm to delete',
            content: ConfirmContent1,
            danger: true,
        })

        if (confirmed) {
            toast.success('Item deleted')
        }

    }

</script>

<h1>Modal</h1>

<p>
    The <code>{"<Modal>"}</code> component is used to display an interactive modal dialog.
</p>

<h2 id="props">Properties</h2>

<Table columns="2fr 2fr 3fr">

    <TableRow head>
        <div>Name</div>
        <div>Default</div>
        <div>Description</div>
    </TableRow>

    <TableRow>
        <div><code>show</code></div>
        <div><code>false</code></div>
        <div>
            If true, the modal will be displayed.
        </div>
    </TableRow>

    <TableRow>
        <div><code>title</code></div>
        <div></div>   
        <div>
            The title of the modal.
        </div>
    </TableRow>

    <TableRow>
        <div><code>size</code></div>
        <div><code>medium</code></div>
        <div>
            The size of the modal.
            
            <ul>
                <li><code>small</code></li>
                <li><code>medium</code></li>
                <li><code>large</code></li>
            </ul>
        </div>
    </TableRow>

    <TableRow>
        <div><code>closeOnOutsideClick</code></div>
        <div><code>true</code></div>
        <div>
            Whether to close the modal when clicking outside of it.
        </div>
    </TableRow>

    <TableRow>
        <div><code>closeOnEscape</code></div>
        <div><code>true</code></div>   
        <div>
            Whether to close the modal when pressing the escape key.
        </div>
    </TableRow>

</Table>

<h2 id="slots">Slots</h2>

<Table columns="2fr 3fr">

    <TableRow head>
        <div>Name</div>
        <div>Description</div>
    </TableRow>

    <TableRow>
        <div><code>default</code></div>
        <div>
            The content/body of the modal.
        </div>
    </TableRow>


    <TableRow>
        <div><code>title</code></div>
        <div>
            Override the title property of the modal.
        </div>
    </TableRow>

    <TableRow>
        <div><code>footer</code></div>
        <div>
            The footer of the modal.
        </div>
    </TableRow>

</Table>

<h2 id="examples">Examples</h2>

<h3 id="basic">Basic Modal</h3>

<CodeBlock code={`
    <` + `script>
        import { Modal, Button } from '@hyvor/design/components';
        let show = false;
    </` + `script>

    <Button on:click={() => show = true}>Show modal</Button>

    <Modal title="Confirm to delete" bind:show={show}>

        Please confirm that you want to delete this item. This action cannot be undone.

        <div slot="footer">
            <Button variant="invisible" on:click={() => show = false}>Cancel</Button>
            <Button color="red">Delete</Button>
        </div>

    </Modal>
`} />

<CodeResult>

    <Button on:click={() => show1 = true}>Show modal</Button>

    <Modal title="Confirm to delete" bind:show={show1}>
    
        Please confirm that you want to delete this item. This action cannot be undone.
    
        <div slot="footer">
            <Button variant="invisible" on:click={() => show1 = false}>Cancel</Button>
            <Button color="red" on:click={() => {
                show1 = false;
                toast.success('Item deleted')
            }}>Delete</Button>
        </div>
    
    </Modal>

</CodeResult>

<h3 id="sizes">Sizes</h3>

<p>
    Set the <code>size</code> attribute to <code>small</code>, <code>medium</code> or <code>large</code> to change the size of the modal.
</p>

<CodeResult style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;">

    <Button on:click={() => show2 = true}>Small Modal</Button>
    <Button on:click={() => show3 = true}>Medium Modal</Button>
    <Button on:click={() => show4 = true}>Large Modal</Button>

</CodeResult>

<Modal title="Small Modal" bind:show={show2} size="small">
    
    This is a small modal. It is useful for displaying short messages.

    <div slot="footer">
        <Button variant="invisible" on:click={() => show2 = false}>Close</Button>
    </div>

</Modal>

<Modal title="Medium Modal" bind:show={show3} size="medium">
    
    This is a medium modal. It is useful for displaying long messages and forms.

    <div slot="footer">
        <Button variant="invisible" on:click={() => show3 = false}>Close</Button>
    </div>

</Modal>


<Modal title="Large Modal" bind:show={show4} size="large">
    
    This is a large modal. It is useful for displaying very long messages.

    <div slot="footer">
        <Button variant="invisible" on:click={() => show4 = false}>Close</Button>
    </div>

</Modal>

<h3 id="slot">Title Slot</h3>

<p>
    You can use the <code>title</code> slot to customize the title of the modal.
</p>

<CodeBlock code={`
    <Modal bind:show={show} size="large">

        <TabNav active="paste" slot="title">
            <TabNavItem name="paste">
                <IconLink45deg slot="start" />
                Paste Link
            </TabNavItem>
            <TabNavItem name="posts">
                <IconSearch slot="start" />
                Search Posts
            </TabNavItem>
        </TabNav>

        This is a modal with a tab navigation in the title.

        <div slot="footer">
            <Button variant="invisible" on:click={() => show5 = false}>Close</Button>
        </div>

    </Modal>
`} />


<CodeResult style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;">
    <Button on:click={() => show5 = true}>Title Slot Modal</Button>
</CodeResult>

<Modal bind:show={show5} size="large">

    <TabNav active="paste" slot="title">
        <TabNavItem name="paste">
            <IconLink45deg slot="start" />
            Paste Link
        </TabNavItem>
        <TabNavItem name="posts">
            <IconSearch slot="start" size={13} />
            Search Posts
        </TabNavItem>
    </TabNav>
    
    This is a modal with a tab navigation in the title.

    <div slot="footer">
        <Button variant="invisible" on:click={() => show5 = false}>Close</Button>
    </div>

</Modal>

<h3 id="scrollable">
    Scrollable Modal
</h3>

<p>
    If a modal grows larger than the screen, it will be scrollable. The inner content will be aligned to the top of the modal.
</p>

<CodeResult style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;">
    <Button on:click={() => show6 = true}>
        Scrollable Modal
    </Button>
</CodeResult>

<Modal 
    bind:show={show6}
    title="Scrollable Modal"
>

    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. 
        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. 
        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. 
        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. 
        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. 
        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. 
        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. 
    </p>

    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. 
        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. 
        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. 
    </p>

    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. 
        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. 
    </p>

    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. 
        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. 
    </p>

    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. 
        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. 
    </p>

    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. 
        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. 
        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. 
        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. 
        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. 
        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. 
        Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum. 
    </p>

</Modal>

<h2 id="confirm">
    Confirm
</h2>

<p>
    Confirm modals are used frequently in web applications to confirm an action. You can use the <code>confirm</code> function to display a confirm modal.
</p>

<CodeBlock code={`
    import { confirm } from '@hyvor/design/components';

    async function handleDelete() {
        const confirmed = await confirm({
            title: 'Confirm to delete',
            content: 'Please confirm that you want to delete this item. This action cannot be undone.',
            danger: true
        });

        if (confirmed) {
            // Delete the item
        }
    }
`} language="js" />

<p>
    The <code>confirm</code> function accepts an object with the following properties:
</p>

<CodeBlock code={`
    interface ConfirmOptions {
        // title of the modal
        title: string,

        // content of the modal. Can be a string or a Svelte component
        content: string | SvelteComponent,

        // props to pass to the content component
        contentProps?: Record<string, any>,
        
        // text of the confirm button (default: "Confirm")
        confirmText?: string,
        
        // text of the cancel button (default: "Cancel")
        cancelText?: string,
        
        // whether the modal is a danger modal (button color will be red)
        danger?: boolean
    }
`} language="ts" />

<CodeResult>

    <Button on:click={handleConfirm1}>
        Delete
    </Button>

    <Button on:click={handleConfirm2}>
        Delete with Custom Content
    </Button>

</CodeResult>