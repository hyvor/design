<script lang="ts">
	import { IconMoonStarsFill, IconSunFill } from '@hyvor/icons';
	import IconButton from '../IconButton/IconButton.svelte';
	import { dark } from './../../stores/dark.js';

	function handleClick() {
		dark.update((value) => !value);
	}
</script>

<IconButton on:click={handleClick} variant="invisible">
	{#if $dark}
		<IconMoonStarsFill size={18} />
	{:else}
		<IconSunFill size={18} />
	{/if}
</IconButton>
