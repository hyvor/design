import { getCloudContext, type OrganizationMember } from '../CloudContext/cloudContext.svelte.js';

export async function searchMembers(search: string) {
	const { instance, organization } = getCloudContext();

	const query = new URLSearchParams({
		organization_id: organization?.id.toString() || '',
		search
	});

	const response = await fetch(instance + '/api/v2/cloud/members/search?' + query.toString(), {
		method: 'GET',
		credentials: 'include'
	});

	if (!response.ok) {
		throw new Error('Failed to search members');
	}

	const data = await response.json();
	return data as OrganizationMember[];
}
