<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.scss';
	import { addCircle, addRandomCircle, shapes, size } from '../lib/stores';
	import { random } from '$lib/color';
	import Background from '$lib/Background.svelte';
	import { browser } from '$app/environment';

	let w: number, h: number;
	let tabHidden = false;

	$: if (browser && w && h) {
		size.set({ w, h });
	}

	onMount(() => {
		const loop = () => {
			if (!tabHidden) {
				addRandomCircle(w, h);
			}

			setTimeout(loop, Math.random() * 15000);
		};

		document.addEventListener('visibilitychange', () => {
			tabHidden = document.hidden;

			// clear shapes when re-focusing to prevent lag
			if (!tabHidden) $shapes = [];
		});

		setTimeout(loop, 2000);
	});
</script>

<svelte:window
	bind:innerWidth={w}
	bind:innerHeight={h}
	on:click={(e) =>
		addCircle({
			x: e.clientX,
			y: e.clientY,
			r: Math.random() * 150 + 30,
			xVel: (Math.random() - 0.5) * 0.5,
			yVel: (Math.random() - 0.5) * 0.5,
			color: random(),
			rnd1: Math.random(),
			rnd2: Math.random(),
			rnd3: Math.random()
		})}
/>

<Background zIndex={1} />

<slot />
