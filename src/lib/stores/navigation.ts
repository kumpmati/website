import type { Navigation } from '$lib/types/page';
import { writable } from 'svelte/store';

export const navigation = writable<Navigation | null>(null);
