<script lang="ts">
	import { setContext } from 'svelte';
	import { InternationalizationService, type I18nDeployment, type Language } from './i18n.js';

	interface Props {
		languages: Language[];
		forceLanguage?: string;
		deployment?: I18nDeployment;
		children?: import('svelte').Snippet;
	}

	let { languages, forceLanguage, deployment, children }: Props = $props();
	const i18n = new InternationalizationService(languages, forceLanguage, deployment);
	const locale = i18n.locale;
	setContext('i18n', i18n);
</script>

{#key $locale}
	{@render children?.()}
{/key}
