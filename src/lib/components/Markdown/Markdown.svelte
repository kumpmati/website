<script lang="ts">
	import SvelteMarkdown, { type Renderers } from 'svelte-markdown';

	export let value: string;
	export let renderers: Partial<Renderers> = {};
</script>

<span class="wrapper">
	<SvelteMarkdown source={value} {renderers} />
</span>

<style lang="scss">
	.wrapper {
		color: var(--text-color, inherit);

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

		:global(h3) {
			font-size: 32px;
			margin-top: 0;
			margin-bottom: 1.25rem;
		}

		:global(h4) {
			font-size: 24px;
			margin-top: 0;
			margin-bottom: 1.25rem;
		}

		:global(p) {
			font-size: 22px;
			opacity: 0.6;
			color: var(--text-color-subtle, inherit);
		}

		:global(a) {
			font-weight: 900;
			color: inherit;
			text-decoration-thickness: 1px;
		}

		:global(img) {
			width: 100%;
			border: 1px solid rgba(0, 0, 0, 0.1);
			border-radius: 3px;
		}

		:global(code) {
			background-color: rgba(128, 128, 128, 0.1);
			border-radius: 3px;
			padding: 0 0.25rem;
		}

		:global(pre) {
			font-size: 22px;
			overflow-x: auto;
			font-size: 18px;
			background: rgba(128, 128, 128, 0.1);
			padding: 1rem;
			border-radius: 3px;
		}

		:global(pre) > :global(code) {
			background: none;
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
