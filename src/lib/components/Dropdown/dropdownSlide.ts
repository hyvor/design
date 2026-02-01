import { elasticInOut } from 'svelte/easing';

export function dropdownSlide(node: any) {
	return {
		duration: 100,
		easing: elasticInOut,
		css: (t: number) => {
			return `
                    opacity: ${0.2 + t * 0.8};
                    transform: translateY(-${(1 - t) * 5}px) scale(${0.95 + t * 0.05});
                `;
		}
	};
}
