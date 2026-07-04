export type { IconName } from './types.js';
export { default as Icon } from './Icon.svelte';

const icons = import.meta.glob('./icons/*.svg', { query: '?raw', import: 'default'});
export { icons };