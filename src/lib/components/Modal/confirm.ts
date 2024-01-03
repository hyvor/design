import { type ComponentType } from "svelte";
import { writable } from "svelte/store";

interface ConfirmConfig {
    title: string,
    content: string | ComponentType,
    contentProps?: Record<string, any>,
    confirmText?: string,
    cancelText?: string,
    danger?: boolean,
}

interface ConfirmStore extends ConfirmConfig {
    onConfirm: () => void,
    onCancel: () => void,
}

export const confirmStore = writable<null | ConfirmStore>(null);

export function confirm(config: ConfirmConfig) {
    return new Promise<boolean>((resolve, reject) => {

        confirmStore.set({
            ...config,
            onConfirm: () => {
                resolve(true);
                confirmStore.set(null);
            },
            onCancel: () => {
                resolve(false);
                confirmStore.set(null);
            }
        })

    });
}