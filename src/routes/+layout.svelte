<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';
</script>

<div class="flex h-screen flex-col">
	<nav class="navbar bg-base-100">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost text-xl">HoMER Venues</a>
		</div>
		<div class="flex-none">
			<ul class="menu menu-horizontal px-1">
				<li><a href="{base}/">Map</a></li>
				<li><a href="{base}/datasets">Datasets</a></li>
				<li><a href="{base}/contribute">Contribute</a></li>
				<li><a href="{base}/about">About</a></li>
			</ul>
		</div>
	</nav>

	<div class="flex flex-1 overflow-hidden">
		<div class="relative flex-1">
			<div class="absolute inset-0 flex items-center justify-center">
				<slot />
			</div>
		</div>
	</div>
</div>
