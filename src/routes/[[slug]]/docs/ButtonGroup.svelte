<script lang="ts">
    import ButtonGroup from "$lib/components/Button/ButtonGroup.svelte";
    import Button from "$lib/components/Button/Button.svelte";
    import CaretDownFill from "$lib/icons/CaretDownFill.svelte";
    import CodeBlock from "$lib/pages/Docs/Content/CodeBlock.svelte";
</script>

<h1>Button Group</h1>

<p>
    Button groups are used to group buttons together. They are useful for grouping buttons together in a toolbar.
</p>

<h2 id="examples">Examples</h2>

<h3 id="basic">
    Basic
</h3>

<CodeBlock code={`
    <ButtonGroup>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
    </ButtonGroup>
`} />

<ButtonGroup>
    <Button>Button 1</Button>
    <Button>Button 2</Button>
    <Button>Button 3</Button>
</ButtonGroup>