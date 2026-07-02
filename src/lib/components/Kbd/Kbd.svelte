<script lang="ts">
	import { onMount } from 'svelte';

	type ModKey = 'mod' | 'ctrl' | 'alt' | 'shift' | 'meta';

	const PLATFORM_LABELS: Record<ModKey, { mac: string; other: string }> = {
		mod: { mac: '⌘', other: 'Ctrl' },
		ctrl: { mac: '⌃', other: 'Ctrl' },
		alt: { mac: '⌥', other: 'Alt' },
		shift: { mac: '⇧', other: 'Shift' },
		meta: { mac: '⌘', other: 'Win' }
	};

	const MAC_ARIA: Record<ModKey, string> = {
		mod: 'Command',
		ctrl: 'Control',
		alt: 'Option',
		shift: 'Shift',
		meta: 'Command'
	};

	// Canonical Mac modifier order: Control → Option → Shift → Command
	const MOD_ORDER: ModKey[] = ['ctrl', 'alt', 'shift', 'meta', 'mod'];
	const MOD_SET = new Set<string>(MOD_ORDER);

	interface Props {
		keys: string | string[];
		size?: 'small' | 'medium' | 'large' | (string & {});
		[key: string]: any;
	}

	let { keys, size = 'small', ...rest }: Props = $props();

	const PREDEFINED_SIZES = ['small', 'medium', 'large'];
	let sizeClass = $derived(PREDEFINED_SIZES.includes(size) ? `size-${size}` : '');
	let sizeStyle = $derived(!PREDEFINED_SIZES.includes(size) ? `font-size: ${size};` : undefined);

	let isMac = $state(false);

	onMount(() => {
		const platform = (navigator as any).userAgentData?.platform ?? navigator.platform ?? '';
		isMac = /mac/i.test(platform);
	});

	function keyLabel(key: string, mac: boolean): string {
		const lower = key.toLowerCase();
		if (MOD_SET.has(lower)) {
			return mac
				? PLATFORM_LABELS[lower as ModKey].mac
				: PLATFORM_LABELS[lower as ModKey].other;
		}
		return key.length === 1 ? key.toUpperCase() : key.charAt(0).toUpperCase() + key.slice(1);
	}

	function keyAria(key: string, mac: boolean): string {
		const lower = key.toLowerCase();
		if (MOD_SET.has(lower)) {
			return mac ? MAC_ARIA[lower as ModKey] : PLATFORM_LABELS[lower as ModKey].other;
		}
		return key.length === 1 ? key.toUpperCase() : key.charAt(0).toUpperCase() + key.slice(1);
	}

	function sortKeys(keyArr: string[]): string[] {
		const mods = MOD_ORDER.filter((m) => keyArr.some((k) => k.toLowerCase() === m));
		const regular = keyArr.filter((k) => !MOD_SET.has(k.toLowerCase()));
		return [...mods, ...regular];
	}

	let keyArray = $derived(Array.isArray(keys) ? keys : [keys]);
	let sorted = $derived(sortKeys(keyArray));

	let display = $derived(
		isMac
			? sorted.map((k) => keyLabel(k, true)).join('')
			: sorted.map((k) => keyLabel(k, false)).join(' + ')
	);

	let ariaLabel = $derived(sorted.map((k) => keyAria(k, isMac)).join(' plus '));
</script>

<kbd aria-label={ariaLabel} class={sizeClass} style={sizeStyle} {...rest}>{display}</kbd>

<style lang="scss">
	kbd {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: inherit;
		line-height: 1;
		background-color: var(--hover-dark);
		border: 1px solid var(--border);
		border-bottom-width: 2px;
		border-radius: 4px;
		color: var(--text);
		white-space: nowrap;

		&.size-small {
			font-size: 0.7em;
			min-width: 1.6em;
			padding: 2px 5px;
		}

		&.size-medium {
			font-size: 0.85em;
			min-width: 1.8em;
			padding: 3px 7px;
		}

		&.size-large {
			font-size: 1em;
			min-width: 2em;
			padding: 4px 9px;
		}
	}
</style>
