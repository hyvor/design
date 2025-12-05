<script lang="ts">
	import Link from '$lib/components/Link/Link.svelte';
	import Modal from '$lib/components/Modal/Modal.svelte';
	import { replaceState } from '$app/navigation';
	import { onMount } from 'svelte';

	let partner: string | null = $state(null);
	let showModal = $state(false);

	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		partner = params.get('partner');

		if (partner) {
			showModal = true;
		}
	});

	function handleConsent() {
		const coreUrl = `${location.protocol}//${location.hostname.split('.').slice(-2).join('.')}`;

		fetch(coreUrl + '/api/public/affiliate/placement', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				partner: partner,
				url: window.location.href
			}),
			credentials: 'include'
		})
			.then((response) => {
				if (response.ok) {
					console.info('Affiliate placement recorded for partner:', partner);
				}
			})
			.finally(() => {
				const url = new URL(window.location.href);
				url.searchParams.delete('partner');
				replaceState(url, {});
				showModal = false;
			});
	}
</script>

<Modal
	title="Referred by {partner}"
	bind:show={showModal}
	closeOnOutsideClick={false}
	footer={{
		cancel: {
			text: 'Do not track'
		},
		confirm: {
			text: 'Ok, Visit Site'
		}
	}}
	on:confirm={handleConsent}
>
	<div class="notice">
		You visited our site through our affiliate partner <strong>{partner}</strong>. To track this
		referral, we will place a small cookie in your browser. This cookie helps us identify which
		affiliate partner referred you if you sign up. It does not collect any personal data.
	</div>
	<p>
		You can read more in our <Link href="https://hyvor.com/privacy" target="_blank"
			>Privacy Policy</Link
		>.
	</p>
</Modal>

<style>
	.notice {
		line-height: 24px;
	}
</style>
