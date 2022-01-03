<script lang="ts">
	export let src: string;
	export let width: number = 100;
	export let height: number = 100;
	export let alt: string = '';
	export let loading: 'lazy' | 'eager' = 'lazy';
	export let style: string = '';
	export let className: string = '';

	const breakpoints = [500, 900, 1300, 1700, 1920, 2040];
</script>

<picture>
	<source
		type="image/jpeg"
		srcset={breakpoints.map((w) => `${src}?w=${w}&fm=jpg&q=100 ${w}w`).join(', ')}
		sizes={breakpoints
			.map((w, i) => `(max-width: ${w}px) ${breakpoints?.[i + 1] ?? w}px`)
			.join(', ')}
	/>
	<source
		type="image/png"
		srcset={breakpoints.map((w) => `${src}?w=${w}&fm=png ${w}w`).join(', ')}
		sizes={breakpoints
			.map((w, i) => `(max-width: ${w}px) ${breakpoints?.[i + 1] ?? w}px`)
			.join(', ')}
	/>
	<source
		type="image/webp"
		srcset={breakpoints.map((w) => `${src}?w=${w}&fm=webp ${w}w`).join(', ')}
		sizes={breakpoints
			.map((w, i) => `(max-width: ${w}px) ${breakpoints?.[i + 1] ?? w}px`)
			.join(', ')}
	/>

	<img class={className} decoding="async" {loading} {src} {width} {height} {alt} {style} />
</picture>
