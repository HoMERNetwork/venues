# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

# Venues Data Submission

## How to Submit Venue Data

1. Start with a copy of the template file located at `data/template.tsv`
2. Fill in the required information for each venue
3. Save your completed file as `venues.tsv` in the `data` directory
4. Run the conversion script to generate JSON-LD

## TSV Template Fields

| Field              | Description                         | Example                                | Required |
| ------------------ | ----------------------------------- | -------------------------------------- | -------- |
| id                 | Unique identifier for the venue     | http://www.cinemacontext.nl/id/B000016 | Optional |
| name               | Name of the venue                   | Kriterion                              | Required |
| description        | Detailed description                | Filmtheater Kriterion, officieel...    | Optional |
| additionalTypeId   | ID for venue type                   | cinema                                 | Optional |
| additionalTypeName | Type of venue                       | Art house cinema                       | Optional |
| startDate          | Date when venue opened (YYYY-MM-DD) | 1945-11-06                             | Required |
| endDate            | Date when venue closed (YYYY-MM-DD) | (Empty when still in operation)        | Optional |
| addressLocality    | City                                | Amsterdam                              | Optional |
| addressRegion      | Province/state code                 | NH                                     | Optional |
| postalCode         | Postal code                         | 1012                                   | Optional |
| streetAddress      | Street address                      | Roetersstraat 170                      | Optional |
| latitude           | Geographic latitude                 | 52.3625                                | Required |
| longitude          | Geographic longitude                | 4.910556                               | Required |
| citation           | Bibliographic reference             | Cinema Context                         | Optional |
| sameAs             | External identifier URL             | http://www.cinemacontext.nl/id/B000016 | Optional |

## Converting TSV to JSON-LD

Run the following command to convert your TSV file to JSON-LD:

```bash
node scripts/tsv_to_jsonld.ts
```

This will read the venues.tsv file and generate a venues.json file in the data directory.
