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

	import { X, Search } from '@lucide/svelte';
</script>

{#if $selectedFeature}
	<div class="h-full overflow-auto">
		<div class="card-body flex h-full flex-col p-4 pb-0">
			<div class="flex flex-none items-center justify-between px-4">
				<div>
					<h2 class="card-title text-2xl font-semibold">Details</h2>
					<p>Showing venue details</p>
				</div>
				<button
					class="btn btn-ghost"
					onclick={($selectedFeature = null)}
					aria-label="Close venue details"
				>
					<X />
				</button>
			</div>
			<div class="divider px-4"></div>
			{#if $selectedFeature}
				<Venue venue={$selectedFeature} />
			{/if}
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
