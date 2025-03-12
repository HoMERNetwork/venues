import { writable } from 'svelte/store';
import type { Venue } from '$lib/types';

import venuesData from '$lib/data/venues.json';

export const visibleFeatures = writable<maplibregl.MapGeoJSONFeature[]>([]);
export const selectedFeature = writable<Venue | null>(null);
export const hoveredFeatureState = writable<{id:number|string, hovered: boolean} | null>(null);

export const loadData = () => {
	return convertToGeoJson(venuesData as Venue[]);
};

function convertToGeoJson(data: Venue[]) {
	const geojson = {
		type: 'FeatureCollection',
		features: data.map((venue) => {
			const i = data.indexOf(venue);
			const startYear = venue.location.startDate ? new Date(venue.location.startDate).getFullYear() : null;
			const endYear = venue.location.endDate
				? new Date(venue.location.endDate).getFullYear()
				: new Date().getFullYear();
			return {
				id: i,
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [venue.location.location.geo.longitude, venue.location.location.geo.latitude]
				},
				properties: {
					name: venue.name,
					startYear: startYear,
					endYear: endYear,
					venue: venue // Full venue data (as string)
				}
			};
		})
	};

	return geojson;
}
