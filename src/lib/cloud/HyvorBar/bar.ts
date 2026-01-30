import { track } from '$lib/marketing/index.js';
import { get, writable } from 'svelte/store';
import {
	getCloudContext,
	type CloudContextOrganization
} from '../CloudContext/cloudContext.svelte.js';

export interface BarConfig {
	name: string | null;
	docs: boolean;
	chat: boolean;
	g2: string | null;
}

export interface BarUpdate {
	id: number;
	created_at: number;
	type: BarUpdateType;
	title: string;
	content: string;
	url?: string;
}

export type BarUpdateType = 'company' | 'core' | 'talk' | 'blogs' | 'fortguard';

export interface ResolvedLicense {
	type: 'enterprise_contract' | 'subscription' | 'trial' | 'expired' | 'none';
	license: Record<string, number | boolean> | null;
	subscription: null | {
		plan_readable_name: string;
		cancel_at: null | number;
	};
	trial_ends_at: null | number;
}

export type OrgSwitchInitiator = 'bar' | 'resource-creator';

export const barUnreadUpdates = writable<number>(0);
export const barLicense = writable<ResolvedLicense>();
export const barHasFailedInvoices = writable<boolean>(false);
export const barOrganizationDropdownOpen = writable<boolean>(false);
export const barOrganizations = writable<CloudContextOrganization[]>([]);

export const barOnOrganizationSwitch = writable<
	((org: BarOrganization, initiater: OrgSwitchInitiator) => void) | null
>(null);
export const barOrganizationCreating = writable<boolean>(false);

interface BarResponse {
	user_id: number;
	organization_id: number | null;
	license: ResolvedLicense;
	has_failed_invoices: boolean;

	//
	// updates: {
	// 	unread: number;
	// };
}

/**
 * @throws Error if initialization fails
 */
export async function initBar() {
	const { user, organization, instance, component } = getCloudContext();

	const query = new URLSearchParams();
	query.set('component', component);

	const lastUnreadTime = UnreadUpdatesTimeLocalStorage.get();
	if (lastUnreadTime) {
		query.set('last_read_updates_at', lastUnreadTime.toString());
	}

	const response = await fetch(instance + '/api/v2/cloud/bar/init?' + query.toString(), {
		credentials: 'include'
	});

	if (!response.ok) {
		throw new Error('Failed to initialize bar');
	}

	const data: BarResponse = await response.json();

	const currentOrganizationId = organization ? organization.id : null;

	if (user.id !== data.user_id || currentOrganizationId !== data.organization_id) {
		// something is very wrong
		// reload Console or something
	}

	barLicense.set(data.license);
	barHasFailedInvoices.set(data.has_failed_invoices);

	// TODO:
	// barUnreadUpdates.set(data.updates.unread);

	// if (lastUnreadTime === null) {
	// 	UnreadUpdatesTimeLocalStorage.setNow();
	// }

	// if (data.user && track.ready()) {
	// 	track.identify(data.user.id.toString(), {
	// 		name: data.user.name ?? undefined,
	// 		avatar: data.user.picture_url ?? undefined
	// 	});
	// }
}

export async function createOrganization(
	name: string,
	switchInitiator: OrgSwitchInitiator = 'bar'
): Promise<BarOrganization> {
	async function doCreate() {
		const response = await fetch(getInstance() + '/api/v2/cloud/organizations', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name })
		});

		if (!response.ok) {
			throw new Error('Failed to create organization');
		}

		const data = await response.json();
		return data as BarOrganization;
	}

	const org = await doCreate();

	const onSwitch = get(barOnOrganizationSwitch);
	onSwitch?.(org, switchInitiator);

	barOrganizations.update((orgs) => [org, ...orgs]);
	barUnreadUpdates.set(0);
	barHasFailedInvoices.set(false);
	barUser.update((user) => {
		if (!user) {
			return null; // typesafety
		}
		return {
			...user,
			current_organization: org
		};
	});

	return org;
}

export async function switchOrganization(orgId: number): Promise<void> {
	const response = await fetch(getInstance() + '/api/v2/cloud/organizations/switch', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			'X-Organization-Id': orgId.toString()
		}
	});

	if (!response.ok) {
		throw new Error('Failed to switch organization');
	}

	await initBar();
}

export class UnreadUpdatesTimeLocalStorage {
	static KEY = 'unread_updates';

	static get() {
		const val = BarLocalStorage.get(UnreadUpdatesTimeLocalStorage.KEY);
		if (val) {
			return Number(val);
		}
		return null;
	}

	static set(value: string) {
		BarLocalStorage.set(UnreadUpdatesTimeLocalStorage.KEY, value);
	}

	static setNow() {
		UnreadUpdatesTimeLocalStorage.set(Math.floor(Date.now() / 1000).toString());
	}
}

class BarLocalStorage {
	static KEY = 'hyvor_bar';

	static getJson() {
		try {
			const data = localStorage.getItem(BarLocalStorage.KEY);
			if (data) {
				return JSON.parse(data);
			}
		} catch (e) {
			console.error(e);
			return null;
		}
		return null;
	}

	static get(key: string): string | null {
		const data = BarLocalStorage.getJson();
		if (data) {
			return data[key];
		}
		return null;
	}

	static set(key: string, value: string) {
		try {
			const data = BarLocalStorage.getJson() || {};
			data[key] = value;
			localStorage.setItem(BarLocalStorage.KEY, JSON.stringify(data));
		} catch (e) {
			console.error(e);
		}
	}
}

// exported to be used from outside
export const bar = {
	/**
	 * Refetches data like user info, unread updates, billing data, etc.
	 * But does not show a loader
	 * This is useful to create after, for example, a user creates a new blog
	 */
	reload: () => {
		initBar();
	},

	/**
	 * Open the org selector dropdown from the outside world
	 */
	openOrganizationDropdown: () => barOrganizationDropdownOpen.set(true)
};
