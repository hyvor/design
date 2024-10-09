import type { ComponentProps } from 'svelte';
import type Button from '../Button/Button.svelte';

export interface Footer {
	/**
	 * undefined: default cancel button
	 * false: no cancel button
	 * obj: custom cancel button
	 */
	cancel?:
		| false
		| {
				text?: string;
				props?: ComponentProps<Button>;
		  };
	confirm?:
		| false
		| {
				danger?: boolean;
				text?: string;
				props?: ComponentProps<Button>;
		  };
}
