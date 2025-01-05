<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';

	let props: Omit<HTMLImgAttributes, 'class'> = $props();
</script>

<img {...props} class="w-full rounded-md" />
