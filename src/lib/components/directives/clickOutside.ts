interface Options {
	callback: Function;
	enabled?: boolean;
	stopPropagation?: boolean;
}

type Input = Options | Function;

function normalize(input: Input): Options {
	return typeof input === 'function' ? { callback: input } : input;
}

export function clickOutside(node: HTMLElement, input: Input) {
	let options = normalize(input);
	let listening = false;

	const handleClick = (event: MouseEvent) => {
		if (!node.contains(event.target as HTMLElement)) {
			if (options.stopPropagation) event.stopPropagation();

			options.callback();
		}
	};

	function sync() {
		const enabled = options.enabled === undefined ? true : options.enabled;

		if (enabled && !listening) {
			listening = true;
			setTimeout(() => {
				if (listening) document.addEventListener('click', handleClick);
			}, 0);
		} else if (!enabled && listening) {
			listening = false;
			document.removeEventListener('click', handleClick);
		}
	}

	sync();

	return {
		update(newInput: Input) {
			options = normalize(newInput);
			sync();
		},
		destroy() {
			listening = false;
			document.removeEventListener('click', handleClick);
		}
	};
}
