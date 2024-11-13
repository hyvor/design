<script lang="ts">
	import { ActionList, ActionListItem, Button, Dropdown } from '../index.js';
	import {
		IconCaretDownFill,
		IconBoxArrowUpRight,
		IconChat,
		IconDiscord,
		IconInfoCircle,
		IconFileEarmark,
		IconChatDots,
		IconTwitterX,
		IconLinkedin
	} from '@hyvor/icons';
	import ActionListGroup from '../ActionList/ActionListGroup.svelte';
	import { PRODUCTS } from './BarProducts.svelte';
	import type { BarConfig, BarProduct } from './bar.js';
	import G2 from './img/G2.svelte';
	import Trustpilot from './img/Trustpilot.svelte';

	let supportDropdown = $state(false);


	interface Props {
		mobile?: boolean;
		product: BarProduct;
		config: BarConfig;
	}

	let { mobile = false, product, config }: Props = $props();

	function openLiveChat(e: any) {
		e.preventDefault();
		if ((window as any).$crisp) {
			(window as any).$crisp.push(['do', 'chat:open']);
		}
		supportDropdown = false;
	}
</script>

<Dropdown align={mobile ? 'center' : 'end'} width={325} bind:show={supportDropdown}>
	{#snippet trigger()}
		<Button  variant="invisible" color="input" size="small">
			Support
			{#snippet end()}
				<IconCaretDownFill size={10}  />
			{/snippet}
		</Button>
	{/snippet}
	{#snippet content()}
		<ActionList >
			<a href="https://hyvor.community" target="_blank">
				<ActionListItem>
					Community Forum
					{#snippet description()}
								<div >hyvor.community</div>
							{/snippet}
					{#snippet start()}
								<IconChat  />
							{/snippet}
					{#snippet end()}
								<IconBoxArrowUpRight  size={12} />
							{/snippet}
				</ActionListItem>
			</a>
			{#if config.docs}
				<a href="/docs" target="_blank">
					<ActionListItem>
						Documentation
						{#snippet description()}
										<div >
								Learn how to use {PRODUCTS[product].name}
							</div>
									{/snippet}
						{#snippet start()}
										<IconFileEarmark  />
									{/snippet}
						{#snippet end()}
										<IconBoxArrowUpRight  size={12} />
									{/snippet}
					</ActionListItem>
				</a>
			{/if}
			<a href="https://hyvor.com/support" target="_blank">
				<ActionListItem>
					Support Form
					{#snippet description()}
								<div >Get help from our team</div>
							{/snippet}
					{#snippet start()}
								<IconInfoCircle  />
							{/snippet}
					{#snippet end()}
								<IconBoxArrowUpRight  size={12} />
							{/snippet}
				</ActionListItem>
			</a>
			{#if config.chat}
				<a href="/chat" onclick={openLiveChat}>
					<ActionListItem>
						Live Chat
						{#snippet description()}
										<div >Chat with our team</div>
									{/snippet}
						{#snippet start()}
										<IconChatDots  />
									{/snippet}
					</ActionListItem>
				</a>
			{/if}

			<ActionListGroup title="Social">
				<a href="https://hyvor.com/api/go/discord" target="_blank">
					<ActionListItem>
						Discord
						{#snippet start()}
										<IconDiscord  />
									{/snippet}
						{#snippet end()}
										<IconBoxArrowUpRight  size={12} />
									{/snippet}
					</ActionListItem>
				</a>
				{#if config.twitter}
					<a href={config.twitter} target="_blank">
						<ActionListItem>
							Twitter
							{#snippet start()}
												<IconTwitterX  />
											{/snippet}
							{#snippet end()}
												<IconBoxArrowUpRight  size={12} />
											{/snippet}
						</ActionListItem>
					</a>
				{/if}
				<a href="https://www.linkedin.com/company/hyvor" target="_blank">
					<ActionListItem>
						Linkedin
						{#snippet start()}
										<IconLinkedin  />
									{/snippet}
						{#snippet end()}
										<IconBoxArrowUpRight  size={12} />
									{/snippet}
					</ActionListItem>
				</a>
			</ActionListGroup>

			<ActionListGroup title="Rate us">
				<a href="https://www.trustpilot.com/review/hyvor.com" target="_blank">
					<ActionListItem>
						{#snippet start()}
										<Trustpilot  />
									{/snippet}
						Trustpilot
						{#snippet end()}
										<IconBoxArrowUpRight  size={12} />
									{/snippet}
					</ActionListItem>
				</a>
				{#if config.g2}
					<a href="https://www.g2.com/products/hyvor-talk/reviews" target="_blank">
						<ActionListItem>
							{#snippet start()}
												<G2  />
											{/snippet}
							G2
							{#snippet end()}
												<IconBoxArrowUpRight  size={12} />
											{/snippet}
						</ActionListItem>
					</a>
				{/if}
			</ActionListGroup>
		</ActionList>
	{/snippet}
</Dropdown>
