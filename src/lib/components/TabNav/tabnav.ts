export interface TabNavState {
	// URL-base active state
	basePath: string | undefined;

	// whether to replaceState when navigating
	// if only basePath is set
	replaceState: boolean;

	// current pathname, compared against each tab's URL to determine the
	// active tab when basePath is set
	pathname: string;

	// SvelteKit's `goto`, passed in by the consuming app to enable
	// client-side navigation. HDS components does not import from `$app/*`
	// directly, so that it also works in non-SvelteKit Svelte apps. When
	// not provided, a normal (full-page) navigation is used instead.
	goto?: (url: string, opts?: { replaceState?: boolean }) => void;
}
