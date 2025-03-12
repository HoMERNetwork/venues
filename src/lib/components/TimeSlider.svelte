<svelte:options immutable={false} />

<script>
	import RangeSlider from 'svelte-range-slider-pips';

	export let minimumValue;
	export let maximumValue;
	export let minimumFilterValue = 1895;
	export let maximumFilterValue = new Date().getFullYear();

	let values = [minimumFilterValue, maximumFilterValue];

	$: minimumFilterValue = values[0];
	$: maximumFilterValue = values[1];
</script>

<div class="card bg-base-100 z-100 m-1 w-full shadow sm:m-2 md:max-w-sm">
	<div class="card-body p-2 sm:p-4 md:p-6">
		<h2 class="card-title text-xs sm:text-sm md:text-lg">Timeline</h2>
		<p class="text-xs sm:text-sm md:text-base">Filter the data by selecting a time range.</p>

		<div class="mt-0 w-full px-0 sm:mt-1 md:mt-2 md:px-2">
			<RangeSlider
				range
				float
				pushy
				pips
				first="label"
				last="label"
				bind:values
				pipstep={10}
				min={minimumValue}
				max={maximumValue}
			/>
		</div>
	</div>
</div>

<style>
	:root {
		--range-slider: var(--color-base-200);
		--range-handle-inactive: var(--color-primary);
		--range-handle: var(--color-primary);
		--range-handle-focus: var(--color-primary);
		--range-handle-border: var(--color-primary);
		--range-range-inactive: var(--color-primary);
		--range-range: var(--color-primary);
		--range-range-limit: var(--color-base-300);
		--range-float-inactive: var(--color-neutral);
		--range-float: var(--color-primary);
		--range-float-text: var(--color-primary-content);

		--range-pip: var(--color-primary);
		--range-pip-text: var(--color-neutral);
		--range-pip-active: var(--color-primary);
		--range-pip-active-text: var(--color-neutral);
		--range-pip-hover: var(--color-neutral);
		--range-pip-hover-text: var(--color-primary);
		--range-pip-in-range: var(--color-neutral);
		--range-pip-in-range-text: var(--color-primary-content);
		--range-pip-out-of-limit: var(--color-base-300);
		--range-pip-out-of-limit-text: var(--color-base-content);

		color-scheme: light;
		--color-base-100: oklch(100% 0 0);
		--color-base-200: oklch(93% 0 0);
		--color-base-300: oklch(86% 0 0);
		--color-base-content: oklch(22.389% 0.031 278.072);
		--color-primary: oklch(58% 0.158 241.966);
		--color-primary-content: oklch(100% 0 0);
		--color-secondary: oklch(55% 0.046 257.417);
		--color-secondary-content: oklch(100% 0 0);
		--color-accent: oklch(60% 0.118 184.704);
		--color-accent-content: oklch(100% 0 0);
		--color-neutral: oklch(0% 0 0);
		--color-neutral-content: oklch(100% 0 0);
		--color-info: oklch(60% 0.126 221.723);
		--color-info-content: oklch(100% 0 0);
		--color-success: oklch(62% 0.194 149.214);
		--color-success-content: oklch(100% 0 0);
		--color-warning: oklch(85% 0.199 91.936);
		--color-warning-content: oklch(0% 0 0);
		--color-error: oklch(70% 0.191 22.216);
		--color-error-content: oklch(0% 0 0);
		--radius-selector: 0.25rem;
		--radius-field: 0.25rem;
		--radius-box: 0.25rem;
		--size-selector: 0.25rem;
		--size-field: 0.25rem;
		--border: 1px;
		--depth: 0;
		--noise: 0;
	}
</style>
