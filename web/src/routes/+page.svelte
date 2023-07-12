<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	const INITIAL_DELAY = 250;

	let mounted = false;

	onMount(() => (mounted = true));
</script>

<svelte:head>
	<title>Matias Kumpulainen</title>
</svelte:head>

{#if mounted}
	<main>
		<h1>
			<span transition:fly={{ duration: 1000, y: 20, delay: INITIAL_DELAY }}> MATIAS </span>
			<span transition:fly={{ duration: 1000, y: 30, delay: 100 + INITIAL_DELAY }}>
				KUMPULAINEN
			</span>
		</h1>

		<p transition:fly={{ duration: 500, delay: 600 + INITIAL_DELAY }}>
			Hello 👋 I’m a student at UTU,<br /> co-founder of Kvanttori Oy and a web dev nerd.
		</p>

		<div class="links" transition:fly={{ duration: 500, delay: 1000 + INITIAL_DELAY }}>
			<a href="https://github.com/kumpmati" target="_blank" referrerpolicy="no-referrer">
				GitHub
			</a>
			<a
				href="https://www.linkedin.com/in/matias-kumpulainen-27b4421b9/"
				target="_blank"
				referrerpolicy="no-referrer"
			>
				LinkedIn
			</a>
			<a
				href="https://open.spotify.com/artist/3aIPX8NQSXpA88COAP6gTJ?si=c2narefAT7KPz3ZDbMYDFw"
				target="_blank"
				referrerpolicy="no-referrer"
			>
				Spotify
			</a>
		</div>
	</main>
{/if}

<style lang="scss">
	main {
		max-width: calc(100% - 2rem);
		display: flex;
		flex-direction: column;
	}

	span {
		display: block;
	}

	h1 {
		font-size: 4rem;
		line-height: 96.9%;
		letter-spacing: -0.195rem;
		color: var(--orange);
		margin: 0;

		@media screen and (max-width: 450px) {
			font-size: 3rem;
		}
	}

	p {
		max-width: 40ch;
	}

	.links {
		display: flex;
		gap: 1.5rem;

		a {
			color: var(--subtle);
			text-decoration: none;

			&:hover {
				color: var(--white);
			}
		}
	}
</style>
