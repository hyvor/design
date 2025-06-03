<script lang="ts" generics="StringsT extends I18nStrings">
	import { run } from 'svelte/legacy';

	import { type ToDotPaths, type I18nStrings, type PrimitiveType } from './types.js';
	import { getContext, onMount, tick, getAllContexts, type Component, hydrate } from 'svelte';
	import { InternationalizationService } from './i18n.js';
	import { browser } from '$app/environment';
	import { getMessage as getMessageBase } from './t.js';

	type ComponentDeclaration = {
		element?: string;
		component?: Component<any>;
		props?: Record<string, any>;
	};
	type InputParams = Record<string, PrimitiveType | ComponentDeclaration>;
	type ParamValue = PrimitiveType | ((chunks: string | string[]) => string);

	interface Props {
		key: ToDotPaths<StringsT>;
		params?: InputParams;
	}

	let { key, params = {} }: Props = $props();

	const context = getAllContexts();

	let hasComponentParams = false;

	function getElementFunc(el: string, props: Record<string, any> = {}) {
		return (chunks: string | string[]) => {
			const children = typeof chunks === 'string' ? chunks : chunks.join('');
			let propsStr = '';
			for (let [propKey, propValue] of Object.entries(props)) {
				if (typeof propValue === 'string' || typeof propValue === 'number') {
					propsStr += ` ${propKey}="${propValue}"`;
				} else if (typeof propValue === 'boolean' && propValue) {
					propsStr += ` ${propKey}`;
				}
			}
			return `<${el}${propsStr}>${children}</${el}>`;
		};
	}

	/**
	 * In backend processing (SSR), we only render the strings inside it
	 * The components are not rendered.
	 * However, if components are found, we set hasComponentParams to true
	 * so that we can render the components in the frontend later.
	 */
	function getParamsForBackend() {
		let retParams: Record<string, ParamValue> = {};

		for (let [key, value] of Object.entries(params)) {
			let newValue: ParamValue;
			if (typeof value === 'object' && value !== null) {
				if (value.hasOwnProperty('component')) {
					newValue = (chunks: string | string[]) => {
						const children = typeof chunks === 'string' ? chunks : chunks.join('');
						return children;
					};
					hasComponentParams = true;
				} else if (value.hasOwnProperty('element')) {
					newValue = getElementFunc(
						(value as any).element as string,
						(value as any).props || {}
					);
				}
			} else {
				newValue = value as PrimitiveType;
			}
			retParams[key] = newValue;
		}

		return retParams;
	}

	/**
	 * In frontend processing, we render the components
	 */
	interface ComponentBinding {
		component: Component<any>;
		props: Record<string, any>;
	}
	const componentBindings = new Map<string, ComponentBinding>();
	function getParamsForFrontend() {
		let retParams: Record<string, ParamValue> = {};

		for (let [key, value] of Object.entries(params)) {
			let newValue: ParamValue;
			if (typeof value === 'object' && value !== null) {
				if (value.hasOwnProperty('component')) {
					const { component, props } = value as ComponentDeclaration;

					newValue = (chunks: string | string[]) => {
						const children = typeof chunks === 'string' ? chunks : chunks.join('');
						const id =
							key +
							'-' +
							Math.random().toString(36).substring(7) +
							'-' +
							Date.now().toString();
						componentBindings.set(id, {
							component: component!,
							props: {
								...props,
								children
							}
						});
						return '<span id="' + id + '">' + children + '</span>';
					};
				} else if (value.hasOwnProperty('element')) {
					newValue = getElementFunc((value as any).element as string, (value as any).props || {});
				}
			} else {
				newValue = value as PrimitiveType;
			}
			retParams[key] = newValue;
		}

		return retParams;
	}

	const i18n = getContext<InternationalizationService>('i18n');
	const locale = i18n.locale;
	const strings = i18n.strings;

	let message = $state(getMessage(getParamsForBackend()));

	function getMessage(processedParams: Record<string, ParamValue>) {
		return getMessageBase(key, processedParams, $strings, $locale);
	}

	function bindComponents() {
		for (let [id, binding] of componentBindings) {
			const el = document.getElementById(id);
			if (el) {
				el.innerHTML = '';
				hydrate(binding.component, {
					target: el,
					props: binding.props,
					context
				});
			}
		}
	}

	async function renderFrontend() {
		message = getMessage(getParamsForFrontend());
		await tick();
		if (hasComponentParams) bindComponents();
	}

	let mounted = $state(false);

	run(() => {
		params;
		key;
		if (browser && mounted) {
			renderFrontend();
		}
	});

	onMount(async () => {
		mounted = true;

		/**
		 * If there are components,
		 * we wait for the tick, then bind the components
		 */
		if (hasComponentParams) {
			renderFrontend();
		}
	});
</script>

{@html message}
