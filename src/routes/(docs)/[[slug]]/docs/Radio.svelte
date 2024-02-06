<script>
    import InputGroup from "$lib/components/FormControl/InputGroup.svelte";
    import CodeBlock from "$lib/components/CodeBlock/CodeBlock.svelte";
    import Radio from "$lib/components/Radio/Radio.svelte";
    import CodeResult from "./Helper/CodeResult.svelte";
    import SplitControl from "$lib/components/SplitControl/SplitControl.svelte";

    let opt1 = "1";
    let opt2 = 'subdomain';
</script>
<h1>Radio</h1>

<p>
    <code>{"<Radio>"}</code> is a form control that allows users to select one option from a list of options. All properties are sent directly to the underlying HTML <code>{"<input type=\"radio\">"}</code> element. <code>bind:group</code> can be used to set the current value. The <a href="/#events">default events</a> are forwarded from the input element.
</p>

<h2 id="examples">Examples</h2>

<h3 id="basic">Basic</h3>

<CodeBlock code={`
    <InputGroup>
        <Radio name="radio" value="1" bind:group={option}>Option 1</Radio>
        <Radio name="radio" value="2" bind:group={option}>Option 2</Radio>
        <Radio name="radio" value="3" bind:group={option}>Option 3</Radio>
    </InputGroup>
`} />

<CodeResult>
    <InputGroup>
        <Radio name="radio" value="1" bind:group={opt1}>Option 1</Radio>
        <Radio name="radio" value="2" bind:group={opt1}>Option 2</Radio>
        <Radio name="radio" value="3" bind:group={opt1}>Option 3</Radio>
    </InputGroup>
</CodeResult>

<h3 id="with-form-control">with SplitControl</h3>

<CodeBlock code={`
    <SplitControl
        label="Hosted at"
        caption="Where to host your blog"
    >
        <InputGroup>
            <Radio 
                name="hosted-at" 
                value="subdomain" 
                bind:group={hostedAt}
            >Subdomain</Radio>
            <Radio 
                name="hosted-at" 
                value="domain" 
                bind:group={hostedAt}
            >Custom Domain</Radio>
            <Radio 
                name="hosted-at" 
                value="self" 
                bind:group={hostedAt}
            >Self-hosted</Radio>
        </InputGroup>
    </SplitControl>
`} />

<CodeResult>

    <SplitControl
        label="Hosted at"
        caption="Where to host your blog"
    >
        <InputGroup>
            <Radio name="hosted-at" value="subdomain" bind:group={opt2}>Subdomain</Radio>
            <Radio name="hosted-at" value="domain" bind:group={opt2}>Custom Domain</Radio>
            <Radio name="hosted-at" value="self" bind:group={opt2}>Self-hosted</Radio>
        </InputGroup>
    </SplitControl>

</CodeResult>


