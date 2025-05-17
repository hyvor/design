import { writable } from 'svelte/store';

export const dark = writable(false);

export const DARK_LOCAL_STORAGE_KEY = 'hds-dark';

export function setInitialState() {
	const isDark = isDarkScheme();

	if (isDark) {
		dark.set(true);
	}

	dark.subscribe((isDark) => {
		if (isDark) {
			document.documentElement.classList.add('dark');
			window.localStorage.setItem(DARK_LOCAL_STORAGE_KEY, 'true');
		} else {
			document.documentElement.classList.remove('dark');
			window.localStorage.removeItem(DARK_LOCAL_STORAGE_KEY);
		}
	});
}

function isDarkScheme() {
	const localStorageData = window.localStorage.getItem(DARK_LOCAL_STORAGE_KEY);
	if (localStorageData) {
		return !!localStorageData;
	}

	return window.matchMedia('(prefers-color-scheme: dark)').matches;
}
