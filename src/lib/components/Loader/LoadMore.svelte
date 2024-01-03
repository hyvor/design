<script lang="ts">
  import type { ComponentProps } from "svelte";
    import Button from "../Button/Button.svelte";
    import Loader from "./Loader.svelte";

    export let has : boolean; // has more
    export let loading : boolean; // whether loading

    export let height: number = 50;
    export let buttonText = 'Load More';

    export let divProps : Record<string, any> = {};
    export let loaderProps : ComponentProps<Loader> = {};
    export let buttonProps : ComponentProps<Button> = {};

</script>

{#if has}

    <div 
        class="load-more"
        style:height="{height}px"
        {...divProps}
    >

        {#if loading}
            <Loader {...loaderProps} />
        {:else}

            <Button 
                size="small"
                on:click
                {...buttonProps}
            >
                {buttonText}
            </Button>

        {/if}

    </div>

{/if}

<style>
    .load-more {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>