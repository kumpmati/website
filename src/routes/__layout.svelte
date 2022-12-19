<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, url }) => {
		const nav = await getNavigation().catch(() => null);
		if (!nav) {
			return {
				status: 404,
				error: new Error(`Could not load globals`)
			};
		}

		return {
			props: {
				key: url.pathname,
				nav: nav
			}
		};
	};
</script>

<script lang="ts">
	import '../globals.scss'; // global css file
	import Navigation from '$lib/components/Navigation/Navigation.svelte';
	import type { Navigation as NavigationT } from '$lib/types/page';
	import { navigation } from '$lib/stores/navigation';
	import PageTransition from '$lib/components/PageTransition/PageTransition.svelte';
	import { pageSettings, scrollPosition } from '$lib/stores/page';
	import { browser } from '$app/env';
	import { page } from '$app/stores';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import { getNavigation } from '$lib/services/contentful';
	import { base } from '$app/paths';

	export let nav: NavigationT;
	export let key: string;

	$navigation = nav;
	$scrollPosition = browser ? window.scrollY : 0;

	// sets the body and html element background color to match the page settings
	$: {
		if (browser) {
			document.querySelector('html').style.backgroundColor = $pageSettings.backgroundColor;
		}
	}
</script>

<svelte:window
	on:resize={() => ($scrollPosition = window.scrollY)}
	on:scroll={() => ($scrollPosition = window.scrollY)}
/>

{#if $page.url.pathname !== base}
	<Navigation />
{/if}

<PageTransition {key}>
	<main>
		<!-- Page content -->
		<slot />
	</main>

	{#if $page.url.pathname !== base}
		<Footer />
	{/if}
</PageTransition>

<style lang="scss">
	main {
		margin: 0 40px;
		min-height: calc(100vh - 10rem);

		@media screen and (max-width: 400px) {
			margin: 0 16px;
		}
	}
</style>
