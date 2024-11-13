<script lang="ts">
	interface Props {
		size?: number | 'small' | 'medium' | 'large';
		alt?: string;
		[key: string]: any;
	}

	let { size = $bindable('medium'), alt = '', ...rest }: Props = $props();

	const sizes = {
		small: 24,
		medium: 32,
		large: 48
	};
	size = typeof size === 'number' ? size : sizes[size];
</script>

<img {alt} {...rest} style={`width: ${size}px; height: ${size}px;`} />

<style>
	img {
		border-radius: 50%;
		display: inline-block;
		overflow: hidden;
	}
</style>
