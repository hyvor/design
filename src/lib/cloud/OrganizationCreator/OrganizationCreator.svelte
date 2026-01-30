<script lang="ts">
	import Modal from '$lib/components/Modal/Modal.svelte';
	import SplitControl from '$lib/components/SplitControl/SplitControl.svelte';
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	import toast from '$lib/components/Toast/toast.js';
	import type { CloudContextOrganization } from '../CloudContext/cloudContext.svelte.js';
	import {
		createOrganization,
		getCreatorOpened,
		setCreatorOpened
	} from './organizationCreator.svelte.js';

	let name = $state('');
	let input: HTMLInputElement | undefined = $state(undefined);
	let creating = $state(false);

	let opened = $derived(getCreatorOpened());

	async function handleCreate() {
		if (name.trim() === '') {
			toast.error('Organization name cannot be empty.');
			return;
		}

		creating = true;

		let org: CloudContextOrganization;

		try {
			org = await createOrganization(name);
		} catch {
			toast.error('Failed to create organization.');
			creating = false;
			return;
		}

		setCreatorOpened(false);
		name = '';
		creating = false;
	}

	$effect(() => {
		if (opened && input) {
			input.focus();
		}
	});
</script>

<Modal
	show={opened}
	title="Create Organization"
	size="small"
	footer={{ confirm: { text: 'Create' }, cancel: { text: 'Cancel' } }}
	on:confirm={handleCreate}
	loading={creating}
	onclose={() => setCreatorOpened(false)}
>
	<div class="note">Organizations can be used across HYVOR products.</div>

	<SplitControl label="Name" column noHorizonalPadding>
		<TextInput
			name="organizationName"
			bind:value={name}
			placeholder="Organization Name"
			block
			onkeyup={(e) => {
				if (e.key === 'Enter') {
					handleCreate();
				}
			}}
			bind:input
		/>
	</SplitControl>
</Modal>

<style>
	.note {
		color: var(--text-light);
		font-size: 14px;
	}
</style>
