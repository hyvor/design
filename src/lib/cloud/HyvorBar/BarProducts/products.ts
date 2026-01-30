import LogoFortguard from '$lib/marketing/Logo/LogoFortguard.svelte';
import type { Component } from 'svelte';

type Suite = 'content-community' | 'api';

interface Product {
	component: string;
	name: string;
	logo?: Component;
	url: string;
	description: string;
	suite: Suite;
}

export const PRODUCTS: Record<string, Product> = {
	talk: {
		component: 'talk',
		name: 'Hyvor Talk',
		url: 'talk.hyvor.com',
		description: 'Commenting Platform',
		suite: 'content-community'
	},
	blogs: {
		component: 'blogs',
		name: 'Hyvor Blogs',
		url: 'blogs.hyvor.com',
		description: 'Blogging Platform',
		suite: 'content-community'
	},
	post: {
		component: 'post',
		name: 'Hyvor Post',
		url: 'post.hyvor.com',
		description: 'Newsletter Platform',
		suite: 'content-community'
	},
	relay: {
		component: 'relay',
		name: 'Hyvor Relay',
		url: 'relay.hyvor.com',
		description: 'Email API',
		suite: 'api'
	},
	fortguard: {
		component: 'fortguard',
		name: 'FortGuard',
		logo: LogoFortguard,
		url: 'fortguard.io',
		description: 'Spam Detection API',
		suite: 'api'
	}
};

export function getProductsGroupedBySuite(): Record<string, Product[]> {
	const groupedProducts: Record<string, Product[]> = {};

	for (const productKey in PRODUCTS) {
		const product = PRODUCTS[productKey];
		if (!groupedProducts[product.suite]) {
			groupedProducts[product.suite] = [];
		}
		groupedProducts[product.suite].push(product);
	}

	return groupedProducts;
}

export function getSuiteName(suite: Suite) {
	return suite === 'content-community' ? 'Content & Community' : 'API';
}
