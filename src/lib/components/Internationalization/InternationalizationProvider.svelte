<script lang="ts">
	import { setContext } from 'svelte';
	import { InternationalizationService, type Language } from './i18n.js';

	interface Props {
		languages: Language[];
		forceLanguage?: string;
		children?: import('svelte').Snippet;
	}

	let { languages, forceLanguage, children }: Props = $props();
	const i18n = new InternationalizationService(languages, forceLanguage);
	const locale = i18n.locale;
	setContext('i18n', i18n);
</script>

{#key $locale}
	{@render children?.()}
{/key}
