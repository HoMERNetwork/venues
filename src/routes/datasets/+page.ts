import { base } from '$app/paths';
import { building } from '$app/environment';

import type { DataCatalog } from '$lib/types';

export async function load({ fetch }) {
	if (building) {
		return {
			dataCatalog: null,
			error: null
		};
	}

	try {
		const res = await fetch(`${base}/datasets/index.jsonld`);

		if (!res.ok) {
			throw new Error(`Failed to fetch dataset index: ${res.status} ${res.statusText}`);
		}

		const dataCatalog: DataCatalog = await res.json();

		return {
			dataCatalog,
			error: null
		};
	} catch (e) {
		console.error('Error loading datasets:', e);
		return {
			dataCatalog: null,
			error: e instanceof Error ? e.message : 'An error occurred loading datasets'
		};
	}
}
