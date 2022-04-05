<script lang="ts">
	import type { Homepage } from '$lib/types/contentful';

	export let page: Homepage;
</script>

<p>{page.fields.entryTitle}</p>

<a href="/about-me">about me</a>
