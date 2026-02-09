<script lang="ts">
	import { onMount } from 'svelte';
	import anime from 'animejs';

	interface Props {
		logo: string;
		size?: number;
	}

	let { logo, size = 100 }: Props = $props();

	onMount(() => {
		const icon = document.querySelector('.hyvor-icon') as HTMLElement;
		const shadow = document.querySelector('.shadow') as HTMLElement;

		anime({
			targets: icon,
			translateY: [
				{ value: -24, duration: 400, easing: 'easeOutQuad' },
				{ value: 0, duration: 500, easing: 'easeInQuad' }
			],
			loop: true
		});

		anime({
			targets: shadow,
			scale: [
				{ value: 1.3, duration: 400, easing: 'easeOutQuad' },
				{ value: 1.2, duration: 500, easing: 'easeInQuad' }
			],
			loop: true
		});
	});
</script>

<div class="loader">
	<div class="hyvor-icon">
		<img src={logo} alt="Logo" width={size} height={size} />
	</div>
	<div class="shadow-wrap">
		<div
			class="shadow"
			style="width: calc({size}px * 0.95); height: calc({size}px * 0.12);"
		></div>
	</div>
</div>

<style>
	.loader {
		position: fixed;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		width: 100vw;
	}

	.shadow-wrap {
		height: 20px;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}

	.shadow {
		background: rgba(0, 0, 0, 0.25);
		border-radius: 50%;
		filter: blur(8px);
		will-change: transform, opacity;
	}
</style>
