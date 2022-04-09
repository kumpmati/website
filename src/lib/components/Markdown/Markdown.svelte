<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';

	export let value: string;
</script>

<span class="wrapper">
	<SvelteMarkdown source={value} />
</span>

<style lang="scss">
	.wrapper {
		color: inherit;

		:global(h1) {
			font-size: 96px;
			margin-top: 0;
			margin-bottom: 1rem;
		}

		:global(h2) {
			font-size: 64px;
			margin-top: 0;
			margin-bottom: 1.25rem;
		}

		:global(p) {
			font-size: 22px;
			margin: 0;
			opacity: 0.5;
		}

		// tablet
		@media screen and (max-width: 900px) {
			:global(h1) {
				font-size: 80px;
			}

			:global(h2) {
				font-size: 40px;
			}

			:global(p) {
				font-size: 18px;
			}
		}

		// mobile
		@media screen and (max-width: 500px) {
			:global(h1) {
				font-size: 48px;
			}

			:global(h2) {
				font-size: 36px;
			}
		}
	}
</style>
