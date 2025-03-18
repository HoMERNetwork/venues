<script lang="ts">
	import { selectedFeature, filteredVisibleFeatures, countFeatures } from '$lib/stores';
	import Venue from '$lib/components/Venue.svelte';
	import VenuePreviewList from '$lib/components/VenuePreviewList.svelte';
</script>

{#if $selectedFeature}
	<div class="h-full overflow-auto">
		<div class="card-body flex h-full flex-col p-4 pb-0">
			<div class="flex-none px-4">
				<h2 class="card-title text-2xl font-semibold">Details</h2>
				<p>Showing venue details</p>
			</div>
			<Venue venue={$selectedFeature} />
		</div>
	</div>
{:else}
	<div class="card bg-base-100 h-full">
		<div class="card-body flex h-full flex-col p-4 pb-0">
			<div class="flex-none px-4">
				<h2 class="card-title text-2xl font-semibold">Venues</h2>
				<p>
					Showing {Object.keys($filteredVisibleFeatures).length} out of {$countFeatures}
					venues
				</p>
			</div>
			<div class="mt-4 flex-grow overflow-y-auto">
				<VenuePreviewList />
			</div>
		</div>
	</div>
{/if}
