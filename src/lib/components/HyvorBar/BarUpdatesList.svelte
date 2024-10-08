<script lang="ts">
    import { onMount } from "svelte";
    import Loader from "../Loader/Loader.svelte";
    import ActionList from "../ActionList/ActionList.svelte";
    import ActionListItem from "../ActionList/ActionListItem.svelte";
    import {
        barUnreadUpdates,
        UnreadUpdatesTimeLocalStorage,
        type BarProduct,
        type BarUpdate,
    } from "./bar.js";
    import { IconBoxArrowUpRight } from "@hyvor/icons";
    import Button from "../Button/Button.svelte";
    import Tag from "../Tag/Tag.svelte";
    import IconMessage from "../IconMessage/IconMessage.svelte";

    export let instance: string;
    export let product: BarProduct;

    let updates: BarUpdate[] = [];
    let loading = true;
    let error = false;

    let lastReadTime: null | number = null;

    function fetchUpdates() {
        error = false;
        lastReadTime = UnreadUpdatesTimeLocalStorage.get();
        loading = true;

        fetch(instance + "/api/public/updates?types=company," + product)
            .then((response) => response.json())
            .then((data) => {
                updates = data;

                barUnreadUpdates.set(0);
                // set as last read now
                UnreadUpdatesTimeLocalStorage.setNow();
            })
            .catch(() => {
                error = true;
            })
            .finally(() => {
                loading = false;
            });
    }

    onMount(() => {
        fetchUpdates();
    });
</script>

{#if loading}
    <Loader padding={80} block size="small" />
{:else if error}
    <IconMessage
        error
        cta={{
            text: "Try again",
            onClick: (e) => {
                e.stopPropagation();
                fetchUpdates();
            },
            props: { color: "input" },
        }}>Failed to load updates.</IconMessage
    >
{:else}
    <div class="updates-wrap">
        <ActionList>
            {#each updates as update}
                <a
                    href={update.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <ActionListItem>
                        {#if update.type === "company" || (lastReadTime && update.created_at > lastReadTime)}
                            <div class="company-update">
                                {#if lastReadTime && update.created_at > lastReadTime}
                                    <Tag size="x-small" color="green">New</Tag>
                                {/if}
                                {#if update.type === "company"}
                                    <Tag size="x-small" color="blue"
                                        >Company Update</Tag
                                    >
                                {/if}
                            </div>
                        {/if}
                        <div class="title">
                            {update.title}
                        </div>
                        <div slot="description">
                            <div class="description">
                                {update.content}
                            </div>
                            <div class="date">
                                {new Intl.DateTimeFormat("en-US").format(
                                    new Date(update.created_at * 1000)
                                )}
                            </div>
                        </div>
                        <span slot="end">
                            {#if update.url}
                                <IconBoxArrowUpRight size={12} />
                            {/if}
                        </span>
                    </ActionListItem>
                </a>
            {/each}
        </ActionList>
    </div>
{/if}

<div class="top">
    <Button
        size="small"
        color="input"
        as="a"
        href={instance + "/updates"}
        target="_blank"
    >
        View all updates
        <IconBoxArrowUpRight size={12} slot="end" />
    </Button>
</div>

<style>
    .title {
        font-weight: 600;
        font-size: 16px;
    }
    .description {
        font-size: 14px;
        color: var(--text);
    }
    .date {
        margin-top: 4px;
        font-weight: normal;
    }
    a :global(.action-list-item) {
        padding: 12px 20px;
    }
    .updates-wrap {
        max-height: 600px;
        overflow-y: auto;
        padding: 10px;
    }
    .top {
        padding: 10px 20px;
        display: flex;
        justify-content: center;
        border-top: 1px solid var(--border);
    }
    .company-update {
        margin-bottom: 4px;
        font-weight: normal;
    }
    .description {
        margin-top: 4px;
    }
</style>
