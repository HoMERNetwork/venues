<script lang="ts">
	import type { Venue } from '$lib/types';

	export let venue: Venue;
</script>

<div class="card bg-base-100 w-full">
	<div class="card-body">
		<h2 class="card-title">{venue.name}</h2>
		<div class="card-actions">
			{#each venue.additionalType as concept}
				<a href={concept['@id']} class="badge badge-primary">{concept.name}</a>
			{/each}
		</div>
		<p>{venue.description}</p>
		{#if venue.location && venue.location.location}
			<div class="mt-4">
				<h3 class="text-lg font-semibold">Location</h3>
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
			{#each venue.citation as citation}
				<p>
					<a href={citation.url} class="link link-primary">{citation.name}</a>
				</p>
			{/each}
		</div>
		<div class="mt-4">
			<h3 class="text-lg font-semibold">Identifiers</h3>
			<p>
				Same As: {#each venue.sameAs as sameAsItem}
					<a href={sameAsItem} class="link link-primary">{sameAsItem}</a>
				{/each}
			</p>
		</div>
	</div>
</div>
