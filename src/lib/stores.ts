import { writable } from 'svelte/store';
import type { Venue } from '$lib/types';

export const countFeatures = writable<number>(0);

export const visibleFeatures = writable<maplibregl.MapGeoJSONFeature[]>([]);
export const selectedFeature = writable<Venue | null>(null);
export const hoveredFeatureState = writable<{ id: number | string; hovered: boolean } | null>(null);

export const filteredVisibleFeatures = writable<maplibregl.MapGeoJSONFeature[]>([]);

export const map = writable<maplibregl.Map | null>(null);

export const venueTypes = writable<{ label: string; value: string }[]>([]);