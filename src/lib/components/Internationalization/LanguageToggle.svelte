<script lang="ts">
	import { getContext, type Component, type ComponentProps} from 'svelte';
	import Dropdown from '../Dropdown/Dropdown.svelte';
	import Button from '../Button/Button.svelte';
	import { type Language, type InternationalizationService } from './i18n.js';
	import ActionList from '../ActionList/ActionList.svelte';
	import ActionListItem from '../ActionList/ActionListItem.svelte';
	import Text from '../Text/Text.svelte';
	import { IconCaretDown } from '@hyvor/icons';
	import IconButton from '../IconButton/IconButton.svelte';

	interface Props {
		position?: ComponentProps<typeof Dropdown>['position'];
		align?: ComponentProps<typeof Dropdown>['align'];
		caret?: Component;
		icon?: boolean;
		size?: 'medium' | 'small';
	}

	let {
		position = 'bottom',
		align = 'start',
		caret = IconCaretDown,
		icon = false,
		size = 'medium'
	}: Props = $props();

	const i18n = getContext<InternationalizationService>('i18n');
	const currentLanguage = i18n ? i18n.localeLanguage : undefined;

	let show = $state(false);

	function handleClick(language: Language) {
		i18n.setLocale(language.code);
		show = false;
	}
</script>

{#if i18n && $currentLanguage}
	<Dropdown bind:show {position} {align}>
		{#snippet trigger()}
				<span >
				{#if icon}
					<IconButton color="input" {size}>
						{$currentLanguage.flag}
					</IconButton>
				{:else}
					<Button color="input" {size}>
						{#snippet start()}
										<span >{$currentLanguage.flag}</span>
									{/snippet}
						{$currentLanguage.name}
						{#snippet end()}
										{@const SvelteComponent = caret}
					<SvelteComponent  size={12} />
									{/snippet}
					</Button>
				{/if}
			</span>
			{/snippet}
		{#snippet content()}
				<ActionList >
				{#each i18n.languages as language (language.code)}
					<ActionListItem on:click={() => handleClick(language)}>
						{#snippet start()}
										<span class="flag" >{language.flag}</span>
									{/snippet}
						<span class="name">
							{language.name}
						</span>
						<Text small light>
							{language.region}
						</Text>
					</ActionListItem>
				{/each}
			</ActionList>
			{/snippet}
	</Dropdown>
{/if}

<style>
	.flag {
		margin-right: 6px;
		font-size: 20px;
	}
</style>
