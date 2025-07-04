<script lang="ts">
	export let data;
	import {
		ExternalLink,
		Download,
		Info,
		XCircle,
		Copy,
		Check,
		FileSpreadsheet,
		FileJson
	} from '@lucide/svelte';

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
	<div class="card-body p-4">
		<div class="px-4">
			<h2 class="card-title text-2xl font-semibold">Datasets</h2>
			<p class="text-base-content/70 mt-2">Available datasets used in this application</p>
		</div>

		<div class="mx-4 mt-4">
			<div
				class="alert bg-warning bg-opacity-20 text-warning-content flex max-w-4xl items-start gap-2 rounded-lg p-3 text-xs sm:text-sm"
			>
				<Info size={18} class="mt-0.5 flex-shrink-0" />
				<div>
					<strong class="mb-1 block">Dataset Information</strong>
					<p>
						The venue locations on this website are derived from comprehensive researcher datasets.
						While efforts are made to accurately present this information, minor inconsistencies may
						occasionally arise during the data conversion process.
						<br /><br />
						For the most precise and authoritative information, consult the original source data or citations
						that are provided. And when using these datasets, always provide proper attribution to the
						original data creators.
					</p>
				</div>
			</div>
		</div>

		<div class="mt-4 p-4">
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
												onclick={() => copyToClipboard(dataset.citation, index)}
												aria-label="Copy citation to clipboard"
											>
												{#if copiedStates[index]}
													<Check class="text-info h-3.5 w-3.5" />
												{:else}
													<Copy class="h-3.5 w-3.5" />
												{/if}
											</button>
											{#if copiedStates[index]}
												<span class="text-info text-xs">Copied!</span>
											{/if}
										</div>
									</div>
								{/if}

								<div class="card-actions mt-4 flex items-end justify-between">
									<div class="text-base-content/60 text-xs">
										{#if dataset.dateModified}
											Last modified: {new Date(dataset.dateModified).toLocaleDateString()}
										{/if}
									</div>

									<div class="flex gap-2">
										<div class="dropdown dropdown-top dropdown-end">
											<button tabindex="0" class="btn btn-sm btn-outline">
												Download
												<Download class="h-4 w-4" />
											</button>
											<ul
												class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
											>
												{#each dataset.distribution as distribution, index (index)}
													<li>
														<a
															href={distribution.contentUrl}
															target="_blank"
															rel="noopener noreferrer"
															class="text-sm"
														>
															{#if distribution.encodingFormat === 'application/ld+json'}
																<FileJson size={20} />
															{:else if distribution.encodingFormat === 'text/tab-separated-values'}
																<FileSpreadsheet size={20} />
															{/if}
															{distribution.encodingFormat}
														</a>
													</li>
												{/each}
											</ul>
										</div>
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
