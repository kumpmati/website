import { browser } from '$app/env';
import { throttle } from '$lib/utils/throttle';
import { writable, type Readable } from 'svelte/store';
import { scrollPosition } from './page';

export type TimelineStore = Readable<TimelineStoreValues> & {
	register: (index: number, element: HTMLElement) => () => void;
	unregister: (index: number) => void;
	setCurrent: (index: number, scroll: boolean) => void;
	setEnabled: (value: boolean) => void;
};

type TimelineStoreValues = {
	length: number;
	current: number;
	enabled: boolean;
};

type TimelineItem = {
	element: HTMLElement;
};

type TimelineActionOpts = {
	timeline: TimelineStore;
	index: number;
};

type TimelineAction = {
	destroy: () => void;
};

/**
 * Creates a timeline store that is used to keep track all timeline elements and manages which
 * element is active at a given time.
 */
export const createTimeline = (length: number, enabled: boolean): TimelineStore => {
	const store = writable<TimelineStoreValues>({ length, current: 0, enabled });
	const elements: Record<number, TimelineItem> = {};
	let isEnabled = enabled;

	const unregister = (index: number) => {
		if (!isEnabled) return;
		delete elements[index];
	};

	// Adds a html element to the timeline as a section
	const register = (index: number, element: HTMLElement) => {
		if (!isEnabled) return;

		// add element to timeline
		elements[index] = { element };

		// return clean up function
		return () => {
			unregister(index);
		};
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
			setTimeout(() => setEnabled(true), 800);
		}
	};

	// update function called when user is scrolling
	const update = throttle((y: number) => {
		// we must wrap the update function in a setTimeout
		// so that all the nodes have time to register
		// themselves before the first update is called
		setTimeout(() => {
			if (!browser) return;

			if (y + window.innerHeight >= document.body.scrollHeight) {
				// automatically set last item as active when scrolled to the bottom
				setCurrent(length - 1, false);
				return;
			}

			// find the first element where the user has NOT
			// yet scrolled past the element's bottom.
			Object.entries(elements).some(([index, e]) => {
				const rect = e.element.getBoundingClientRect();

				if (rect.bottom + window.scrollY > y + 200) {
					setCurrent(+index, false);
					return true;
				}
			});
		}, 0);
	}, 10);

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
 * A simple Svelte Action that registers and unregisters a node in the timeline
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
