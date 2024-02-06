<script lang="ts">
    import { getContext, type ComponentProps, type ComponentType } from "svelte";
    import Dropdown from "../Dropdown/Dropdown.svelte";
    import Button from "../Button/Button.svelte";
    import { type Language, type InternationalizationService } from "./i18n.js";
    import ActionList from "../ActionList/ActionList.svelte";
    import ActionListItem from "../ActionList/ActionListItem.svelte";
    import Text from "../Text/Text.svelte";
    import { IconCaretDown } from "@hyvor/icons";
  import IconButton from "../IconButton/IconButton.svelte";

    export let position: ComponentProps<Dropdown>['position'] = 'bottom';
    export let align: ComponentProps<Dropdown>['align'] = 'start';
    export let caret: ComponentType = IconCaretDown;
    export let icon = false;
    export let size: 'medium' | 'small' = 'medium';

    const i18n = getContext<InternationalizationService>('i18n');
    const currentLanguage = i18n ? i18n.localeLanguage : undefined;

    let show = false;

    function handleClick(language: Language) {
        i18n.setLocale(language.code);
        show = false;
    }

</script>


{#if i18n && $currentLanguage}

    <Dropdown bind:show={show} {position} {align}>
        <span slot="trigger">
            {#if icon}
                <IconButton color="input" {size}>
                    {$currentLanguage.flag}
                </IconButton>
            {:else}
                <Button color="input" {size}>
                    <span slot="start">{$currentLanguage.flag}</span>
                    {$currentLanguage.name}
                    <svelte:component slot="end" this={caret} size={12} />
                </Button>
            {/if}
        </span>
        <ActionList slot="content">
            {#each i18n.languages as language (language.code)}
                <ActionListItem on:click={() => handleClick(language)}>
                    <span class="flag" slot="start">{language.flag}</span>
                    <span class="name">
                        {language.name}
                    </span>
                    <Text small light>
                        {language.region}
                    </Text>
                </ActionListItem>
            {/each}
        </ActionList>
    </Dropdown>
    
{/if}

<style>
    .flag {
        margin-right: 6px;
        font-size: 20px;
    }
</style>