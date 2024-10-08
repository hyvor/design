import { writable } from "svelte/store"

export type BarProduct = "talk" | "blogs";
export interface BarConfig {
    docs: boolean;
    chat: boolean;
    twitter: string | null;
    g2: string | null;
}

interface BarUser {
    name: string | null;
    username: string;
    email: string;
    picture_url: string;
}

export interface BarUpdate {
    id: number;
    created_at: number;
    type: BarUpdateType;
    title: string;
    content: string;
    url?: string;
}

export type BarUpdateType = 'company' | 'core' | 'talk' | 'blogs' | 'fortguard';

export const barUser = writable<BarUser | null>(null);

export function loadBarUser(instance: string) {

    fetch(instance + '/api/public/bar', {
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