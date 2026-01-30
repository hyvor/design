let cloudContext = $state<() => CloudContext>();

export function getCloudContext() {
	return cloudContext!();
}

export function setCloudContext(context: () => CloudContext) {
	cloudContext = context;
}

export interface CloudContext {
	/**
	 * The component being loaded
	 */
	component: string; // core, talk, blogs, etc.

	/**
	 * 'cloud' is when HYVOR prod is running (which means there is "core" component running to support auth, billing, etc.)
	 * 'on-prem' for anything else
	 * This enum can be handled by the internal library
	 */
	deployment: 'cloud' | 'on-prem';

	/**
	 * HYVOR instance. Only for cloud. For on-prem, send an empty string
	 */
	instance: string;

	/**
	 * Currently logged in user.
	 * Required.
	 */
	user: CloudContextUser;

	/**
	 * User's current organization
	 */
	organization: null | CloudContextOrganization;

	callbacks: {
		/**
		 * Callback that is called when the organization is being switched
		 * on the product Console side, you would have a handler like this:
		 * ```js
		 * onOrganizationSwitch: (switcher) => {
		 *
		 * 		// first set the loader for UX
		 * 		loading = true;
		 *
		 * 		switcher()
		 * 			.then(org => {
		 * 				// re-init the Console
		 * 			})
		 * 			.catch(() => {
		 * 					loading = false;
		 * 			})
		 * }
		 * ```
		 */
		onOrganizationSwitch: (switcher: Promise<CloudContextOrganization>) => void;
	};
}

export interface CloudContextUser {
	id: number;
	name: string | null;
	username?: string | null;
	email: string;
	picture_url: string | null;
}

export interface CloudContextOrganization {
	id: number;
	name: string;
	role: OrganizationRole;
}

export type OrganizationRole = 'admin' | 'manager' | 'member' | 'billing';
