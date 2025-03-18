<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';

	let mapContainer: HTMLDivElement | '';
	let map: maplibregl.Map | null = null;
	let mapLoaded = false;

	const { geo } = $props<{ geo: { latitude: number; longitude: number } }>();

	const updateMarker = () => {
		if (!map || !mapLoaded) return;

		if (map.getSource('venue-point')) {
			const source = map.getSource('venue-point') as maplibregl.GeoJSONSource;
			source.setData({
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [geo.longitude, geo.latitude]
				},
				properties: {}
			});
		} else {
			map.addSource('venue-point', {
				type: 'geojson',
				data: {
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [geo.longitude, geo.latitude]
					},
					properties: {}
				}
			});

			map.addLayer({
				id: 'venue-circle',
				type: 'circle',
				source: 'venue-point',
				paint: {
					'circle-radius': 6,
					'circle-color': '#0082CE',
					'circle-stroke-width': 2,
					'circle-stroke-color': 'white'
				}
			});
		}

		map.flyTo({
			center: [geo.longitude, geo.latitude],
			zoom: 16,
			essential: false,
			animate: false
		});
	};

	$effect(() => {
		if (geo && map && mapLoaded) {
			updateMarker();
		}
	});

	onMount(() => {
		const initialState = { lng: geo.longitude, lat: geo.latitude, zoom: 16 };

		map = new maplibregl.Map({
			container: mapContainer,
			style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom,
			attributionControl: false
		});

		map.on('load', () => {
			mapLoaded = true;
			updateMarker();
		});
	});

	onDestroy(() => {
		map?.remove();
	});
</script>

<div class="relative h-full w-full">
	<!-- Map -->
	<div class="h-full w-full" bind:this={mapContainer}></div>
</div>
