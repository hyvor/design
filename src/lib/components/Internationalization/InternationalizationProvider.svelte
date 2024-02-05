<script lang="ts">
    import { onMount, setContext } from "svelte";
    import { i18nService, type i18nLoaderType } from "./i18n.js";

    export let defaultStrings : Record<string, string>;
    export let languages : Record<string, i18nLoaderType> = {};

    const i18n = new i18nService(defaultStrings, languages);
    setContext('i18n', i18n);

</script>

<slot />