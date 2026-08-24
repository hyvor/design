<script lang="ts">
	import Base from '$lib/components/Base/Base.svelte';
	import Header from '$lib/marketing/Header/Header.svelte';
	import HeaderNavLink from '$lib/marketing/Header/HeaderNavLink.svelte';
	import Button from '../../lib/components/Button/Button.svelte';
	import Dropdown from '$lib/components/Dropdown/Dropdown.svelte';
	import IconBoxArrowUpRight from '@hyvor/icons/IconBoxArrowUpRight';
	import IconGithub from '@hyvor/icons/IconGithub';
	import IconCaretDown from '@hyvor/icons/IconCaretDown';
	import IconPalette from '@hyvor/icons/IconPalette';
	import IconPuzzle from '@hyvor/icons/IconPuzzle';
	import IconImage from '@hyvor/icons/IconImage';
	import IconCode from '@hyvor/icons/IconCode';
	import IconPencil from '@hyvor/icons/IconPencil';
	import IconSignpost2 from '@hyvor/icons/IconSignpost2';
	import IconTag from '@hyvor/icons/IconTag';
	import IconRss from '@hyvor/icons/IconRss';
	import IconLightning from '@hyvor/icons/IconLightning';
	import IconSearchHeart from '@hyvor/icons/IconSearchHeart';
	import Footer from '$lib/marketing/Footer/Footer.svelte';
	import FooterLinkList from '$lib/marketing/Footer/FooterLinkList.svelte';
	import HeaderLanguageToggle from '$lib/marketing/Header/HeaderLanguageToggle.svelte';
	import { buildLocalizedUrl } from '$lib/marketing/Header/language.js';
	import { page } from '$app/stores';

	let resourcesOpen = $state(false);

	const isThemesOrIntegrations = $derived(
		$page.url.pathname === '/themes' || $page.url.pathname.startsWith('/integrations')
	);

	const LANGUAGES = [
		{ code: 'en', flag: '🇬🇧', name: 'English' },
		{ code: 'fr', flag: '🇫🇷', name: 'Français' }
	];
	const DEFAULT_LANGUAGE = 'en';
	const currentLang = $derived(
		LANGUAGES.find((l) => l.code === $page.url.pathname.split('/')[1])?.code ?? DEFAULT_LANGUAGE
	);

	function closeOnLinkClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (target.tagName === 'A' || target.closest('a')) {
			resourcesOpen = false;
		}
	}

	const editorBullets = [
		'Markdown shortcuts for all the formatting you need',
		'Paste, drag and drop, or pick images from Unsplash',
		'Syntax highlighting for 100+ languages'
	];

	const speedBullets = ['Automatic webp conversion', 'Aggressive edge caching', 'Global CDN'];

	const faqItems = [
		{ q: 'Is there a free trial?', a: 'Yes, every plan starts with a 14-day free trial.' },
		{ q: 'Can I cancel anytime?', a: 'Yes, there are no long-term contracts.' },
		{
			q: 'Do you offer discounts?',
			a: 'Yes, see our <a href="/pricing">pricing page</a> for details.'
		},
		{
			q: 'Is my data secure?',
			a: 'Yes, see our <a href="/security">security page</a> for details.'
		}
	];
</script>

<svelte:head>
	<title>Test Page - HDS</title>
</svelte:head>

