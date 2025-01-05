<script>
	import { page } from '$app/state';
</script>

<nav class="flex font-normal">
	<a href="https://pieni.link/spotify" target="_blank" rel="noopener" class="hover:underline">
		spotify
	</a>
	.
	<a href="https://pieni.link/github" target="_blank" rel="noopener" class="hover:underline">
		github
	</a>
	.
	<a href="https://pieni.link/linkedin" target="_blank" rel="noopener" class="hover:underline">
		linkedin
	</a>
	.
	<a
		href="/blog"
		class={{ 'hover:underline': true, underline: page.url.pathname.startsWith('/blog') }}
	>
		blog
	</a>
</nav>
