import type { PageBlock } from '$lib/types/contentful';
import { writable, type Readable } from 'svelte/store';

export type PageStore = {
	backgroundColor: string;
	textColor: 'Dark' | 'Light';
};

export const pageSettings = writable<PageStore>({
	backgroundColor: '#000',
	textColor: 'Dark'
});

export const mousePosition = writable<{ x: number; y: number }>({ x: 0, y: 0 });

export const scrollPosition = writable<number>(0);

type TimelineStoreContent = { blocks: PageBlock[]; current: number; enabled: boolean };

export type TimelineStore = Readable<TimelineStoreContent> & {
	register: (index: number, element: HTMLElement) => () => void;
	unregister: (index: number) => void;
	setCurrent: (index: number, scroll: boolean) => void;
	setEnabled: (value: boolean) => void;
};

export const createTimeline = (blocks: PageBlock[], enabled: boolean): TimelineStore => {
	const store = writable<TimelineStoreContent>({ blocks, current: 0, enabled });
	const elements = {};
	let isEnabled = enabled;

	const unregister = (index: number) => {
		if (!isEnabled) return;
		delete elements[index];
	};

	const register = (index: number, element: HTMLElement) => {
		if (!isEnabled) return;
		elements[index] = element;

		// return clean up function
		return () => unregister(index);
	};

	const setEnabled = (val: boolean) => {
		store.update((prev) => ({ ...prev, enabled: val }));
		isEnabled = val;
	};

	const setCurrent = (index: number, scroll: boolean) => {
		if (!isEnabled) return;

		store.update((prev) => ({ ...prev, current: index }));

		if (scroll) {
			// scroll to the element
			const element = elements?.[index];
			element?.scrollIntoView({ behavior: 'smooth', block: 'center' });

			// disable updating the timeline for the duration of
			// scrolling to the newly selected element
			setEnabled(false);
			// re-enable after scrolling has happened
			setTimeout(() => setEnabled(true), 500);
		}
	};

	return {
		subscribe: store.subscribe,
		register,
		unregister,
		setCurrent,
		setEnabled
	};
};
