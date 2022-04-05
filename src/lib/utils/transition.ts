import { quartOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/types/runtime/transition';

type ScaleDelayedOpts = {
	duration?: number;
	delay?: number;
};

export const scaleDelayed = (
	_: HTMLElement,
	{ duration, delay }: ScaleDelayedOpts
): TransitionConfig => {
	return {
		delay,
		duration,
		css: (t) => {
			const eased = quartOut(t);
			return `opacity: ${eased};transform: scale(${eased * 0.2 + 0.8})`;
		}
	};
};

export const pageTransition = (
	node: HTMLElement,
	{ delay = 0, duration = 400, easing = quartOut, dir = 'close', opacity = 0, yOffset = 0 } = {}
): TransitionConfig => {
	const style = getComputedStyle(node);
	const target_opacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;
	const od = target_opacity * (1 - opacity);
	const isOpening = dir === 'open';

	return {
		delay,
		duration,
		easing,
		css: (t, u) => `
		transform: ${transform} translateY(${-yOffset}px);
		opacity: ${target_opacity - od * u};
		clip-path: inset(0% ${isOpening ? (1 - t) * 100 : 0}% 0% ${isOpening ? 0 : t * 100}%);
		${!isOpening ? 'overflow:hidden' : ''}`
	};
};

/*
old page transition

export const pageTransition = (
	node: HTMLElement,
	{
		delay = 0,
		duration = 400,
		easing = quartOut,
		x = 0,
		y = 0,
		dir = 'close',
		opacity = 0,
		yOffset = 0
	} = {}
): TransitionConfig => {
	const style = getComputedStyle(node);
	const target_opacity = +style.opacity;
	const transform = style.transform === 'none' ? '' : style.transform;
	const od = target_opacity * (1 - opacity);
	const isOpening = dir === 'open';

	return {
		delay,
		duration,
		easing,
		css: (t, u) => `
		transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y - yOffset}px);
		opacity: ${target_opacity - od * u};
		clip-path: inset(0% ${isOpening ? (1 - t) * 100 : 0}% 0% ${!isOpening ? (1 - t) * 100 : 0}%)`
	};
};

 */
