<script lang="ts">
	export let dividerOffset: string = '0px';
	export let fullHeight: boolean = true;
	export let divider: boolean = true;
	export let style: string = '';
	export let noContent: boolean = false;
</script>

<section class="container" class:fullHeight class:divider class:noContent {style}>
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
		overflow: hidden;

		display: grid;
		grid-template-areas: 'left divider right';
		grid-template-columns: 1fr 2px 3fr;
		grid-template-rows: 1fr;
		gap: 1rem;

		z-index: 1;

		&:not(.fullHeight) {
			min-height: 35rem;
			.left,
			.right {
				margin: 10em 0;
			}
		}

		&.fullHeight {
			min-height: 100vh;

			.left,
			.right {
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
		}

		&.noContent {
			min-height: 0;

			.left,
			.right {
				display: none;
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
				top: 0;
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
			grid-template-rows: auto 1fr;

			&.fullHeight {
				.left {
					margin-top: 10rem;
					margin-bottom: 0;
				}

				.right {
					margin-top: 0;
					margin-bottom: 0;
					justify-content: flex-start;
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
			padding: 0 2rem;
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
