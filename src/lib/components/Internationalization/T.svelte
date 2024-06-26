<script lang="ts" generics="StringsT extends I18nStrings">
    import { type ToDotPaths, type I18nStrings } from "./types.js";
    import {
        getContext,
        type ComponentType,
        onMount,
        tick,
        afterUpdate,
        getAllContexts,
    } from "svelte";
    import { getStringByKey, InternationalizationService } from "./i18n.js";
    import { IntlMessageFormat, type PrimitiveType } from "intl-messageformat";
    import { browser } from "$app/environment";
    import { getMessage as getMessageBase } from "./t.js";

    type ComponentDeclaration = {
        element?: string;
        component?: ComponentType;
        props?: Record<string, any>;
    };
    type InputParams = Record<string, PrimitiveType | ComponentDeclaration>;
    type ParamValue = PrimitiveType | ((chunks: string | string[]) => string);

    export let key: ToDotPaths<StringsT>;
    export let params: InputParams = {};

    const context = getAllContexts();

    let hasComponentParams = false;

    function getElementFunc(el: string) {
        return (chunks: string | string[]) => {
            const children =
                typeof chunks === "string" ? chunks : chunks.join("");
            return `<${el}>${children}</${el}>`;
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
            if (typeof value === "object" && value !== null) {
                if (value.hasOwnProperty("component")) {
                    newValue = (chunks: string | string[]) => {
                        const children =
                            typeof chunks === "string"
                                ? chunks
                                : chunks.join("");
                        return children;
                    };
                    hasComponentParams = true;
                } else if (value.hasOwnProperty("element")) {
                    newValue = getElementFunc((value as any).element as string);
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
        component: ComponentType;
        props: Record<string, any>;
    }
    const componentBindings = new Map<string, ComponentBinding>();
    function getParamsForFrontend() {
        let retParams: Record<string, ParamValue> = {};

        for (let [key, value] of Object.entries(params)) {
            let newValue: ParamValue;
            if (typeof value === "object" && value !== null) {
                if (value.hasOwnProperty("component")) {
                    const { component, props } = value as ComponentDeclaration;

                    newValue = (chunks: string | string[]) => {
                        const children =
                            typeof chunks === "string"
                                ? chunks
                                : chunks.join("");
                        const id =
                            key +
                            "-" +
                            Math.random().toString(36).substring(7) +
                            "-" +
                            Date.now().toString();
                        componentBindings.set(id, {
                            component: component!,
                            props: {
                                ...props,
                                children,
                            },
                        });
                        return '<span id="' + id + '">' + children + "</span>";
                    };
                } else if (value.hasOwnProperty("element")) {
                    newValue = getElementFunc((value as any).element as string);
                }
            } else {
                newValue = value as PrimitiveType;
            }
            retParams[key] = newValue;
        }

        return retParams;
    }

    const i18n = getContext<InternationalizationService>("i18n");
    const locale = i18n.locale;
    const strings = i18n.strings;

    let message = getMessage(getParamsForBackend());

    function getMessage(processedParams: Record<string, ParamValue>) {
        return getMessageBase(key, processedParams, $strings, $locale);
    }

    function bindComponents() {
        for (let [id, binding] of componentBindings) {
            const el = document.getElementById(id);
            if (el) {
                el.innerHTML = "";
                new binding.component({
                    target: el,
                    hydrate: true,
                    props: binding.props,
                    context,
                });
            }
        }
    }

    async function renderFrontend() {
        message = getMessage(getParamsForFrontend());
        await tick();
        if (hasComponentParams) bindComponents();
    }

    let mounted = false;

    $: {
        params;
        key;
        if (browser && mounted) {
            renderFrontend();
        }
    }

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
