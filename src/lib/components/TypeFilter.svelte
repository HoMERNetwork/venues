<script lang="ts">
	import { visibleFeatures, filteredVisibleFeatures, venueTypes } from '$lib/stores';
	import MultiSelect from 'svelte-multiselect';
	import { type Option } from 'svelte-multiselect';
	import { type Venue } from '$lib/types';

	let { selectedVenueTypes = $bindable(), ...props } = $props();

	$effect(() => {
		$filteredVisibleFeatures = $visibleFeatures.filter((feature) => {
			const venue: Venue = JSON.parse(feature.properties.venue);
			return (
				selectedVenueTypes.length === 0 ||
				selectedVenueTypes.some((option: { label: string; value: string }) =>
					venue.additionalType.some((type) => type['@id'] === option.value)
				)
			);
		});
	});
</script>

<div class="card bg-base-100 z-100 m-1 w-full max-w-sm shadow sm:m-2">
	<div class="card-body p-2 sm:p-4 md:p-6">
		<h2 class="card-title text-xs sm:text-sm md:text-lg">Filter</h2>
		<p class="text-xs sm:text-sm md:text-base">Filter by venue type</p>

		<MultiSelect bind:selected={selectedVenueTypes} options={$venueTypes as Option[]} />
	</div>
</div>
