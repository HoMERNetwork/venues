import csvParser from 'csv-parser';
import * as fs from 'fs';
import path from 'path';

import type {
	DataDistribution,
	Dataset,
	Place,
	Venue,
	LocationRole,
	Address
} from '../src/lib/types';

const INDEXFILE = '../static/datasets/index.jsonld';

const processIndexFile = (indexFile: string) => {
	if (!fs.existsSync(indexFile)) {
		console.error(`Index file not found: ${indexFile}`);
		return;
	}

	const indexData = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
	if (!indexData || !indexData.dataset) {
		console.error(`Invalid index file: ${indexFile}`);
		return;
	}
	const datasets = indexData.dataset;
	if (!datasets || datasets.length === 0) {
		console.error(`No datasets found in index file: ${indexFile}`);
		return;
	}
	for (const dataset of datasets) {
		const tsvFile = dataset.distribution.find(
			(distribution: DataDistribution) =>
				distribution.encodingFormat === 'text/tab-separated-values'
		);

		if (!tsvFile) {
			console.error(`Missing TSV distribution in dataset metadata for ${dataset.name}`);
			continue;
		}
		const tsvFilePath = path.join(path.dirname(indexFile), tsvFile.contentUrl);
		if (!fs.existsSync(tsvFilePath)) {
			console.error(`TSV file not found: ${tsvFilePath}`);
			continue;
		}
		const outputFilePath = tsvFilePath.replace('.tsv', '.jsonld');
		if (fs.existsSync(outputFilePath)) {
			console.log(`Output file already exists: ${outputFilePath}`);
			continue;
		}
		generateJsonLD(dataset, tsvFilePath, outputFilePath);
	}
};

const generateJsonLD = (dataset: Dataset, tsvFilepath: string, outputFilePath: string) => {
	const venues: Venue[] = [];

	const history = new Set<string>();

	fs.createReadStream(tsvFilepath)
		.pipe(
			csvParser({
				separator: '\t'
			})
		)
		.on('data', (row) => {
			if (row.id && history.has(row.id)) {
				console.log(`Duplicate ID found: ${row.id}`);
				return;
			} else if (row.id) {
				history.add(row.id);
			}

			// Multiple Types
			const additionalTypeIds = row.additionalTypeId
				? row.additionalTypeId.split(';').map((id: string) => id.trim())
				: [];
			const additionalTypeNames = row.additionalTypeName
				? row.additionalTypeName.split(';').map((name: string) => name.trim())
				: [];

			const additionalTypes =
				additionalTypeIds.length > 0
					? additionalTypeIds.map((id: string, index: number) => ({
							'@id': id,
							name: additionalTypeNames[index] || undefined
						}))
					: [{ '@id': 'https://homernetwork.github.io/vocabulary/venues/Venue', name: 'Venue' }];

			// Multiple citations
			const citations = row.citation
				? row.citation.split(';').map((citation: string) => citation.trim())
				: dataset.citation
					? Array.isArray(dataset.citation)
						? dataset.citation
						: [dataset.citation]
					: [];

			// Multiple SameAs
			const sameAsUrls = row.sameAs ? row.sameAs.split(';').map((url: string) => url.trim()) : [];

			// Location
			const address: Address = { '@type': 'PostalAddress' };
			if (row.addressLocality) address.addressLocality = row.addressLocality;
			if (row.addressRegion) address.addressRegion = row.addressRegion;
			if (row.postalCode) address.postalCode = row.postalCode;
			if (row.streetAddress) address.streetAddress = row.streetAddress;

			const locationDetails: Place = { '@type': 'Place' };
			if (Object.keys(address).length > 1) {
				// more than just @type
				locationDetails.address = address;
			}

			// Geo
			if (row.latitude && row.longitude) {
				const latitude = parseFloat(row.latitude);
				const longitude = parseFloat(row.longitude);

				if (isNaN(latitude) || isNaN(longitude)) {
					console.error(`Invalid latitude or longitude for ID: ${row.id}`);
					return;
				}

				const geo = {
					'@type': 'GeoCoordinates' as const,
					latitude: latitude,
					longitude: longitude
				};

				locationDetails.geo = geo;
			}

			const venueLocation: LocationRole = { '@type': 'Role', location: locationDetails };
			if (row.startDate) venueLocation.startDate = row.startDate;
			if (row.endDate) venueLocation.endDate = row.endDate;

			const venue: Venue = {
				'@id': row.id,
				'@context': 'https://schema.org/',
				'@type': 'Place',
				name: row.name,
				additionalType: additionalTypes,
				location: venueLocation
			};

			if (row.description) venue.description = row.description;

			if (citations.length > 0) venue.citation = citations;
			if (sameAsUrls.length > 0) venue.sameAs = sameAsUrls;

			venues.push(venue);
		})
		.on('end', () => {
			const outputDataset = {
				...dataset,
				dateModified: new Date().toISOString().split('T')[0],
				hasPart: venues
			};
			const jsonOutput = JSON.stringify(outputDataset, null, 2);
			fs.writeFileSync(outputFilePath, jsonOutput);
			console.log(
				`Conversion complete. ${path.basename(outputFilePath)} created with ${venues.length} venues.`
			);
		});
};

processIndexFile(INDEXFILE);
