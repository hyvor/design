<script lang="ts">
	import { onMount } from 'svelte';
	import { clickOutside } from '../directives/clickOutside.js';
	import debounce from '../directives/debounce.js';
	import { slide } from 'svelte/transition';
	import { cubicIn } from 'svelte/easing';

	export let show: boolean;
	export let width: number;
	export let relative: boolean;

	export let closeOnOutsideClick = true;

	export let align: 'start' | 'center' | 'end';
	export let position: 'left' | 'right' | 'bottom' | 'top';

	export let trigger: HTMLElement;

	let contentWrap: HTMLElement;

	function positionWrap() {
		if (!trigger) return;
		if (!contentWrap) return;
		if (relative) return;

		const triggerRect = trigger.getBoundingClientRect();
		const contentRect = contentWrap.getBoundingClientRect();

		const documentWidth = document.documentElement.clientWidth;

		const GAP = 5;
		const SPACE_AROUND = 15;

		if (position === 'bottom') {
			contentWrap.style.top = triggerRect.bottom + GAP + 'px';
			if (contentRect.height + triggerRect.bottom > window.innerHeight) {
				contentWrap.style.bottom = SPACE_AROUND + 'px';
			} else {
				contentWrap.style.bottom = 'auto';
			}
		} else if (position === 'top') {
			contentWrap.style.top = triggerRect.top - contentRect.height - GAP + 'px';
		} else if (position === 'left') {
			contentWrap.style.left = triggerRect.left - width - GAP + 'px';
		} else if (position === 'right') {
			contentWrap.style.left = triggerRect.right + GAP + 'px';
		}

		if (position === 'bottom' || position === 'top') {
			if (align === 'start') {
				if (triggerRect.left + width < documentWidth) {
					contentWrap.style.left = triggerRect.left + 'px';
				} else {
					contentWrap.style.right = SPACE_AROUND + 'px';
				}
			} else if (align === 'center') {
				contentWrap.style.left =
					Math.max(triggerRect.left + triggerRect.width / 2 - width / 2, SPACE_AROUND) + 'px';
			} else if (align === 'end') {
				contentWrap.style.left = Math.max(triggerRect.right - width, SPACE_AROUND) + 'px';
			}
		} else {
			if (align === 'start') {
				contentWrap.style.top = triggerRect.top + 'px';
			} else if (align === 'center') {
				contentWrap.style.top =
					triggerRect.top + triggerRect.height / 2 - contentRect.height / 2 + 'px';
			} else if (align === 'end') {
				contentWrap.style.top = triggerRect.bottom - contentRect.height + 'px';
			}
		}

		if (width >= documentWidth - SPACE_AROUND * 2) {
			contentWrap.style.width = documentWidth - SPACE_AROUND * 2 + 'px';
		} else {
			contentWrap.style.width = width + 'px';
		}
	}

	$: if ((position, align)) {
		positionWrap();
	}

	function debouncedPosition() {
		debounce(positionWrap, 10)();
	}

	onMount(() => {
		positionWrap();

		const mutationObserver = new MutationObserver(positionWrap);
		mutationObserver.observe(contentWrap, {
			subtree: true,
			childList: true
		});
	});

	function slideIn(node: any) {
		return {
			duration: 100,
			easing: cubicIn,
			css: (t: number) => {
				return `
                    opacity: ${0.2 + t * 0.8};
                    transform: translateY(-${(1 - t) * 5}px) scale(${0.95 + t * 0.05});
                `;
			}
		};
	}
</script>

<svelte:window on:resize={debouncedPosition} on:scroll={debouncedPosition} />

<div
	class="content-wrap {align} {position}"
	use:clickOutside={{
		enabled: closeOnOutsideClick,
		callback: () => (show = false)
	}}
	bind:this={contentWrap}
	style="width: {width}px"
	transition:slideIn
>
	<div class="hds-box content">
		<slot />
	</div>
</div>

<style lang="scss">
	.content-wrap {
		position: fixed;
		z-index: 1000000;
	}

	.content-wrap > .content {
		padding: 10px;
	}
</style>
