import { browser } from '$app/env';
import type { PageBlock } from '$lib/types/contentful';
import { throttle } from '$lib/utils/throttle';
import { writable, type Readable } from 'svelte/store';
import { scrollPosition } from './page';

type TimelineStoreValues = {
	blocks: PageBlock[];
	current: number;
	enabled: boolean;
};

type TimelineItem = {
	element: HTMLElement;
	top: number;
	bottom: number;
};

type TimelineActionOpts = {
	timeline: TimelineStore;
	index: number;
};

type TimelineAction = {
	destroy: () => void;
};

export type TimelineStore = Readable<TimelineStoreValues> & {
	register: (index: number, element: HTMLElement) => () => void;
	unregister: (index: number) => void;
	setCurrent: (index: number, scroll: boolean) => void;
	setEnabled: (value: boolean) => void;
};

/**
 * Creates a timeline store that keeps track of the elements in the timeline
 */
export const createTimeline = (blocks: PageBlock[], enabled: boolean): TimelineStore => {
	const store = writable<TimelineStoreValues>({ blocks, current: 0, enabled });
	const elements: Record<number, TimelineItem> = {};
	let isEnabled = enabled;

	const unregister = (index: number) => {
		if (!isEnabled) return;
		delete elements[index];
	};

	const register = (index: number, element: HTMLElement) => {
		if (!isEnabled) return;

		const rect = element.getBoundingClientRect();

		elements[index] = {
			element,
			top: rect.top + window.scrollY,
			bottom: rect.bottom + window.scrollY
		};

		// return clean up function
		return () => unregister(index);
	};

	const setEnabled = (val: boolean) => {
		store.update((prev) => ({ ...prev, enabled: val }));
		isEnabled = val;
	};

	const setCurrent = (index: number, scrollTo: boolean) => {
		if (!isEnabled) return;

		store.update((prev) => ({ ...prev, current: index }));

		if (scrollTo) {
			// scroll to the element
			const { element } = elements?.[index];
			element?.scrollIntoView({ behavior: 'smooth', block: 'center' });

			// disable updating the timeline for the duration of
			// scrolling to the newly selected element
			setEnabled(false);
			// re-enable after scrolling has happened
			setTimeout(() => setEnabled(true), 500);
		}
	};

	const update = throttle((y: number) => {
		// we must wrap the update function in a setTimeout
		// so that all the nodes have time to register
		// themselves before the first update is called
		setTimeout(() => {
			// find the first element where the user has NOT
			// yet scrolled past the element's bottom.

			Object.entries(elements).some(([index, e]) => {
				if (e.bottom > y + 200) {
					setCurrent(+index, false);
					return true;
				}
			});
		}, 0);
	}, 0);

	// update current element based on scroll position
	scrollPosition.subscribe(update);

	return {
		subscribe: store.subscribe,
		register,
		unregister,
		setCurrent,
		setEnabled
	};
};

/**
 * Registers a node as a timeline item
 */
export const timelineSection = (node: HTMLElement, opts: TimelineActionOpts): TimelineAction => {
	const { timeline, index } = opts;

	// register element to timeline on creation
	const unregister = timeline.register(index, node);

	return {
		destroy() {
			// unregister node from timeline on destroy
			unregister?.();
		}
	};
};
