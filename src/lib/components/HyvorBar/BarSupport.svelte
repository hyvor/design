<script lang="ts">
    import { ActionList, ActionListItem, Button, Dropdown } from "../index.js";
    import {
        IconCaretDownFill,
        IconBoxArrowUpRight,
        IconChat,
        IconDiscord,
        IconInfoCircle,
        IconFileEarmark,
        IconChatDots,
        IconTwitterX,
        IconLinkedin,
    } from "@hyvor/icons";
    import ActionListGroup from "../ActionList/ActionListGroup.svelte";
    import { PRODUCTS } from "./BarProducts.svelte";
    import type { BarConfig, BarProduct } from "./bar.js";

    let supportDropdown = false;

    export let product: BarProduct;
    export let config: BarConfig;

    function openLiveChat(e: any) {
        e.preventDefault();
        if ((window as any).$crisp) {
            (window as any).$crisp.push(["do", "chat:open"]);
        }
        supportDropdown = false;
    }
</script>

<Dropdown align="end" width={325} bind:show={supportDropdown}>
    <Button slot="trigger" variant="invisible" color="input" size="small">
        Support
        <IconCaretDownFill size={10} slot="end" />
    </Button>
    <ActionList slot="content">
        <a href="https://hyvor.community" target="_blank">
            <ActionListItem>
                Community Forum
                <div slot="description">hyvor.community</div>
                <IconChat slot="start" />
                <IconBoxArrowUpRight slot="end" size={12} />
            </ActionListItem>
        </a>
        {#if config.docs}
            <a href="/docs" target="_blank">
                <ActionListItem>
                    Documentation
                    <div slot="description">
                        Learn how to use {PRODUCTS[product].name}
                    </div>
                    <IconFileEarmark slot="start" />
                    <IconBoxArrowUpRight slot="end" size={12} />
                </ActionListItem>
            </a>
        {/if}
        <a href="https://hyvor.com/support" target="_blank">
            <ActionListItem>
                Support Form
                <div slot="description">Get help from our team</div>
                <IconInfoCircle slot="start" />
                <IconBoxArrowUpRight slot="end" size={12} />
            </ActionListItem>
        </a>
        {#if config.chat}
            <a href="/chat" on:click={openLiveChat}>
                <ActionListItem>
                    Live Chat
                    <div slot="description">Chat with our team</div>
                    <IconChatDots slot="start" />
                </ActionListItem>
            </a>
        {/if}

        <ActionListGroup title="Social">
            <a href="https://hyvor.com/api/go/discord" target="_blank">
                <ActionListItem>
                    Discord
                    <IconDiscord slot="start" />
                    <IconBoxArrowUpRight slot="end" size={12} />
                </ActionListItem>
            </a>
            {#if config.twitter}
                <a href={config.twitter} target="_blank">
                    <ActionListItem>
                        Twitter
                        <IconTwitterX slot="start" />
                        <IconBoxArrowUpRight slot="end" size={12} />
                    </ActionListItem>
                </a>
            {/if}
            <a href="https://www.linkedin.com/company/hyvor" target="_blank">
                <ActionListItem>
                    Linkedin
                    <IconLinkedin slot="start" />
                    <IconBoxArrowUpRight slot="end" size={12} />
                </ActionListItem>
            </a>
        </ActionListGroup>
    </ActionList>
</Dropdown>
