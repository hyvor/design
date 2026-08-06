export function portal(node: HTMLElement, target: string | HTMLElement | false = false) {
	const originalParent = node.parentNode;
	const originalNextSibling = node.nextSibling;

	function resolveTarget(t: string | HTMLElement): HTMLElement {
		if (typeof t !== 'string') return t;
		return document.querySelector<HTMLElement>(t) ?? document.body;
	}

	function place(t: string | HTMLElement | false) {
		if (t === false) {
			if (originalParent && node.parentNode !== originalParent) {
				originalParent.insertBefore(node, originalNextSibling);
			}
			return;
		}
		resolveTarget(t).appendChild(node);
	}

	place(target);

	return {
		update: place,
		destroy() {
			node.remove();
		}
	};
}
