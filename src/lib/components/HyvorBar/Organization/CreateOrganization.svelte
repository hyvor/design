<script lang="ts">
	import Modal from '$lib/components/Modal/Modal.svelte';
	import SplitControl from '$lib/components/SplitControl/SplitControl.svelte';
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	import toast from '$lib/components/Toast/toast.ts';
	import {
		barOnOrganizationSwitch,
		createOrganization,
		switchOrganization,
		type BarOrganization
	} from '../bar.ts';

	interface Props {
		show?: boolean;
	}

	let { show = $bindable(false) }: Props = $props();

	let name = $state('');
	let input: HTMLInputElement | undefined = $state(undefined);
	let creating = $state(false);

	async function handleCreate() {
		if (name.trim() === '') {
			toast.error('Organization name cannot be empty.');
			return;
		}

		creating = true;

		let org: BarOrganization;

		try {
			org = await createOrganization(name);
		} catch {
			toast.error('Failed to create organization.');
			creating = false;
			return;
		}

		show = false;
		name = '';

		try {
			await switchOrganization(org.id);
			$barOnOrganizationSwitch?.(org);
		} catch {
			toast.error('Failed to switch to the new organization.');
			return;
		} finally {
			creating = false;
		}
	}

	$effect(() => {
		if (show && input) {
			input.focus();
		}
	});
</script>

<Modal
	bind:show
	title="Create Organization"
	size="small"
	footer={{ confirm: { text: 'Create' }, cancel: { text: 'Cancel' } }}
	on:confirm={handleCreate}
	loading={creating}
>
	<SplitControl label="Name" column>
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
