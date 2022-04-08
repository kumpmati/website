<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ error }) {
		return {
			props: {
				title: error.message
			}
		};
	}
</script>

<script>
	import { pageSettings } from '$lib/stores/page';

	export let title;

	$pageSettings.textColor = 'Dark';
	$pageSettings.backgroundColor = '#fff';
</script>

<div class="outer">
	<h1>{title}</h1>
</div>

<style lang="scss">
	.outer {
		font-size: 1.5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100vh;
	}

	h1 {
		text-align: center;
	}

	@media screen and (max-width: 950px) {
		h1 {
			margin-left: 2rem;
		}
	}

	@media screen and (max-width: 500px) {
		h1 {
			margin-left: 1.25rem;
		}
	}
</style>
