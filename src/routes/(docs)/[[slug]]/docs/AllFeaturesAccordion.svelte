<script lang="ts">
	import AllFeaturesAccordion from '$lib/marketing/AllFeaturesAccordion/AllFeaturesAccordion.svelte';
	import Table from '$lib/components/Table/Table.svelte';
	import TableRow from '$lib/components/Table/TableRow.svelte';
	import CodeBlock from '$lib/components/CodeBlock/CodeBlock.svelte';
	import CodeResult from './Helper/CodeResult.svelte';
	import IconPencil from '@hyvor/icons/IconPencil';
	import IconImage from '@hyvor/icons/IconImage';
	import IconCode from '@hyvor/icons/IconCode';
	import IconSignpost2 from '@hyvor/icons/IconSignpost2';
	import IconTag from '@hyvor/icons/IconTag';
	import IconRss from '@hyvor/icons/IconRss';
</script>

<h1>All Features Accordion</h1>

<p>
	A catch-all "and there's more" section: categories of features, each expandable into a grid of
	icon + title + description cards. Good for listing everything that didn't get its own
	<a href="/feature-split">Feature Split</a> section.
</p>

<h2>Properties</h2>

<Table columns="1fr 1fr 3fr">
	<TableRow head>
		<div>Name</div>
		<div>Default</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>categories</code></div>
		<div></div>
		<div>Required. An array of feature categories, see the shape below.</div>
	</TableRow>

	<TableRow>
		<div><code>title</code></div>
		<div><code>"And There's More..."</code></div>
		<div>The section heading.</div>
	</TableRow>

	<TableRow>
		<div><code>description</code></div>
		<div><code>''</code></div>
		<div>Optional paragraph under the title.</div>
	</TableRow>

	<TableRow>
		<div><code>defaultOpenIndex</code></div>
		<div><code>0</code></div>
		<div>
			Index of the category open by default. Use <code>-1</code> to start with all of them collapsed.
		</div>
	</TableRow>

	<TableRow>
		<div><code>accentColor</code></div>
		<div><code>var(--accent)</code></div>
		<div>
			Overrides the accent used to tint the open category's background, in light mode. This is
			separate from each category's own <code>color</code>, which only tints that category's icon
			badge and its features' watermarks.
		</div>
	</TableRow>

	<TableRow>
		<div><code>accentColorDark</code></div>
		<div><code>accentColor</code></div>
		<div>
			Same as <code>accentColor</code>, used in dark mode. Falls back to
			<code>accentColor</code>, then the theme accent.
		</div>
	</TableRow>
</Table>

<h3>The <code>categories</code> shape</h3>

<Table columns="1fr 3fr">
	<TableRow head>
		<div>Field</div>
		<div>Description</div>
	</TableRow>

	<TableRow>
		<div><code>label</code></div>
		<div>Category name, shown as the accordion trigger.</div>
	</TableRow>

	<TableRow>
		<div><code>icon</code></div>
		<div>A <code>@hyvor/icons</code> component for the trigger.</div>
	</TableRow>

	<TableRow>
		<div><code>color</code></div>
		<div>
			Optional. Any CSS color, e.g. <code>'var(--green)'</code> or <code>'#4b874b'</code>, defaults
			to the theme accent.
		</div>
	</TableRow>

	<TableRow>
		<div><code>features</code></div>
		<div>An array of <code>{'{ icon, title, description }'}</code>, one card per feature.</div>
	</TableRow>
</Table>

<h2>Example</h2>

<CodeBlock
	code={`
		<AllFeaturesAccordion
			categories={[
				{
					label: 'Post Editor',
					icon: IconPencil,
					color: 'var(--green)',
					features: [
						{
							icon: IconPencil,
							title: 'All the basics',
							description: 'Bold, italic, headings, lists, quotes, links, and more.'
						},
						{
							icon: IconImage,
							title: 'Images',
							description: 'Upload, paste, drag and drop, and more ways to add images.'
						},
						{
							icon: IconCode,
							title: 'Embeds',
							description: 'Easily embed from YouTube, X, Instagram, and 1000+ platforms.'
						}
					]
				},
				{
					label: 'Your Blog',
					icon: IconSignpost2,
					color: 'var(--blue)',
					features: [
						{ icon: IconTag, title: 'Tags', description: 'Organize your posts with tags.' },
						{
							icon: IconRss,
							title: 'Atom (RSS) Feed',
							description: 'Atom feeds are generated automatically.'
						}
					]
				}
			]}
		/>
	`}
/>

<CodeResult white>
	<AllFeaturesAccordion
		categories={[
			{
				label: 'Post Editor',
				icon: IconPencil,
				color: 'var(--green)',
				features: [
					{
						icon: IconPencil,
						title: 'All the basics',
						description: 'Bold, italic, headings, lists, quotes, links, and more.'
					},
					{
						icon: IconImage,
						title: 'Images',
						description: 'Upload, paste, drag and drop, and more ways to add images.'
					},
					{
						icon: IconCode,
						title: 'Embeds',
						description: 'Easily embed from YouTube, X, Instagram, and 1000+ platforms.'
					}
				]
			},
			{
				label: 'Your Blog',
				icon: IconSignpost2,
				color: 'var(--blue)',
				features: [
					{ icon: IconTag, title: 'Tags', description: 'Organize your posts with tags.' },
					{
						icon: IconRss,
						title: 'Atom (RSS) Feed',
						description: 'Atom feeds are generated automatically.'
					}
				]
			}
		]}
	/>
</CodeResult>
