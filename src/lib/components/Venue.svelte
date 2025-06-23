<script lang="ts">
	import type { Venue } from '$lib/types';
	import VenueMapPreview from './VenueMapPreview.svelte';
	import linkifyHtml from 'linkify-html';
	import {
		MapPin,
		FileText,
		Link2,
		CalendarRange,
		Fullscreen,
		Copy,
		Check,
		X
	} from '@lucide/svelte';

	import { map } from '$lib/stores';

	export let venue: Venue;

	let copiedStates: Record<string, boolean> = {};

	const panToLocation = () => {
		if (venue.location?.location?.geo) {
			$map?.flyTo({
				center: [venue.location.location.geo.longitude, venue.location.location.geo.latitude],
				zoom: 12,
				speed: 2
			});
		} else {
			console.warn('No location available for this venue');
		}
	};

	const copyToClipboard = async (text: string, id: string) => {
		try {
			await navigator.clipboard.writeText(text);
			copiedStates[id] = true;
			setTimeout(() => {
				copiedStates[id] = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy text:', err);
		}
	};
</script>

<div class="bg-base-00 w-full rounded-lg px-4">
	<div class="flex flex-none items-center justify-between">
		<h2 class="text-2xl font-bold">{venue.name}</h2>
		<button class="btn btn-ghost" onclick={(venue = null)} aria-label="Close venue details">
			<X />
		</button>
	</div>

	{#if venue.location.startDate}
		<div class="mb-3 flex items-center gap-1 text-sm opacity-80">
			<CalendarRange size={16} />
			<span>
				{new Date(venue.location.startDate).toLocaleDateString()}
				{#if venue.location.endDate}
					– {new Date(venue.location.endDate).toLocaleDateString()}
				{/if}
			</span>
		</div>
	{/if}

	<div class="mb-4 flex flex-wrap gap-2">
		{#each venue.additionalType as concept (concept['@id'])}
			<a href={concept['@id']} class="badge badge-primary flex items-center gap-1">
				{concept.name}
			</a>
		{/each}
	</div>

	<p class="mb-4">{venue.description}</p>

	{#if venue.location && venue.location.location}
		<h3 class="mb-3 flex items-center justify-between text-lg font-bold">
			<div class="flex items-center gap-2">
				<MapPin size={20} /> Location
			</div>
			<div class="flex gap-2">
				<button class="btn btn-sm btn-ghost" onclick={panToLocation}><Fullscreen /></button>
			</div>
		</h3>

		<div class="mb-3 h-48 w-full overflow-hidden">
			<VenueMapPreview geo={venue.location.location.geo!} />
		</div>

		<div class="mb-6 grid grid-cols-1 gap-2">
			<div class="flex items-start gap-2">
				<span>
					{[
						venue.location.location?.address?.streetAddress,
						venue.location.location?.address?.addressLocality,
						venue.location.location?.address?.addressRegion,
						venue.location.location?.address?.postalCode
					]
						.filter(Boolean)
						.join(', ')}
				</span>
			</div>

			<div class="flex items-center">
				<button
					class="badge hover:bg-base-300 flex cursor-pointer items-center gap-2 font-mono transition-colors"
					onclick={() =>
						copyToClipboard(
							`${venue.location.location.geo!.latitude}, ${venue.location.location.geo!.longitude}`,
							'coordinates'
						)}
					aria-label="Copy coordinates"
				>
					{venue.location.location.geo!.latitude}, {venue.location.location.geo!.longitude}
					{#if copiedStates['coordinates']}
						<Check size={14} class="text-success" />
					{:else}
						<Copy size={14} />
					{/if}
				</button>
			</div>
		</div>
	{/if}

	<div class="mt-4">
		<h3 class="flex items-center gap-2 text-lg font-semibold">
			<FileText size={20} /> Publication(s) / Dataset(s)
		</h3>
		{#each venue.citation ?? [] as citation, index (index)}
			<ul class="list">
				<li class="list-row flex items-start justify-between gap-2">
					<div>
						{@html linkifyHtml(citation, {
							defaultProtocol: 'https',
							attributes: {
								target: '_blank',
								rel: 'noopener noreferrer'
							},
							className: 'link link-primary'
						})}
					</div>
					<div class="flex items-center gap-1">
						<button
							class="btn btn-sm btn-ghost"
							onclick={() => copyToClipboard(citation, `citation-${index}`)}
							title="Copy to clipboard"
						>
							{#if copiedStates[`citation-${index}`]}
								<Check size={16} class="text-info" />
							{:else}
								<Copy size={16} />
							{/if}
						</button>
					</div>
				</li>
			</ul>
		{/each}
	</div>

	<div class="mt-4">
		<h3 class="flex items-center gap-2 text-lg font-semibold">
			<Link2 size={20} /> External identifiers
		</h3>
		<ul class="list">
			{#each venue.sameAs ?? [] as sameAs, index (index)}
				<li class="list-row flex items-center justify-between gap-2">
					<a href={sameAs} class="link link-primary" target="_blank">{sameAs}</a>
					<div class="flex items-center gap-1">
						<button
							class="btn btn-sm btn-ghost"
							onclick={() => copyToClipboard(sameAs, `sameAs-${index}`)}
							title="Copy to clipboard"
						>
							{#if copiedStates[`sameAs-${index}`]}
								<Check size={16} class="text-info" />
							{:else}
								<Copy size={16} />
							{/if}
						</button>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>
