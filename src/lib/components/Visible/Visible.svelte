<script lang="ts">
	import { scrollPosition } from '$lib/stores/scroll';
	import { createEventDispatcher } from 'svelte';

	export let threshold: number = 0;
	export let visible: boolean = false;
	export let once: boolean = false;

	let changed: boolean = false;
	let element: HTMLDivElement;
	let prevValue: boolean = false;
	const dispatch = createEventDispatcher();

	scrollPosition.subscribe(() => {
		if (once && changed) return;

		const rect = element?.getBoundingClientRect();
		if (rect) {
			const newValue = rect.top < threshold;

			// value has changed
			if (prevValue != newValue) {
				dispatch('change', newValue);
				prevValue = newValue;
				visible = newValue;
				changed = true;
			}
		}
	});
</script>

<div bind:this={element}>
	<slot />
</div>
