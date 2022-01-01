<script lang="ts">
	export let dividerOffset: string = '0px';
	export let fullHeight: boolean = true;
	export let divider: boolean = true;
	export let style: string = '';
</script>

<section class="container" class:fullHeight class:divider {style}>
	<div class="left">
		<slot name="left" />
	</div>

	<div class="dividerLine" style={`top: ${dividerOffset};`} />

	<div class="right">
		<slot name="right" />
	</div>

	<slot name="background" />
</section>

<style lang="scss">
	.container {
		position: relative;

		display: grid;
		grid-template-areas: 'left divider right';
		grid-template-columns: 1fr 2px 3fr;
		gap: 1rem;

		z-index: 1;

		&.fullHeight {
			min-height: 100vh;

			.left,
			.right {
				margin-top: 40vh;
			}
		}
		&:not(.fullHeight) {
			.left,
			.right {
				margin: 10em 0;
			}
		}

		&.divider {
			.dividerLine {
				grid-area: divider;
				display: block;
				width: 2px;
				height: calc(100% + 4rem);
				background: #ff7070;
				mix-blend-mode: difference;
				position: absolute;
			}
		}
	}

	.left {
		padding-left: 2rem;
		grid-area: left;
	}

	.right {
		grid-area: right;
	}

	@media screen and (max-width: 950px) {
		.container {
			grid-template-areas:
				'left'
				'right';
			grid-template-columns: 1fr;

			&.fullHeight {
				.left {
					margin-top: 10em;
					margin-bottom: 0;
				}

				.right {
					margin-top: 0;
					margin-bottom: 12em;
				}
			}
			&:not(.fullHeight) {
				.left {
					margin-top: 5em;
					margin-bottom: 0;
				}

				.right {
					margin-top: 0;
					margin-bottom: 10em;
				}
			}
		}

		.left,
		.right {
			width: 100%;
			padding: 0 4rem;
			transform: none !important;
		}

		.dividerLine {
			display: none !important;
		}
	}

	@media screen and (max-width: 500px) {
		.left,
		.right {
			padding: 0 1rem;
		}
	}
</style>
