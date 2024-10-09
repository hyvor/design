interface Options {
	callback: Function;
	enabled?: boolean;
	stopPropagation?: boolean;
}

type Input = Options | Function;

export function clickOutside(node: HTMLElement, input: Input) {
	const options: Options = typeof input === 'function' ? { callback: input } : input;

	const enabled = options.enabled === undefined ? true : options.enabled;
	if (!enabled) return;

	const handleClick = (event: MouseEvent) => {
		if (!node.contains(event.target as HTMLElement)) {
			if (options.stopPropagation) event.stopPropagation();

			options.callback();
		}
	};

	setTimeout(() => {
		document.addEventListener('click', handleClick);
	}, 0);

	return {
		destroy() {
			document.removeEventListener('click', handleClick);
		}
	};
}
