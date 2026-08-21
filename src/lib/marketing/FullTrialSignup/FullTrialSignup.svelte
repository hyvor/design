<script lang="ts">
	import Button from '../../components/Button/Button.svelte';
	import IconCheckCircleFill from '@hyvor/icons/IconCheckCircleFill';

	type ButtonConfig = { href: string; label: string; external?: boolean };

	interface Props {
		badge?: string | null;
		title?: string;
		description?: string;
		button?: ButtonConfig | ButtonConfig[] | null;
		checks?: string[];
		[key: string]: any;
	}

	let {
		badge = null,
		title = 'Start your trial today',
		description = '',
		button = null,
		checks = ['14-day free trial', 'No credit card required', 'Cancel anytime'],
		...rest
	}: Props = $props();

	const buttons = $derived(button ? (Array.isArray(button) ? button : [button]) : []);
</script>

<section class="hds-full-trial-signup" {...rest}>
	<div class="hds-container inner">
		{#if badge}
			<div class="badge">{badge}</div>
		{/if}

		<h2>{title}</h2>

		{#if description}
			<p>{description}</p>
		{/if}

		{#if buttons.length}
			<div class="cta-actions">
				{#each buttons as b}
					<Button
						as="a"
						size="large"
						href={b.href}
						target={b.external ? '_blank' : undefined}
						rel={b.external ? 'noopener' : undefined}
					>
						{b.label}
					</Button>
				{/each}
			</div>
		{/if}

		{#if checks.length}
			<div class="checks">
				{#each checks as check}
					<div class="check">
						<IconCheckCircleFill size={15} />
						{check}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.hds-full-trial-signup {
		padding: 96px 0 138px;
		background: linear-gradient(
			to bottom,
			var(--background),
			color-mix(in srgb, var(--accent) 40%, var(--background))
		);
		text-align: center;
	}

	.inner {
		width: 600px;
		max-width: 100%;
	}

	.badge {
		display: inline-flex;
		padding: 4px 14px;
		border-radius: 100px;
		font-size: 13px;
		font-weight: 600;
		background: color-mix(in srgb, var(--accent) 12%, transparent);
		color: var(--accent);
		border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
		margin-bottom: 24px;
	}

	h2 {
		font-size: clamp(28px, 4vw, 40px);
		font-weight: 800;
		margin: 0 0 12px;
		letter-spacing: -0.02em;
		font-family: var(--font-serif);
	}

	p {
		font-size: 1rem;
		color: var(--text-light);
		margin: 0 0 32px;
	}

	.cta-actions {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 12px;
		margin: 0 0 24px;
	}

	.checks {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 20px;
		flex-wrap: wrap;
		margin-top: 24px;
	}

	.check {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 14px;
		color: var(--text-light);
	}

	.check :global(svg) {
		color: var(--accent);
	}

	@media (max-width: 600px) {
		/* same fix as .bullets in FeatureSplit.svelte — center the list as a
		   single block, sized to its widest row, instead of wrapping into
		   independently-centered lines (which leaves each row's icon at a
		   different x position whenever the rows' text lengths differ) */
		.checks {
			flex-direction: column;
			align-items: flex-start;
			width: fit-content;
			max-width: 100%;
			margin: 24px auto 0;
			gap: 10px;
		}
	}
</style>
