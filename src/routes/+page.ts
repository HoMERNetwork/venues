import { countFeatures, venueTypes } from '$lib/stores';
import { type Venue } from '$lib/types';
import { base } from '$app/paths';
import { building } from '$app/environment';
import { type Option } from 'svelte-multiselect';

const loadData = async (fetch) => {
	const res = await fetch(base + '/datasets/index.json');
	const index = await res.json();

	const venuesData = [];

	// Check if index.dataset exists before mapping over it
	if (index.dataset && Array.isArray(index.dataset)) {
		// Use Promise.all to wait for all fetch operations to complete
		await Promise.all(
			index.dataset.map(async (dataset) => {
				const res = await fetch(dataset['@id']);
				const data = await res.json();
				venuesData.push(...data.hasPart);
			})
		);
	} else {
		console.error('No dataset array found in the index:', index);
	}

	const geoJsonFeatures = convertToGeoJson(venuesData as Venue[]);
	countFeatures.set(geoJsonFeatures.features.length);

	const venueTypeOptions = getVenueTypes(venuesData as Venue[]);
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

export const load = ({ fetch }) => {
	if (!building) {
		const data = loadData(fetch);
		return data;
	}
};
