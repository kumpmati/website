<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ error, status }) {
		return {
			props: {
				title: `${status}: ${error.message}`
			}
		};
	}
</script>

<script>
	export let title;
</script>

<div>
	<h1>{title}</h1>
</div>

<style lang="scss">
	div {
		display: grid;
		place-content: center;
		height: 100vh;
		background-color: #fff;
	}

	h1 {
		margin: 0;
	}
</style>
