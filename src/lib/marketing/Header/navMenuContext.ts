import { getContext, setContext } from 'svelte';

const KEY = Symbol('header-nav-menu');

export interface HeaderNavMenuContext {
	/** true while the menu's items are rendered inline inside the mobile hamburger menu */
	readonly inlineMobile: boolean;
}

export function setHeaderNavMenuContext(ctx: HeaderNavMenuContext): void {
	setContext(KEY, ctx);
}

export function getHeaderNavMenuContext(): HeaderNavMenuContext | undefined {
	return getContext(KEY);
}
