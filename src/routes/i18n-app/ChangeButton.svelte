<script lang="ts">
	import { i18nService } from './../../lib/components/Internationalization/i18n.js';
    import Button from "$lib/components/Button/Button.svelte";
    import { getContext } from 'svelte';

    const i18n = getContext<i18nService>('i18n');
    const locale = i18n.locale;

    function handleClick() {
        i18n.setLocale($locale === 'en' ? 'fr' : 'en');
    }

</script>

<Button on:click={handleClick}>
    Change to {#if $locale === 'en'}French{:else}English{/if}
</Button>