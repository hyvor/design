<script lang="ts">
	interface Props {
		logo: string;
		size?: number;
	}

	let { logo, size = 100 }: Props = $props();
</script>

<div class="loader">
	<div class="hyvor-icon">
		<img src={logo} alt="Logo" width={size} height={size} />
	</div>
	<div class="shadow-wrap">
		<div class="shadow" style="width: calc({size}px * 0.95); height: calc({size}px * 0.12);"></div>
	</div>
</div>

<style>
	/* css styles for the animations start here */

	/* bounce animation */

	@keyframes bounce {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-24px);
		}
		100% {
			transform: translateY(0);
		}
	}

	/* shadow animation */
	@keyframes shadowPulse {
		0%,
		100% {
			transform: scale(1.2);
			opacity: 1;
			animation-timing-function: ease-out;
		}
		50% {
			transform: scale(0.8);
			opacity: 0.4;
			animation-timing-function: ease-in;
		}
	}

	.loader {
		position: fixed;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		inset: 0;
	}

	.hyvor-icon {
		animation: bounce 0.9s infinite;
	}

	.shadow-wrap {
		height: 20px;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}

	.shadow {
		background: rgba(0, 0, 0, 0.2);
		border-radius: 50%;
		filter: blur(8px);
		will-change: transform, opacity;
		animation: shadowPulse 0.9s infinite;
	}
</style>
