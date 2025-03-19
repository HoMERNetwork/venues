<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';

	import { selectedFeature } from '$lib/stores';

	let unique = {};

	const resetApp = () => {
		$selectedFeature = null;

		unique = {};
	};
</script>

<div class="flex h-screen flex-col">
	<nav class="navbar bg-base-100">
		<div class="flex-1">
			<a
				href="{base}/"
				role="button"
				onclick={() => {
					resetApp();
					goto(`${base}/`);
				}}
				class="btn btn-ghost text-sm sm:text-xl">HoMER Venue Research Index</a
			>
		</div>
		<div class="flex-none">
			<ul class="menu menu-horizontal px-1">
				<li>
					<a
						href="{base}/"
						role="button"
						onclick={() => {
							goto(`${base}/`);
							resetApp();
						}}
						onkeydown={(e) => {
							if (e.key === 'Enter') {
								goto(`${base}/`).then(() => resetApp());
							}
						}}>Home</a
					>
				</li>
				<li>
					<a
						href="{base}/datasets"
						role="button"
						onclick={() => goto(`${base}/datasets`)}
						onkeydown={(e) => e.key === 'Enter' && goto(`${base}/datasets`)}>Datasets</a
					>
				</li>
				<li>
					<a
						href="{base}/contribute"
						role="button"
						onclick={() => goto(`${base}/contribute`)}
						onkeydown={(e) => e.key === 'Enter' && goto(`${base}/contribute`)}>Contribute</a
					>
				</li>
				<li>
					<a
						href="{base}/about"
						role="button"
						onclick={() => goto(`${base}/about`)}
						onkeydown={(e) => e.key === 'Enter' && goto(`${base}/about`)}>About</a
					>
				</li>
			</ul>
		</div>
	</nav>

	<div class="flex flex-1 overflow-hidden">
		<div class="relative flex-1">
			{#key unique}
				<slot />
			{/key}
		</div>
	</div>
</div>
