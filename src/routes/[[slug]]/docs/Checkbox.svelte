<script lang="ts">
    import Checkbox from '$lib/components/Checkbox/Checkbox.svelte';
    import CodeBlock from '$lib/pages/docs/Content/CodeBlock.svelte';

    let x = true;
</script>

<h1>Checkbox</h1>

<p>
    A checkbox is a form element that allows the user to select one or more options from a range of options. All properties are sent directly to the underlying HTML <code>{"<input type=\"checkbox\">"}</code> element.
</p>

<h2 id="examples">Examples</h2>

<h3 id="basic">Basic Checkbox</h3>

<CodeBlock code={`
    <Checkbox />
`} />

<Checkbox />

<h3 id="with-content">Checkbox with a Label</h3>

<CodeBlock code={`
    <Checkbox bind:checked={checked}>
        The checkbox is {checked ? 'checked' : 'unchecked'}
    </CodeBlock>
`} />

<div>
    <Checkbox bind:checked={x}>
        The checkbox is {x ? 'checked' : 'unchecked'}
    </Checkbox>
</div>