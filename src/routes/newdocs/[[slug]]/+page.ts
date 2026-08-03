import { loadDocsPage } from '$lib/marketing/Docs/FullDocs/fulldocs.js';
import type { NavSectionConfig } from '$lib/marketing/Docs/types.js';
import ConsoleApiDoc from './ConsoleApiDoc.svelte';
import IntroductionDoc from './IntroductionDoc.svelte';

const SECTIONS: NavSectionConfig[] = [
	{
		navs: [
			{
				type: 'page',
				name: 'Introduction',
				slug: '',
				content: IntroductionDoc
			},
			{
				type: 'page',
				name: 'Writing',
				slug: 'writing',
				content: IntroductionDoc
			}
		]
	},
	{
		name: 'Hosting',
		navs: [
			{
				type: 'page',
				name: 'Custom Domain',
				slug: 'custom-domain',
				content: IntroductionDoc
			},
			{
				type: 'page',
				name: 'Subdirectory',
				slug: 'subdirectory',
				content: IntroductionDoc
			}
		]
	},
	{
		name: 'API',
		navs: [
			{
				type: 'page',
				name: 'Console API',
				slug: 'api-console',
				content: ConsoleApiDoc,
				wide: true
			}
		]
	},
	{
		name: 'Guides',
		navs: [
			{
				type: 'folding-section',
				name: 'Theme Development',
				navs: [
					{
						type: 'page',
						name: 'Overview',
						slug: 'themes-overview',
						content: IntroductionDoc
					}
				]
			},
			{
				type: 'sub-section',
				name: 'Self Hosting',
				sections: [
					{
						navs: [
							{
								type: 'page',
								name: 'Installation',
								slug: 'self-hosting-installation',
								content: IntroductionDoc
							},
							{
								type: 'page',
								name: 'Configuration',
								slug: 'self-hosting-configuration',
								content: IntroductionDoc
							},
							{
								type: 'sub-section',
								name: 'Docker',
								sections: [
									{
										navs: [
											{
												type: 'page',
												name: 'Docker Compose',
												slug: 'self-hosting-docker-compose',
												content: IntroductionDoc
											},
											{
												type: 'page',
												name: 'Kubernetes',
												slug: 'self-hosting-docker-kubernetes',
												content: IntroductionDoc
											}
										]
									}
								]
							}
						]
					}
				]
			}
		]
	}
];

export async function load({ params }) {
	return loadDocsPage({
		basepath: '/newdocs',
		sections: SECTIONS,
		slug: params.slug ?? ''
	});
}
