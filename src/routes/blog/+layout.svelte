<script lang="ts">
	import Nav from '../../lib/Nav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>blog</title>
</svelte:head>

<header class="z-10 flex w-fit items-center justify-between p-4 sm:sticky sm:top-0 sm:p-6">
	<a href="/" class="flex items-center gap-2 font-heading text-base font-bold">
		<img src="/cheese.webp" alt="a 3d render of cheese" class="size-6" /> mk
	</a>
</header>

<main class="mx-auto flex w-full max-w-2xl flex-col p-4 sm:p-6">
	{@render children()}
</main>
