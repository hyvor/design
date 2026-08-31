<script lang="ts">
	import Base from '$lib/components/Base/Base.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import Header from '$lib/marketing/Header/Header.svelte';
	import HeaderNavLink from '$lib/marketing/Header/HeaderNavLink.svelte';
	import HeaderNavMenu from '$lib/marketing/Header/HeaderNavMenu.svelte';
	import HeaderLanguageToggle from '$lib/marketing/Header/HeaderLanguageToggle.svelte';
	import { buildLocalizedUrl } from '$lib/marketing/Header/language.js';
	import Footer from '$lib/marketing/Footer/Footer.svelte';
	import FooterLinkList from '$lib/marketing/Footer/FooterLinkList.svelte';
	import Hero from '$lib/marketing/Hero/Hero.svelte';
	import LogoStrip from '$lib/marketing/LogoStrip/LogoStrip.svelte';
	import FeatureSplit from '$lib/marketing/FeatureSplit/FeatureSplit.svelte';
	import SpotlightSplit from '$lib/marketing/SpotlightSplit/SpotlightSplit.svelte';
	import Testimonials from '$lib/marketing/Testimonials/Testimonials.svelte';
	import AllFeaturesAccordion from '$lib/marketing/AllFeaturesAccordion/AllFeaturesAccordion.svelte';
	import FAQ from '$lib/marketing/FAQ/FAQ.svelte';
	import FullTrialSignup from '$lib/marketing/FullTrialSignup/FullTrialSignup.svelte';
	import GdprSeal from '$lib/marketing/Seal/GdprSeal.svelte';
	import CcpaSeal from '$lib/marketing/Seal/CcpaSeal.svelte';
	import SsoSeal from '$lib/marketing/Seal/SsoSeal.svelte';
	import IsoSeal from '$lib/marketing/Seal/IsoSeal.svelte';
	import IconBoxArrowUpRight from '@hyvor/icons/IconBoxArrowUpRight';
	import IconGithub from '@hyvor/icons/IconGithub';
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
	import IconRegex from '@hyvor/icons/IconRegex';
	import IconMarkdown from '@hyvor/icons/IconMarkdown';
	import IconHourglass from '@hyvor/icons/IconHourglass';
	import IconGlobe from '@hyvor/icons/IconGlobe';
	import IconGlobe2 from '@hyvor/icons/IconGlobe2';
	import IconEnvelope from '@hyvor/icons/IconEnvelope';
	import IconChatDots from '@hyvor/icons/IconChatDots';
	import IconGraphUp from '@hyvor/icons/IconGraphUp';
	import IconKey from '@hyvor/icons/IconKey';
	import IconPlug from '@hyvor/icons/IconPlug';
	import IconDatabase from '@hyvor/icons/IconDatabase';
	import { page } from '$app/stores';
	import type { ComponentProps } from 'svelte';

	// --- Header ---

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

	// --- Logo Strip ---

	// placeholder customer logos, just a name rendered as an inline SVG data URI;
	// swap these for real logo files when wiring this up on an actual site
	function placeholderLogo(name: string, width = 120) {
		const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="28"><text x="0" y="21" font-family="sans-serif" font-size="20" font-weight="700" fill="black">${name}</text></svg>`;
		return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
	}

	// an opaque, full-color "app icon" square, to test the `color` override
	// (skips the shared white-silhouette treatment)
	function placeholderIcon(letter: string, bg: string) {
		const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44"><rect width="44" height="44" rx="10" fill="${bg}"/><text x="22" y="29" font-family="sans-serif" font-size="20" font-weight="700" fill="white" text-anchor="middle">${letter}</text></svg>`;
		return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
	}

	// portrait placeholder poster for the video testimonial card, matching the
	// aspect ratio of the placeholder video itself
	function placeholderPoster() {
		const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920"><rect width="1080" height="1920" fill="#574443"/><text x="540" y="960" font-family="sans-serif" font-size="72" font-weight="700" fill="white" text-anchor="middle">Video</text></svg>`;
		return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
	}

	const customerLogos = [
		{ name: 'Aqeez', src: placeholderLogo('Aqeez') },
		{ name: 'Globex', src: placeholderLogo('Globex') },
		{ name: 'Initech', src: placeholderLogo('Initech', 100) },
		{
			name: 'Nikonish',
			src: placeholderIcon('N', '#f2c200'),
			width: 44,
			height: 44,
			color: true
		},
		{ name: 'Umbrella Co', src: placeholderLogo('Umbrella Co', 140) },
		{ name: 'Soylent', src: placeholderLogo('Soylent') }
	];

	// --- Feature Split ---

	const editorBullets = [
		'Markdown shortcuts for all the formatting you need',
		'Paste, drag and drop, or pick images from Unsplash',
		'Syntax highlighting for 100+ languages'
	];

	const speedBullets = ['Automatic webp conversion', 'Aggressive edge caching', 'Global CDN'];

	// --- Testimonials ---

	const testimonialReviews: ComponentProps<typeof Testimonials>['reviews'] = [
		{
			type: 'text',
			name: 'Lionel S.',
			role: 'Blogger',
			quote:
				'I need a simple, easy-to-use, fast, beautiful and mature blogging tool that resolves the WordPress bloat. Hyvor Blogs handles this beautifully.'
		},
		{
			type: 'video',
			name: 'Nadia F.',
			role: 'Newsletter creator',
			videoUrl: 'https://placeholdervideo.dev/1080x1920',
			posterUrl: placeholderPoster(),
			summary: 'Amazing Product'
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
			quote: 'Migrating was painless, and the editor is the best I have used for long-form writing.'
		},
		{
			type: 'text',
			name: 'Diego R.',
			role: 'Indie hacker',
			quote: 'Fast, simple, and it just works. Exactly what I wanted for my blog.'
		}
	];

	// --- All Features Accordion ---

	const featureCategories = [
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
					description: 'Upload, paste, drag and drop, Unsplash, and more ways to add images.'
				},
				{
					icon: IconCode,
					title: 'Embeds',
					description: 'Easily embed from YouTube, X, Instagram, and 1000+ platforms.'
				},
				{
					icon: IconRegex,
					title: 'Syntax Highlighting',
					description: 'Add code blocks with syntax highlighting for 100+ languages.'
				},
				{
					icon: IconMarkdown,
					title: 'Markdown-friendly',
					description: 'Markdown shortcuts for all the formatting you need.'
				},
				{
					icon: IconHourglass,
					title: 'Drafts & Scheduling',
					description: 'Save drafts and schedule posts to be published in the future.'
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
				},
				{
					icon: IconGlobe2,
					title: 'Custom Domain',
					description: 'Use your own domain for your blog.'
				},
				{
					icon: IconPalette,
					title: 'Themes',
					description: 'Pick from official themes, or build your own.'
				},
				{
					icon: IconEnvelope,
					title: 'Newsletter',
					description: 'Turn readers into subscribers with a built-in newsletter.'
				},
				{
					icon: IconChatDots,
					title: 'Comments',
					description: 'Built-in, spam-free commenting for every post.'
				},
				{
					icon: IconGraphUp,
					title: 'Analytics',
					description: 'See what is working with built-in, privacy-friendly analytics.'
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
				},
				{
					icon: IconGlobe,
					title: 'Global CDN',
					description: 'Every asset is served from a CDN close to your readers.'
				}
			]
		},
		{
			label: 'Developers',
			icon: IconDatabase,
			color: 'var(--red)',
			features: [
				{
					icon: IconKey,
					title: 'REST API',
					description: 'Full API access to build custom integrations.'
				},
				{
					icon: IconPlug,
					title: 'Webhooks',
					description: 'Get notified in real-time when things happen on your blog.'
				},
				{
					icon: IconCode,
					title: 'Custom Code',
					description: 'Inject custom CSS and JavaScript into your theme.'
				},
				{
					icon: IconDatabase,
					title: 'Data Export',
					description: 'Export your full content and data at any time.'
				}
			]
		}
	];

	// --- FAQ ---

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

