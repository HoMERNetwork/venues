<script lang="ts">
	import Map from '$lib/components/Map.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { loadData } from '$lib/utils';

	let data = loadData();
</script>

<svelte:head>
	<title>HoMER Venue Research Index</title>
	<meta name="description" content="Overview of venues and related publications of HoMERites" />
	<meta name="robots" content="index, follow" />
	<meta name="author" content="HoMER Network" />
	<meta name="keywords" content="HoMER, venue, index, publications" />

	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "WebSite",
			"url": "https://homernetwork.github.io/venues/",
			"name": "HoMER Venue Research Index",
			"description": "Overview of venues and related publications of HoMERites",
			"inLanguage": "en",
			"publisher": {
				"@type": "Organization",
				"name": "HoMER Network",
				"url": "https://homernetwork.org/"
			}
		}
	</script>
</svelte:head>

<div
	class="grid h-full w-full grid-rows-2 items-stretch gap-0 overflow-hidden lg:grid-cols-4 lg:grid-rows-1"
>
	<main class="h-full w-full lg:col-span-3">
		<Map {data} />
	</main>

	<aside class="h-full w-full overflow-y-auto lg:col-span-1">
		<Sidebar />
	</aside>
</div>
