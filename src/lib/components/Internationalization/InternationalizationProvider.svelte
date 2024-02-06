<script lang="ts">
    import { setContext } from "svelte";
    import { i18nService, type Language } from "./i18n.js";

    export let languages : Language[];
    const i18n = new i18nService(languages);
    setContext('i18n', i18n);

</script>

<slot />