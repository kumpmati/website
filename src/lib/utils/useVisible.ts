import { scrollPosition } from '../stores/page';

export const isVisible = (node) => {
	let prevVisible = false;

	const unsub = scrollPosition.subscribe(() => {
		const rect = node.getBoundingClientRect();
		const visible = rect.top - window.innerHeight < 0;

		if (prevVisible != visible) {
			node.dispatchEvent(new CustomEvent('visible', { detail: visible }));
			prevVisible = visible;
		}
	});

	return {
		destroy() {
			unsub();
		}
	};
};
