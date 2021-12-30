<script lang="ts">
	import type { GridImage } from '$lib/types/contentful';

	export let item: GridImage;
	const { image } = item.fields;

	const imageUrl = image.fields.file.url;
</script>

<div class="container">
	<img class="background" src={imageUrl} alt={image.fields.title} />
</div>

<style lang="scss">
	.container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		object-fit: cover;
		pointer-events: none;

		will-change: transform;
	}
</style>
