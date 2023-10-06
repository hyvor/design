<script lang="ts">
    import MoonStarsFill from "../../icons/MoonStarsFill.svelte";
    import SunFill from "../../icons/SunFill.svelte";
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
        <MoonStarsFill width={18} height={18} />
    {:else}
        <SunFill width={18} height={18} />
    {/if}
</IconButton>