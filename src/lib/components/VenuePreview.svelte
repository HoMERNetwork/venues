<script lang="ts">
	import type { Venue } from '$lib/types';
	import { selectedFeature, hoveredFeatureState, map } from '$lib/stores';
	import { onMount, onDestroy } from 'svelte';
	import maplibregl from 'maplibre-gl';

	export let venue: Venue;
	export let id: string | number;

	let isHighlighted = false;
	let component: HTMLElement;
	let popup: maplibregl.Popup | null = null;

	const updateHighlight = (highlight: boolean) => {
		isHighlighted = highlight;
		if (component) {
			if (highlight) {
				component.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
			}
		}
	};

	const showPopup = () => {
		if (
			$map &&
			venue.location.location.geo &&
			venue.location.location.geo?.latitude &&
			venue.location.location.geo?.longitude
		) {
			// Remove existing popup if there is one
			if (popup) popup.remove();

			// Create new popup
			popup = new maplibregl.Popup({ closeButton: false })
				.setLngLat([venue.location.location.geo.longitude, venue.location.location.geo.latitude])
				.setHTML(
					`
					<h3 class="font-bold">${venue.name}</h3>
					`
				)
				.addTo($map);
		}
	};

	const removePopup = () => {
		if (popup) {
			popup.remove();
			popup = null;
		}
	};

	const unsubscribeHover = hoveredFeatureState.subscribe((state) => {
		if (state && state.id === id) {
			updateHighlight(state.hovered);
		} else if (isHighlighted && state && state.id !== id) {
			updateHighlight(false);
		}
	});

	const unsubscribeSelected = selectedFeature.subscribe((feature) => {
		if (feature && feature['@id'] === venue['@id']) {
			updateHighlight(true);
		} else if (isHighlighted && feature && feature['@id'] !== venue['@id']) {
			updateHighlight(false);
		}
	});

	onMount(() => {
		if ($selectedFeature && $selectedFeature['@id'] === venue['@id']) {
			updateHighlight(true);
		}
	});

	onDestroy(() => {
		unsubscribeHover();
		unsubscribeSelected();
		removePopup();

		// if ($map) {
		// 	$map.setFeatureState({ source: 'venues', id: id }, { hover: false });
		// }
	});
</script>

<a
	href="#/{venue['@id']}"
	class="card bg-base-100 hover:bg-base-200 cursor-pointer transition-colors {isHighlighted
		? 'bg-base-300 '
		: ''}"
	on:click|preventDefault={() => ($selectedFeature = venue)}
	on:keydown={(event: KeyboardEvent) => event.key === 'Enter' && ($selectedFeature = venue)}
	on:mouseenter={() => {
		$hoveredFeatureState = { id, hovered: true };

		showPopup();
	}}
	on:mouseleave={() => {
		$hoveredFeatureState = { id, hovered: false };
		removePopup();
	}}
	aria-roledescription="venue"
	bind:this={component}
>
	<div class="card-body p-4">
		<h3 class="card-title text-lg">{venue.name}</h3>
		<div class="card-actions">
			{#each venue.additionalType as concept (concept['@id'])}
				<button class="badge badge-primary badge-xs">{concept.name}</button>
			{/each}
		</div>

		<p class="text-sm">
			{venue.description.length > 100 ? venue.description.slice(0, 100) + '...' : venue.description}
		</p>
	</div>
</a>
