<script lang="ts">
	import BlogListItem from './BlogListItem.svelte';
</script>

<svelte:head>
	<title>blog</title>
</svelte:head>

<h1 class="text-3xl font-bold">posts</h1>

<ul class="mt-8 flex flex-col gap-8">
	<li>
		<BlogListItem
			type="snippet"
			href="/blog/svg-coordinates"
			title="Getting the SVG coordinates of a click event"
			excerpt="It's straight forward, but search results usually show an old method"
		/>
	</li>
	<li>
		<BlogListItem
			type="snippet"
			href="/blog/array-fill-snippet"
			title="A utility function to fills gaps in arrays"
			excerpt="Often helpful when dealing with analytics that have gaps in them"
		/>
	</li>
</ul>
