<script lang="ts">
    /* for whatever reason simply passing value with rest props doesn't work */
    export let value: number|string = '';
    export let group: number|string = '';
    export let disabled: boolean = false;

    export let input = {} as HTMLInputElement;
</script>

<label
    class:disabled={disabled}
>

    <input
        type="radio"
        disabled={disabled}
        bind:group
        bind:this={input}
        {value}


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

        {...$$restProps}
    />

    <span class="checkmark"></span>

    <slot />

</label>


<style lang="scss">

    label {
        position: relative;
        padding-left: 30px;
        cursor: pointer;
        user-select: none;
        height: 20px;
        display: flex;
        align-items: center;
    }

    label.disabled {
        cursor: not-allowed;
        opacity: 0.5;
        .checkmark {
            box-shadow: none!important;
        }
    }

    input {
        position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
    }

    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        background-color: var(--input);
        border-radius: 50%;
        transition:.4s;
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
        top: 50%;
        left: 50%;
        transform:translate(-50%,-50%);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--accent-text);
    }

    label:hover input ~ .checkmark {
        box-shadow: 0 0 0 3px var(--accent-light);
    }

    label:active input ~ .checkmark {
        box-shadow: 0 0 0 4px var(--accent-light);
    }

    label input:focus-visible ~ .checkmark {
        box-shadow: 0 0 0 3px var(--accent-light);
    }

    label input:checked ~ .checkmark {
        background-color: var(--accent);
    }

    input:checked ~ .checkmark:after {
        display: block;
    }

</style>
