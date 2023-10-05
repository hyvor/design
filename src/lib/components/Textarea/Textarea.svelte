<script lang="ts">
    export let value: string | undefined = undefined;
    export let block : boolean = false;
    export let rows : number = 5;
    export let cols : number = 40;
    export let state : "default" | "success" | "warning" | "error" = "default";
</script>

<textarea 
    bind:value={value}

    on:keyup
    on:keydown
    on:keypress
    on:focus
    on:blur
    on:click
    on:mouseover
    on:mouseenter
    on:mouseleave
    on:change

    {rows}
    {cols}

    {...$$restProps}

    class:block
    class="state-{state}"
    
></textarea>

<style lang="scss">
    textarea {
        padding: 10px 15px;
        background-color: var(--input);
        transition: .2s box-shadow;
        font-family: inherit;
        font-size: 14px;
        border-radius: 20px;
        border: none;
        transition: .2s box-shadow;
        max-width: 100%;

        --local-shadow-size: 2px;
    }
    textarea:focus {
        box-shadow:  0 0 0 var(--local-shadow-size) var(--accent-light);
    }
    textarea.block {
        display: block;
        width: 100%;
        resize: vertical;
    }

    textarea:focus-visible {
        outline: 0;
    }

    textarea.state-error {
        box-shadow: 0 0 0 var(--local-shadow-size) var(--red-light);
        &:focus {
            box-shadow: 0 0 0 calc(var(--local-shadow-size) + 1px) var(--red-light);
        }
    }
    textarea.state-success {
        box-shadow: 0 0 0 2px var(--green-light);
        &:focus {
            box-shadow: 0 0 0 calc(var(--local-shadow-size) + 1px) var(--green-light);
        }
    }
    textarea.state-warning {
        box-shadow: 0 0 0 2px var(--orange-light);
        &:focus {
            box-shadow: 0 0 0 calc(var(--local-shadow-size) + 1px) var(--orange-light);
        }
    }

</style>