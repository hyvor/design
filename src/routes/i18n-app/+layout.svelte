<script lang="ts">
	import Base from '../../lib/components/Base/Base.svelte';
	import InternationalizationProvider from '../../lib/components/Internationalization/InternationalizationProvider.svelte';
	import en from './locale/en.json' with { type: 'json' };
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<Base>
	<InternationalizationProvider
		languages={[
			{
				code: 'en',
				flag: '🇺🇸',
				name: 'English',
				region: 'United States',
				strings: en,
				default: true
			},
			{
				code: 'fr',
				flag: '🇫🇷',
				name: 'Français',
				region: 'France',
				loader: () => import('./locale/fr.json')
			}
		]}
	>
		{@render children?.()}
	</InternationalizationProvider>
</Base>
