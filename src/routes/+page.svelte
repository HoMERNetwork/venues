<script lang="ts">
	import Map from '$lib/components/Map.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { loadData } from '$lib/stores';

	let data = loadData();
</script>

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
