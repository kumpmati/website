import { writable } from 'svelte/store';
import { random } from './color';

export type Circle = {
	id: string;
	x: number;
	y: number;
	r: number;
	xVel?: number;
	yVel?: number;
	color: string;
	rnd1: number;
	rnd2: number;
	rnd3: number;
};

export const shapes = writable<Circle[]>([]);

export const addCircle = (c: Omit<Circle, 'id'>) => {
	shapes.update((prev) => {
		prev.push({ ...c, id: Math.round(Math.random() * 10000000).toString() });
		return prev;
	});
};

export const addRandomCircle = (w: number, h: number) => {
	addCircle({
		x: Math.random() * w,
		y: Math.random() * h,
		r: 30 + Math.random() * 500,
		xVel: (Math.random() - 0.5) * 0.2,
		yVel: (Math.random() - 0.5) * 0.2,
		color: random(),
		rnd1: Math.random(),
		rnd2: Math.random(),
		rnd3: Math.random()
	});
};

export const removeCircle = (id: string) => {
	shapes.update((prev) => {
		const index = prev.findIndex((item) => item.id === id);

		if (index > -1) {
			prev.splice(index, 1);
		}

		return prev;
	});
};

export const size = writable({ w: 1920, h: 1080 });
