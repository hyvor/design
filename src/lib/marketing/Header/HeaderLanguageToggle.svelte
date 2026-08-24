<script lang="ts">
	import Dropdown from '../../components/Dropdown/Dropdown.svelte';
	import HeaderNavLink from './HeaderNavLink.svelte';
	import type {
		DropdownAlign,
		DropdownPosition
	} from '../../components/Dropdown/dropdown.types.js';
	import type { LanguageOption } from './language.js';

	interface Props {
		languages: LanguageOption[];
		current: string;
		href: (code: string) => string;
		showName?: boolean;
		align?: DropdownAlign;
		position?: DropdownPosition;
	}

	let {
		languages,
		current,
		href,
		showName = false,
		align = 'center',
		position = 'bottom'
	}: Props = $props();

	const currentLanguage = $derived(languages.find((l) => l.code === current) ?? languages[0]);

	let show = $state(false);

	// close the dropdown once a language link inside it is clicked
	function closeOnLinkClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (target.tagName === 'A' || target.closest('a')) {
			show = false;
		}
	}
</script>

{#if currentLanguage}
	<div class="header-language-toggle">
		<Dropdown bind:show {align} {position} contentPadding={8}>
			{#snippet trigger()}
				<HeaderNavLink aria-label="Change language">
					<span class="flag">{currentLanguage.flag}</span>
					{#if showName}{currentLanguage.name}{/if}
				</HeaderNavLink>
			{/snippet}
			{#snippet content()}
				<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
				<div class="menu" onclick={closeOnLinkClick}>
					{#each languages as language (language.code)}
						<HeaderNavLink
							href={href(language.code)}
							active={language.code === current}
							data-lang={language.code}
							menu
						>
							<span class="lang-row">
								<span class="flag">{language.flag}</span>
								<span class="name">{language.name}</span>
								<span class="code">{language.code.toUpperCase()}</span>
							</span>
						</HeaderNavLink>
					{/each}
				</div>
			{/snippet}
		</Dropdown>
	</div>
{/if}

<style>
	.header-language-toggle {
		position: relative;
		display: inline-flex;
		margin-left: 12px;
		padding-left: 12px;
	}

	/* a short divider, centered on the toggle, separating it from nav links,
	   rather than a full-height border-left */
	.header-language-toggle::before {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 1px;
		height: 16px;
		background: var(--border);
	}

	.flag {
		font-size: 15px;
		line-height: 1;
	}

	.menu {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.lang-row {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
	}

	.code {
		margin-left: auto;
		padding-left: 8px;
		font-size: 11px;
		font-weight: 600;
		color: var(--text-light);
	}
</style>
