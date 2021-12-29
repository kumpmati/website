<script lang="ts">
	export let offset: string = '0px';
	export let dividerOffset: string = '0px';
	export let fullHeight: boolean = true;
	export let divider: boolean = true;
	export let style: string = '';
	export let element = null;
</script>

<section bind:this={element} class="container" class:fullHeight class:divider {style}>
	<div class="left" style={`padding-top: ${offset};`}>
		<slot name="left" />
	</div>

	<div class="divider" style={`top: ${dividerOffset};`} />

	<div class="right" style={`padding-top: ${offset};`}>
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
		overflow: hidden;

		z-index: 1;

		padding-bottom: 10rem;

		&.fullHeight {
			min-height: 100vh;
		}

		&.divider {
			.divider {
				grid-area: divider;
				display: block;
				width: 2px;
				height: 200%;
				background: #ff7070;
				mix-blend-mode: difference;
				top: -10rem;
				position: absolute;
				z-index: 1000;
			}
		}
	}

	.left {
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
		}

		.left,
		.right {
			width: 100%;
			padding: 0 4rem;
			margin: 0 auto;
			padding-top: 0 !important;
		}

		.divider {
			background: transparent !important;
		}
	}

	@media screen and (max-width: 500px) {
		.left,
		.right {
			padding: 0 1rem;
		}
	}
</style>
