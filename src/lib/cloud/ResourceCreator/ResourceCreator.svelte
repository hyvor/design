<script lang="ts">
	import IconButton from '$lib/components/IconButton/IconButton.svelte';
	import IconX from '@hyvor/icons/IconX';
	import Button from '$lib/components/Button/Button.svelte';
	import ResourceCreatorLoader from './ResourceCreatorLoader.svelte';
	import { Steps, type Step } from './steps.svelte.js';
	import type { ComponentProps } from 'svelte';
	import { getCloudContext } from '../CloudContext/cloudContext.svelte.js';
	import DropdownContent from '$lib/components/Dropdown/DropdownContent.svelte';
	import OrganizationSwitcher from '../OrganizationSwitcher/OrganizationSwitcher.svelte';
	import { createOrganization } from '../OrganizationCreator/organizationCreator.svelte.js';
	import Accordian from './Accordian.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		title: string;
		onback: () => void;

		/**
		 * create a resource asyncly
		 * but do not yet update stores or redirect the user
		 * use onfinish for that to work seamlessly with the animation
		 */
		oncreate: () => Promise<boolean>;

		/**
		 * update stores and redirect the user from this
		 */
		onfinish: () => void;

		resourceTitle?: string; // ex: Blog, Website

		cta?: string;
		ctaProps?: ComponentProps<typeof Button>;
		steps?: string[]; // steps from the product. ex: creating the blog, copying the theme
	}

	let {
		children,
		title,
		onback,
		oncreate,
		onfinish,
		resourceTitle = 'Resource',
		cta = 'Create resource',
		ctaProps = {},
		steps: productSteps
	}: Props = $props();

	const { organization } = $derived(getCloudContext());

	let loading = $state(false);
	let steps: Steps = $state(new Steps([]));
	let orgName = $state('');
	let orgNameError = $state('');

	let orgButton: HTMLButtonElement = $state({} as HTMLButtonElement);
	let showOrgSwitcher = $state(false);

	let organizationAccordianOpen = $derived(!organization);
	let contentAccordianOpen = $derived(!!organization);

	function setLoading() {
		let stps: Step[] = [];

		if (!organization) {
			stps.push({
				text: 'Creating the organization',
				auto: false
			});
		}

		productSteps?.forEach((s) => {
			stps.push({
				text: s,
				auto: true
			});
		});

		stps.push({
			text: 'Finalizing',
			auto: true
		});

		loading = true;
		steps = new Steps(stps);
	}

	async function handleCta() {
		orgNameError = '';

		if (hasOrg === false && orgName.trim() === '') {
			orgNameError = 'Organization name cannot be empty';
			return;
		}

		setLoading();

		if (hasOrg === false) {
			await createOrganization(orgName);
			steps.toNext();
		}

		const success = await oncreate();

		if (success) {
			steps.finish(onfinish);
		} else {
			loading = false;
		}
	}
</script>

<div class="wrap">
	<div class="inner hds-box" class:loading>
		{#if loading}
			<ResourceCreatorLoader {steps} />
		{:else}
			<div class="title">
				<div>
					{title}
				</div>

				<span class="close">
					<IconButton color="input" variant="invisible" on:click={onback}>
						<IconX size={22} />
					</IconButton>
				</span>
			</div>

			<div class="content">
				<Accordian
					title="Organization"
					belowTitle={organization?.name}
					show={organizationAccordianOpen}
					footer={!organization}
					buttonText="Continue"
					onButtonClick={() => undefined}
					onToggle={() => {
						organizationAccordianOpen = !organizationAccordianOpen;

						if (organizationAccordianOpen && contentAccordianOpen) {
							contentAccordianOpen = false;
						}
					}}
				>
					<div class="org-switcher">
						<OrganizationSwitcher
							manageButton={false}
							createButtonText="Create new organization"
							createButtonProps={{
								size: 'medium',
								color: 'input'
							}}
						/>
					</div>
				</Accordian>

				<Accordian
					title={resourceTitle}
					show={contentAccordianOpen}
					buttonText={cta}
					onButtonClick={() => undefined}
					onToggle={() => {
						contentAccordianOpen = !contentAccordianOpen;

						if (contentAccordianOpen && organizationAccordianOpen) {
							organizationAccordianOpen = false;
						}
					}}
					loading={true}
				>
					<div class="children">
						{@render children?.()}
					</div>
				</Accordian>
			</div>
		{/if}
	</div>
</div>

{#if showOrgSwitcher}
	<DropdownContent
		bind:show={showOrgSwitcher}
		align="center"
		width={300}
		trigger={orgButton!}
		padding={0}
	>
		<OrganizationSwitcher bind:show={showOrgSwitcher} />
	</DropdownContent>
{/if}

<style>
	.wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		/* reduce bar height */
		height: calc(100vh - var(--hyvor-bar-height));
	}
	.inner {
		width: 750px;
		max-width: 100%;
		transition: 0.3s width;
	}
	.inner.loading {
		width: 450px;
	}

	.org-switcher {
	}

	.content {
		padding: 30px 35px;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.children {
		padding: 20px 35px;
	}

	.title {
		padding: 25px 35px 0;
		font-weight: 600;
		font-size: 20px;
		display: flex;
		align-items: center;
	}
	.title div {
		flex: 1;
	}
</style>
