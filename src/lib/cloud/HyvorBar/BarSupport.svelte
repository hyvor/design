<script lang="ts">
	import {
		ActionList,
		ActionListGroup,
		ActionListItem,
		Button,
		Dropdown
	} from '$lib/components/index.js';
	import IconCaretDownFill from '@hyvor/icons/IconCaretDownFill';
	import IconBoxArrowUpRight from '@hyvor/icons/IconBoxArrowUpRight';
	import IconChat from '@hyvor/icons/IconChat';
	import IconDiscord from '@hyvor/icons/IconDiscord';
	import IconInfoCircle from '@hyvor/icons/IconInfoCircle';
	import IconFileEarmark from '@hyvor/icons/IconFileEarmark';
	import IconChatDots from '@hyvor/icons/IconChatDots';
	import IconBluesky from '@hyvor/icons/IconBluesky';
	import IconLinkedin from '@hyvor/icons/IconLinkedin';
	import type { BarConfig } from './bar.js';
	import G2 from './img/G2.svelte';
	import Trustpilot from './img/Trustpilot.svelte';
	import { SOCIAL_LINKS } from '$lib/marketing/social.js';
	import IconTwitterX from '@hyvor/icons/IconTwitterX';
	import { getCloudContext } from '../CloudContext/cloudContext.svelte.js';
	import { PRODUCTS } from './BarProducts/products.js';

	let supportDropdown = $state(false);

	interface Props {
		mobile?: boolean;
		config: BarConfig;
	}

	let { mobile = false, config }: Props = $props();

	const cloudContext = $derived(getCloudContext());

	function openLiveChat(e: any) {
		e.preventDefault();
		if ((window as any).$crisp) {
			(window as any).$crisp.push(['do', 'chat:open']);
		}
		supportDropdown = false;
	}

	function getName() {
		if (config.name) {
			return config.name;
		}
		return PRODUCTS[cloudContext.component as keyof typeof PRODUCTS]?.name || '';
	}
</script>

<Dropdown align={mobile ? 'center' : 'end'} width={325} bind:show={supportDropdown}>
	{#snippet trigger()}
		<Button variant="invisible" color="input" size="small">
			Support
			{#snippet end()}
				<IconCaretDownFill size={10} />
			{/snippet}
		</Button>
	{/snippet}
	{#snippet content()}
		<ActionList>
			<a href="https://hyvor.com/support" target="_blank">
				<ActionListItem>
					Support Form
					{#snippet description()}
						<div>Get help from our team</div>
					{/snippet}
					{#snippet start()}
						<IconInfoCircle />
					{/snippet}
					{#snippet end()}
						<IconBoxArrowUpRight size={12} />
					{/snippet}
				</ActionListItem>
			</a>
			<a href="https://hyvor.community" target="_blank">
				<ActionListItem>
					Community Forum
					{#snippet description()}
						<div>hyvor.community</div>
					{/snippet}
					{#snippet start()}
						<IconChat />
					{/snippet}
					{#snippet end()}
						<IconBoxArrowUpRight size={12} />
					{/snippet}
				</ActionListItem>
			</a>
			{#if config.docs}
				<a href="/docs" target="_blank">
					<ActionListItem>
						Documentation
						{#snippet description()}
							<div>
								Learn how to use {getName()}
							</div>
						{/snippet}
						{#snippet start()}
							<IconFileEarmark />
						{/snippet}
						{#snippet end()}
							<IconBoxArrowUpRight size={12} />
						{/snippet}
					</ActionListItem>
				</a>
			{/if}
			{#if config.chat}
				<a href="/chat" onclick={openLiveChat}>
					<ActionListItem>
						Live Chat
						{#snippet description()}
							<div>Chat with our team</div>
						{/snippet}
						{#snippet start()}
							<IconChatDots />
						{/snippet}
					</ActionListItem>
				</a>
			{/if}

			<ActionListGroup title="Social">
				<a href={SOCIAL_LINKS.discord} target="_blank">
					<ActionListItem>
						Discord
						{#snippet start()}
							<IconDiscord />
						{/snippet}
						{#snippet end()}
							<IconBoxArrowUpRight size={12} />
						{/snippet}
					</ActionListItem>
				</a>
				<a href={SOCIAL_LINKS.blueksy} target="_blank">
					<ActionListItem>
						Bluesky
						{#snippet start()}
							<IconBluesky />
						{/snippet}
						{#snippet end()}
							<IconBoxArrowUpRight size={12} />
						{/snippet}
					</ActionListItem>
				</a>
				<a href={SOCIAL_LINKS.x} target="_blank">
					<ActionListItem>
						Twitter
						{#snippet start()}
							<IconTwitterX />
						{/snippet}
						{#snippet end()}
							<IconBoxArrowUpRight size={12} />
						{/snippet}
					</ActionListItem>
				</a>
				<a href={SOCIAL_LINKS.linkedin} target="_blank">
					<ActionListItem>
						Linkedin
						{#snippet start()}
							<IconLinkedin />
						{/snippet}
						{#snippet end()}
							<IconBoxArrowUpRight size={12} />
						{/snippet}
					</ActionListItem>
				</a>
			</ActionListGroup>

			<ActionListGroup title="Rate us">
				<a href="https://www.trustpilot.com/review/hyvor.com" target="_blank">
					<ActionListItem>
						{#snippet start()}
							<Trustpilot />
						{/snippet}
						Trustpilot
						{#snippet end()}
							<IconBoxArrowUpRight size={12} />
						{/snippet}
					</ActionListItem>
				</a>
				{#if config.g2}
					<a href="https://www.g2.com/products/hyvor-talk/reviews" target="_blank">
						<ActionListItem>
							{#snippet start()}
								<G2 />
							{/snippet}
							G2
							{#snippet end()}
								<IconBoxArrowUpRight size={12} />
							{/snippet}
						</ActionListItem>
					</a>
				{/if}
			</ActionListGroup>
		</ActionList>
	{/snippet}
</Dropdown>
