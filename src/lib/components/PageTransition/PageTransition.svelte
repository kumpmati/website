<script lang="ts">
	import { mousePosition, scrollPosition } from '$lib/stores/page';
	import { pageTransition } from '$lib/utils/transition';

	export let key: any;
	export let backgroundColor: string;
</script>

{#key key}
	<span
		in:pageTransition={{
			duration: 1500,
			delay: 0,
			opacity: 1,
			x: $mousePosition.x,
			y: $mousePosition.y,
			dir: 'open'
		}}
		out:pageTransition={{
			duration: 200,
			x: $mousePosition.x,
			y: $mousePosition.y,
			delay: 0,
			opacity: 1,
			yOffset: $scrollPosition
		}}
		style={`position: absolute; width: 100%; background-color: ${backgroundColor ?? '#fff'};`}
	>
		<slot />
	</span>
{/key}
