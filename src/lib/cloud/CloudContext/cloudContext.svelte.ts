import { get, writable } from 'svelte/store';

let cloudContext = $state<() => CloudContext>();

export function getCloudContext() {
	return cloudContext!();
}

export function setCloudContext(context: () => CloudContext) {
	cloudContext = context;
}

// the number of cloud context
// incremented when the context is updated
export let cloudContextId = writable(0);

export function incrementCloudContextId() {
	cloudContextId.update((n) => n + 1);
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

	/**
	 * Current organization's license
	 * null if no organization
	 */
	license: null | ResolvedLicense;

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
	username?: string;
	email: string;
	picture_url: string | null;
}

export interface CloudContextOrganization {
	id: number;
	name: string;
	role: OrganizationRole;
}

export interface ResolvedLicense {
	type: 'enterprise_contract' | 'subscription' | 'trial' | 'expired' | 'none';
	license: Record<string, number | boolean> | null;
	subscription: null | {
		plan_readable_name: string;
		cancel_at: null | number;
	};
	trial_ends_at: null | number;
}

export interface OrganizationMember {
	id: number;
	role: OrganizationRole;

	user_id: number;
	user_username: string;
	user_email: string;
	user_picture_url: string | null;
}

export type OrganizationRole = 'admin' | 'manager' | 'member' | 'billing';
