<script lang="ts">
	export let src: string;
	export let width: number = 100;
	export let height: number = 100;
	export let alt: string = '';
	export let loading: 'lazy' | 'eager' = 'lazy';
	export let style: string = '';
	export let className: string = '';

	const breakpoints = [500, 900, 1300, 1700, 1920, 2100];

	const webPSrcSet = breakpoints.map((w) => `${src}?w=${w}&fm=webp ${w}w`).join(', ');
	const jpegSrcSet = breakpoints.map((w) => `${src}?w=${w}&fm=jpg ${w}w`).join(', ');

	const sizes = breakpoints
		.map((w, i) => `(max-width: ${w}px) ${breakpoints?.[i] ?? w}px`)
		.join(', ');
</script>

<picture>
	<source type="image/webp" srcset={webPSrcSet} {sizes} />
	<source type="image/jpeg" srcset={jpegSrcSet} {sizes} />

	<img class={className} decoding="async" {loading} {src} {width} {height} {alt} {style} />
</picture>
