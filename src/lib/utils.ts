import { countFeatures, venueTypes } from './stores';
import type { Dataset, Venue } from '$lib/types';
import { type Option } from 'svelte-multiselect';

import { base } from '$app/paths';

export const loadData = async () => {
	const res = await fetch(base + 'datasets/index.json');
	const index = await res.json();

	const venuesData: Venue[] = [];

	index.dataset.forEach(async (dataset: Dataset) => {
		console.log(dataset['@id']);
		const data = await fetch(dataset['@id']).then((res) => res.json());
		venuesData.push(...data);
	});

	const geoJsonFeatures = convertToGeoJson(venuesData);
	countFeatures.set(geoJsonFeatures.features.length);

	const venueTypeOptions = getVenueTypes(venuesData);
	venueTypes.set(venueTypeOptions as { label: string; value: string }[]);

	return geoJsonFeatures;
};

const convertToGeoJson = (data: Venue[]) => {
	const geojson = {
		type: 'FeatureCollection',
		features: data.map((venue) => {
			const i = data.indexOf(venue);
			const type = venue.additionalType.map((type) => type['@id']);
			const startYear = venue.location.startDate
				? new Date(venue.location.startDate).getFullYear()
				: null;
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
					type: type,
					startYear: startYear,
					endYear: endYear,
					venue: venue // Full venue data (as string)
				}
			};
		})
	};

	return geojson;
};

const getVenueTypes = (data: Venue[]) => {
	const venueTypes = data.map((venue) => venue.additionalType);
	const uniqueVenueTypes = [...new Set(venueTypes.flat())];

	const options: Option[] = uniqueVenueTypes.map((venueType) => {
		return {
			label: venueType.name,
			value: venueType['@id']
		};
	});

	return options.sort();
};
