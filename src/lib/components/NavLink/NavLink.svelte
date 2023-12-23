<script lang="ts">
    export let href : string;
    export let active : boolean = false;
</script>

<a 
    {href}
    class:active={active}

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
>



    {#if $$slots.start}
        <span class="start">
            <slot name="start" />
        </span>
    {/if}

    <span class="middle">
        <slot />
    </span>
    
    {#if $$slots.end}
        <span class="end">
            <slot name="end" />
        </span>
    {/if}
</a>


<style>

    a {
        display: flex;
        padding: 12px 29px;
        font-size: 14px;
        letter-spacing: .3px;
        border-left: 3px solid transparent;
        cursor: pointer;
        align-items: center; 
    }

    a:hover {
        background-color: var(--hover);
    
    }

    a.active {
        background-color: var(--accent-lightest);
        border-left: 3px solid var(--accent);
    }

    .start, .middle, .end {
        display: inline-flex;
        align-items: center;
    }

    .middle {
        flex: 1;
         /* display: flex;  */
        flex-direction: column;
        align-items: flex-start;
    }
    
    .start {
        margin-right: 8px;
        
    }

    .end {
        margin-left: 8px;
    }


</style>