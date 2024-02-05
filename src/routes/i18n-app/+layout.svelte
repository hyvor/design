<script lang="ts">
    import Button from "../../lib/components/Button/Button.svelte";
    import InternationalizationProvider from "../../lib/components/Internationalization/InternationalizationProvider.svelte";
    import en from './locale/en.json';
</script>

<InternationalizationProvider 
    defaultStrings={en}
    languages={{
        fr: () => import('./locale/fr.json'),
    }}
>
    <slot />
</InternationalizationProvider>