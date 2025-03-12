<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';

	import TimeSlider from './TimeSlider.svelte';

	import type { Venue } from '$lib/types';
	import { visibleFeatures, selectedFeature, hoveredFeatureState } from '$lib/stores';

	let map: maplibregl.Map | undefined;
	let mapContainer: HTMLDivElement | '';

	let minimumFilterValue = 1895;
	let maximumFilterValue = new Date().getFullYear();

	export let data: any;

	onMount(() => {
		const initialState = { lng: 2.329444, lat: 48.870278, zoom: 2 }; // Pour les connaisseurs

		map = new maplibregl.Map({
			container: mapContainer,
			style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom
		});

		map.addControl(
			new maplibregl.NavigationControl({
				visualizePitch: true,
				visualizeRoll: true,
				showZoom: true,
				showCompass: true
			})
		);

		map.on('load', async () => {
			if (data) {
				map?.addSource('venues', {
					type: 'geojson',
					data: data
				});

				map?.addLayer({
					id: 'venues',
					type: 'circle',
					source: 'venues',
					paint: {
						'circle-radius': 8,
						'circle-color': [
							'case',
							['boolean', ['feature-state', 'hover'], false],
							'#FDC700',
							'#0082CE'
						]
					}
				});

				map?.on('click', () => {
					$selectedFeature = null;
				});

				map?.on('click', 'venues', (e) => {
					if (e.features && e.features.length > 0) {
						const geometry = e.features[0].geometry;
						if (geometry.type === 'Point') {
							const coordinates: [number, number] = [
								geometry.coordinates[0],
								geometry.coordinates[1]
							];
							const props = e.features[0].properties;

							if (map) {
								new maplibregl.Popup()
									.setLngLat(coordinates)
									.setHTML(
										`
										<h3 class="font-bold">${props.name}</h3>
										<p>Year: ${props.year}</p>
										<p>Type: ${props.type}</p>
									`
									)
									.addTo(map);
							}

							$selectedFeature = JSON.parse(e.features[0].properties.venue);
						}
					}
				});

				map?.on('mouseenter', 'venues', () => {
					if (map) {
						map.getCanvas().style.cursor = 'pointer';
					}
				});

				map?.on('mouseleave', 'venues', () => {
					if (map) {
						map.getCanvas().style.cursor = '';
					}
				});
			}
		});

		map?.on('move', updateVisibleFeatures);

		map?.on('idle', updateVisibleFeatures);
	});

	onDestroy(() => {
		map?.remove();
	});

	const updateFilter = (min: number, max: number) => {
		map?.setFilter('venues', [
			'any',
			['all', ['>=', ['get', 'startYear'], min], ['<=', ['get', 'startYear'], max]],
			['all', ['>=', ['get', 'endYear'], min], ['<=', ['get', 'endYear'], max]]
		]);
	};

	const updateVisibleFeatures = () => {
		if (map) {
			const features = map.queryRenderedFeatures({ layers: ['venues'] });
			$visibleFeatures = features;
		}
	};

	$: {
		updateFilter(minimumFilterValue, maximumFilterValue);
		updateVisibleFeatures();
	}

	$: {
		if (map && $hoveredFeatureState) {
			map.setFeatureState(
				{ source: 'venues', id: $hoveredFeatureState.id },
				{ hover: $hoveredFeatureState.hovered }
			);
		} else if (map) {
		}
	}
</script>

<div class="relative h-full w-full">
	<!-- TimeSlider -->
	<div class="absolute top-0 left-0 z-10">
		<TimeSlider
			minimumValue={1895}
			maximumValue={new Date().getFullYear()}
			bind:minimumFilterValue
			bind:maximumFilterValue
		/>
	</div>

	<!-- Map -->
	<div class="h-full w-full" bind:this={mapContainer}></div>
</div>
