<script lang="ts">
	import { barUser, createOrganization } from '$lib/components/HyvorBar/bar.js';
	import OrganizationButton from '$lib/components/HyvorBar/Organization/OrganizationButton.svelte';
	import IconButton from '$lib/components/IconButton/IconButton.svelte';
	import SplitControl from '$lib/components/SplitControl/SplitControl.svelte';
	import IconX from '@hyvor/icons/IconX';
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	import Caption from '$lib/components/FormControl/Caption.svelte';
	import Tooltip from '$lib/components/Tooltip/Tooltip.svelte';
	import IconInfoCircle from '@hyvor/icons/IconInfoCircle';
	import Button from '$lib/components/Button/Button.svelte';
	import Validation from '$lib/components/FormControl/Validation.svelte';
	import FormControl from '$lib/components/FormControl/FormControl.svelte';
	import Label from '$lib/components/FormControl/Label.svelte';
	import ResourceCreatorLoader from './ResourceCreatorLoader.svelte';
	import { Steps, type Step } from './steps.svelte.js';

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

		organizationCaption?: string;
		cta?: string;
		steps?: string[]; // steps from the product. ex: creating the blog, copying the theme
	}

	let {
		children,
		title,
		onback,
		oncreate,
		onfinish,
		organizationCaption = 'Choose the organization this resource belongs to',
		cta = 'Create resource',
		steps: productSteps
	}: Props = $props();

	const hasOrg = $derived(Boolean($barUser?.current_organization));
	let loading = $state(false);
	let steps: Steps = $state(new Steps([]));
	let orgName = $state('');
	let orgNameError = $state('');

	function setLoading() {
		let stps: Step[] = [];

		if (!hasOrg) {
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
			await createOrganization(orgName, 'resource-creator');
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
				{title}

				<span class="close">
					<IconButton color="input" variant="invisible" on:click={onback}>
						<IconX size={22} />
					</IconButton>
				</span>
			</div>

			<div class="content">
				{#if hasOrg}
					<SplitControl
						label="Organization"
						caption={organizationCaption}
						noHorizonalPadding
					>
						<OrganizationButton />
					</SplitControl>
				{:else}
					<SplitControl noHorizonalPadding>
						{#snippet label()}
							<Label>Organization</Label>
						{/snippet}
						{#snippet caption()}
							<Caption>
								A new organization will be created for you

								<span class="org-tooltip">
									<Tooltip
										text="An organization helps you manage multiple projects and team members across HYVOR products."
									>
										<IconInfoCircle size={12} />
									</Tooltip>
								</span>
							</Caption>
						{/snippet}

						<FormControl>
							<TextInput
								bind:value={orgName}
								block
								state={orgNameError ? 'error' : undefined}
							/>
							{#if orgNameError}
								<Validation state="error">{orgNameError}</Validation>
							{/if}
						</FormControl>
					</SplitControl>
				{/if}

				{@render children?.()}

				<div class="cta">
					<Button onclick={handleCta}>{cta}</Button>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		/* reduce bar height */
		height: calc(100vh - 50px);
	}
	.inner {
		width: 750px;
		max-width: 100%;
		transition: 0.3s width;
	}
	.inner.loading {
		width: 450px;
	}
	.title {
		padding: 25px 35px;
		font-weight: 600;
		font-size: 20px;
		position: relative;
	}
	.close {
		position: absolute;
		top: 50%;
		right: 35px;
		transform: translateY(-50%);
	}

	.content {
		padding: 0 35px 35px 35px;
	}

	.org-tooltip {
		vertical-align: middle;
		cursor: pointer;
	}

	.cta {
		padding-top: 20px;
		text-align: center;
	}
</style>
