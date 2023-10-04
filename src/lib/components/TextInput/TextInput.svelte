<script lang="ts">
    export let state : 'default' | 'error' | 'success' | 'warning' = 'default';
    export let size : 'small' | 'medium' | 'large' = 'medium';
    export let block : boolean = false;

    let input: HTMLInputElement;
</script>


<span 
    class="input-wrap state-{state} size-{size}"
    class:block
    on:click={() => input.focus()}
    on:keydown={(e) => {
        if (e.key === 'Enter') {
            input.blur();
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
        bind:this={input}
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
        height: 32px;
        padding: 0 15px;
        border-radius: 20px;
        background: #f5f5f5;
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
        &:focus {
            outline: none;
        }
    }

    .input-wrap.size-small {
        padding: 0 15px;
        height: 30px;
        font-size: 12px;
        --local-shadow-size: 1px;
    }

    .input-wrap.size-large {
        padding: 0 20px;
        height: 40px;
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
