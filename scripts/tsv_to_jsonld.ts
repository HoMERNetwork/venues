import csvParser from 'csv-parser';
import * as fs from 'fs';
import path from 'path';

import type { DataDistribution, Dataset, Venue } from '../src/lib/types';

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

			// If no additional types, provide a standard 'Venue' type'
			const additionalTypes =
				additionalTypeIds.length > 0
					? additionalTypeIds.map((id: string, index: number) => ({
							'@id': id,
							name: additionalTypeNames[index] || ''
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

			const venue: Venue = {
				'@context': 'https://schema.org/',
				'@type': 'Place',
				'@id': row.id,
				additionalType: additionalTypes.length > 0 ? additionalTypes : undefined,
				name: row.name,
				description: row.description,
				location: {
					'@type': 'Role',
					startDate: row.startDate,
					endDate: row.endDate,
					location: {
						'@type': 'Place',
						address: {
							'@type': 'PostalAddress',
							addressLocality: row.addressLocality,
							addressRegion: row.addressRegion,
							postalCode: row.postalCode,
							streetAddress: row.streetAddress
						},
						geo: {
							'@type': 'GeoCoordinates',
							latitude: parseFloat(row.latitude),
							longitude: parseFloat(row.longitude)
						}
					}
				},
				citation: citations,
				sameAs: sameAsUrls
			};

			Object.keys(venue).forEach((key) => {
				if (venue[key] === undefined) {
					delete venue[key];
				}
			});

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
