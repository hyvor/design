import { writable } from "svelte/store";

export const dark = writable(false);



export function setInitialState() {

    const isDark = isDarkScheme();
    
    if (isDark) {
        dark.set(true);
    }

    dark.subscribe(isDark => {

        if (isDark) {
            document.documentElement.classList.add("dark");
            window.localStorage.setItem("scheme-dark", "true");
        } else {
            document.documentElement.classList.remove("dark");
            window.localStorage.removeItem("scheme-dark");
        }

    }); 

}


function isDarkScheme() {
    if (import.meta.env.SSR)
        return;
    
    const localStorageData = window.localStorage.getItem("scheme-dark");
    if (localStorageData) {
        return !!localStorageData
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;

}