<Header product="relay" name="HYVOR" subName="Design System" max={true}>
	{#snippet center()}
		<HeaderNavLink href="/pricing" active={$page.url.pathname === '/pricing'}>
			Pricing
		</HeaderNavLink>
		<HeaderNavLink href="/test" active={$page.url.pathname === '/test'}>Docs</HeaderNavLink>
		<HeaderNavLink href="/hosting" active={$page.url.pathname.startsWith('/hosting')}>
			Hosting
		</HeaderNavLink>

		<Dropdown bind:show={resourcesOpen} contentPadding={8} width={300}>
			{#snippet trigger()}
				<HeaderNavLink active={isThemesOrIntegrations}>
					Resources
					{#snippet end()}<IconCaretDown size={11} />{/snippet}
				</HeaderNavLink>
			{/snippet}
			{#snippet content()}
				<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
				<div onclick={closeOnLinkClick}>
					<HeaderNavLink href="/themes" active={$page.url.pathname === '/themes'}>
						{#snippet start()}<IconPalette size={15} />{/snippet}
						Themes
						{#snippet description()}Blog themes to match your brand{/snippet}
					</HeaderNavLink>
					<HeaderNavLink
						href="/integrations"
						active={$page.url.pathname.startsWith('/integrations')}
					>
						{#snippet start()}<IconPuzzle size={15} />{/snippet}
						Integrations
						{#snippet description()}Connect with your favorite tools{/snippet}
					</HeaderNavLink>
				</div>
			{/snippet}
		</Dropdown>

		<HeaderNavLink href="https://github.com/hyvor/design" target="_blank">
			{#snippet start()}<IconGithub size={12} />{/snippet}
			Github
			{#snippet end()}<IconBoxArrowUpRight size={11} />{/snippet}
		</HeaderNavLink>

		<HeaderLanguageToggle
			languages={LANGUAGES}
			current={currentLang}
			href={(code) => buildLocalizedUrl($page.url.pathname, currentLang, code, DEFAULT_LANGUAGE)}
		/>
	{/snippet}
	{#snippet end()}
		<Button size="small" as="a" href="https://hyvor.com" variant="invisible">HYVOR</Button>
		<Button as="a" size="small" href="https://github.com/hyvor/design" target="_blank">
			{#snippet start()}
				<IconGithub size={14} />
			{/snippet}
			Github {#snippet end()}
				<IconBoxArrowUpRight size={11} />
			{/snippet}
		</Button>
	{/snippet}
</Header>

<Base>
	<!-- Hero -->
	<Hero
		fullHeight={false}
		badge="Open-source & free to try"
		buttons={{ href: '/console?signup', label: 'Start your blog' }}
	>
		{#snippet title()}
			You Publish.<br /><span class="heading-small">(We'll handle the rest)</span>
		{/snippet}
		{#snippet subtitle()}
			Hyvor Blogs is our <span class="marker">blogging platform</span>. It's
			<span class="hl">fast</span>, <span class="hl">simple</span>, and
			<span class="hl">open-source</span>!
		{/snippet}
	</Hero>

	<!-- Feature Split -->
	<FeatureSplit
		eyebrow="Post Editor"
		title="Write without friction"
		description="A clean, distraction-free editor with everything you need to write and format posts."
		bullets={editorBullets}
		button={{ href: '/console?signup', label: 'Start writing' }}
		interactiveBullets
	>
		{#snippet visual(activeBullet)}
			<div class="visual-placeholder hds-box">
				<IconImage size={40} />
				<span>Active bullet: {activeBullet + 1}</span>
			</div>
		{/snippet}
	</FeatureSplit>

	<!-- Feature Split, flipped + alt background -->
	<FeatureSplit
		eyebrow="Optimizations"
		title="Built for speed"
		description="All official themes are optimized for speed. We use caching extensively to make your blog blazing fast."
		bullets={speedBullets}
		flip
		altBg
	>
		{#snippet visual()}
			<div class="visual-placeholder hds-box">
				<IconCode size={40} />
			</div>
		{/snippet}
	</FeatureSplit>

	<!-- Testimonials -->
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
			}
		]}
	/>

	<!-- All Features Accordion -->
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
			},
			{
				label: 'Optimizations',
				icon: IconLightning,
				color: 'var(--orange)',
				features: [
					{
						icon: IconSearchHeart,
						title: 'SEO',
						description: 'Meta tags, Open Graph tags, Canonical URLs, and more.'
					},
					{
						icon: IconLightning,
						title: 'Speed',
						description: 'All official themes are optimized for speed.'
					}
				]
			}
		]}
	/>

	<!-- FAQ -->
	<div class="hds-container faq-wrap">
		<h2 class="faq-title">Frequently asked questions</h2>
		<FAQ items={faqItems} />
	</div>

	<!-- Full Trial Signup -->
	<FullTrialSignup
		badge="Open-source & free to try"
		title="Start your blog today"
		description="Join hundreds of bloggers and businesses building with Hyvor Blogs."
		button={{ href: '/console?signup', label: 'Start your blog →' }}
	/>
</Base>

<Footer
	name="Hyvor Talk"
	logo="/favicon.svg"
	background="#574443"
	backgroundDark="#2a1f1e"
	card={true}
	email="talk.support@hyvor.com"
	max={true}
>
	{#snippet center()}
		<div class="footer-wrap">
			<div style="display:flex" class="footer">
				<FooterLinkList title="HYVOR TALK">
					<a href="/console">Console</a>
					<a href="/pricing">Pricing</a>
					<a href="/docs">Docs</a>
				</FooterLinkList>

				<FooterLinkList title="LEGAL">
					<a href="/terms">Terms</a>
					<a href="/privacy">Privacy Policy</a>
					<a href="https://hyvor.com/compliance" target="_blank">Compliance</a>
				</FooterLinkList>

				<FooterLinkList title="HYVOR">
					<a href="https://hyvor.com" target="_blank">hyvor.com</a>
					<a href="https://hyvor.com/#letter" target="_blank">About</a>
					<a href="https://hyvor.com/security" target="_blank">Security</a>
					<a href="https://status.hyvor.com/" target="_blank">System status</a>
					<a href="https://hyvor.com/blog" target="_blank">Blog</a>
				</FooterLinkList>

				<FooterLinkList title="RESOURCES">
					<a href="/blog">Blog</a>
					<a href="/docs">Documentation</a>
					<a href="https://hyvor.design" target="_blank">Design System</a>
				</FooterLinkList>
			</div>
		</div>
	{/snippet}
</Footer>

<style lang="scss">
	// media queries
	@media (max-width: 768px) {
		.footer-wrap {
			padding: 20px;
		}
		.footer {
			flex-direction: column;
			gap: 20px;
		}
	}

	.visual-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
		height: 260px;
		color: var(--text-light);
		font-size: 13px;
	}

	.faq-wrap {
		padding: 80px 15px;
	}

	.faq-title {
		font-size: 32px;
		font-weight: 700;
		margin: 0 0 40px;
		text-align: center;
		font-family: var(--font-serif);
	}

	:global(.heading-small) {
		font-size: 0.75em;
	}
</style>
