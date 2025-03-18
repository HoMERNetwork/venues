import venuesData from '$lib/data/venues.json';
import { countFeatures, venueTypes } from './stores';
import { type Venue } from '$lib/types';
import { type Option } from 'svelte-multiselect';

export const loadData = () => {
	const geoJsonFeatures = convertToGeoJson(venuesData as Venue[]);
	countFeatures.set(geoJsonFeatures.features.length);

	const options = getVenueTypes(venuesData as Venue[]);
	venueTypes.set(options as { label: string; value: string }[]);

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
