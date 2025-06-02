import { writable } from 'svelte/store';

export type BarProduct = string | 'core';

export interface BarConfig {
	name: string | null;
	docs: boolean;
	chat: boolean;
	g2: string | null;
}

interface BarUser {
	name: string | null;
	username: string;
	email: string;
	picture_url: string;
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

let instance = '';
let product: string = 'core';

export const barUser = writable<BarUser | null>(null);
export const barUnreadUpdates = writable<number>(0);
export const barLicense = writable<BarResolvedLicense | null>(null);
export const barHasFailedInvoices = writable<boolean>(false);

interface BarResponse {
	updates: {
		unread: number;
	};
	billing: {
		has_failed_invoices: boolean;
		license: BarResolvedLicense | null;
	};
	user: {
		name: string | null;
		username: string;
		email: string;
		picture_url: string;
	};
}

export function setInstanceAndProduct(instance_: string, product_: string) {
	instance = instance_;
	product = product_;
}

export function loadBarUser() {
	const query = new URLSearchParams();
	query.set('product', product);

	const lastUnreadTime = UnreadUpdatesTimeLocalStorage.get();
	if (lastUnreadTime) {
		query.set('last_read_updates_at', lastUnreadTime.toString());
	}

	fetch(instance + '/api/public/bar?' + query.toString(), {
		credentials: 'include'
	})
		.then((response) => response.json())
		.then((data: BarResponse) => {
			barUser.set(data.user);
			barUnreadUpdates.set(data.updates.unread);
			barLicense.set(data.billing.license);
			barHasFailedInvoices.set(data.billing.has_failed_invoices);

			if (lastUnreadTime === null) {
				UnreadUpdatesTimeLocalStorage.setNow();
			}
		})
		.catch((error) => {
			console.error('Error:', error);
		});
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
		loadBarUser();
	}
};
