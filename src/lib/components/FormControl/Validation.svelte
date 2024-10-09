<script lang="ts">
	import {
		IconCheckCircleFill,
		IconExclamationTriangleFill,
		IconInfoCircleFill
	} from '@hyvor/icons';
	import type { AriaRole } from 'svelte/elements';

	export let state: 'error' | 'warning' | 'success' = 'error';
	export let role: AriaRole | undefined = 'alert';
</script>

<div class="validation {state}" {role} {...$$restProps}>
	<div class="icon">
		{#if state === 'error'}
			<IconExclamationTriangleFill style="color:var(--red)" />
		{:else if state === 'warning'}
			<IconInfoCircleFill style="color:var(--orange)" />
		{:else}
			<IconCheckCircleFill style="color:var(--green)" />
		{/if}
	</div>
	<div class="message">
		<slot />
	</div>
</div>

<style lang="scss">
	.validation {
		display: flex;
		align-items: center;
		font-size: 14px;
	}
	.icon {
		margin-right: 8px;
	}
	.validation.error {
		color: var(--red-dark);
	}
	.validation.warning {
		color: var(--orange-dark);
	}
	.validation.success {
		color: var(--green-dark);
	}

	:global(:root.dark) {
		.validation.error {
			color: var(--red);
		}
		.validation.warning {
			color: var(--orange);
		}
		.validation.success {
			color: var(--green);
		}
	}
</style>
