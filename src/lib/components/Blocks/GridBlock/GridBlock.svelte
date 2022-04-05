<script lang="ts">
	import type { GridBlock } from '$lib/types/contentful';

	export let block: GridBlock;
	const { backgroundColor } = block.fields;
</script>

<h1>Grid block {backgroundColor}</h1>

<style lang="scss">
</style>
