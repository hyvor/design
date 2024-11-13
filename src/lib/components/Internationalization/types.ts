export type I18nStrings = {
	[key: string]: string | I18nStrings;
};


export type PrimitiveType = string | number | boolean | null | undefined | Date;

// DOT NOTATION

export type ToDotPaths<T> = T extends object
	? {
			[K in keyof T]: `${Exclude<K, symbol>}${'' | `.${ToDotPaths<T[K]>}`}`;
		}[keyof T]
	: never;

export type FromDotPath<T, K extends string> = K extends keyof T
	? T[K]
	: K extends `${infer K0}.${infer KR}`
		? K0 extends keyof T
			? FromDotPath<T[K0], KR>
			: never
		: never;
