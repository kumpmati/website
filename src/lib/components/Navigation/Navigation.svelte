<script lang="ts">
	import type { Navigation } from '$lib/types/contentful';
	import { navigation } from '$lib/stores/navigation';
	import Mobile from './Mobile.svelte';
	import Desktop from './Desktop.svelte';
	import { onMount } from 'svelte';

	const nav: Navigation | null = $navigation;

	$: isMobile = false;

	onMount(() => {
		const update = () => {
			isMobile = window.matchMedia('(max-width: 950px)').matches;
		};

		// call function on mount
		update();

		window.addEventListener('resize', update);
		return () => window.removeEventListener('resize', update);
	});
</script>

<svelte:component this={isMobile ? Mobile : Desktop} {nav} />
