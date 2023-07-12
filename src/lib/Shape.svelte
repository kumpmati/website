<script lang="ts">
	import { removeCircle, type Circle, size } from './stores';
	import { spring } from 'svelte/motion';
	import { onMount } from 'svelte';

	export let data: Circle;

	let x = 0,
		y = 0;

	const r = spring(0, {
		stiffness: 0.001 * (data.r / 100),
		damping: 0.02 * (data.r / 150),
		precision: 0.0001
	});

	onMount(() => {
		$r = data.r;

		const move = () => {
			x += data.xVel ?? 0;
			y += data.yVel ?? 0;

			const xPos = data.x + x;
			const yPos = data.y + y;

			if (xPos + data.r * 3 < 0 || xPos - data.r * 3 > $size.w) {
				removeCircle(data.id);
			}

			if (yPos + data.r * 3 < 0 || yPos - data.r * 3 > $size.h) {
				removeCircle(data.id);
			}

			requestAnimationFrame(move);
		};

		if (data.xVel || data.yVel) move();
	});
</script>

<circle
	r={$r}
	fill={data.rnd1 < 0.5 ? 'var(--bg)' : data.color}
	stroke-width={$r / 2}
	stroke={data.color}
	stroke-dasharray={data.rnd2 > 0.5 ? '700 250' : '100 200'}
	stroke-linecap={data.rnd3 > 0.5 ? 'butt' : 'round'}
	cx={data.x + x}
	cy={data.y + y}
/>
