<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, url }) => {
		const res = await fetch('/api/navigation');

		if (res.ok) {
			return {
				props: {
					key: url.pathname,
					nav: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load globals`)
		};
	};
</script>

<script lang="ts">
	import Navigation from '$lib/components/Navigation/Navigation.svelte';
	import type { Navigation as NavigationT } from '$lib/types/contentful';
	import { navigation } from '$lib/stores/navigation';
	import PageTransition from '$lib/components/PageTransition/PageTransition.svelte';
	import { mousePosition, pageSettings, scrollPosition } from '$lib/stores/page';
	import '../globals.scss'; // global css file

	export let nav: NavigationT;
	export let key: string;

	$navigation = nav;
	$scrollPosition = 0;
</script>

<svelte:window
	on:mousedown={(e) => ($mousePosition = { x: e.clientX, y: e.clientY })}
	on:resize={() => ($scrollPosition = window.scrollY)}
	on:scroll={() => ($scrollPosition = window.scrollY)}
/>

<Navigation />

<PageTransition {key} backgroundColor={$pageSettings.backgroundColor}>
	<!-- Page content -->
	<slot />

	<!-- Footer -->
</PageTransition>
