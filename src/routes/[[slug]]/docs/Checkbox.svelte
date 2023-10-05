<script lang="ts">
    import Checkbox from '$lib/components/Checkbox/Checkbox.svelte';
    import InputGroup from '$lib/components/FormControl/InputGroup.svelte';
    import CodeBlock from '$lib/pages/Docs/Content/CodeBlock.svelte';
    import FormControl from '$lib/components/FormControl/FormControl.svelte';
    import Label from '$lib/components/FormControl/Label.svelte';
    import Caption from '$lib/components/FormControl/Caption.svelte';
    import Callout from '$lib/components/Callout/Callout.svelte';
    import CodeResult from "./Helper/CodeResult.svelte";

    let x = true;
    let a : string[] = [];
</script>

<h1>Checkbox</h1>

<p>
    A checkbox is a form element that allows the user to select one or more options from a range of options. All properties are sent directly to the underlying HTML <code>{"<input type=\"checkbox\">"}</code> element. The <a href="/#events">default events</a> are forwarded from the input element.
</p>

<Callout type="info">
    <span slot="icon">💡</span>
    Checkbox should only be used if there are multiple options to choose from. For a single option, use <a href="/switch">Switch</a> instead.
</Callout>

<h2 id="examples">Examples</h2>

<h3 id="basic">Basic Checkbox</h3>

<CodeBlock code={`
    <Checkbox />
`} />

<CodeResult>
    <Checkbox />
</CodeResult>

<h3 id="with-content">with a Label</h3>

<CodeBlock code={`
    <Checkbox bind:checked={checked}>
        The checkbox is {checked ? 'checked' : 'unchecked'}
    </CodeBlock>
`} />

<CodeResult>
    <div>
        <Checkbox bind:checked={x} value="x">
            The checkbox is {x ? 'checked' : 'unchecked'}
        </Checkbox>
    </div>
</CodeResult>

<h3 id="with-form-control">with FormControl and InputGroup</h3>

<p>
    Here is an example of a checkbox with a <a href="/form-control">FormControl</a> component. We also use the <code>{"<InputGroup>"}</code> element to group the checkboxes together with a fine gap between them.
</p>

<CodeBlock code={`
    <FormControl>
    <Label>Receive Emails</Label>
        <Caption>Select when to receive emails</Caption>
        <InputGroup>
            <Checkbox
                value="replies"
                bind:group={emails}
            >on replies</Checkbox>
            <Checkbox
                value="mentions"
                bind:group={emails}
            >on mentions</Checkbox>
        </InputGroup>
    </FormControl>
`} />

<CodeResult>
    <FormControl>
        <Label>Receive Emails</Label>
        <Caption>Select when to receive emails</Caption>
        <InputGroup>
            <Checkbox value="replies" bind:group={a}>on replies</Checkbox>
            <Checkbox value="mentions" bind:group={a}>on mentions</Checkbox>
        </InputGroup>
    </FormControl>

    <div style:margin-top="15px">
        Selected options: <code>{JSON.stringify(a)}</code>
    </div>
</CodeResult>