<script lang="ts">
	export let data;
	import { ExternalLink, Download, Info, XCircle, Copy, Check } from '@lucide/svelte';

	let copiedStates: Record<number, boolean> = {};

	const copyToClipboard = (text: string, index: number) => {
		navigator.clipboard.writeText(text).then(() => {
			copiedStates[index] = true;
			setTimeout(() => {
				copiedStates[index] = false;
			}, 2000);
		});
	};
</script>

<div class="card bg-base-100 h-full">
	<div class="card-body flex h-full flex-col p-4 pb-0">
		<div class="flex-none px-4">
			<h2 class="card-title text-2xl font-semibold">Datasets</h2>
			<p class="text-base-content/70 mt-2">Available datasets used in this application</p>
		</div>
		<div class="mt-4 flex-grow overflow-y-auto p-4">
			{#if data.error}
				<div class="alert alert-error">
					<XCircle class="h-6 w-6 shrink-0 stroke-current" />
					<span>{data.error}</span>
				</div>
			{:else if data.dataCatalog && data.dataCatalog.dataset && data.dataCatalog.dataset.length > 0}
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{#each data.dataCatalog.dataset as dataset, index (index)}
						<div class="card card-compact bg-base-200">
							<div class="card-body">
								<h3 class="card-title text-lg">{dataset.name}</h3>
								<p class="text-base-content/80 text-sm">{dataset.description}</p>

								{#if dataset.citation}
									<div class=" mt-3 w-full self-start text-xs">
										<p class="font-semibold">Citation:</p>
										<div class="flex items-center gap-1">
											<p class="flex-grow italic">{dataset.citation}</p>
											<button
												class="btn btn-xs btn-ghost flex-shrink-0 p-1"
												on:click={() => copyToClipboard(dataset.citation, index)}
												aria-label="Copy citation to clipboard"
											>
												{#if copiedStates[index]}
													<Check class="text-success h-3.5 w-3.5" />
												{:else}
													<Copy class="h-3.5 w-3.5" />
												{/if}
											</button>
											{#if copiedStates[index]}
												<span class="text-success text-xs">Copied!</span>
											{/if}
										</div>
									</div>
								{/if}

								<div class="card-actions mt-4 flex items-end justify-between">
									<div class="text-base-content/60 text-xs">
										{#if dataset.dateModified}
											Last modified: {new Date(dataset.dateModified).toLocaleDateString('en-US', {
												year: 'numeric',
												month: 'short',
												day: 'numeric'
											})}
										{/if}
									</div>

									<div class="flex gap-2">
										<a
											href={dataset['@id']}
											target="_blank"
											rel="noopener noreferrer"
											class="btn btn-sm btn-outline"
										>
											JSON-LD Data
											<Download class="h-4 w-4" />
										</a>
										{#if dataset.url}
											<a
												href={dataset.url}
												target="_blank"
												rel="noopener noreferrer"
												class="btn btn-sm btn-primary"
											>
												Website
												<ExternalLink class="h-4 w-4" />
											</a>
										{/if}
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="alert">
					<Info class="stroke-info h-6 w-6 shrink-0" />
					<span>No datasets available</span>
				</div>
			{/if}
		</div>
	</div>
</div>
