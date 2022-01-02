import { writable } from 'svelte/store';

export type PageStore = {
	backgroundColor: string;
	navigationVisibleThreshold: number;
};

export const pageSettings = writable<PageStore>({
	backgroundColor: '#fff',
	navigationVisibleThreshold: 0
});

export const mousePosition = writable<{ x: number; y: number }>({ x: 0, y: 0 });

export const scrollPosition = writable<number>(0);
