<script lang="ts">
	interface Props {
		title: string;
		subtitle?: string | undefined;
		icon?: null | string;
		h2Style?: string | undefined;
		wrapStyle?: string | undefined;
	}

	let {
		title,
		subtitle = undefined,
		icon = null,
		h2Style = undefined,
		wrapStyle = undefined
	}: Props = $props();
</script>

<div class="wrap document-title" style={wrapStyle}>
	<h2 style={h2Style}>
		{title}
		{#if icon}
			<div class="img-wrap">
				<img src={icon} alt={title} />
			</div>
		{/if}
	</h2>

	{#if subtitle}
		<h3>{@html subtitle}</h3>
	{/if}
</div>

<style>
	.wrap {
		margin-top: 100px;
	}
	h2 {
		font-size: 38px;
		font-weight: 700;
		margin-bottom: 10px;
		margin-top: 20px;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	h3 {
		font-size: 20px;
		width: 650px;
		max-width: 100%;
		margin: 0 auto;
		font-weight: normal;
		line-height: 1.4;
		text-align: center;
		color: var(--text-light);
	}
	.img-wrap {
		text-align: center;
		margin-left: 20px;
		display: inline-flex;
		align-items: center;
	}
	img {
		width: 85px;
		height: 85px;
	}

	@media (max-width: 992px) {
		h2 {
			flex-direction: column-reverse;
			gap: 15px;
		}
	}
</style>
