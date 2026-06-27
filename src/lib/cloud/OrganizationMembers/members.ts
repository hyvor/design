import {
	getCloudContext,
	type OrganizationMember
} from '../CloudContext/cloudContextState.svelte.js';

export async function searchMembers(search: string) {
	const { instance, organization, deployment } = getCloudContext();

	const query = new URLSearchParams({
		organization_id: organization?.id.toString() || '',
		search
	});

	let url: string;

	if (deployment === 'cloud') {
		url = instance + '/api/v2/cloud/members/search?' + query.toString();
	} else {
		url = '/api/oidc/search?' + query.toString();
	}

	const response = await fetch(url, {
		method: 'GET',
		credentials: 'include'
	});

	if (!response.ok) {
		throw new Error('Failed to search members');
	}

	const data = await response.json();
	return data as OrganizationMember[];
}
