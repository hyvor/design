<script lang="ts">
    import TextInput from "$lib/components/TextInput/TextInput.svelte";
    import CodeBlock from "$lib/marketing/Docs/Content/CodeBlock.svelte";
    import Search from "$lib/icons/Search.svelte";
    import CodeResult from "./Helper/CodeResult.svelte";
</script>

<h1>Text Input</h1>

<p>
    Text inputs are used to collect text from the user. They are commonly used in forms and settings pages.
</p>


<h2 id="examples">Examples</h2>

<h3 id="sizes">Sizes</h3>

<CodeBlock code={`
    <TextInput placeholder="Small" size="small" />
    <TextInput placeholder="Medium (default)" />
    <TextInput placeholder="Large" size="large" />
`} />

<CodeResult>
    <div class="sizes">
        <TextInput placeholder="Small" size="small" />
        <TextInput placeholder="Medium (default)" />
        <TextInput placeholder="Large" size="large" />
    </div>
</CodeResult>

<h3 id="states">States</h3>

<CodeBlock code={`
    <TextInput 
        placeholder="This is a default text input" 
        state="default" 
        block 
    />
    <TextInput 
        placeholder="This is a success text input" 
        state="success" 
        block 
    />
    <TextInput 
        placeholder="This is a warning text input" 
        state="warning"
        block
    />
    <TextInput 
        placeholder="This is an error text input" 
        state="error"
        block 
    />
`} />

<CodeResult>
    <div class="states">
        <TextInput placeholder="This is a default text input" state="default" block />
        <TextInput placeholder="This is a success text input" state="success" block />
        <TextInput placeholder="This is a warning text input" state="warning" block />
        <TextInput placeholder="This is an error text input" state="error" block />
    </div>
</CodeResult>

<style>
    .sizes {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
    .sizes :global(.input-wrap) {
        width: 300px;
        max-width: 100%;
    }
    .states :global(.input-wrap:not(:last-child)) {
        margin-bottom: 15px;
    }
</style>

<h3 id="with-starting-slot">with Starting Slot</h3>

<CodeBlock code={`
    <TextInput placeholder="Search">
        <Search slot="start" />
    </TextInput>
`} />

<CodeResult>
    <TextInput placeholder="Search">
        <Search slot="start" />
    </TextInput>
</CodeResult>

<h3 id="with-ending-slot">with Ending Slot</h3>

<CodeBlock code={`
    <TextInput placeholder="Delay" type="number">
        <span slot="end">minutes</span>
    </TextInput>
`} />

<CodeResult>
    <TextInput placeholder="Delay" type="number">
        <span slot="end">minutes</span>
    </TextInput>
</CodeResult>

<p>
    The ending slot is useful with the <a href="/loader">Loader</a> component to indicate a loading state, for example in a search input.
</p>