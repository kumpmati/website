<script>
	import Projects from '$lib/Projects.svelte';
	import Nav from '../lib/Nav.svelte';
</script>

<svelte:head>
	<title>Matias Kumpulainen</title>
	<meta name="description" content="I like doing stuff." />

	<meta property="og:type" content="website" />
	<meta property="og:title" content="Matias Kumpulainen" />
	<meta property="og:description" content="I like doing stuff." />
</svelte:head>

<div class="mt-16 grid h-svh min-h-[600px] w-full sm:mt-0 sm:place-content-center">
	<main class="flex flex-col items-center gap-4 p-4">
		<div class="relative [&>#cheese-pointer]:hover:visible [&>#cheese-pointer]:hover:opacity-100">
			<img
				src="/cheese.webp"
				alt="a 3d render of cheese"
				class="w-20 sm:w-28"
				width={228}
				height={205}
			/>
			<img
				id="cheese-pointer"
				src="/pointer.svg"
				alt=""
				class="invisible absolute right-1 top-1 -translate-y-full translate-x-full opacity-0 transition-all"
			/>
		</div>

		<h1 class="text-center text-3xl sm:text-5xl">Matias Kumpulainen</h1>

		<Nav />
		<Projects />
	</main>
</div>
