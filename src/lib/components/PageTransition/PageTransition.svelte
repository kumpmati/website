<script lang="ts">
	import { scrollPosition } from '$lib/stores/page';
	import { pageTransition } from '$lib/utils/transition';

	export let key: any;
	export let backgroundColor: string;
</script>

{#key key}
	<span
		in:pageTransition={{
			duration: 2000,
			delay: 0,
			opacity: 1,
			dir: 'open'
		}}
		out:pageTransition={{
			duration: 500,
			delay: 0,
			opacity: 1,
			yOffset: $scrollPosition
		}}
		style={`position: absolute; width: 100%; background-color: ${backgroundColor ?? '#fff'};`}
	>
		<slot />
	</span>
{/key}
