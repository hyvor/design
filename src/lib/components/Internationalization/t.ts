import { IntlMessageFormat, type PrimitiveType } from 'intl-messageformat';
import { getContext } from 'svelte';
import { get } from 'svelte/store';
import { getStringByKey, type InternationalizationService } from './i18n.js';
import type { I18nStrings, ToDotPaths } from './types.js';

type ParamValue = PrimitiveType | ((chunks: string | string[]) => string);
type ParamsType = Record<string, ParamValue>;

export function getMessage(
	key: string,
	params: ParamsType,
	$strings: Record<string, any>,
	$locale: string
) {
	const string = getStringByKey($strings, key);
	if (string) {
		const formatter = new IntlMessageFormat(string, $locale);
		return formatter.format(params) as string;
	}
	return '';
}

export type TParams = Record<string, PrimitiveType>;

export function t<T extends ToDotPaths<I18nStrings>>(
	key: T,
	params: Record<string, PrimitiveType> = {},
	i18n: InternationalizationService | null = null
) {
	i18n = i18n || getContext<InternationalizationService>('i18n');
	const $locale = get(i18n.locale);
	const $strings = get(i18n.strings);

	return getMessage(key as string, params, $strings, $locale);
}
