<script lang="ts">
	import { pageSettings } from '$lib/stores/page';
	import type { BlogPost } from '$lib/types/blog';

	export let posts: BlogPost[];

	$pageSettings.backgroundColor = '#fff';
	$pageSettings.textColor = 'Dark';
</script>

<div class="container">
	<h1>Blog</h1>

	<ul>
		{#each posts as post (post.sys.id)}
			<li>
				<a href="/blog/{post.fields.slug}">{post.fields.title}</a>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.container {
		margin: 0 auto;
		margin-top: 10rem;
		max-width: 45rem;
		display: flex;
		flex-direction: column;
	}

	h1 {
		font-size: 64px;
		margin: 0;

		@media screen and (max-width: 900px) {
			font-size: 50px;
		}
	}
</style>
