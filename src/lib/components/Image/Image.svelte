<script lang="ts">
	export let src: string;
	export let width: number = 100;
	export let height: number = 100;
	export let alt: string = '';
	export let loading: 'lazy' | 'eager' = 'eager';
	export let style: string = '';

	let className;
	export { className as class };

	const breakpoints = [500, 900, 1300, 1700];
</script>

<picture>
	<source
		type="image/jpeg"
		srcset={breakpoints.map((w) => `${src}?w=${w}&fm=jpeg ${w}w`).join(',')}
	/>
	<source
		type="image/webp"
		srcset={breakpoints.map((w) => `${src}?w=${w}&fm=webp ${w}w`).join(',')}
	/>

	<img class={className} {loading} decoding="async" {src} {width} {height} {alt} {style} />
</picture>
