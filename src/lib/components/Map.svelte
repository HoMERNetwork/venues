<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';

	import TimeSlider from './TimeSlider.svelte';
	import TypeFilter from './TypeFilter.svelte';

	import { visibleFeatures, selectedFeature, hoveredFeatureState, stringFilter } from '$lib/stores';

	import { map } from '$lib/stores';
	import type { FeatureCollection } from 'geojson';

	let mapContainer: HTMLDivElement | '';
	let popup: maplibregl.Popup | null = null;
	let detailPopup: maplibregl.Popup | null = null;

	let minimumFilterValue = 1895;
	let maximumFilterValue = new Date().getFullYear();

	let selectedVenueTypes: { label: string; value: string }[] = [];
	export let data: FeatureCollection | null;

	onMount(() => {
		const initialState = { lng: 2.329444, lat: 48.870278, zoom: 2 }; // Pour les connaisseurs

		// Map itself
		$map = new maplibregl.Map({
			container: mapContainer,
			style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom
		});

		// Zoom etc.
		$map.addControl(
			new maplibregl.NavigationControl({
				visualizePitch: true,
				visualizeRoll: true,
				showZoom: true,
				showCompass: true
			}),
			'bottom-right'
		);

		// Load data
		$map.on('load', async () => {
			if (data) {
				$map?.addSource('venues', {
					type: 'geojson',
					data: data
				});

				$map?.addLayer({
					id: 'venues',
					type: 'circle',
					source: 'venues',
					paint: {
						'circle-radius': 6,
						'circle-color': '#0082CE'
					}
				});

				$map?.on('click', () => {
					$selectedFeature = null;
				});

				$map?.on('click', 'venues', (e) => {
					if (e.features && e.features.length > 0) {
						const geometry = e.features[0].geometry;
						if (geometry.type === 'Point') {
							$selectedFeature = JSON.parse(e.features[0].properties.venue);
						}
					}
				});

				$map?.on('mouseenter', 'venues', (e) => {
					if ($map) {
						$map.getCanvas().style.cursor = 'pointer';

						if (e.features && e.features.length > 0) {
							const featureId = e.features[0].id;
							if (featureId !== undefined) {
								$hoveredFeatureState = { id: featureId, hovered: true };
							}

							const geometry = e.features[0].geometry;
							if (geometry.type === 'Point') {
								const coordinates: [number, number] = [
									geometry.coordinates[0],
									geometry.coordinates[1]
								];
								const props = e.features[0].properties;

								// Remove existing popup if there is one
								if (popup) popup.remove();

								// Create a new popup
								popup = new maplibregl.Popup({ closeButton: false })
									.setLngLat(coordinates)
									.setHTML(`<h3 class="font-bold">${props.name}</h3>`)
									.addTo($map);
							}
						}
					}
				});

				$map?.on('mouseleave', 'venues', () => {
					if ($map) {
						$map.getCanvas().style.cursor = '';

						$hoveredFeatureState = { id: '', hovered: false };

						// Remove popup when mouse leaves the feature
						if (popup) {
							popup.remove();
							popup = null;
						}
					}
				});
			}
		});

		$map?.on('move', updateVisibleFeatures);

		$map?.on('idle', updateVisibleFeatures);
	});

	onDestroy(() => {
		$map?.remove();
		if (popup) {
			popup.remove();
			popup = null;
		}
		if (detailPopup) {
			detailPopup.remove();
			detailPopup = null;
		}
	});

	const updateFilter = (
		min: number,
		max: number,
		selectedVenueTypes?: { label: string; value: string }[],
		stringFilter?: string
	) => {
		if (!$map?.style) return;

		let filter = [
			'any',
			['all', ['>=', ['get', 'startYear'], min], ['<=', ['get', 'startYear'], max]],
			['all', ['>=', ['get', 'endYear'], min], ['<=', ['get', 'endYear'], max]]
		];

		if (selectedVenueTypes?.length) {
			const typeFilter = [
				'any',
				...selectedVenueTypes.map((type) => ['in', type.value, ['get', 'type']])
			];
			// @ts-expect-error: this works
			filter = ['all', filter, typeFilter];
		}

		if (stringFilter) {
			const stringFilterCondition = ['in', stringFilter.toLowerCase(), ['get', 'nameLower']];
			filter = ['all', filter, stringFilterCondition];
		}

		// @ts-expect-error: this works
		$map?.setFilter('venues', filter);
	};

	const updateVisibleFeatures = () => {
		if ($map) {
			const features = $map.queryRenderedFeatures({ layers: ['venues'] });
			$visibleFeatures = features;
		}
	};

	$: {
		updateFilter(minimumFilterValue, maximumFilterValue, selectedVenueTypes, $stringFilter);
		updateVisibleFeatures();
	}

	$: {
		if ($map && $hoveredFeatureState) {
			if ($map?.style?.loaded()) {
				// Set feature state explicitly
				$map.setFeatureState(
					{ source: 'venues', id: $hoveredFeatureState.id },
					{ hover: $hoveredFeatureState.hovered }
				);
			}
		}
	}

	// Watch for changes to the selected feature and create/update a popup
	$: if ($selectedFeature && $map) {
		// Remove existing detail popup if there is one
		if (detailPopup) detailPopup.remove();

		// Create a new popup for the selected venue
		if ($selectedFeature.location && $selectedFeature.location.location.geo) {
			const coordinates: [number, number] = [
				$selectedFeature.location.location.geo.longitude,
				$selectedFeature.location.location.geo.latitude
			];

			detailPopup = new maplibregl.Popup()
				.setLngLat(coordinates)
				.setHTML(`<h3 class="font-bold">${$selectedFeature.name}</h3>`)
				.addTo($map);
		}
	} else if (!$selectedFeature && detailPopup) {
		// Remove the popup when no venue is selected
		detailPopup.remove();
		detailPopup = null;
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

	<!-- TypeFilter-->
	<div class="absolute top-0 right-0 z-10 mr-2 w-48 sm:mr-4 md:w-64 lg:w-80 xl:w-96">
		<TypeFilter bind:selectedVenueTypes />
	</div>

	<!-- Map -->
	<div class="h-full w-full" bind:this={mapContainer}></div>
</div>
