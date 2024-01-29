<script lang="ts">
    import ColorPicker from 'svelte-awesome-color-picker';
    import { clickOutside } from "../index.js";
    import { createEventDispatcher } from "svelte";
    
    export let color: string = '#000000';
    export let size: number = 30;

    let show = false;

    const dispatch = createEventDispatcher<{
        input: string,
        change: string,
    }>();

    function handleInput() {
        dispatch('input', color);
    }

    function handleClose() {
        dispatch('change', color);
        show = false;
    }

</script>

<span>
    <button
        style:width="{size}px"
        style:height="{size}px"
        style:background-color={color}
        on:click={() => show = true}
    ></button>

    {#if show}
        <div 
            use:clickOutside={{
                callback: () => handleClose(),
            }}
        >
            <ColorPicker 
                bind:hex={color}
                --input-size={size + 'px'}
                isDialog={false}
                isAlpha={false}
                on:input={handleInput}
            />
        </div>
    {/if}
</span>

<!-- <span>
   

    <input 
        type="color" 
        bind:value={color}
        bind:this={inputEl}

        on:change
        on:input
    />
</span> -->

<style>
    span {
        position: relative;
    }
    button {
        border-radius: 50%;
    }
    div {
        position: absolute;
        left: 0;
        top: 100%;
        width: 0;
    }
</style>