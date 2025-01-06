<script lang="ts">
	import IconCheckCircleFill from '@hyvor/icons/IconCheckCircleFill';
	import IconExclamationCircleFill from '@hyvor/icons/IconExclamationCircleFill';
	import IconXCircleFill from '@hyvor/icons/IconXCircleFill';
	import IconInfoCircleFill from '@hyvor/icons/IconInfoCircleFill';
	import Message1 from './Message1.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import CodeResult from '../Helper/CodeResult.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import toast from '$lib/components/Toast/toast.js';
	import Loader from '$lib/components/Loader/Loader.svelte';
</script>

<h1>Toast</h1>

<p>
	Toasts are used to show a notification to the user. They are implemented using Svelte stores. The <a
		href="/#install"><code>{'<Base>'}</code> component</a
	> sets up the store and the wrapper components to show the toast.
</p>

<h2 id="usage">Usage</h2>

<CodeBlock
	code={`
    import { toast } from '@hyvor/design/components';

    toast('Blank toast');
    toast.success('Success toast');
    toast.error('Error toast');
    toast.warning('Warning toast');
    toast.info('Info toast');
    toast.loading('Loading toast'); // not auto-closed
`}
	language="js"
/>

<CodeResult style="display:flex;gap:10px;flex-direction:column;align-items:flex-start" white>
	<Button on:click={() => toast('Blank toast')} color="input">Blank toast</Button>

	<Button on:click={() => toast.success('Success toast')} color="input">
		{#snippet start()}
			<IconCheckCircleFill style="color:var(--green)" />
		{/snippet} Success toast
	</Button>

	<Button on:click={() => toast.error('Error toast')} color="input">
		{#snippet start()}
			<IconXCircleFill color="var(--red)" />
		{/snippet} Error toast
	</Button>

	<Button on:click={() => toast.warning('Warning toast')} color="input">
		{#snippet start()}
			<IconExclamationCircleFill color="var(--orange)" />
		{/snippet} Warning toast
	</Button>

	<Button on:click={() => toast.info('Info toast')} color="input">
		{#snippet start()}
			<IconInfoCircleFill color="var(--blue)" />
		{/snippet} Info toast
	</Button>

	<Button
		on:click={() => {
			const id = toast.loading('Loading toast');
			setTimeout(() => {
				const rand = Math.random();
				const type = rand > 0.5 ? 'success' : 'error';
				const message = rand > 0.5 ? 'Success' : 'Error';

				toast(message, {
					id,
					type
				});
			}, 2000);
		}}
		color="input"
	>
		{#snippet start()}
			<Loader size="small" />
		{/snippet} Loading toast
	</Button>
</CodeResult>

<h2 id="options">Options</h2>

<p>
	In all toast-creating functions, you can pass an object as the second parameter to override
	options.
</p>

<CodeBlock
	code={`
    toast("Notification", {
        type: 'success',
        duration: 5000, // default is 5s
    })
`}
	language="js"
/>

<h2 id="components">HTML and Components</h2>

<p>The toast message can contain HTML code.</p>

<CodeBlock
	code={`
    toast.success('<strong>Success</strong> toast');
`}
	language="js"
/>

<CodeResult>
	<Button on:click={() => toast.success('<strong>Success</strong> toast')}>Toast with HTML</Button>
</CodeResult>

<p>
	You can also pass a svelte component as the message. A <code>toast</code> prop will be passed to the
	component. You can use it to close the toast.
</p>

<CodeBlock
	code={`
    import ToastComponent from './ToastComponent.svelte';
    toast(ToastComponent);
`}
	language="js"
/>

<CodeBlock
	code={`
    // ToastComponent.svelte
    <` +
		`script>
        import toastService from '$lib/components/Toast/toast.ts';
        import Button from '$lib/components/Button/Button.svelte';

        export let toast;
    </` +
		`script>

    This is a Svelte Component notification
    <Button 
        on:click={() => toastService.close(toast.id)} 
        size="x-small"
    >Close</Button>
`}
	language="svelte"
/>

<CodeResult>
	<Button on:click={() => toast(Message1)}>Toast with Svelte Component</Button>
</CodeResult>

<h2 id="examples">Loading</h2>

<p>
	You can show a loading toast by calling the <code>toast.loading()</code> function. The toast will not
	be auto-closed. You may update its type by calling a toast-creating function with the same toast id.
</p>

<CodeBlock
	code={`
    // save the toast id
    const toastId = toast.loading('Loading...');
    
    await doSomething();
    
    // change status
    toast.success('Success', { id: toastId });
    toast.error('Error', { id: toastId });
    
    // or by using options
    toast('Success', { id: toastId, type: 'success' });
`}
	language="js"
/>

<p>
	You can also close it by calling <code>toast.close(toastId)</code> function.
</p>

<CodeBlock
	code={`
    const toastId = toast.loading('Loading...');
    await doSomething();
    toast.close(toastId);
`}
	language="js"
/>
