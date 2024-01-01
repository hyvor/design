<script lang="ts">
    export let color: string = '#000000';
    export let size: number = 30;

    let inputEl: HTMLInputElement;

    
    function handleClick() {
        inputEl.click();
    }

</script>

<span>
    <button
        style:width="{size}px"
        style:height="{size}px"
        style:background-color={color}
        on:click={handleClick}
    ></button>

    <input 
        type="color" 
        bind:value={color}
        bind:this={inputEl}

        on:change
        on:input
    />
</span>

<style>
    span {
        position: relative;
    }
    button {
        border-radius: 50%;
    }
    input {
        position: absolute;
        left: 100%;
        bottom: 50%;
        transform: translate(0, 50%);
        width: 0;
        opacity: 0;
    }
</style>