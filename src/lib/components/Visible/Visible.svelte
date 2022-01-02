<script lang="ts">
	import { scrollPosition } from '$lib/stores/page';

	import { createEventDispatcher, onMount } from 'svelte';

	export let style: string = '';
	export let threshold: number = 0;
	export let visible: boolean = false;
	export let once: boolean = false;

	let changed: boolean = false;
	let element: HTMLSpanElement;
	let prevValue: boolean = false;
	const dispatch = createEventDispatcher();

	const update = () => {
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
	};

	scrollPosition.subscribe(update);
	onMount(update);
</script>

<span bind:this={element} {style}>
	<slot />
</span>
