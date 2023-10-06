<script lang="ts">
    import Switch from "$lib/components/Switch/Switch.svelte";
    import CodeBlock from "$lib/marketing/Docs/Content/CodeBlock.svelte";
    import CodeResult from './Helper/CodeResult.svelte';
</script>

<h1>Switch</h1>

<p>
    A switch is a form element that allows the user to toggle between two states (usually, yes/no). All properties are sent directly to the underlying HTML <code>{"<input type=\"checkbox\">"}</code> element. The <a href="/#events">default events</a> are forwarded from the input element.
</p>

<h2 id="examples">Examples</h2>

<h3 id="basic">Basic</h3>

<CodeBlock code={`
    <Switch />
`} />

<CodeResult>
    <Switch />
</CodeResult>


<h3 id="with-label">with a Label</h3>

<CodeBlock code={`
    <Switch bind:checked={notifsOn}>
        Enable notifications
    </Switch>
`} />


<CodeResult>
    <Switch>
        Enable notifications
    </Switch>
</CodeResult>

<p>
    Additionally, see <a href="/split-control#nested">this example</a> for usage with a <code>SplitControl</code>.
</p>