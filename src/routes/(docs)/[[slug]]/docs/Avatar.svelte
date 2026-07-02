<script>
	import Avatar from '$lib/components/Avatar/Avatar.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import CodeResult from './Helper/CodeResult.svelte';

	import hyvorLogo from '../../../img/logo/hyvor-social.png';
	import hyvorTalkLogo from '../../../img/logo/hyvor-talk-social.png';
	import hyvorBlogsLogo from '../../../img/logo/hyvor-blogs-social.png';
	import AvatarStack from '$lib/components/Avatar/AvatarStack.svelte';
</script>

<h1>Avatar</h1>

<p>The following components are available to display an avatar of a user:</p>

<ul>
	<li><code>{'<Avatar>'}</code></li>
	<li><code>{'<AvatarStack>'}</code></li>
</ul>

<h2 id="examples">Examples</h2>

<h3 id="avatar">Single Avatar</h3>

<p>
	Use the <code>{'<Avatar>'}</code> component to display a single avatar.
</p>

<CodeBlock
	code={`
    <Avatar src="https://hyvor.com/image.png" />
`}
/>

<CodeResult>
	<Avatar src={hyvorLogo} alt="Hyvor Logo" />
</CodeResult>

<h3 id="size">Size</h3>

<CodeBlock
	code={`
    <Avatar src="https://hyvor.com/image.png" size="small" />
    <Avatar src="https://hyvor.com/image.png" size="medium" />
    <Avatar src="https://hyvor.com/image.png" size="large" />
    <Avatar src="https://hyvor.com/image.png" size={64} /> <!-- any custom width -->
`}
/>

<CodeResult>
	<Avatar src={hyvorLogo} alt="Hyvor Logo" size="small" />
	<Avatar src={hyvorLogo} alt="Hyvor Logo" size="medium" />
	<Avatar src={hyvorLogo} alt="Hyvor Logo" size="large" />
	<Avatar src={hyvorLogo} alt="Hyvor Logo" size={64} />
</CodeResult>

<h3 id="stack">Avatar Stack</h3>

<p>
	Wrap multiple <code>{'<Avatar>'}</code> components with
	<code>{'<AvatarStack>'}</code> to display them as a stack.
</p>

<CodeBlock
	code={`
    <AvatarStack>
        <Avatar src="https://hyvor.com/image.png" />
        <Avatar src="https://hyvor.com/image.png" />
        <Avatar src="https://hyvor.com/image.png" />
    </AvatarStack>
`}
/>

<CodeResult>
	<AvatarStack>
		<Avatar src={hyvorLogo} alt="Hyvor Logo" />
		<Avatar src={hyvorTalkLogo} alt="Hyvor Talk Logo" />
		<Avatar src={hyvorBlogsLogo} alt="Hyvor Blogs Logo" />
	</AvatarStack>
</CodeResult>

<p>
	If you set a <code>size</code> in your <code>{'<Avatar>'}</code>s, make sure to set the same
	size to the <code>{'<AvatarStack>'}</code> component.
</p>
