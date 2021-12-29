import { quartOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/types/runtime/transition';

type ScaleDelayedOpts = {
	duration?: number;
	delay?: number;
};

export const scaleDelayed = (_: any, { duration, delay }: ScaleDelayedOpts): TransitionConfig => {
	return {
		delay,
		duration,
		css: (t) => {
			const eased = quartOut(t);
			return `opacity: ${eased};transform: scale(${eased * 0.2 + 0.8})`;
		}
	};
};
