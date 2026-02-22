import {
	getCloudContext,
	type CloudContextOrganization
} from '../CloudContext/cloudContextState.svelte.js';

let loadedOrganizations: CloudContextOrganization[] | undefined = $state(undefined);

export function getLoadedOrganizations() {
	return loadedOrganizations;
}

export function addToLoadedOrganizations(org: CloudContextOrganization) {
	if (loadedOrganizations) {
		loadedOrganizations = [...loadedOrganizations, org];
	}
}

export async function getMyOrganizations(): Promise<CloudContextOrganization[]> {
	// return [
	// 	{ id: 1, name: 'Org 1', member_role: 'admin' },
	// 	{ id: 2, name: 'Org 2', member_role: 'member' },
	// 	{ id: 3, name: 'Org 3', member_role: 'billing' },
	// 	{ id: 4, name: 'Org 4', member_role: 'manager' }
	// ];

	const { instance } = getCloudContext();

	const response = await fetch(instance + '/api/v2/cloud/organizations/my', {
		credentials: 'include'
	});
	const data = (await response.json()) as CloudContextOrganization[];

	loadedOrganizations = data;

	return data;
}

export async function switchOrganization(orgId: number): Promise<CloudContextOrganization> {
	const { instance } = getCloudContext();

	const response = await fetch(instance + '/api/v2/cloud/organizations/switch', {
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

	const data = (await response.json()) as CloudContextOrganization;

	return data;
}
