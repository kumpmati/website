<script lang="ts">
	let { href, children } = $props();
</script>

<a {href} target="_blank" rel="noopener" class="hover:underline">
	{@render children()}
</a>
