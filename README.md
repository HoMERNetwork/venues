# HoMER Venue Research Index

The HoMER Venue Research Index is a demo web application that lists venues (predominantly cinema related) from various datasets made by HoMERites (part of the HoMER Network, https://homernetwork.org/). 

The goal of this application is to provide a central place for researchers to find and share research output (articles, books, websites, datasets, etc.) in which these venues are discussed. At the same time, it serves as a demonstration of the use of the HoMER Vocabulary of Moviegoing, a shared vocabulary for cinema research, promoting the use of shared vocabularies in cinema research.

The website was presented as part of a HoMER Vocabulary Workshop at the HoMER Annual Conference 2025, held in Istanbul, Turkey. See: https://homernetwork.github.io/venues/

## Contribute venue data

1. Start with a copy of the template file located at `data/template.tsv`
2. Fill in the required information for each venue
3. Save your completed file as `your-dataset-name.tsv` in the `static` directory, or send it to us for inclusion. You can also open an issue and attach your file there. Please provide metadata for your set of venues. See the section below for details on required fields.
4. In case you want to make a PR to the repository, please also generate a JSON-LD file from your TSV file. See the section below for details on how to do this.

### TSV Template Fields

| Field              | Description                                                     | Example                                | Required |
| ------------------ | --------------------------------------------------------------- | -------------------------------------- | -------- |
| id                 | Unique identifier for the venue                                 | http://www.cinemacontext.nl/id/B000016 | Optional |
| name               | Name of the venue                                               | Kriterion                              | Required |
| description        | Detailed description                                            | Filmtheater Kriterion, officieel...    | Optional |
| additionalTypeId   | ID for venue type, split multiple values by semicolon (;)       | cinema                                 | Optional |
| additionalTypeName | Type of venue, split multiple values by semicolon (;)           | Art house cinema                       | Optional |
| startDate          | Date when venue opened (YYYY-MM-DD)                             | 1945-11-06                             | Required |
| endDate            | Date when venue closed (YYYY-MM-DD)                             | (Empty when still in operation)        | Optional |
| addressLocality    | City                                                            | Amsterdam                              | Optional |
| addressRegion      | Province/state code                                             | NH                                     | Optional |
| postalCode         | Postal code                                                     | 1012                                   | Optional |
| streetAddress      | Street address                                                  | Roetersstraat 170                      | Optional |
| latitude           | Geographic latitude                                             | 52.3625                                | Required |
| longitude          | Geographic longitude                                            | 4.910556                               | Required |
| citation           | Bibliographic reference, split multiple values by semicolon (;) | Cinema Context                         | Optional |
| sameAs             | External identifier URL, split multiple values by semicolon (;) | http://www.cinemacontext.nl/id/B000016 | Optional |

### Dataset Metadata Fields

Example dataset entry in `static/index.json`:

```json
{
	"@id": "cinema-context",
	"@type": "Dataset",
	"name": "Cinema Context",
	"description": "Cinema Context is a database of Dutch cinema and film culture.",
	"citation": "Cinema Context. n.d. Cinema Context. https://www.cinemacontext.nl/",
	"url": "https://www.cinemacontext.nl/",
	"distribution": [
		{
			"@type": "DataDownload",
			"encodingFormat": "text/tab-separated-values",
			"contentUrl": "cinema-context.tsv"
		},
		{
			"@type": "DataDownload",
			"encodingFormat": "application/ld+json",
			"contentUrl": "cinema-context.jsonld"
		}
	],
	"dateModified": "2025-03-20",
	"isBasedOn": "cinema-context.tsv"
}
```

### Converting TSV to JSON-LD

Run the following command to convert your TSV file to JSON-LD:

```bash
node scripts/tsv_to_jsonld.ts
```

This will convert your TSV file into the right format so that it can be shown on the website.

## Development of the website

This website is built using SvelteKit. To contribute to the development of the website, follow these steps:

1. Clone/fork the repository
2. Install the dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Make your changes and test them locally: `npm run preview`
5. Commit your changes and push them to the repository
6. Create a pull request

## Contact

For any questions or contributions, please open an issue, or email l.vanwissen@uva.nl.
