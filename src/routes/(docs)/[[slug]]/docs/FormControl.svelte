<script>
	import Caption from '$lib/components/FormControl/Caption.svelte';
	import Label from '$lib/components/FormControl/Label.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import Validation from '$lib/components/FormControl/Validation.svelte';
	import FormControl from '$lib/components/FormControl/FormControl.svelte';
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	import InputGroup from '$lib/components/FormControl/InputGroup.svelte';
	import Checkbox from '$lib/components/Checkbox/Checkbox.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
</script>

<h1>Form Control</h1>

<p>This page introduces a few helper components that can be used to create form controls.</p>

<ul>
	<li><code>{'<Label>'}</code></li>
	<li><code>{'<Caption>'}</code></li>
	<li><code>{'<Validation>'}</code></li>
	<li><code>{'<FormControl>'}</code></li>
	<li><code>{'<InputGroup>'}</code></li>
</ul>

<p>
	These components are used in the <a href="/split-control">Split Control</a>
	component along with other components like
	<a href="/text-input">Text Input</a>, <a href="/checkbox">Checkbox</a>, etc.
</p>

<h2 id="label">Label and Caption</h2>

<CodeBlock
	code={`
    <Label for="input-id">Name</Label>
    <Caption>Enter your name</Caption>
`}
/>

<CodeResult>
	<div>
		<Label>Name</Label>
		<Caption>Enter your name</Caption>
	</div>
</CodeResult>

<h2 id="validation">Validation</h2>

<CodeBlock
	code={`
    <Validation state="error">This field is required</Validation>
    <Validation state="warning">This is irreversible</Validation>
    <Validation state="success">Email sent</Validation>
`}
/>

<CodeResult>
	<div style="display:flex;flex-direction:column;gap:10px;">
		<Validation state="error">This field is required</Validation>
		<Validation state="warning">This action is irreversible</Validation>
		<Validation state="success">Email sent</Validation>
	</div>
</CodeResult>

<h2 id="full-form-control">Full Form Control</h2>

<p>
	The <code>{'<FormControl>'}</code> component can be used to wrap label, caption, validation, and
	other inputs. It will automatically add spacing between the elements.
</p>

<CodeBlock
	code={`
    <FormControl>
        <Label for="input-id">Name</Label>
        <Caption>Enter your name</Caption>
        <TextInput type="text" id="input-id" state="error" />
        <Validation state="error">This field is required</Validation>
    </FormControl>
`}
/>

<CodeResult>
	<FormControl>
		<Label for="fc-input-id">Name</Label>
		<Caption>Enter your name</Caption>
		<TextInput type="text" id="fc-input-id" state="error" />
		<Validation state="error">This field is required</Validation>
	</FormControl>
</CodeResult>

<h2 id="input-group">Input Group</h2>

<p>
	The <code>{'<InputGroup>'}</code> component can be used to group multiple inputs together. It will
	automatically add spacing between the elements. It can be used to group checkboxes, radio buttons,
	text inputs, etc.
</p>

<CodeBlock
	code={`
    <FormControl>
        <Label for="input-id">Email Preferences</Label>
        <Caption>When to receive emails</Caption>
        <InputGroup>
            <Checkbox>on replies</Checkbox>
            <Checkbox>on mentions</Checkbox>
        </InputGroup>
    </FormControl>
`}
/>

<CodeResult>
	<FormControl>
		<Label for="input-id">Email Preferences</Label>
		<Caption>When to receive emails</Caption>
		<InputGroup>
			<Checkbox>on replies</Checkbox>
			<Checkbox>on mentions</Checkbox>
		</InputGroup>
	</FormControl>
</CodeResult>
