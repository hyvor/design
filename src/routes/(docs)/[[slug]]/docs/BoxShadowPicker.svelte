<script lang="ts">
	import BoxShadowPicker from '$lib/components/BoxShadowPicker/BoxShadowPicker.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
</script>

<h1>Box Shadow Picker</h1>

<p>
	<code>{'<BoxShadowPicker>'}</code> can be used to allow users to select a box shadow for an element.
</p>

<CodeBlock
	code={`
    <` +
		`script lang="ts">
        import { BoxShadoxPicker } from "@hyvor/design/components";
    <` +
		`/script>

    <BoxShadoxPicker value="0px 0px 8px 0px #00000011" />
`}
/>

<CodeResult>
	<BoxShadowPicker value="0px 0px 8px 0px #00000011" />
</CodeResult>
