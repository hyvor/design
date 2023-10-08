<script lang="ts">
    import { IconMoonStarsFill, IconSunFill } from "@hyvor/icons";
    import IconButton from "../IconButton/IconButton.svelte";
    import { dark } from './../../stores/dark.js';
    
    function handleClick() {
        dark.update((value) => !value);
    }
</script>

<IconButton
    on:click={handleClick}
    color="invisible"
>
    {#if $dark}
        <IconMoonStarsFill width={18} height={18} />
    {:else}
        <IconSunFill width={18} height={18} />
    {/if}
</IconButton>