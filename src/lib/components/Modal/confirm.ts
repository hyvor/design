import { type ComponentType } from 'svelte';
import { writable } from 'svelte/store';

interface ConfirmConfig {
	title: string;
	content: string | ComponentType;
	contentProps?: Record<string, any>;
	confirmText?: string;
	cancelText?: string;
	danger?: boolean;
	loading?: boolean | string;
	autoClose?: boolean;
}

interface ConfirmStore extends ConfirmConfig {
	onConfirm: () => void;
	onCancel: () => void;
}

export const confirmStore = writable<null | ConfirmStore>(null);

export function confirm(config: ConfirmConfig) {
	function getOptions() {
		return {
			loading: (status: string | boolean = true) => {
				confirmStore.update((store) => {
					if (store) {
						store.loading = status;
					}
					return store;
				});
			},
			close: () => confirmStore.set(null)
		};
	}

	return new Promise<ReturnType<typeof getOptions> | false>((resolve, reject) => {
		confirmStore.set({
			...config,
			onConfirm: () => {
				if (config.autoClose !== false) {
					confirmStore.set(null);
				}
				resolve(getOptions());
			},
			onCancel: () => {
				resolve(false);
				confirmStore.set(null);
			}
		});
	});
}
