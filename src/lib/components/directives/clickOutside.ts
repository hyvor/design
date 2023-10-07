interface Options {
	callback: Function,
    enabled?: boolean,
	stopPropagation?: boolean
}

type Input = Options | Function;

export default function clickOutside(node: HTMLElement, input: Input) {

    input = (typeof input === "function" ? { callback: input } : input) as Input;

    const enabled = input.enabled === undefined ? true : input.enabled;
    if (!enabled) return;

	const handleClick = (event: MouseEvent) => {
		if (!node.contains((event.target as HTMLElement))) {
			if (input.stopPropagation)
            	event.stopPropagation();
			
			input.callback();
		}
	};


	document.addEventListener("click", handleClick, true);

	return {
		destroy() {
			document.removeEventListener("click", handleClick, true);
		},
	};
}