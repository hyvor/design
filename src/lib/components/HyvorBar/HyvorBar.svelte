<script lang="ts">
    import BarUser from "./BarUser.svelte";
    import { onMount } from "svelte";
    import BarProducts, { PRODUCTS } from "./BarProducts.svelte";
    import BarSupport from "./BarSupport.svelte";
    import { loadBarUser, type BarConfig, type BarProduct } from "./bar.js";
    import BarUpdates from "./BarUpdates.svelte";

    export let instance = "https://hyvor.com";
    export let product: BarProduct;

    export let config: Partial<BarConfig> = {};
    const configComplete: BarConfig = {
        ...{
            docs: true,
            chat: true,
            twitter: null,
        },
        ...config,
    };

    onMount(() => {
        loadBarUser(instance);
    });
</script>

<div id="bar">
    <div class="inner hds-box">
        <div class="left">
            <a class="logo" href="/">
                <svelte:component this={PRODUCTS[product].logo} size={20} />
                <span class="name">
                    {PRODUCTS[product].name}
                </span>
            </a>
        </div>
        <div class="right">
            <BarSupport config={configComplete} {product} />
            <BarProducts />
            <BarUpdates />
            <BarUser {instance} />
        </div>
    </div>
</div>

<style>
    #bar {
        padding: 0 15px 10px 15px;
        padding-bottom: 0px;
    }
    .inner {
        padding: 10px 29px;
        display: flex;
        align-items: center;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
    .left {
        display: flex;
        align-items: center;
        flex: 1;
    }
    .logo {
        display: flex;
        align-items: center;
        text-decoration: none;
        gap: 5px;
        font-weight: 600;
    }
    .right {
        display: flex;
        align-items: center;
        gap: 10px;
    }
</style>
