<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import EmojiPicker from '$lib/components/EmojiPicker/EmojiPicker.svelte';
	import CodeResult from './Helper/CodeResult.svelte';

	let emoji = $state<string | undefined>(undefined);
</script>

<h1>Emoji Picker</h1>

<CodeBlock
	code={`
	<EmojiPicker 
		bind:emoji={emoji}
		removable
	/>
`}
/>

<CodeResult>
	<EmojiPicker iconButtonColor="input" bind:emoji removable />
	<div style="margin-top:8px;font-size:14px;color:var(--text-light)">
		Selected Emoji: {emoji ?? 'None'}
	</div>
</CodeResult>
