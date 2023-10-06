<script lang="ts">
    export let size : 'small' | 'medium' | 'large' = 'medium';
    export let color : 'accent' | 'soft' | 'invisible' | 'danger' = 'accent';
    export let as : 'button' | 'a' = 'button';
</script>

<svelte:element
    this={as}
    class="button {size} {color}"
    
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

    role="button"
    tabindex="0"

    {...$$restProps}
>
    <slot />
</svelte:element>

<style lang="scss">
    .button {
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: .2s box-shadow;
        
        --local-hover-shadow-size: 2.5px;
        --local-hover-shadow-color: var(--accent-light);
        &:active {
            --local-hover-shadow-size: 4px;
        }

        &:hover {
            box-shadow: 0 0 0 var(--local-hover-shadow-size) var(--local-hover-shadow-color);
        }

        &:focus-visible {
            outline: none;
            box-shadow: 0 0 0 calc(var(--local-hover-shadow-size) + 1px) var(--local-hover-shadow-color);
        }
    }

    .button.small {
        height: 26px;
        width: 26px;
    }
    .button.medium {
        height: 30px;
        width: 30px;
    }
    .button.large {
        height: 36px;
        width: 36px;
        --local-hover-shadow-size: 3px;
    }

    .button {
        &.accent {
            background-color: var(--accent);
            color: var(--accent-text);
            --local-hover-shadow-color: var(--accent-light);
        }
        &.soft {
            background-color: var(--accent-light);
            color: var(--accent);
            --local-hover-shadow-color: #eee;
        }
        &.invisible {
            background-color: transparent;
            transition: .2s background-color;
            &:hover {
                background-color: var(--accent-light);
                box-shadow: none!important;
            }
        }
        &.danger {
            background-color: var(--red-dark);
            color: var(--text-white);
            --local-hover-shadow-color: var(--red-light);
        }
    }

</style>