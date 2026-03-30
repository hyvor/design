export interface TabNavState {
	// URL-base active state
	basePath: string | undefined;

	// whether to replaceState when navigating
	// if only basePath is set
	replaceState: boolean;
}
