<script lang="ts">
	import { scale } from 'svelte/transition';
	import { clickOutside } from '../../../components/index.js';


	interface Props {
		src: string;
		alt: string;
		width?: undefined | number;
		modalImageProps?: any;
		[key: string]: any
	}

	let {
		src,
		alt,
		width = undefined,
		modalImageProps = {},
		...rest
	}: Props = $props();

	let open = $state(false);
</script>

<div class="wrap">
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<img {src} {alt} {...rest} {width} onclick={() => (open = true)} class="preview" />
</div>

{#if open}
	<div class="modal">
		<img
			{src}
			{alt}
			{...modalImageProps}
			use:clickOutside={{
				callback: () => (open = false)
			}}
			transition:scale={{ duration: 100, opacity: 0.5, start: 0.95 }}
		/>
	</div>
{/if}

<style>
	img.preview {
		display: block;
		max-width: 100%;
		max-height: 100%;
		margin: 0 auto;
		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		cursor: pointer;
		transition: 0.1s box-shadow;
	}
	img.preview:hover {
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
	}

	.modal {
		position: fixed;
		z-index: 1000000;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 40px;
		overflow: hidden;
	}
	.modal-content {
		min-height: 0;
	}
	.modal img {
		max-width: 100%;
		max-height: 100%;
		border-radius: 5px;
	}
	.wrap {
		padding: 25px 0;
	}
</style>
