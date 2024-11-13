<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();

	interface Props {
		size?: 'small' | 'medium' | 'large' | number;
		// export let color : 'accent' | 'soft' | 'invisible' | 'danger' = 'accent';
		color?: 'accent' | 'gray' | 'input' | 'green' | 'red' | 'blue' | 'orange';
		variant?: 'fill' | 'fill-light' | 'outline' | 'outline-fill' | 'invisible';
		as?: 'button' | 'a';
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let {
		size = $bindable('medium'),
		color = 'accent',
		variant = 'fill',
		as = 'button',
		children,
		...rest
	}: Props = $props();

	const sizes = {
		small: 26,
		medium: 30,
		large: 36
	};

	size = (typeof size === 'number' ? size : sizes[size]) + 'px';
</script>

<svelte:element
	this={as}
	class="button {color} {variant}"
	style:width={size}
	style:height={size}
	onkeyup={bubble('keyup')}
	onkeydown={bubble('keydown')}
	onkeypress={bubble('keypress')}
	onfocus={bubble('focus')}
	onblur={bubble('blur')}
	onclick={bubble('click')}
	onmouseover={bubble('mouseover')}
	onmouseenter={bubble('mouseenter')}
	onmouseleave={bubble('mouseleave')}
	onchange={bubble('change')}
	role="button"
	tabindex="0"
	{...rest}
>
	{@render children?.()}
</svelte:element>

<style lang="scss">
	.button {
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		transition: 0.2s box-shadow;
		font-size: 1em;

		--local-hover-shadow-size: 2.5px;
		--local-hover-shadow-color: var(--accent-light);
		&:active {
			--local-hover-shadow-size: 4px;
		}

		&:hover {
			box-shadow: 0 0 0 var(--local-hover-shadow-size) var(--local-hover-shadow-color);
		}

		&:focus-visible {
			outline: none;
			box-shadow: 0 0 0 calc(var(--local-hover-shadow-size) + 1px) var(--local-hover-shadow-color);
		}
	}

	.button.large {
		--local-hover-shadow-size: 3px;
	}

	//styles for variant fill with colors
	.button {
		&.fill {
			transition: 0.2s box-shadow;

			&.accent {
				background-color: var(--accent);
				color: var(--accent-text);
				--local-hover-shadow-color: var(--accent-light);
			}

			&.gray {
				background-color: var(--gray-dark);
				color: var(--text-white);
				--local-hover-shadow-color: var(--gray-light);
			}

			&.input {
				background-color: var(--input);
				color: var(--text);
				--local-hover-shadow-color: var(--gray-light);
			}

			&.green {
				background-color: var(--green-dark);
				color: var(--text-white);
				--local-hover-shadow-color: var(--green-light);
			}

			&.red {
				background-color: var(--red-dark);
				color: var(--text-white);
				--local-hover-shadow-color: var(--red-light);
			}

			&.blue {
				background-color: var(--blue-dark);
				color: var(--text-white);
				--local-hover-shadow-color: var(--blue-light);
			}

			&.orange {
				background-color: var(--orange-dark);
				color: var(--text-white);
				--local-hover-shadow-color: var(--orange-light);
			}
		}

		&.fill-light {
			&.accent {
				background-color: var(--accent-light);
				color: var(--accent);
				--local-hover-shadow-color: var(--accent-light);
			}

			&.gray {
				background-color: var(--gray-light);
				color: var(--gray-dark);
				--local-hover-shadow-color: color-mix(in srgb, var(--gray-light) 40%, transparent);
			}

			&.green {
				background-color: var(--green-light);
				color: var(--green-dark);
				--local-hover-shadow-color: color-mix(in srgb, var(--green-light) 40%, transparent);
			}

			&.red {
				background-color: var(--red-light);
				color: var(--red-dark);
				--local-hover-shadow-color: color-mix(in srgb, var(--red-light) 40%, transparent);
			}

			&.blue {
				background-color: var(--blue-light);
				color: var(--blue-dark);
				--local-hover-shadow-color: color-mix(in srgb, var(--blue-light) 40%, transparent);
			}

			&.orange {
				background-color: var(--orange-light);
				color: var(--orange-dark);
				--local-hover-shadow-color: color-mix(in srgb, var(--orange-light) 40%, transparent);
			}
		}

		//styles for variant outline with colors
		&.outline {
			border: 1px solid;

			&.accent {
				border-color: var(--accent);
				color: var(--accent);
				--local-hover-shadow-color: var(--accent-light);
			}

			&.gray {
				border-color: var(--gray-dark);
				color: var(--gray-dark);
				--local-hover-shadow-color: var(--gray-light);
			}

			&.green {
				border-color: var(--green-dark);
				color: var(--green-dark);
				--local-hover-shadow-color: var(--green-light);
			}

			&.red {
				border-color: var(--red-dark);
				color: var(--red-dark);
				--local-hover-shadow-color: var(--red-light);
			}

			&.blue {
				border-color: var(--blue-dark);
				color: var(--blue-dark);
				--local-hover-shadow-color: var(--blue-light);
			}

			&.orange {
				border-color: var(--orange-dark);
				color: var(--orange-dark);
				--local-hover-shadow-color: var(--orange-light);
			}
		}

		//styles for variant outline-fill with colors
		&.outline-fill {
			border: 1px solid;

			&.accent {
				background-color: var(--accent-light);
				border-color: var(--accent);
				color: var(--accent);
				--local-hover-shadow-color: color-mix(in srgb, var(--accent-light) 40%, transparent);
			}

			&.gray {
				background-color: var(--gray-light);
				border-color: var(--gray-dark);
				color: var(--gray-dark);
				--local-hover-shadow-color: var(--gray-light);
			}

			&.green {
				background-color: var(--green-light);
				border-color: var(--green-dark);
				color: var(--green-dark);
				--local-hover-shadow-color: var(--green-light);
			}

			&.red {
				background-color: var(--red-light);
				border-color: var(--red-dark);
				color: var(--red-dark);
				--local-hover-shadow-color: var(--red-light);
			}

			&.blue {
				background-color: var(--blue-light);
				border-color: var(--blue-dark);
				color: var(--blue-dark);
				--local-hover-shadow-color: var(--blue-light);
			}

			&.orange {
				background-color: var(--orange-light);
				border-color: var(--orange-dark);
				color: var(--orange-dark);
				--local-hover-shadow-color: var(--orange-light);
			}
		}

		//styles for variant invisible with colors
		&.invisible {
			background-color: transparent;
			transition: 0.2s background-color;
			box-shadow: none !important;

			&.accent {
				&:hover {
					background-color: var(--accent-light);
					color: var(--text-light);
				}
			}

			&.gray {
				&:hover {
					background-color: var(--gray-light);
					color: var(--gray-dark);
				}
			}

			&.input {
				&:hover {
					background-color: var(--input);
					color: var(--text);
				}
			}

			&.green {
				&:hover {
					background-color: var(--green-light);
					color: var(--green-dark);
				}
			}

			&.red {
				&:hover {
					background-color: var(--red-light);
					color: var(--red-dark);
				}
			}

			&.blue {
				&:hover {
					background-color: var(--blue-light);
					color: var(--blue-dark);
				}
			}

			&.orange {
				&:hover {
					background-color: var(--orange-light);
					color: var(--orange-dark);
				}
			}
		}
	}

	.button[disabled] {
		cursor: not-allowed;
		opacity: 0.2;
		box-shadow: none !important;
	}
</style>