<!-- Header -->
<Header product="relay" name="HYVOR" subName="Design System" max={true}>
	{#snippet center()}
		<HeaderNavLink href="#">Pricing</HeaderNavLink>
		<HeaderNavLink href="#" active={true}>Docs</HeaderNavLink>
		<HeaderNavLink href="#">Hosting</HeaderNavLink>

		<HeaderNavMenu label="Resources" active={isThemesOrIntegrations}>
			<HeaderNavLink href="#">
				{#snippet start()}<IconPalette size={15} />{/snippet}
				Themes
				{#snippet description()}Blog themes to match your brand{/snippet}
			</HeaderNavLink>
			<HeaderNavLink href="#">
				{#snippet start()}<IconPuzzle size={15} />{/snippet}
				Integrations
				{#snippet description()}Connect with your favorite tools{/snippet}
			</HeaderNavLink>
		</HeaderNavMenu>

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
		fullHeight={true}
		badge="Open-source & free to try"
		buttons={{ href: '/console?signup', label: 'Start your blog' }}
	>
		{#snippet title()}
			You Publish.<br /><span class="heading-small">(We'll handle the rest)</span>
		{/snippet}
		{#snippet subtitle()}
			Hyvor Blogs is our <span class="hds-marker">blogging platform</span>. It's
			<span class="hds-hl">fast</span>, <span class="hds-hl">simple</span>, and
			<span class="hds-hl">open-source</span>!
		{/snippet}
	</Hero>

	<!-- Logo Strip -->
	<LogoStrip label="Trusted by 10,000+ websites & businesses" logos={customerLogos} />

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

	<!-- Spotlight Split -->
	<SpotlightSplit
		title="Enterprise-ready."
		description="Enterprise-grade security and compliance, without adding complexity to your publishing workflow."
		stats={['> 99.9% Uptime', 'Priority Support']}
		button={{ href: 'https://hyvor.com/enterprise', label: 'Contact Sales', external: true }}
		background="#574443"
	>
		{#snippet content()}
			<div class="seal-grid">
				<GdprSeal />
				<CcpaSeal />
				<SsoSeal />
				<IsoSeal />
			</div>
		{/snippet}
	</SpotlightSplit>

	<!-- All Features Accordion -->
	<AllFeaturesAccordion
		accentColor="#574443"
		accentColorDark="#a8867e"
		categories={featureCategories}
	/>

	<!-- Testimonials -->
	<Testimonials reviews={testimonialReviews} />

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
		accentColor="#574443"
		accentColorDark="#a8867e"
	/>
</Base>

<!-- Footer -->
<Footer
	name="Hyvor Talk"
	logo="/favicon.svg"
	background="#574443"
	backgroundDark="#2a1f1e"
	card={true}
	email="talk.support@hyvor.com"
	max={true}
>
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

	.seal-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
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
