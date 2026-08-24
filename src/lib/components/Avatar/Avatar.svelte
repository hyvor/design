<script lang="ts">
	interface Props {
		size?: number | 'small' | 'medium' | 'large';
		alt?: string;
		src?: string | null;
		username?: string;
		bg?: string;
		fg?: string;
	}

	let {
		size = $bindable('medium'),
		alt = '',
		src = null,
		username = '',
		bg = 'var(--accent)',
		fg = 'var(--accent-text)'
	}: Props = $props();

	const sizes = {
		small: 24,
		medium: 32,
		large: 48
	};
	size = typeof size === 'number' ? size : sizes[size];

	function getInitials(name: string) {
		const parts = name.trim().split(/\s+/).filter(Boolean);
		if (parts.length === 0) {
			return '';
		}
		if (parts.length === 1) {
			return parts[0].slice(0, 2).toUpperCase();
		}
		return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
	}

	const initials = $derived(getInitials(username));
</script>

{#if src}
	<img {src} {alt} style={`width: ${size}px; height: ${size}px;`} />
{:else}
	<svg
		width={size}
		height={size}
		viewBox="0 0 {size} {size}"
		role="img"
		aria-label={alt || username}
	>
		<circle cx={size / 2} cy={size / 2} r={size / 2} fill={bg} />
		<text
			x="50%"
			y="50%"
			dy=".35em"
			text-anchor="middle"
			fill={fg}
			font-family="var(--font-sans-serif)"
			font-size={size * 0.4}>{initials}</text
		>
	</svg>
{/if}

<style>
	img,
	svg {
		border-radius: 50%;
		display: inline-block;
		overflow: hidden;
		vertical-align: middle;
	}
</style>
