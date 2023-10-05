<script lang="ts">
    import Checkbox from '$lib/components/Checkbox/Checkbox.svelte';
    import InputGroup from '$lib/components/FormControl/InputGroup.svelte';
    import CodeBlock from '$lib/pages/docs/Content/CodeBlock.svelte';
    import FormControl from '$lib/components/FormControl/FormControl.svelte';
    import Label from '$lib/components/FormControl/Label.svelte';
    import Caption from '$lib/components/FormControl/Caption.svelte';
    import Validation from '$lib/components/FormControl/Validation.svelte';

    let x = true;
    let a = [];
</script>

<h1>Checkbox</h1>

<p>
    A checkbox is a form element that allows the user to select one or more options from a range of options. All properties are sent directly to the underlying HTML <code>{"<input type=\"checkbox\">"}</code> element. The <a href="/#events">default events</a> are forwarded from the input element.
</p>

<h2 id="examples">Examples</h2>

<h3 id="basic">Basic Checkbox</h3>

<CodeBlock code={`
    <Checkbox />
`} />

<Checkbox />

<h3 id="with-content">with a Label</h3>

<CodeBlock code={`
    <Checkbox bind:checked={checked}>
        The checkbox is {checked ? 'checked' : 'unchecked'}
    </CodeBlock>
`} />

<div>
    <Checkbox bind:checked={x} value="x">
        The checkbox is {x ? 'checked' : 'unchecked'}
    </Checkbox>
</div>

<h3 id="with-form-control">with FormControl and InputGroup</h3>

<p>
    Here is an example of a checkbox with a <a href="/docs/form-control">FormControl</a> component. We also use the <code>{"<InputGroup>"}</code> element to group the checkboxes together with a fine gap between them.
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

<FormControl>
    <Label>Receive Emails</Label>
    <Caption>Select when to receive emails</Caption>
    <InputGroup>
        <Checkbox value="replies" bind:group={a}>on replies</Checkbox>
        <Checkbox value="mentions" bind:group={a}>on mentions</Checkbox>
    </InputGroup>
</FormControl>

<p>
    Selected options: <code>{JSON.stringify(a)}</code>
</p>