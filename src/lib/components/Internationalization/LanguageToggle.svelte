<script lang="ts">
	import IconButton from './../IconButton/IconButton.svelte';
    import Box from '$lib/components/Box/Box.svelte';
    import { IconCaretUp } from '@hyvor/icons';
    import { page } from '$app/stores';

    const i18n = $page.data.i18n
</script>


{#if i18n}
    <div class="language-toggle">
        <span class="current">
            <span class="flag">🇫🇷</span>
            <span class="name">Français (France)</span>
            <span class="icon"><IconCaretUp size={14} /></span>
        </span>
    </div>
{/if}

<style>
    .current {
        padding: 4px 15px;
        font-size: 15px;
        display: flex;
        align-items: center;
        cursor: pointer;
        box-shadow: var(--box-shadow);
        border-radius: var(--box-radius);
        background-color: var(--box-background);
        transition: .2s box-shadow;
    }
    .current:hover {
        box-shadow: var(--box-shadow-dark);
    }
    .flag {
        margin-right: 6px;
        font-size: 20px;
    }
    .icon {
        margin-left: 8px;
        display: inline-flex;
        align-items: center;
    }
</style>