<script lang="ts">
    import { IconButton, Dropdown } from "../index.js";
    import { IconMegaphone } from "@hyvor/icons";
    import BarUpdatesList from "./BarUpdatesList.svelte";
    import { type BarProduct, barUnreadUpdates } from "./bar.js";

    export let instance: string;
    export let product: BarProduct;
</script>

<div class="updates">
    <Dropdown align="end" width={525}>
        <IconButton color="input" variant="invisible" slot="trigger">
            <IconMegaphone size={14} />

            {#if $barUnreadUpdates > 0}
                <span class="unread">{$barUnreadUpdates}</span>
            {/if}
        </IconButton>

        <div slot="content">
            <BarUpdatesList {instance} {product} />
        </div>
    </Dropdown>
</div>

<style>
    .updates :global(.dropdown .content) {
        padding: 0;
    }
    .unread {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 8px;
        width: 15px;
        height: 15px;
        display: inline-flex;
        border-radius: 50%;
        margin-right: -5px;
        margin-top: -3px;
        background: var(--accent);
        align-items: center;
        justify-content: center;
        color: var(--accent-text);
        font-weight: 600;
    }
    .updates :global(.trigger) {
        position: relative;
    }
</style>
