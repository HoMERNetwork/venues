<script lang="ts">
	import {
		selectedFeature,
		filteredVisibleFeatures,
		countFeatures,
		stringFilter,
		isLoading
	} from '$lib/stores';
	import Venue from '$lib/components/Venue.svelte';
	import VenuePreviewList from '$lib/components/VenuePreviewList.svelte';

	import { X, Search, Info } from '@lucide/svelte';
</script>

{#if $selectedFeature}
	<div class="flex h-full flex-col overflow-auto">
		<div class="card-body flex flex-grow flex-col p-4 pb-0">
			<Venue bind:venue={$selectedFeature} />
		</div>
		<div class="mt-auto">
			<div
				class="alert bg-warning bg-opacity-20 border-warning text-warning-content m-4 mt-0 flex items-start gap-2 rounded-lg border-2 p-3 text-xs sm:text-sm"
			>
				<Info size={18} class="mt-0.5 flex-shrink-0" />
				<div>
					<strong class=" mb-1 block">Info</strong>
					<p>
						The venue locations on this map are derived from comprehensive researcher datasets.
						While efforts are made to accurately present this information, minor inconsistencies may
						occasionally arise during the data conversion process.
						<br /><br />
						For the most precise and authoritative information, consult the original source data or citations
						that are provided.
					</p>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="card bg-base-100 h-full">
		<div class="card-body flex h-full flex-col p-4 pb-0">
			<div class="flex-none px-4">
				<h2 class="card-title text-2xl font-semibold">Venues</h2>
				{#if $isLoading}
					<p class="flex items-center">
						<span class="loading loading-spinner loading-xs mr-2"></span>
						Loading venues...
					</p>
				{:else}
					<p>
						Showing {new Intl.NumberFormat().format(Object.keys($filteredVisibleFeatures).length)} out
						of {new Intl.NumberFormat().format($countFeatures)}
						venues
					</p>
				{/if}
			</div>

			<!-- Search bar -->
			<div class="px-4 pt-2">
				<div class="relative">
					<div class="input w-full">
						<Search size={16} class="text-gray-400" />

						<input type="text" bind:value={$stringFilter} placeholder="Search venues..." />
						{#if $stringFilter}
							<button
								class="absolute inset-y-0 right-0 flex items-center pr-3"
								onclick={() => ($stringFilter = '')}
								aria-label="Clear search"
							>
								<X size={16} class="text-gray-400" />
							</button>
						{/if}
					</div>
				</div>
			</div>

			<div class="divider mb-0 px-4"></div>
			<div class="flex-grow overflow-y-auto">
				<VenuePreviewList />
			</div>
		</div>
	</div>
{/if}
