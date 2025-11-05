<script>
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
</script>

<h1>Tracking</h1>

<p>
	HDS provides support to track web analytics (page views) and custom events using <a
		href="https://openpanel.dev/"
		target="_blank"
		rel="nofollow">OpenPanel</a
	>.
</p>

<h2 id="init">Initalization</h2>

<p>To enable tracking, add the following:</p>

<CodeBlock
	code={`
    import { track } from '@hyvor/design/marketing';

    // usually within a onMount lifecycle at the root
    track.init();
`}
	language="js"
/>

<p>
	This will start tracking page views only on production (on hyvor.com domains). <code
		>forceTrack</code
	>
	can be set to
	<code>true</code> for testing in development.
</p>

<h2 id="track-event">Tracking Custom Events</h2>

<p>To track custom events, use the following code:</p>

<CodeBlock
	code={`
    import { track } from '@hyvor/design/marketing';
    track.event('signup', { method: 'google' });
`}
	language="js"
/>

<p>Use event tracking for feature usage analytics, conversion tracking, experiments, and more.</p>

<h2 id="identify-user">Identify User</h2>

<p>
	The <code>identify</code> method can be used to associate user information with the current profile:
</p>

<CodeBlock
	code={`
    import { track } from '@hyvor/design/marketing';
    track.identify('USER_ID', {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://example.com/avatar.jpg'
    });
`}
	language="js"
/>

<p>
	Note that the <code>HyvorBar</code> automatically calls <code>identify</code> when it is initialized
	and when the user logs in. Therefore, in most cases, you don't need to call it manually.
</p>
