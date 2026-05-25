import { writable } from 'svelte/store';
import { getCloudContext } from '../CloudContext/cloudContextState.svelte.js';

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

export type BarUpdateType = 'company' | 'core' | 'talk' | 'blogs' | 'post' | 'relay' | 'fortguard';

export const barUnreadUpdates = writable<number>(0);
export const barHasFailedInvoices = writable<boolean>(false);
export const barLastReadUpdatesAt = writable<number | null>(null);

interface BarResponse {
	user_id: number;
	organization_id: number | null;
	has_failed_invoices: boolean;
	unread_updates: number;
	last_read_updates_at: number | null;
}

export async function initBar() {
	const { user, organization, instance, component, deployment } = getCloudContext();

	if (deployment !== 'cloud') {
		return;
	}

	const query = new URLSearchParams();
	query.set('component', component);

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

	barHasFailedInvoices.set(data.has_failed_invoices);
	barUnreadUpdates.set(data.unread_updates);

	if (data.last_read_updates_at !== null) {
		barLastReadUpdatesAt.set(data.last_read_updates_at);
	} else {
		barLastReadUpdatesAt.set(Math.floor(Date.now() / 1000));
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
	}
};
