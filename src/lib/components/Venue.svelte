<script lang="ts">
	import type { Venue } from '$lib/types';
	import VenueMapPreview from './VenueMapPreview.svelte';

	export let venue: Venue;
</script>

<div class="card bg-base-100 w-full">
	<div class="card-body">
		<h2 class="card-title">{venue.name}</h2>
		<div class="card-actions">
			{#each venue.additionalType as concept (concept['@id'])}
				<a href={concept['@id']} class="badge badge-primary">{concept.name}</a>
			{/each}
		</div>
		<p>{venue.description}</p>
		{#if venue.location && venue.location.location}
			<div class="mt-4">
				<h3 class="text-lg font-semibold">Location</h3>
				<div class="h-48 w-full">
					<VenueMapPreview geo={venue.location.location.geo} />
				</div>
				<p>
					{venue.location.location.address.streetAddress}, {venue.location.location.address
						.addressLocality}, {venue.location.location.address.addressRegion}
					{venue.location.location.address.postalCode}
				</p>
				<p>
					Coordinates: {venue.location.location.geo.latitude}, {venue.location.location.geo
						.longitude}
				</p>
				<p>Established: {venue.location.startDate}</p>
			</div>
		{/if}
		<div class="card-actions"></div>
		<div class="mt-4">
			<h3 class="text-lg font-semibold">Publication(s) / Dataset(s)</h3>
			{#each venue.citation as citation (citation.url)}
				<ul class="list">
					<li class="list-row">
						<a href={citation.url} class="link link-primary">{citation.name}</a>
					</li>
				</ul>
			{/each}
		</div>
		<div class="mt-4">
			<h3 class="text-lg font-semibold">Exernal identifiers</h3>

			<ul class="list">
				{#each venue.sameAs as sameAsItem (sameAsItem)}
					<li class="list-row"><a href={sameAsItem} class="link link-primary">{sameAsItem}</a></li>
				{/each}
			</ul>
		</div>
	</div>
</div>
