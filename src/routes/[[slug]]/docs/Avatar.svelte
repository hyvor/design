<script>
	import Avatar from "$lib/components/Avatar/Avatar.svelte";
    import CodeBlock from "$lib/pages/Docs/Content/CodeBlock.svelte";
    import CodeResult from "./Helper/CodeResult.svelte";
</script>
<h1>Avatar</h1>

<p>
    The following components are available to display an avatar of a user:
</p>

<ul>
    <li><code>{"<Avatar>"}</code></li>
    <li><code>{"<AvatarStack>"}</code></li>
</ul>

<h2 id="avatar">Avatar</h2>

<p>
    Use the <code>{"<Avatar>"}</code> component to display a single avatar.
</p>

<CodeBlock code={`
    <Avatar src="https://hyvor.com/image.png" />
`} />

<CodeResult>
    <Avatar src="https://hyvor.com/image.png" alt="Hyvor Logo" />
</CodeResult>