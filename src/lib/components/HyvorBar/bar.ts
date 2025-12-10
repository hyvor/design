import { track } from '$lib/marketing/index.js';
import { get, writable } from 'svelte/store';

export type BarProduct = string | 'core';

export interface BarConfig {
	name: string | null;
	docs: boolean;
	chat: boolean;
	g2: string | null;
}

export interface BarUser {
	name: string | null;
	username?: string | null;
	email: string;
	picture_url: string | null;
	current_organization: null | {
		name: string; // only the name is required
	};
}

export interface BarOrganization {
	id: number;
	name: string;
	role: 'admin' | 'billing' | 'manager' | 'member';
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

export interface BarResolvedLicense {
	type: 'subscription' | 'trial' | 'custom' | 'expired';
	license: Record<string, number | boolean> | null;
	subscription: null | {
		plan_readable: string;
		cancel_at: null | number;
	};
	trial_ends_at: null | number;
}

let product: string = 'core';

export const instance = writable<string>('');
export const barUser = writable<BarUser | null>(null);
export const barUnreadUpdates = writable<number>(0);
export const barLicense = writable<BarResolvedLicense | null>(null);
export const barHasFailedInvoices = writable<boolean>(false);
export const barOrganizationDropdownOpen = writable<boolean>(false);
export const barOrganizations = writable<BarOrganization[]>([]);
export const barOnOrganizationSwitch = writable<
	((org: BarOrganization, type: 'switch' | 'create') => void) | null
>(null);
export const barOrganizationCreating = writable<boolean>(false);

interface BarResponse {
	updates: {
		unread: number;
	};
	billing: {
		has_failed_invoices: boolean;
		license: BarResolvedLicense | null;
	};
	user: {
		id: number;
		name: string | null;
		username: string;
		email: string;
		picture_url: string;
		current_organization: null | BarUser['current_organization'];
	};
}

export function setInstanceAndProduct(instance_: string, product_: string) {
	instance.set(instance_);
	product = product_;
}

export function getInstance(): string {
	return get(instance);
}

/**
 * @throws Error if initialization fails
 */
export async function initBar() {
	const query = new URLSearchParams();
	query.set('product', product);

	const lastUnreadTime = UnreadUpdatesTimeLocalStorage.get();
	if (lastUnreadTime) {
		query.set('last_read_updates_at', lastUnreadTime.toString());
	}

	const response = await fetch(getInstance() + '/api/public/bar?' + query.toString(), {
		credentials: 'include'
	});

	if (!response.ok) {
		throw new Error('Failed to initialize bar');
	}

	const data: BarResponse = await response.json();

	barUser.set(data.user);
	barUnreadUpdates.set(data.updates.unread);
	barLicense.set(data.billing.license);
	barHasFailedInvoices.set(data.billing.has_failed_invoices);

	if (lastUnreadTime === null) {
		UnreadUpdatesTimeLocalStorage.setNow();
	}

	if (data.user && track.ready()) {
		track.identify(data.user.id.toString(), {
			name: data.user.name ?? undefined,
			avatar: data.user.picture_url ?? undefined
		});
	}
}

export async function getMyOrganizations(): Promise<BarOrganization[]> {
	return [];
	/* return [
		{ id: 1, name: 'Org 1', role: 'admin' },
		{ id: 2, name: 'Org 2', role: 'member' },
		{ id: 3, name: 'Org 3', role: 'billing' },
		{ id: 4, name: 'Org 4', role: 'manager' }
	]; */

	const response = await fetch(getInstance() + '/api/public/bar/orgs/my', {
		credentials: 'include'
	});
	const data = await response.json();
	return data.organizations;
}

export async function createOrganization(name: string): Promise<BarOrganization> {
	async function doCreate() {
		const response = await fetch(getInstance() + '/api/public/bar/orgs', {
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
	onSwitch?.(org, 'create');

	barOrganizations.update((orgs) => [org, ...orgs]);
	barUnreadUpdates.set(0);
	barHasFailedInvoices.set(false);
	barUser.update((user) => {
		if (!user) {
			return null; // typesafety
		}
		return {
			...user,
			current_organization: { name: org.name }
		};
	});

	return org;
}

export async function switchOrganization(orgId: number): Promise<void> {
	const response = await fetch(getInstance() + '/api/public/bar/orgs/switch', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ organization_id: orgId })
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
