<script lang="ts">
    export let state : 'default' | 'error' | 'success' | 'warning' = 'default';
    export let size : 'small' | 'medium' | 'large' | 'x-small' = 'medium';
    export let block : boolean = false;
    export let value: any = undefined;

    export let input: HTMLInputElement = {} as HTMLInputElement;
</script>


<span 
    class="input-wrap state-{state} size-{size}"
    class:block
    on:click={() => input.focus()}
    on:keydown={(e) => {
        if (e.key === 'Enter') {
            input.focus();
        }
    }}
    role="textbox"
    tabindex="0"
>

    {#if $$slots.start}
        <span class="slot start">
            <slot name="start" />
        </span>
    {/if}

    <input
        {...$$restProps}
        bind:value={value}
        bind:this={input}

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
        on:input
    />

    {#if $$slots.end}
        <span class="slot end">
            <slot name="end" />
        </span>
    {/if}
</span>

<style lang="scss">

    .slot {
        display: inline-flex;
        align-items: center;
        color: var(--text-light);
        &.start {
            margin-right: 8px;
        }
        &.end {
            margin-left: 8px;
        }
    }

    .input-wrap {
        display: inline-flex;
        align-items: center;
        height: 30px;
        padding: 0 15px;
        border-radius: 20px;
        background: var(--input);
        transition: .2s box-shadow;
        font-size: 14px;
        --local-shadow-size: 2px;
        &:focus-within {
            outline: 0;
            box-shadow: 0 0 0 var(--local-shadow-size) var(--accent-light);
        }
    }

    .input-wrap.block {
        display: flex;
        width: 100%;
    }

    input {
        flex: 1;
        width: 100%;
        border: none;
        font-family: inherit;
        font-size: inherit;
        background: transparent;
        padding: 0;
        margin: 0;
        color: inherit;

        &:focus {
            outline: none;
        }
    }

    .input-wrap.size-x-small {
        padding: 0 15px;
        height: 20px;
        font-size: 12px;
        --local-shadow-size: 1px;
    }

    .input-wrap.size-small {
        padding: 0 15px;
        height: 26px;
        font-size: 12px;
        --local-shadow-size: 1px;
    }

    .input-wrap.size-large {
        padding: 0 20px;
        height: 36px;
        font-size: 16px;
    }

    .input-wrap.state-error {
        box-shadow: 0 0 0 var(--local-shadow-size) var(--red-light);
        &:focus-within {
            box-shadow: 0 0 0 calc(var(--local-shadow-size) + 1px) var(--red-light);
        }
    }
    .input-wrap.state-success {
        box-shadow: 0 0 0 2px var(--green-light);
        &:focus-within {
            box-shadow: 0 0 0 calc(var(--local-shadow-size) + 1px) var(--green-light);
        }
    }
    .input-wrap.state-warning {
        box-shadow: 0 0 0 2px var(--orange-light);
        &:focus-within {
            box-shadow: 0 0 0 calc(var(--local-shadow-size) + 1px) var(--orange-light);
        }
    }

</style>
