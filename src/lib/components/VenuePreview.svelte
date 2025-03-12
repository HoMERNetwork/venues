<script lang="ts">
	import type { Venue } from '$lib/types';
	import { selectedFeature, hoveredFeatureState } from '$lib/stores';

	export let venue: Venue;
	export let id: string | number;
</script>

<a
	href="#/{venue['@id']}"
	class="card bg-base-100 hover:bg-base-200 cursor-pointer transition-colors"
	on:click|preventDefault={() => ($selectedFeature = venue)}
	on:keydown={(event: KeyboardEvent) => event.key === 'Enter' && ($selectedFeature = venue)}
	on:mouseenter={() => ($hoveredFeatureState = { id, hovered: true })}
	on:mouseleave={() => ($hoveredFeatureState = { id, hovered: false })}
	aria-roledescription="venue"
>
	<div class="card-body p-4">
		<h3 class="card-title text-lg">{venue.name}</h3>
		<p class="text-sm">
			{venue.description.length > 100 ? venue.description.slice(0, 100) + '...' : venue.description}
		</p>
	</div>
</a>
