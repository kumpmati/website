<script lang="ts">
	export let key: any;
</script>

{#key key}
	<span>
		<slot />
	</span>
{/key}
