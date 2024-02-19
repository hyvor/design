
export type i18nStrings = {
    [key: string]: string | i18nStrings;
};



// DOT NOTATION

type PathsToStringProps<T> = T extends string ? [] : {
    [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>]
}[Extract<keyof T, string>];

type Join<T extends string[], D extends string> =
    T extends [] ? never :
    T extends [infer F] ? F :
    T extends [infer F, ...infer R] ?
    F extends string ? 
    `${F}${D}${Join<Extract<R, string[]>, D>}` : never : string;  

export type DotNotation<T extends i18nStrings> = Join<PathsToStringProps<T>, ".">