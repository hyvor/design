<script lang="ts">
	import ColorPicker from '../ColorPicker/ColorPicker.svelte';
	import Divider from '../Divider/Divider.svelte';
	import Dropdown from '../Dropdown/Dropdown.svelte';
	import Slider from '../Slider/Slider.svelte';
	import SplitControl from '../SplitControl/SplitControl.svelte';
	import Tooltip from '../Tooltip/Tooltip.svelte';
	import ShadowPreviewBox from './ShadowPreviewBox.svelte';

	interface Props {
		value: string;
		previewSize?: number;
		oninput?: (value: string) => void;
		align?: 'start' | 'center' | 'end';
		position?: 'left' | 'right' | 'bottom' | 'top';
	}

	let {
		value = $bindable(),
		previewSize = 40,
		oninput,
		align = 'center',
		position = 'bottom'
	}: Props = $props();

	let shadowState = $state(parseBoxShadow(value));

	function parseBoxShadow(value: string) {
		const regex = /(-?\d+px)\s+(-?\d+px)\s+(\d+px)\s+(\d+px)\s+(#[0-9a-fA-F]{8}|\#[0-9a-fA-F]{6})/;

		const match = value.match(regex);

		if (match) {
			return {
				xOffset: parseInt(match[1]),
				yOffset: parseInt(match[2]),
				blur: parseInt(match[3]),
				spread: parseInt(match[4]),
				color: match[5]
			};
		}

		return {
			xOffset: 0,
			yOffset: 0,
			blur: 0,
			spread: 0,
			color: '#00000011'
		};
	}

	let cssValue = $derived.by(() => {
		const { xOffset, yOffset, blur, spread, color } = shadowState;
		const val = `${xOffset}px ${yOffset}px ${blur}px ${spread}px ${color}`;
		return val;
	});

	function handleInput() {
		value = cssValue;
		if (oninput) {
			oninput(value);
		}
	}

	function valuePxFormat(value: number) {
		return value + 'px';
	}
</script>

<Dropdown {align} {position} width={500}>
	{#snippet trigger()}
		<Tooltip text="Click to edit box shadow">
			<button>
				<ShadowPreviewBox boxShadow={cssValue} size={previewSize} />
			</button>
		</Tooltip>
	{/snippet}

	{#snippet content()}
		<div class="shadow-preview">
			<ShadowPreviewBox boxShadow={cssValue} size={100} />
			<div class="css-value">
				{cssValue}
			</div>
		</div>

		<Divider margin={15} />

		<SplitControl label="X Offset">
			<Slider
				bind:value={shadowState.xOffset}
				min={-40}
				max={40}
				step={1}
				valueFormat={valuePxFormat}
				onchange={handleInput}
			/>
		</SplitControl>
		<SplitControl label="Y Offset">
			<Slider
				bind:value={shadowState.yOffset}
				min={-40}
				max={40}
				step={1}
				valueFormat={valuePxFormat}
				onchange={handleInput}
			/>
		</SplitControl>
		<SplitControl label="Blur">
			<Slider
				bind:value={shadowState.blur}
				min={0}
				max={20}
				step={1}
				valueFormat={valuePxFormat}
				onchange={handleInput}
			/>
		</SplitControl>
		<SplitControl label="Spread">
			<Slider
				bind:value={shadowState.spread}
				min={0}
				max={20}
				step={1}
				valueFormat={valuePxFormat}
				onchange={handleInput}
			/>
		</SplitControl>
		<SplitControl label="Color">
			<ColorPicker bind:color={shadowState.color} alpha oninput={handleInput} />
		</SplitControl>
	{/snippet}
</Dropdown>

<style>
	.shadow-preview {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 15px;
	}
	.css-value {
		font-size: 12px;
		color: var(--text-light);
		margin-top: 15px;
	}
</style>
