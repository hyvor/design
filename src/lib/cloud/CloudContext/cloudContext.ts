import { createContext } from 'svelte';

export interface CloudContextUser {
	name: string | null;
	username?: string | null;
	email: string;
	picture_url: string | null;
}

export interface CloudContextOrganization {
	id: number;
	name: string;
	member_role: 'admin' | 'manager' | 'member' | 'billing';
}

export interface CloudContext {
	component: string; // core, talk, blogs, etc.
	instance: {
		url: string;
		deployment: 'cloud' | 'on-prem';
	};
	user: CloudContextUser;
	organization: null | CloudContextOrganization;
}

export const [getCloudContext, setCloudContext] = createContext<CloudContext>();
