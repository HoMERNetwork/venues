<script lang="ts">
	import { selectedFeature } from '$lib/stores';
	import Venue from '$lib/components/Venue.svelte';
	import VenuePreviewList from '$lib/components/VenuePreviewList.svelte';
</script>

{#if $selectedFeature}
	<div class="h-full overflow-auto">
		<Venue venue={$selectedFeature} />
	</div>
{:else}
	<div class="card bg-base-100 h-full">
		<div class="card-body flex h-full flex-col p-4 pb-0">
			<div class="flex-none px-4">
				<h2 class="card-title text-2xl font-semibold">Venues</h2>
				<p>Click on a venue to view more details.</p>
			</div>
			<div class="mt-4 flex-grow overflow-y-auto">
				<VenuePreviewList />
			</div>
		</div>
	</div>
{/if}
