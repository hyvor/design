<script lang="ts">
	import Testimonials from '$lib/marketing/Testimonials/Testimonials.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
</script>

<h1>Testimonials</h1>

<p>
	A horizontally-scrolling row of customer quotes and (optionally) video reviews. There's no limit
	on how many <code>reviews</code> you pass in: once they don't all fit on screen, the row becomes swipeable:
	touch/trackpad swipe and mouse drag both work, and it snaps to each card as you scroll.
</p>

<h2>Properties</h2>

<Table columns="1fr 1fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>reviews</code></div>
		<div></div>
		<div>
			Required. An array of text or video reviews, see the shape below. Any number of reviews can be
			passed; the row scrolls once they overflow the screen.
		</div>
	</TableRow>

	<TableRow>
		<div><code>label</code></div>
		<div><code>"Testimonials"</code></div>
		<div>Small label above the title.</div>
	</TableRow>

	<TableRow>
		<div><code>title</code></div>
		<div><code>"Loved by our customers."</code></div>
		<div>The section heading.</div>
	</TableRow>

	<TableRow>
		<div><code>handwrittenNames</code></div>
		<div><code>true</code></div>
		<div>
			Sets the reviewer name in a handwritten-style font (Caveat, loaded from Bunny Fonts). Turn off
			to use the regular typeface instead, e.g. if the host page can't reach an external font host.
		</div>
	</TableRow>
</Table>

<h3>The <code>reviews</code> shape</h3>

<Table columns="1fr 1fr 3fr">
	<TableRow head>
		<div>Field</div>
		<div>Applies to</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>type</code></div>
		<div>both</div>
		<div><code>'text'</code> or <code>'video'</code>.</div>
	</TableRow>

	<TableRow>
		<div><code>name</code></div>
		<div>both</div>
		<div>
			Reviewer name. When no photo is set on a text review, a deterministic, non-photographic
			identicon is generated from it.
		</div>
	</TableRow>

	<TableRow>
		<div><code>role</code></div>
		<div>both</div>
		<div>Reviewer role/title shown under the name.</div>
	</TableRow>

	<TableRow>
		<div><code>quote</code></div>
		<div><code>'text'</code></div>
		<div>The quote text.</div>
	</TableRow>

	<TableRow>
		<div><code>videoUrl</code></div>
		<div><code>'video'</code></div>
		<div>Optional. URL of the video to play.</div>
	</TableRow>

	<TableRow>
		<div><code>posterUrl</code></div>
		<div><code>'video'</code></div>
		<div>Optional. Poster image shown before the video plays.</div>
	</TableRow>
</Table>

<h2>Example</h2>

<CodeBlock
	code={`
		<Testimonials
			reviews={[
				{
					type: 'text',
					name: 'Lionel S.',
					role: 'Blogger',
					quote:
						'I need a simple, easy-to-use, fast, beautiful and mature blogging tool that resolves the WordPress bloat. Hyvor Blogs handles this beautifully.'
				},
				{
					type: 'video',
					name: 'Video testimonial',
					role: 'Coming soon'
				},
				{
					type: 'text',
					name: 'Manoj P.',
					role: 'Senior Application Engineer',
					quote:
						'The platform offers a seamless and user-friendly experience for both bloggers and readers. The customization options are extensive.'
				},
				{
					type: 'text',
					name: 'Aisha K.',
					role: 'Newsletter writer',
					quote:
						'Migrating was painless, and the editor is the best I have used for long-form writing.'
				},
				{
					type: 'text',
					name: 'Diego R.',
					role: 'Indie hacker',
					quote: 'Fast, simple, and it just works. Exactly what I wanted for my blog.'
				}
			]}
		/>
	`}
/>

<CodeResult white>
	<Testimonials
		reviews={[
			{
				type: 'text',
				name: 'Lionel S.',
				role: 'Blogger',
				quote:
					'I need a simple, easy-to-use, fast, beautiful and mature blogging tool that resolves the WordPress bloat. Hyvor Blogs handles this beautifully.'
			},
			{
				type: 'video',
				name: 'Video testimonial',
				role: 'Coming soon'
			},
			{
				type: 'text',
				name: 'Manoj P.',
				role: 'Senior Application Engineer',
				quote:
					'The platform offers a seamless and user-friendly experience for both bloggers and readers. The customization options are extensive.'
			},
			{
				type: 'text',
				name: 'Aisha K.',
				role: 'Newsletter writer',
				quote:
					'Migrating was painless, and the editor is the best I have used for long-form writing.'
			},
			{
				type: 'text',
				name: 'Diego R.',
				role: 'Indie hacker',
				quote: 'Fast, simple, and it just works. Exactly what I wanted for my blog.'
			}
		]}
	/>
</CodeResult>
