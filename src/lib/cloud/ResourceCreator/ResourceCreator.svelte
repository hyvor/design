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
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	import SplitControl from '$lib/components/SplitControl/SplitControl.svelte';
	import IconInfoCircle from '@hyvor/icons/IconInfoCircle';
	import { createOrganization } from '../OrganizationCreator/organizationCreator.svelte.js';
	import { toast } from '$lib/components/index.js';
	import { addToLoadedOrganizations } from '../OrganizationSwitcher/organizationSwitcher.svelte.js';
	import FormControl from '$lib/components/FormControl/FormControl.svelte';
	import Validation from '$lib/components/FormControl/Validation.svelte';

	interface Props {
		children?: import('svelte').Snippet<
			[
				{
					create: () => void;
				}
			]
		>;
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

	const { callbacks, organization } = $derived(getCloudContext());

	let orgName = $state('');
	let orgNameError = $state('');

	let organizationAccordianOpen = $derived(!organization);
	let contentAccordianOpen = $derived(!!organization);

	let creatingResource = $state(false);
	let creatingOrganization = $state(false);

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

	async function handleOrganizationCreation() {
		orgNameError = '';
		if (orgName.trim() === '') {
			orgNameError = 'Organization name cannot be empty.';
			return;
		}
		creatingOrganization = true;

		let org: CloudContextOrganization;
		try {
			org = await createOrganization(orgName);
		} catch {
			toast.error('Failed to create organization.');
			creatingOrganization = false;
			return;
		}

		creatingOrganization = false;

		// same as OrganizationCreator.svelte
		addToLoadedOrganizations(org);
		callbacks.onOrganizationSwitch(new Promise((resolve) => resolve(org)));
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
				buttonText="Create Organization"
				onButtonClick={handleOrganizationCreation}
				onToggle={() => {
					organizationAccordianOpen = !organizationAccordianOpen;

					if (organizationAccordianOpen && contentAccordianOpen) {
						contentAccordianOpen = false;
					}
				}}
				toggleLocked={creatingResource}
				loading={creatingOrganization}
			>
				{#if organization}
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
				{:else}
					<div class="org-creator">
						<SplitControl label="Name" column>
							<FormControl>
								<TextInput
									bind:value={orgName}
									block
									placeholder="Organization Name"
									disabled={creatingOrganization}
									onkeyup={(e) => {
										if (e.key === 'Enter') {
											handleOrganizationCreation();
										}
									}}
								/>

								{#if orgNameError}
									<Validation state="error">{orgNameError}</Validation>
								{/if}
							</FormControl>

							<div class="org-note">
								<IconInfoCircle size={12} />
								Organizations can be used across HYVOR products.
							</div>
						</SplitControl>
					</div>
				{/if}
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
				toggleLocked={creatingResource || !organization}
			>
				<div class="children">
					{@render children?.({
						create: handleResourceCreation
					})}
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

	.org-creator {
		padding: 15px 20px;
	}

	.org-note {
		color: var(--text-light);
		font-size: 14px;
		margin-top: 15px;
		display: flex;
		align-items: center;
		gap: 8px;
	}
</style>
