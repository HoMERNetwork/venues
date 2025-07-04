<script lang="ts">
	import { base } from '$app/paths';
	import {
		Upload,
		FileText,
		GitBranch,
		AlertCircle,
		ExternalLink,
		FileSearch
	} from '@lucide/svelte';
</script>

<div class="card bg-base-100 h-full">
	<div class="card-body flex h-full flex-col p-0">
		<div class="flex-grow overflow-y-auto p-3 sm:p-6 lg:p-8">
			<div class="mx-auto max-w-4xl space-y-6 sm:space-y-8">
				<div class="space-y-3 text-center sm:space-y-4">
					<h1 class="text-2xl font-bold sm:text-3xl lg:text-4xl">Contribute</h1>
					<p class="text-base-content/70 text-base sm:text-lg">Add data to the venue index</p>
				</div>

				<div class="card from-neutral/5 to-base-200/50 bg-gradient-to-br">
					<div class="card-body p-4 sm:p-6">
						<h2 class="card-title mb-3 text-xl sm:mb-4 sm:text-2xl">How to Contribute</h2>

						<div class="space-y-4 sm:space-y-6">
							<div class="prose prose-sm max-w-none">
								<ol
									class="list list-inside list-decimal space-y-2 text-xs sm:space-y-3 sm:text-sm [&>li::marker]:font-bold"
								>
									<li class="leading-relaxed">
										<strong>Download the template file below.</strong>
										<br />
										Choose either the TSV or Excel format to get started.
									</li>
									<li class="leading-relaxed">
										<strong>Fill in the required information for each venue.</strong>
										<br />
										Refer to the field descriptions in the table below for guidance.
									</li>
									<li class="leading-relaxed">
										<strong>Save your completed file.</strong>
										<br />
										Use a clear filename, such as
										<code class="bg-base-300 rounded px-1.5 py-0.5 text-xs break-all"
											>your-dataset-name.tsv</code
										>
										(tab-separated values) or
										<code class="bg-base-300 rounded px-1.5 py-0.5 text-xs break-all"
											>your-dataset-name.xlsx</code
										> (Excel spreadsheet).
									</li>
									<li class="leading-relaxed">
										<strong>Submit your file using one of the following methods:</strong>
										<ul class="mt-2 ml-4 list-disc space-y-2 sm:ml-6">
											<li class="text-xs leading-relaxed sm:text-sm">
												<strong>Open an Issue:</strong>
												Attach your TSV or Excel file and provide the required dataset metadata (see
												below).
												<br />
											</li>
											<li class="text-xs leading-relaxed sm:text-sm">
												<strong>Create a Pull Request:</strong>
												Fork the repository, add your TSV and a generated JSON-LD file, and submit a
												pull request.
												<br />
												To generate the JSON-LD file, run:
												<code class="bg-base-300 rounded px-1.5 py-0.5 text-xs break-all">
													node scripts/tsv_to_jsonld.ts
												</code>
												<br />
												Before running the script, update
												<code class="bg-base-300 rounded px-1.5 py-0.5 text-xs break-all"
													>static/index.json</code
												>
												with your dataset metadata.
												<br />
											</li>
										</ul>
									</li>
								</ol>
							</div>

							<div class="space-y-3 sm:space-y-4">
								<h5 class="flex items-center gap-2 text-sm font-semibold sm:text-base">
									Choose Your Submission Method
								</h5>
								<div class="grid gap-3 sm:gap-4 lg:grid-cols-2">
									<div class="card bg-secondary/10">
										<div class="card-body p-3 sm:p-4">
											<h5 class="mb-2 flex items-center gap-2 text-sm font-semibold">
												<AlertCircle size={14} class="sm:size-4" />
												Submit via Issue
											</h5>
											<p class="text-base-content/70 mb-3 text-xs leading-relaxed">
												Open an issue and attach your TSV or Excel file, along with metadata about
												your dataset.
											</p>
											<a
												href="https://github.com/HoMERNetwork/venues/issues"
												class="btn btn-secondary btn-sm w-full sm:w-auto"
												target="_blank"
											>
												<GitBranch size={12} class="sm:size-3.5" />
												Open Issue
											</a>
										</div>
									</div>

									<div class="card bg-primary/10">
										<div class="card-body p-3 sm:p-4">
											<h5 class="mb-2 flex items-center gap-2 text-sm font-semibold">
												<Upload size={14} class="sm:size-4" />
												Submit via Pull Request
											</h5>
											<p class="text-base-content/70 mb-3 text-xs leading-relaxed">
												Fork the repository, add your TSV and a generated JSON-LD file, and submit a
												pull request.
											</p>
											<a
												href="https://github.com/HoMERNetwork/venues"
												class="btn btn-primary btn-sm mt-3 w-full sm:w-auto"
												target="_blank"
											>
												<ExternalLink size={12} class="sm:size-3.5" />
												Visit Repository
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="card from-neutral/5 to-base-200/50 bg-gradient-to-br">
					<div class="card-body p-4 sm:p-6">
						<h3 class="card-title mb-3 flex items-center gap-2 text-lg sm:mb-4 sm:gap-3 sm:text-xl">
							Data Template
						</h3>

						<div class="mb-3 space-y-2 sm:mb-4">
							<div class="flex flex-col flex-wrap gap-2 sm:flex-row">
								<a
									href="{base}/template.tsv"
									class="btn btn-xs btn-outline flex-1 gap-1 sm:flex-none"
									download
								>
									<FileText class="h-3 w-3" />
									<span class="text-xs">Download template (TSV)</span>
								</a>
								<a
									href="{base}/template.xltx"
									class="btn btn-xs btn-outline flex-1 gap-1 sm:flex-none"
									download
								>
									<FileText class="h-3 w-3" />
									<span class="text-xs">Download template (Excel)</span>
								</a>
								<a
									href="{base}/example.tsv"
									class="btn btn-xs btn-outline flex-1 gap-1 sm:flex-none"
									download
								>
									<FileSearch class="h-3 w-3" />
									<span class="text-xs">Download example (TSV)</span>
								</a>
							</div>
						</div>

						<div class="-mx-4 overflow-x-auto sm:mx-0">
							<div class="min-w-full px-4 sm:px-0">
								<table class="table-zebra table-sm table w-full">
									<thead>
										<tr>
											<th class="text-xs font-semibold">Field</th>
											<th class="text-xs font-semibold">Description</th>
											<th class="hidden text-xs font-semibold sm:table-cell">Example</th>
											<th class="text-xs font-semibold">Status</th>
										</tr>
									</thead>
									<tbody class="text-xs">
										<tr>
											<td class="font-mono"><code class="text-xs">id</code></td>
											<td class="leading-relaxed">Unique identifier for the venue</td>
											<td class="hidden text-xs break-all sm:table-cell"
												>http://www.cinemacontext.nl/id/B000016</td
											>
											<td><div class="badge badge-info badge-xs">Optional</div></td>
										</tr>
										<tr>
											<td class="font-mono"><code class="text-xs">name</code></td>
											<td class="leading-relaxed">Name of the venue</td>
											<td class="hidden text-xs sm:table-cell">Kriterion</td>
											<td><div class="badge badge-success badge-xs">Required</div></td>
										</tr>
										<tr>
											<td class="font-mono"><code class="text-xs">description</code></td>
											<td class="leading-relaxed">Detailed description</td>
											<td class="hidden text-xs sm:table-cell"
												>Filmtheater Kriterion, officieel...</td
											>
											<td><div class="badge badge-info badge-xs">Optional</div></td>
										</tr>
										<tr>
											<td class="font-mono"><code class="text-xs">additionalTypeId</code></td>
											<td class="leading-relaxed"
												>ID for venue type, split multiple values by semicolon (;)</td
											>
											<td class="hidden text-xs sm:table-cell">cinema</td>
											<td><div class="badge badge-info badge-xs">Optional</div></td>
										</tr>
										<tr>
											<td class="font-mono"><code class="text-xs">additionalTypeName</code></td>
											<td class="leading-relaxed"
												>Type of venue, split multiple values by semicolon (;)</td
											>
											<td class="hidden text-xs sm:table-cell">Art house cinema</td>
											<td><div class="badge badge-info badge-xs">Optional</div></td>
										</tr>
										<tr>
											<td class="font-mono"><code class="text-xs">startDate</code></td>
											<td class="leading-relaxed">Date when venue opened (YYYY-MM-DD)</td>
											<td class="hidden text-xs sm:table-cell">1945-11-06</td>
											<td><div class="badge badge-success badge-xs">Required</div></td>
										</tr>
										<tr>
											<td class="font-mono"><code class="text-xs">endDate</code></td>
											<td class="leading-relaxed">Date when venue closed (YYYY-MM-DD)</td>
											<td class="hidden text-xs sm:table-cell">(Empty when still in operation)</td>
											<td><div class="badge badge-info badge-xs">Optional</div></td>
										</tr>
										<tr>
											<td class="font-mono"><code class="text-xs">addressLocality</code></td>
											<td class="leading-relaxed">City</td>
											<td class="hidden text-xs sm:table-cell">Amsterdam</td>
											<td><div class="badge badge-info badge-xs">Optional</div></td>
										</tr>
										<tr>
											<td class="font-mono"><code class="text-xs">addressRegion</code></td>
											<td class="leading-relaxed">Province/state code</td>
											<td class="hidden text-xs sm:table-cell">NH</td>
											<td><div class="badge badge-info badge-xs">Optional</div></td>
										</tr>
										<tr>
											<td class="font-mono"><code class="text-xs">postalCode</code></td>
											<td class="leading-relaxed">Postal code</td>
											<td class="hidden text-xs sm:table-cell">1012</td>
											<td><div class="badge badge-info badge-xs">Optional</div></td>
										</tr>
										<tr>
											<td class="font-mono"><code class="text-xs">streetAddress</code></td>
											<td class="leading-relaxed">Street address</td>
											<td class="hidden text-xs sm:table-cell">Roetersstraat 170</td>
											<td><div class="badge badge-info badge-xs">Optional</div></td>
										</tr>
										<tr>
											<td class="font-mono"><code class="text-xs">latitude</code></td>
											<td class="leading-relaxed">Geographic latitude</td>
											<td class="hidden text-xs sm:table-cell">52.3625</td>
											<td><div class="badge badge-success badge-xs">Required</div></td>
										</tr>
										<tr>
											<td class="font-mono"><code class="text-xs">longitude</code></td>
											<td class="leading-relaxed">Geographic longitude</td>
											<td class="hidden text-xs sm:table-cell">4.910556</td>
											<td><div class="badge badge-success badge-xs">Required</div></td>
										</tr>
										<tr>
											<td class="font-mono"><code class="text-xs">citation</code></td>
											<td class="leading-relaxed"
												>Bibliographic reference, split multiple values by semicolon (;)</td
											>
											<td class="hidden text-xs sm:table-cell">Cinema Context</td>
											<td><div class="badge badge-info badge-xs">Optional</div></td>
										</tr>
										<tr>
											<td class="font-mono"><code class="text-xs">sameAs</code></td>
											<td class="leading-relaxed"
												>External identifier URL, split multiple values by semicolon (;)</td
											>
											<td class="hidden text-xs break-all sm:table-cell"
												>http://www.cinemacontext.nl/id/B000016</td
											>
											<td><div class="badge badge-info badge-xs">Optional</div></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<div class="mx-0 mt-3 sm:mt-4">
							<div
								class="alert bg-info bg-opacity-20 text-info-content flex items-start gap-2 rounded-lg p-3 text-xs sm:text-sm"
							>
								<AlertCircle size={16} class="mt-0.5 flex-shrink-0 sm:size-[18px]" />
								<div>
									<strong class="mb-1 block">Note</strong>
									<p class="leading-relaxed">
										For fields that allow multiple values (<code class="font-mono text-xs"
											>additionalTypeId</code
										>,
										<code class="font-mono text-xs">additionalTypeName</code>,
										<code class="font-mono text-xs">citation</code>,
										<code class="font-mono text-xs">sameAs</code>), separate each value with a
										semicolon (<code class="font-mono text-xs">;</code>) character.
										<br /><br />
										If the <code class="font-mono text-xs">additionalTypeId</code> and
										<code class="font-mono text-xs">additionalTypeName</code>
										fields are left empty, the type will be
										<code class="font-mono text-xs">Venue</code> by default.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="card from-neutral/5 to-base-200/50 bg-gradient-to-br">
					<div class="card-body p-4 sm:p-6">
						<h3 class="card-title mb-3 flex items-center gap-2 text-lg sm:mb-4 sm:gap-3 sm:text-xl">
							Dataset Metadata
						</h3>

						<div class="-mx-4 overflow-x-auto sm:mx-0">
							<div class="min-w-full px-4 sm:px-0">
								<table class="table-zebra table-sm table w-full">
									<thead>
										<tr>
											<th class="text-xs font-semibold">Field</th>
											<th class="text-xs font-semibold">Description</th>
											<th class="hidden text-xs font-semibold sm:table-cell">Example</th>
											<th class="text-xs font-semibold">Status</th>
										</tr>
									</thead>
									<tbody class="text-xs">
										<tr>
											<td class="font-mono"><code class="text-xs">name</code></td>
											<td class="leading-relaxed">Title of your dataset</td>
											<td class="hidden text-xs sm:table-cell">Cinema Context</td>
											<td><div class="badge badge-success badge-xs">Required</div></td>
										</tr>
										<tr>
											<td class="font-mono"><code class="text-xs">description</code></td>
											<td class="leading-relaxed"
												>Brief description of the dataset content and scope</td
											>
											<td class="hidden text-xs sm:table-cell"
												>Cinema Context is a database of Dutch cinema and film culture.</td
											>
											<td><div class="badge badge-success badge-xs">Required</div></td>
										</tr>
										<tr>
											<td class="font-mono"><code class="text-xs">citation</code></td>
											<td class="leading-relaxed"
												>How to cite your dataset (include URL if applicable)</td
											>
											<td class="hidden text-xs break-all sm:table-cell"
												>Cinema Context. n.d. Cinema Context. https://www.cinemacontext.nl/</td
											>
											<td><div class="badge badge-success badge-xs">Required</div></td>
										</tr>
										<tr>
											<td class="font-mono"><code class="text-xs">url</code></td>
											<td class="leading-relaxed">URL to the original source or project website</td>
											<td class="hidden text-xs break-all sm:table-cell"
												>https://www.cinemacontext.nl/</td
											>
											<td><div class="badge badge-info badge-xs">Optional</div></td>
										</tr>
										<tr>
											<td class="font-mono"><code class="text-xs">dateModified</code></td>
											<td class="leading-relaxed"
												>Date when the dataset was last updated (YYYY-MM-DD)</td
											>
											<td class="hidden text-xs sm:table-cell">2025-03-20</td>
											<td><div class="badge badge-info badge-xs">Optional</div></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
