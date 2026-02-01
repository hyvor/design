<script>
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
</script>

<h1>Cloud Context</h1>

<p>
	The <code>CloudContext</code> component is used to provide user and organization context to the
	other Cloud components. It is generally used in <strong>Consoles</strong>. Once the required data
	is loaded from the backend, all the other components must be wrapped inside the
	<code>CloudContext</code> component to function properly.
</p>

<CodeBlock
	code={`
    {#if loading}
        <ANiceLoader />
    {:else}

        <CloudContext
            instance={...}
            user={...}
            organization={...}
        >
            
            <!-- other cloud components can be used now -->
            <HyvorBar />
        
        </CloudContext>

    {/if}
`}
/>

<p>You may use the cloud context data in your components:</p>

<CodeBlock
	code={`
    import { getCloudContext } from '@hyvor/design/cloud';

    const cloudContext = getCloudContext();
`}
/>
