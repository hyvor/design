import type { SvelteComponent } from "svelte";
import { get, writable } from "svelte/store";

const MAX_TOASTS = 10;

export interface Toast {
    id: number,
    type: ToastType,
    message: ToastMessageType,
    duration?: number,
}

export const toastStore = writable<Toast[]>([]);


const storeHelper = {

    add: (toast: Toast) => {
        toastStore.update((toasts) => [toast, ...toasts].slice(0, MAX_TOASTS))
    },
    update: (toast: Partial<Toast>) => {
        toastStore.update((toasts) => toasts.map(t => t.id === toast.id ? { ...t, ...toast } : t))
    },
    upsert: (toast: Toast) => {
        if (get(toastStore).find(t => t.id === toast.id)) {
            storeHelper.update(toast);
        } else {
            storeHelper.add(toast);
        }
    },
    remove: (id: number) => {
        toastStore.update((toasts) => toasts.filter(t => t.id !== id))
    }

}

export type ToastType = "success" | "error" | "warning" | "info" | "loading" | "blank";
export type ToastMessageType = typeof SvelteComponent<Record<string, any>> | string | null;

let id = 0;

function createHandler(type: ToastType) {

    return (message: ToastMessageType, options: Partial<Toast> = {}) => {
        const newId = options.id || id++;

        storeHelper.upsert({
            id: newId,
            type,
            message,
            ...options
        })

        return newId;
    }

}

type ToastFunctionSignature = ReturnType<typeof createHandler>;

interface ToastSignature {
    (message: ToastMessageType): number,
    success: ToastFunctionSignature,
    error: ToastFunctionSignature,
    warning: ToastFunctionSignature,
    info: ToastFunctionSignature,
    loading: ToastFunctionSignature,
    close: (id: number) => void,
}

const toast : ToastSignature = createHandler("blank") as ToastSignature;

toast.success = createHandler("success");
toast.error = createHandler("error");
toast.warning = createHandler("warning");
toast.info = createHandler("info");
toast.loading = createHandler("loading");

toast.close = (id: number) => storeHelper.remove(id);

export default toast;