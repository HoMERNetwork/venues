import { countFeatures, venueTypes } from './stores';
import type { Dataset, Venue } from '$lib/types';
import type { ObjectOption } from 'svelte-multiselect';

import { base } from '$app/paths';

type Fetch = typeof fetch;

export const loadData = async (fetch: Fetch) => {
	const res = await fetch(base + '/datasets/index.jsonld');
	const index = await res.json();

	const venuesData: Venue[] = [];

	if (index.dataset && Array.isArray(index.dataset)) {
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
	const features = data.reduce((features: GeoJSON.Feature[], venue, index) => {
		if (!venue.location?.location?.geo?.longitude || !venue.location?.location?.geo?.latitude) {
			return features;
		}

		const type = Array.isArray(venue.additionalType)
			? venue.additionalType.map((type) => type['@id'])
			: [];

		const startYear = venue.location?.startDate
			? new Date(venue.location.startDate).getFullYear()
			: 1895;
		const endYear = venue.location?.endDate
			? new Date(venue.location.endDate).getFullYear()
			: new Date().getFullYear();

		const feature: GeoJSON.Feature = {
			id: index,
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
				venue: venue // Full venue data
			}
		};

		features.push(feature);
		return features;
	}, []);

	const geojson = {
		type: 'FeatureCollection',
		features: features
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
