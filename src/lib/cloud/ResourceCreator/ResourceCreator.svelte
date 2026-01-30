<script lang="ts">
	import IconButton from '$lib/components/IconButton/IconButton.svelte';
	import IconX from '@hyvor/icons/IconX';
	import Button from '$lib/components/Button/Button.svelte';
	import type { ComponentProps } from 'svelte';
	import {
		getCloudContext,
		type CloudContextOrganization
	} from '../CloudContext/cloudContext.svelte.js';
	import OrganizationSwitcher from '../OrganizationSwitcher/OrganizationSwitcher.svelte';
	import Accordian from './Accordian.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		title: string;
		onback: () => void;

		/**
		 * create the resource
		 * after creation, ResourceCreator will simply cancel the loader
		 * it is the resposibility of the callback to redirect the user afterwards
		 */
		oncreate: (organization: CloudContextOrganization) => Promise<boolean>;

		resourceTitle?: string; // ex: Blog, Website

		cta?: string;
		ctaProps?: ComponentProps<typeof Button>;
	}

	let {
		children,
		title,
		onback,
		oncreate,
		resourceTitle = 'Resource',
		cta = 'Create resource'
	}: Props = $props();

	const { organization } = $derived(getCloudContext());

	let orgName = $state('');
	let orgNameError = $state('');

	let organizationAccordianOpen = $derived(!organization);
	let contentAccordianOpen = $derived(!!organization);

	let creatingResource = $state(false);

	function handleResourceCreation() {
		creatingResource = true;

		oncreate(organization!).then((res) => {
			creatingResource = false;
			if (res) {
				contentAccordianOpen = false;
			}
		});
		// the product generally has to show error feedback
		// .catch
	}
</script>

<div class="wrap">
	<div class="inner hds-box">
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
				toggleLocked={creatingResource}
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
				onButtonClick={handleResourceCreation}
				onToggle={() => {
					contentAccordianOpen = !contentAccordianOpen;

					if (contentAccordianOpen && organizationAccordianOpen) {
						organizationAccordianOpen = false;
					}
				}}
				loading={creatingResource}
				toggleLocked={creatingResource}
			>
				<div class="children">
					{@render children?.()}
				</div>
			</Accordian>
		</div>
	</div>
</div>

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
