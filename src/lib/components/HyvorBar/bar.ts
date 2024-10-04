import { writable } from "svelte/store"

export type BarProduct = "talk" | "blogs";
export interface BarConfig {
    docs: boolean;
    chat: boolean;
    twitter: string | null;
}

interface BarUser {
    name: string | null;
    username: string;
    email: string;
    picture_url: string;
}

export const barUser = writable<BarUser | null>(null);

export function loadBarUser(instance: string) {

    fetch(instance + '/api/public/bar/init', {
        credentials: 'include',
    })
        .then(response => response.json())
        .then(data => {
            barUser.set(data.user);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}