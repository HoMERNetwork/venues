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
	<div class="card-body flex h-full flex-col overflow-hidden p-2 sm:p-4">
		<div class="flex-shrink-0 px-2 sm:px-4">
			<h2 class="card-title text-xl font-semibold sm:text-2xl">Datasets</h2>
			<p class="text-base-content/70 mt-2 text-sm sm:text-base">
				Available datasets used in this application
			</p>
		</div>

		<div class="mt-4 flex-1 overflow-y-auto p-2 sm:p-4">
			<div class="mb-4">
				<div
					class="alert bg-warning bg-opacity-20 text-warning-content flex items-start gap-2 rounded-lg p-3 text-xs sm:text-sm lg:max-w-4xl"
				>
					<Info size={16} class="mt-0.5 flex-shrink-0 sm:size-[18px]" />
					<div>
						<strong class="mb-1 block">Dataset Information</strong>
						<p class="leading-relaxed">
							The venue locations on this website are derived from comprehensive researcher
							datasets. While efforts are made to accurately present this information, minor
							inconsistencies may occasionally arise during the data conversion process.
							<br /><br />
							For the most precise and authoritative information, consult the original source data or
							citations that are provided. And when using these datasets, always provide proper attribution
							to the original data creators.
						</p>
					</div>
				</div>
			</div>
			{#if data.error}
				<div class="alert alert-error">
					<XCircle class="h-5 w-5 shrink-0 stroke-current sm:h-6 sm:w-6" />
					<span class="text-sm sm:text-base">{data.error}</span>
				</div>
			{:else if data.dataCatalog && data.dataCatalog.dataset && data.dataCatalog.dataset.length > 0}
				<div class="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2 xl:grid-cols-3">
					{#each data.dataCatalog.dataset as dataset, index (index)}
						<div class="card card-compact bg-base-200 break-words">
							<div class="card-body p-3 sm:p-4">
								<h3 class="card-title text-base leading-tight sm:text-lg">{dataset.name}</h3>
								<p class="text-base-content/80 text-xs leading-relaxed sm:text-sm">
									{dataset.description}
								</p>

								{#if dataset.citation}
									<div class="mt-3 w-full self-start text-xs">
										<p class="mb-1 font-semibold">Citation:</p>
										<div class="flex items-start gap-2">
											<p class="flex-grow text-xs leading-relaxed break-words italic sm:text-sm">
												{dataset.citation}
											</p>
											<div class="flex flex-shrink-0 items-center gap-1">
												<button
													class="btn btn-xs btn-ghost p-1"
													onclick={() => copyToClipboard(dataset.citation, index)}
													aria-label="Copy citation to clipboard"
												>
													{#if copiedStates[index]}
														<Check class="text-info h-3 w-3 sm:h-3.5 sm:w-3.5" />
													{:else}
														<Copy class="h-3 w-3 sm:h-3.5 sm:w-3.5" />
													{/if}
												</button>
												{#if copiedStates[index]}
													<span class="text-info text-xs whitespace-nowrap">Copied!</span>
												{/if}
											</div>
										</div>
									</div>
								{/if}

								<div
									class="card-actions mt-4 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end"
								>
									<div class="text-base-content/60 order-2 text-xs sm:order-1">
										{#if dataset.dateModified}
											Last modified: {new Date(dataset.dateModified).toLocaleDateString()}
										{/if}
									</div>

									<div class="order-1 flex w-full flex-col gap-2 sm:order-2 sm:w-auto sm:flex-row">
										<div class="dropdown dropdown-top dropdown-end w-full sm:w-auto">
											<button tabindex="0" class="btn btn-sm btn-outline w-full sm:w-auto">
												Download
												<Download class="h-3 w-3 sm:h-4 sm:w-4" />
											</button>
											<ul
												class="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow sm:w-52"
											>
												{#each dataset.distribution as distribution, distIndex (distIndex)}
													<li>
														<a
															href={distribution.contentUrl}
															target="_blank"
															rel="noopener noreferrer"
															class="text-xs sm:text-sm"
														>
															{#if distribution.encodingFormat === 'application/ld+json'}
																<FileJson size={16} class="sm:size-5" />
															{:else if distribution.encodingFormat === 'text/tab-separated-values'}
																<FileSpreadsheet size={16} class="sm:size-5" />
															{/if}
															<span class="truncate">{distribution.encodingFormat}</span>
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
												class="btn btn-sm btn-primary w-full sm:w-auto"
											>
												Website
												<ExternalLink class="h-3 w-3 sm:h-4 sm:w-4" />
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
					<Info class="stroke-info h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
					<span class="text-sm sm:text-base">No datasets available</span>
				</div>
			{/if}
		</div>
	</div>
</div>
