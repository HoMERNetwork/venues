<script lang="ts">
	import { filteredVisibleFeatures } from '$lib/stores';
	import VenuePreview from './VenuePreview.svelte';
</script>

<ul class="bg-base-100 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
	{#each $filteredVisibleFeatures as feature (feature.id)}
		<VenuePreview venue={JSON.parse(feature.properties.venue)} id={feature.id ?? ''} />
	{/each}
</ul>
