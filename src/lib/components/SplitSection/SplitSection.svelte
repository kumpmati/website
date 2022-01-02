<script lang="ts">
	export let dividerOffset: string = '0px';
	export let fullHeight: boolean = true;
	export let divider: boolean = true;
	export let style: string = '';
	export let noContent: boolean = false;
</script>

<section class="container" class:fullHeight class:divider class:noContent {style}>
	<div class="dividerLine" style={`top: ${dividerOffset};`} />

	<div class="content">
		<div class="left">
			<slot name="left" />
		</div>

		<div class="right">
			<slot name="right" />
		</div>
		<slot name="background" />
	</div>
</section>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
		overflow: hidden;
		z-index: 1;

		&.divider {
			.dividerLine {
				grid-area: divider;
				display: block;
				width: 2px;
				position: absolute;
				top: 0;
				left: 25%;
				height: calc(100% + 4rem);
				background: #ff7070;
				mix-blend-mode: difference;
				z-index: 10;
			}
		}

		&:not(.fullHeight) {
			min-height: 35rem;
			.left,
			.right {
				margin: 5rem 0;
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

			.left {
				justify-content: flex-start;
			}
		}

		&.noContent {
			.content {
				min-height: 0;
			}
			.left,
			.right {
				display: none;
			}
		}
		.content {
			display: grid;
			grid-template-areas: 'left right';
			grid-template-columns: 1fr 3fr;
			grid-template-rows: 1fr;
			gap: 2rem;

			z-index: 1;
		}

		.left {
			padding-left: 2rem;
			grid-area: left;
		}

		.right {
			grid-area: right;
		}
	}

	@media screen and (max-width: 950px) {
		.container {
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
			&.fullHeight {
				.left {
					margin-top: 0;
					margin-bottom: 0;
				}

				.right {
					margin-top: 0;
					margin-bottom: 0;
					justify-content: flex-start;
				}
			}

			.content {
				grid-template-areas:
					'left'
					'right';
				grid-template-columns: 1fr;
				grid-template-rows: auto 1fr;
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
	}

	@media screen and (max-width: 500px) {
		.content {
			.left,
			.right {
				padding: 0 1rem;
			}
		}
	}
</style>
