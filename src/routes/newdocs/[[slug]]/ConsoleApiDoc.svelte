<script lang="ts">
	import OpenApi from '$lib/marketing/Docs/OpenApi/OpenApi.svelte';
</script>

<h1>Console API</h1>

<p>
	The Console API lets you manage your newsletter programmatically - subscribers, lists, issues,
	domains, and more.
</p>

<OpenApi path="/openapi/console.json" baseUrl="https://post.hyvor.com" />
