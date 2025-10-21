<script lang="ts">
    import type { Component, Snippet } from 'svelte';
    import IconCaretDownFill from '@hyvor/icons/IconCaretDownFill';

    interface Props {
        title: string;
        children?: Snippet;
        open?: boolean;
        icon?: Component;
        headerColor?: string;
        textColor?: string;
        openedColor?: string;
        borderColor?: string;
        topBorderColor?: string;
    }

    let {
        title,
        children,
        open = $bindable(false),
        icon,
        headerColor,
        textColor,
        openedColor,
        borderColor,
        topBorderColor
    }: Props = $props();

    const Icon = icon;

    function handleClick() {
        open = !open;
    }
</script>

<div
    class="accordion-item"
    style:--custom-border={borderColor}
    style:--custom-text={textColor}
    style:--custom-opened={openedColor}
    style:--custom-header={headerColor}
>
    <button class="accordion-header" class:open onclick={handleClick}>
        {#if icon}
          <span class="icon">
             <Icon size={20} />
          </span>
        {/if}
        <span class="title">{title}</span>
        <span class="chevron" class:rotated={open}>
          <IconCaretDownFill />
       </span>
    </button>

    <div class="accordion-content"
         class:show={open}>
        <div class="content-text"
             style:--custom-top-border={topBorderColor}
             style:--custom-header={headerColor}
        >
            {@render children?.()}
        </div>
    </div>
</div>

<style>
    .accordion-item {
        overflow: hidden;
        border-radius: 20px;
        border: 1px solid var(--custom-border, var(--border));
    }

    .accordion-header {
        width: 100%;
        padding: 14px 20px;
        background: var(--custom-header, none);
        border: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        font-size: 16px;
        border-radius: 20px;
        color: var(--custom-text, var(--text));
    }

    .accordion-header.open {
        border-radius: 20px 20px 0 0;
        background-color: var(--custom-opened, var(--hover));
    }

    .title {
        font-weight: 500;
        text-align: left;
    }

    .chevron {
        display: flex;
        align-items: center;
        transition: transform 0.3s ease;
        color: var(--custom-text, var(--text));
    }

    .chevron.rotated {
        transform: rotate(180deg);
    }

    .accordion-content {
        height: 0;
        overflow: hidden;
    }

    .accordion-content.show {
        height: auto;
        overflow: visible;
        animation: slideDown 0.3s ease-out;
    }

    .content-text {
        padding: 20px;
        color: var(--custom-text, var(--text));
        line-height: 1.6;
        border-top: 1px solid var(--custom-top-border, var(--border));
        background: var(--custom-header, none);
    }

    .icon {
        display: inline-block;
        margin-right: 10px;
        vertical-align: middle;
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
