import { writable } from 'svelte/store';

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
