<script lang="ts">
    export let value: string | undefined = undefined;
    export let block : boolean = false;
    export let rows : number = 5;
    export let cols : number = 40;
    export let state : "default" | "success" | "warning" | "error" = "default";

    export let textarea: HTMLTextAreaElement = {} as HTMLTextAreaElement;
</script>


<span class="input-wrap state-{state}" 
    class:block
    on:click={() => textarea.focus()}
    on:keydown={(e) => {
        if (e.key === 'Enter') {
            textarea.focus();
        }
    }}
    role="textbox"
    tabindex="0"   
>

    {#if $$slots.start}
        <span class="slot start" 
            
        >
            <slot name="start" />
        </span>
    {/if}

    <textarea 
        bind:value={value}
        bind:this={textarea}
        

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

        {rows}
        {cols}

        {...$$restProps}
    
    ></textarea>

    {#if $$slots.end}
        <span class="slot end">
            <slot name="end" />
        </span>
    {/if}
</span>

<style lang="scss">
    .input-wrap {
        padding: 10px 15px;
        background-color: var(--input);
        transition: .2s box-shadow;
        font-family: inherit;
        font-size: 14px;
        border-radius: 20px;
        border: none;
        transition: .2s box-shadow;
        max-width: 100%;
        color: inherit;

        display: inline-flex;
        resize: vertical;
        overflow: auto;
        align-items: flex-start;
        justify-content: center;

        &:focus-within {
            outline: 0;
            box-shadow: 0 0 0 var(--local-shadow-size) var(--accent-light);
        }

        --local-shadow-size: 2px;
    }
    
    .input-wrap.block {
        display: block;
        width: 100%;
        resize: vertical;
    }

    .input-wrap:focus-visible {
        outline: 0;
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


    .input-wrap .slot {
        padding: 0 10px;
    }

    .input-wrap .slot.start {
        margin-right: 10px;
        
    }

    .input-wrap .slot.end {
        margin-left: 10px;
    }

    .input-wrap textarea {
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
        resize: none;
    }

</style>