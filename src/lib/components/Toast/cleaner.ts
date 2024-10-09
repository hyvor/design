import { onDestroy } from "svelte";
import { default as toastService, toastStore } from "./toast.js";

const DEFAULT_DURATIONS = {
  success: 2000,
  loading: Infinity,
} as Record<string, number>;

export function useCleaner() {
  const timeouts = new Map<number, ReturnType<typeof setTimeout>>();

  const unsubscribe = toastStore.subscribe((toasts) => {
    toasts.forEach((toast) => {
      if (timeouts.has(toast.id)) {
        return;
      }

      const duration = toast.duration || DEFAULT_DURATIONS[toast.type] || 5000;

      if (duration === Infinity) {
        return;
      }

      const timeout = setTimeout(() => {
        toastService.close(toast.id);
        timeouts.delete(toast.id);
      }, duration);

      timeouts.set(toast.id, timeout);
    });
  });

  onDestroy(() => {
    unsubscribe();
  });
}
