<script lang="ts">
    import LogoBlogs from "$lib/marketing/Logo/LogoBlogs.svelte";
    import LogoTalk from "$lib/marketing/Logo/LogoTalk.svelte";

    // import logo from "$lib/img/logo.png";
    import {
        ActionList,
        IconButton,
        ActionListItem,
        Button,
        Dropdown,
    } from "../index.js";
    import {
        IconCaretDownFill,
        IconBell,
        IconBoxArrowUpRight,
        IconChat,
        IconDiscord,
        IconInfoCircle,
        IconFileEarmark,
        IconChatDots,
    } from "@hyvor/icons";

    export let product: "talk" | "blogs";

    const PRODUCTS = {
        talk: {
            name: "Hyvor Talk",
            logo: LogoTalk,
            url: "talk.hyvor.com",
            description: "Comments, Newsletters, Memberships",
        },
        blogs: {
            name: "Hyvor Blogs",
            logo: LogoBlogs,
            url: "blogs.hyvor.com",
            description: "Blogging Platform",
        },
    };

    let supportDropdown = false;

    function openLiveChat(e: any) {
        e.preventDefault();
        if ((window as any).$crisp) {
            (window as any).$crisp.push(["do", "chat:open"]);
        }
        supportDropdown = false;
    }

    export let userName: string;
    export let userPicture: string;
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
            <Dropdown align="end" width={300} bind:show={supportDropdown}>
                <Button
                    slot="trigger"
                    variant="invisible"
                    color="input"
                    size="small"
                >
                    Support
                    <IconCaretDownFill size={10} slot="end" />
                </Button>
                <ActionList slot="content">
                    <a href="https://hyvor.community" target="_blank">
                        <ActionListItem>
                            Community Forum
                            <div slot="description">hyvor.community</div>
                            <IconChat slot="start" style="color:#666666" />
                            <IconBoxArrowUpRight slot="end" size={12} />
                        </ActionListItem>
                    </a>
                    <a href="https://hyvor.com/api/go/discord" target="_blank">
                        <ActionListItem>
                            Discord
                            <div slot="description">
                                Join our Discord server
                            </div>
                            <IconDiscord slot="start" style="color:#7289da" />
                            <IconBoxArrowUpRight slot="end" size={12} />
                        </ActionListItem>
                    </a>
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
                    <a href="https://hyvor.com/support" target="_blank">
                        <ActionListItem>
                            Support Form
                            <div slot="description">Get help from our team</div>
                            <IconInfoCircle slot="start" />
                            <IconBoxArrowUpRight slot="end" size={12} />
                        </ActionListItem>
                    </a>
                    <a href="/chat" on:click={openLiveChat}>
                        <ActionListItem>
                            Live Chat
                            <div slot="description">Chat with our team</div>
                            <IconChatDots slot="start" />
                        </ActionListItem>
                    </a>
                </ActionList>
            </Dropdown>

            <Dropdown align="end" width={350}>
                <Button
                    slot="trigger"
                    variant="invisible"
                    color="input"
                    size="small"
                >
                    Products
                    <IconCaretDownFill size={10} slot="end" />
                </Button>
                <ActionList slot="content">
                    {#each Object.entries(PRODUCTS) as [key, product]}
                        <a href={`https://${product.url}`} target="_blank">
                            <ActionListItem>
                                {product.name}
                                <div slot="description">
                                    {product.description}
                                </div>
                                <svelte:component
                                    this={product.logo}
                                    size={20}
                                    slot="start"
                                />
                                <IconBoxArrowUpRight slot="end" size={12} />
                            </ActionListItem>
                        </a>
                    {/each}
                </ActionList>
            </Dropdown>

            <div class="notifications">
                <IconButton color="input" variant="invisible">
                    <IconBell size={14} />
                </IconButton>
            </div>

            <div class="user">
                <img src={userPicture} alt={userName} />
            </div>
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
    .user img {
        border-radius: 50%;
        width: 30px;
        height: 30px;
    }
    .user {
        display: inline-flex;
        align-items: center;
        margin-left: 5px;
    }
    .right {
        display: flex;
        align-items: center;
        gap: 10px;
    }
</style>
