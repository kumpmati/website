import type { Navigation } from '$lib/types/contentful';
import { writable } from 'svelte/store';

export const navigation = writable<Navigation | null>(null);
