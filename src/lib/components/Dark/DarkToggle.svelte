<script lang="ts">
	import IconMoonStarsFill from '@hyvor/icons/IconMoonStarsFill';
	import IconSunFill from '@hyvor/icons/IconSunFill';
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
