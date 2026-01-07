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
				disabled?: boolean;
				props?: ComponentProps<typeof Button>;
		  };
	confirm?:
		| false
		| {
				danger?: boolean;
				disabled?: boolean;
				text?: string;
				props?: ComponentProps<typeof Button>;
		  };
}
