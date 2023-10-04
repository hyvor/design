<script lang="ts">
    export let checked : boolean | undefined = undefined;
    let input: HTMLInputElement;
</script>

<span 
    class="checkbox-wrap"
    on:click={() => input.click()}
    on:keyup={(e) => {
        if (e.key === 'Enter') {
            input.click();
        }
    }}
    role="checkbox"
    tabindex="0"
    aria-checked="false"
>
    <input
        type="checkbox"
        bind:checked
        {...$$restProps}
        bind:this={input}
    />
    <span class="placeholder" />
    {#if $$slots.default}
        <span class="label">
            <slot />
        </span>
    {/if}
</span>

<style>

    .label {
        margin-left: 8px;
    }

    .checkbox-wrap {
        position: relative;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
    }

    input {
        position: absolute;
        opacity: 0;
        width:0;
        height:0;
    }

    span.placeholder {
        display: inline-block;
        width:16px; 
        height:16px;
        background-color: var(--input);
        border-radius: 2px;
        outline: 1px solid var(--accent);
        position: relative;
    }

    span.placeholder:focus {
        box-shadow: 0 0 0 2px var(--accent-light);
    }

    /* the check icon */
    span.placeholder:after {
        content: "";
        position: absolute;
        display: none;
        
        /* check icon */
        left: 4.5px;
        top: 1px;
        width: 4px;
        height: 9px;
        border: solid var(--accent-text);
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
    }
    
    .checkbox-wrap:hover span.placeholder {
        background-color: var(--input-hover);
    }
    
    input:checked ~ span.placeholder {
        background-color: var(--accent)!important;
    }

    input:checked ~ span.placeholder:after {
        display:block;
    }
</style>