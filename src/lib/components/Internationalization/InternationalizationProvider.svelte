<script lang="ts">
	import { setContext } from 'svelte';
	import { InternationalizationService, type Language } from './i18n.js';

	export let languages: Language[];
	const i18n = new InternationalizationService(languages);
	const locale = i18n.locale;
	setContext('i18n', i18n);
</script>

{#key $locale}
	<slot />
{/key}
