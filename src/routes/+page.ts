import { countFeatures, venueTypes } from '$lib/stores';
import type { Venue, Dataset } from '$lib/types';
import { base } from '$app/paths';
import { building } from '$app/environment';
import type { ObjectOption } from 'svelte-multiselect';

const loadData = async (fetch) => {
	const res = await fetch(base + '/datasets/index.jsonld');
	const index = await res.json();

	const venuesData: Venue[] = [];

	// Check if index.dataset exists before mapping over it
	if (index.dataset && Array.isArray(index.dataset)) {
		// Use Promise.all to wait for all fetch operations to complete
		await Promise.all(
			index.dataset.map(async (dataset: Dataset) => {
				const contentUrl = dataset.distribution.find(
					(distribution) => distribution.encodingFormat === 'application/ld+json'
				)?.contentUrl;

				const res = await fetch('datasets/' + contentUrl);
				const data = await res.json();
				venuesData.push(...data.hasPart);
			})
		);
	} else {
		console.error('No dataset array found in the index:', index);
	}

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
					nameLower: venue.name.toLowerCase(),
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
	const allVenueTypes = data.flatMap((venue) => venue.additionalType);

	const uniqueTypesMap = new Map();
	allVenueTypes.forEach((venueType) => {
		uniqueTypesMap.set(venueType['@id'], venueType);
	});

	const options: ObjectOption[] = Array.from(uniqueTypesMap.values()).map((venueType) => ({
		label: venueType.name,
		value: venueType['@id']
	}));

	return options.sort((a, b) => String(a.label).localeCompare(String(b.label)));
};

export const load = ({ fetch }) => {
	if (!building) {
		const data = loadData(fetch);
		return data;
	}
};
