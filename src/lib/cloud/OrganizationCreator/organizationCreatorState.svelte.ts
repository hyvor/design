import {
	getCloudContext,
	type CloudContextOrganization
} from '../CloudContext/cloudContextState.svelte.js';

let creatorOpened = $state(false);

export function getCreatorOpened() {
	return creatorOpened;
}

export function setCreatorOpened(opened: boolean = true) {
	creatorOpened = opened;
}

export async function createOrganization(name: string): Promise<CloudContextOrganization> {
	const { instance } = getCloudContext();

	async function doCreate() {
		const response = await fetch(instance + '/api/v2/cloud/organizations', {
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
		return data as CloudContextOrganization;
	}

	const org = await doCreate();
	return org;
}
