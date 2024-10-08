<script lang="ts">
    import { IconButton, Dropdown } from "../index.js";
    import { IconBell } from "@hyvor/icons";
    import BarUpdatesList from "./BarUpdatesList.svelte";
    import type { BarProduct } from "./bar.js";

    export let instance: string;
    export let product: BarProduct;
</script>

<div class="updates">
    <Dropdown align="end" width={525}>
        <IconButton color="input" variant="invisible" slot="trigger">
            <IconBell size={14} />
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
</style>
