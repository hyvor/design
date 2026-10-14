import { getCloudContext } from './cloudContextState.svelte.js';

/**
 * Saves the user's language choice at the user level, so it follows them across
 * devices and across all HYVOR products.
 *
 * Registered as the i18n persister by CloudContext on cloud deployments, so the
 * LanguageToggle saves through this instead of localStorage.
 */
export async function saveUserLanguage(code: string): Promise<void> {
	const { instance, deployment } = getCloudContext();

	if (deployment !== 'cloud') {
		return;
	}

	const response = await fetch(instance + '/api/v2/cloud/user/language', {
		method: 'PATCH',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ language: code })
	});

	if (!response.ok) {
		throw new Error('Failed to save the language');
	}
}
