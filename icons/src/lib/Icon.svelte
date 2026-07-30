<script lang="ts">
	import { icons } from "./index.js";
	import type { IconName } from "./types.js";

    interface Props {
        name: IconName;
        size?: number;
        color?: string;
    }

    let { name, size = 16, color }: Props = $props();

    function addAttributes(svg: string) {
        svg = svg.replace('width="16"', `width="${size}"`);
        svg = svg.replace('height="16"', `height="${size}"`);

        if (color) {
            svg = svg.replace(/fill="[^"]*"/, `fill="${color}"`);
        }

        return svg;
    }

    async function getSvg() {
        const loader = icons[name];
        if (!loader) return '[?]';
        const raw = await loader();
        return addAttributes(raw.default as string);
    }

    const svg = await getSvg();
</script>

{@html svg}
