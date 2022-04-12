<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ error, status }) {
		return {
			props: {
				title: error.message,
				status
			}
		};
	}
</script>

<script>
	import { pageSettings } from '$lib/stores/page';

	export let title;
	export let status;

	const text = status === 404 ? 'Page not found' : title;

	$pageSettings.textColor = 'Dark';
	$pageSettings.backgroundColor = '#fff';
</script>

<svelte:head>
	<title>{text}</title>
</svelte:head>

<div class="container">
	<img src="/error.png" alt="rest in peace, website" />

	<div class="message">
		<h1>{status}</h1>
		<p>{text}</p>

		<a href="/">home</a>
	</div>
</div>

<style lang="scss">
	.container {
		font-size: 1.5rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 100vh;

		@media screen and (max-width: 500px) {
			flex-direction: column;
			align-items: center;
		}
	}

	img {
		width: 12rem;
		max-width: 80%;
	}

	h1 {
		font-size: 70px;
		letter-spacing: -0.07em;
		text-align: center;
		margin: 0;
	}

	p {
		opacity: 0.6;
		font-weight: 500;
		font-size: 22px;
		margin: 0;
	}
	a {
		position: relative;
		margin-top: 2rem;
		text-decoration: none;
		font-size: 14px;
		opacity: 0.6;
		padding: 0.25rem 1rem;
		color: inherit;
		transition: opacity 200ms, color 200ms;

		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 0%;
			height: 100%;
			border-radius: 3px;
			background: #000;
			opacity: 0;
			z-index: -1;

			transition: opacity 200ms, width 200ms;
		}

		&:hover {
			color: #fff;
			opacity: 1;

			&::after {
				width: 100%;
				opacity: 1;
			}
		}
	}

	.message {
		margin-left: 2rem;
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		@media screen and (max-width: 500px) {
			align-items: center;
			margin-left: 0;
		}
	}
</style>
