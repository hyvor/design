<script lang="ts">
    import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte";
    import CodeResult from "./Helper/CodeResult.svelte";
    import Box from "$lib/components/Box/Box.svelte";


    </script>
<h1 id="css">Box</h1>
<!--Description-->
<p>Box is a container component that can be used to wrap other components.</p>

<h2>Examples</h2>

<h3>Basic</h3>

<p>
    The <code>Box</code> component can be used to wrap other components.
</p>
<CodeBlock code={`
    <Box style="padding: 15px 20px">
        Box from element
    </Box>
`} />

<CodeResult>
    <Box style="padding: 15px 20px">
        Box from element
    </Box>
</CodeResult>

<h3 id="css">CSS Class</h3>

<p>
    You can also use the <code>hds-box</code> class to apply the box styles to any element.
</p>


<CodeBlock code={`
    <div class="hds-box">
        Some text
    </div>
`} />

<CodeResult>
    <div class="hds-box" style="padding: 15px 20px">
        Some text
    </div>
</CodeResult>



