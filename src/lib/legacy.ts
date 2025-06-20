import { handlers } from "svelte/legacy";

/**
 * Event can be KeyboardEvent, MouseEvent, TouchEvent, FocusEvent, or Event
 */
type CustomEventListener = (event: any) => void;

/**
 * Extends svelte4 handlers to support undefined
 */
export function legacyHandlers(...eventHandlers: (CustomEventListener | undefined)[]) {
    const all = eventHandlers.filter(h => h !== undefined) as EventListener[];
    return handlers(...all);
}