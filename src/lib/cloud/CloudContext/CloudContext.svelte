<script lang="ts">
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { InternationalizationService } from '../../components/Internationalization/i18n.js';
	import {
		incrementCloudContextId,
		setCloudContext,
		type CloudContext as CloudContextType
	} from './cloudContextState.svelte.js';
	import { saveUserLanguage } from './language.js';

	interface Props {
		context: CloudContextType;
		children: import('svelte').Snippet;
		style?: string;
	}

	let { context, children, style }: Props = $props();

	setCloudContext(() => context);

	const i18n = getContext<InternationalizationService | undefined>('i18n');

	if (i18n && context.deployment === 'cloud') {
		i18n.setPersister(saveUserLanguage);
	}

	$effect(() => {
		if (context) {
			incrementCloudContextId();
		}
	});
</script>

<div transition:fade={{ duration: 200 }} {style}>
	{@render children()}
</div>

<style>
	div {
		--hyvor-bar-height: 50px;
	}
</style>
