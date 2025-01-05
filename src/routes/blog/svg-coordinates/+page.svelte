<script lang="ts">
	import BlogPost from '$lib/BlogPost.svelte';
	import Code from '$lib/Code.svelte';
	import CodeSpan from '$lib/CodeSpan.svelte';
	import ExternalLink from '$lib/ExternalLink.svelte';
	import Paragraph from '$lib/Paragraph.svelte';
	import Heading from '$lib/Heading.svelte';
	import { onMount } from 'svelte';
	import { Spring } from 'svelte/motion';
	import svgCode from './func.js?raw';

	let svg: SVGSVGElement;

	let pos = new Spring({ x: 0, y: 0 });

	onMount(() => {
		svg.addEventListener('click', (e) => {
			const point = new DOMPoint(e.clientX, e.clientY);

			const coordintes = point.matrixTransform(svg.getScreenCTM()?.inverse());
			pos.set(coordintes);
		});
	});
</script>

<BlogPost title="Getting the SVG coordinates of a click event">
	<Paragraph>
		If you need to translate mouse coordinates to svg coordinates, instead of using the deprecated
		<ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/SVGPoint">
			<CodeSpan>createSvgPoint</CodeSpan>
		</ExternalLink>
		function, you can use a
		<ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/DOMPoint">
			<CodeSpan>DomPoint</CodeSpan>
		</ExternalLink>. It's not the top-most answer in StackOverflow when searching for this issue, so
		it might evade your eyes the first time.
	</Paragraph>

	<Paragraph>Here's the code:</Paragraph>
	<Code lang="js" text={svgCode} />

	<Paragraph>
		Using the svg element's current matrix transform (along with <CodeSpan
			>e.clientX, e.clientY</CodeSpan
		>) ensures that no matter the viewbox, or how you scroll, move, scale or rotate, the coordinates
		match perfectly to the click position.
	</Paragraph>

	<Heading depth={2}>Example</Heading>

	<Paragraph>
		Here's an example with a scaled, translated and rotated SVG element (and some animations using
		Svelte).

		<br />
		<br />
		Try clicking inside the rectangle.
	</Paragraph>

	<p>x: {Math.round(pos.target.x)}, y: {Math.round(pos.target.y)} (viewbox="0 0 200 100")</p>

	<svg
		bind:this={svg}
		viewBox="0 0 200 100"
		width={200}
		height={100}
		class="mt-1 translate-x-16 rotate-6 scale-125 border border-slate-400"
	>
		<circle r="10" fill="red" cx={pos.current.x} cy={pos.current.y}></circle>
	</svg>
</BlogPost>
