<script lang="ts">
	export let src: string;
	export let width = 100;
	export let height = 100;
	export let alt = '';
	export let loading: 'lazy' | 'eager' = 'lazy';
	export let decoding: 'sync' | 'async' | 'auto' = 'auto';
	export let style = '';
	export let className = '';

	const breakpoints = [500, 900, 1300, 1700, 1920, 2100];

	const webPSrcSet = breakpoints.map((w) => `${src}?w=${w}&fm=webp&q=100 ${w}w`).join(', ');
	const jpegSrcSet = breakpoints.map((w) => `${src}?w=${w}&fm=jpg&q=100 ${w}w`).join(', ');

	const sizes = breakpoints
		.map((w, i) => `(max-width: ${w}px) ${breakpoints?.[i] ?? w}px`)
		.join(', ');
</script>

<picture>
	<source type="image/webp" srcset={webPSrcSet} {sizes} />
	<source type="image/jpeg" srcset={jpegSrcSet} {sizes} />

	<img class={className} {decoding} {loading} {src} {width} {height} {alt} {style} />
</picture>
