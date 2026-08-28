<script lang="ts">
	import Seal from './Seal.svelte';
	import ccpa from './ccpa.svg?url';

	interface Props {
		size?: number;
	}

	let { size = 100 }: Props = $props();
</script>

<Seal {size}>
	<img src={ccpa} alt="CCPA Seal" class="map" />
	<span class="label">CCPA</span>
</Seal>

<style>
	.map {
		width: 22px;
		height: auto;
	}

	.label {
		font-size: 13px;
		font-weight: 700;
		letter-spacing: 0.03em;
		color: #fff;
	}
</style>
