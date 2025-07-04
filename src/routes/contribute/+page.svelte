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
		<div class="flex-grow overflow-y-auto p-6 sm:p-8">
			<div class="mx-auto max-w-4xl space-y-8">
				<div class="space-y-4 text-center">
					<h1 class="text-3xl font-bold md:text-4xl">Contribute</h1>
					<p class="text-base-content/70 text-lg">Add data to the venue index</p>
				</div>

				<div class="card from-neutral/5 to-base-200/50 bg-gradient-to-br">
					<div class="card-body">
						<h2 class="card-title mb-4 text-2xl">How to Contribute</h2>

						<div class="space-y-6">
							<div class="prose prose-sm max-w-none">
								<ol
									class="list list-inside list-decimal space-y-3 text-sm [&>li::marker]:font-bold"
								>
									<li>
										<strong>Download the template file below.</strong>
										<br />
										Choose either the TSV or Excel format to get started.
									</li>
									<li>
										<strong>Fill in the required information for each venue.</strong>
										<br />
										Refer to the field descriptions in the table below for guidance.
									</li>
									<li>
										<strong>Save your completed file.</strong>
										<br />
										Use a clear filename, such as
										<code class="bg-base-300 rounded px-2 py-0.5 text-xs"
											>your-dataset-name.tsv</code
										>
										(tab-separated values) or
										<code class="bg-base-300 rounded px-2 py-0.5 text-xs"
											>your-dataset-name.xlsx</code
										> (Excel spreadsheet).
									</li>
									<li>
										<strong>Submit your file using one of the following methods:</strong>
										<ul class="mt-2 ml-6 list-disc space-y-2">
											<li>
												<strong>Open an Issue:</strong>
												Attach your TSV or Excel file and provide the required dataset metadata (see
												below).
												<br />
											</li>
											<li>
												<strong>Create a Pull Request:</strong>
												Fork the repository, add your TSV and a generated JSON-LD file, and submit a
												pull request.
												<br />
												To generate the JSON-LD file, run:
												<code class="bg-base-300 rounded px-2 py-0.5 text-xs">
													node scripts/tsv_to_jsonld.ts
												</code>
												<br />
												Before running the script, update
												<code class="bg-base-300 rounded px-2 py-0.5 text-xs"
													>static/index.json</code
												>
												with your dataset metadata.
												<br />
											</li>
										</ul>
									</li>
								</ol>
							</div>

							<div class="space-y-4">
								<h5 class="flex items-center gap-2 font-semibold">Choose Your Submission Method</h5>
								<div class="grid gap-4 md:grid-cols-2">
									<div class="card bg-secondary/10">
										<div class="card-body p-4">
											<h5 class="mb-2 flex items-center gap-2 font-semibold">
												<AlertCircle size={16} />
												Submit via Issue
											</h5>
											<p class="text-base-content/70 mb-3 text-xs">
												Open an issue and attach your TSV or Excel file, along with metadata about
												your dataset.
											</p>
											<a
												href="https://github.com/HoMERNetwork/venues/issues"
												class="btn btn-secondary btn-sm"
												target="_blank"
											>
												<GitBranch size={14} />
												Open Issue
											</a>
										</div>
									</div>

									<div class="card bg-primary/10">
										<div class="card-body p-4">
											<h5 class="mb-2 flex items-center gap-2 font-semibold">
												<Upload size={16} />
												Submit via Pull Request
											</h5>
											<p class="text-base-content/70 mb-3 text-xs">
												Fork the repository, add your TSV and a generated JSON-LD file, and submit a
												pull request.
											</p>
											<a
												href="https://github.com/HoMERNetwork/venues"
												class="btn btn-primary btn-sm mt-3"
												target="_blank"
											>
												<ExternalLink size={14} />
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
					<div class="card-body">
						<h3 class="card-title mb-4 flex items-center gap-3 text-xl">Data Template</h3>

						<div class="mb-4 space-y-2">
							<div class="flex flex-wrap gap-2">
								<a href="{base}/template.tsv" class="btn btn-xs btn-outline gap-1" download>
									<FileText class="h-3 w-3" />
									Download template (TSV)
								</a>
								<a href="{base}/template.xltx" class="btn btn-xs btn-outline gap-1" download>
									<FileText class="h-3 w-3" />
									Download template (Excel Template)
								</a>
								<a href="{base}/example.tsv" class="btn btn-xs btn-outline gap-1" download>
									<FileSearch class="h-3 w-3" />
									Download example (TSV)
								</a>
							</div>
						</div>

						<div class="overflow-x-auto">
							<table class="table-zebra table-sm table">
								<thead>
									<tr>
										<th>Field</th>
										<th>Description</th>
										<th>Example</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td><code class="text-xs">id</code></td>
										<td>Unique identifier for the venue</td>
										<td class="text-sm">http://www.cinemacontext.nl/id/B000016</td>
										<td><div class="badge badge-info badge-xs">Optional</div></td>
									</tr>
									<tr>
										<td><code class="text-xs">name</code></td>
										<td>Name of the venue</td>
										<td class="text-sm">Kriterion</td>
										<td><div class="badge badge-success badge-xs">Required</div></td>
									</tr>
									<tr>
										<td><code class="text-xs">description</code></td>
										<td>Detailed description</td>
										<td class="text-sm">Filmtheater Kriterion, officieel...</td>
										<td><div class="badge badge-info badge-xs">Optional</div></td>
									</tr>
									<tr>
										<td><code class="text-xs">additionalTypeId</code></td>
										<td>ID for venue type, split multiple values by semicolon (;)</td>
										<td class="text-sm">cinema</td>
										<td><div class="badge badge-info badge-xs">Optional</div></td>
									</tr>
									<tr>
										<td><code class="text-xs">additionalTypeName</code></td>
										<td>Type of venue, split multiple values by semicolon (;)</td>
										<td class="text-sm">Art house cinema</td>
										<td><div class="badge badge-info badge-xs">Optional</div></td>
									</tr>
									<tr>
										<td><code class="text-xs">startDate</code></td>
										<td>Date when venue opened (YYYY-MM-DD)</td>
										<td class="text-sm">1945-11-06</td>
										<td><div class="badge badge-success badge-xs">Required</div></td>
									</tr>
									<tr>
										<td><code class="text-xs">endDate</code></td>
										<td>Date when venue closed (YYYY-MM-DD)</td>
										<td class="text-sm">(Empty when still in operation)</td>
										<td><div class="badge badge-info badge-xs">Optional</div></td>
									</tr>
									<tr>
										<td><code class="text-xs">addressLocality</code></td>
										<td>City</td>
										<td class="text-sm">Amsterdam</td>
										<td><div class="badge badge-info badge-xs">Optional</div></td>
									</tr>
									<tr>
										<td><code class="text-xs">addressRegion</code></td>
										<td>Province/state code</td>
										<td class="text-sm">NH</td>
										<td><div class="badge badge-info badge-xs">Optional</div></td>
									</tr>
									<tr>
										<td><code class="text-xs">postalCode</code></td>
										<td>Postal code</td>
										<td class="text-sm">1012</td>
										<td><div class="badge badge-info badge-xs">Optional</div></td>
									</tr>
									<tr>
										<td><code class="text-xs">streetAddress</code></td>
										<td>Street address</td>
										<td class="text-sm">Roetersstraat 170</td>
										<td><div class="badge badge-info badge-xs">Optional</div></td>
									</tr>
									<tr>
										<td><code class="text-xs">latitude</code></td>
										<td>Geographic latitude</td>
										<td class="text-sm">52.3625</td>
										<td><div class="badge badge-success badge-xs">Required</div></td>
									</tr>
									<tr>
										<td><code class="text-xs">longitude</code></td>
										<td>Geographic longitude</td>
										<td class="text-sm">4.910556</td>
										<td><div class="badge badge-success badge-xs">Required</div></td>
									</tr>
									<tr>
										<td><code class="text-xs">citation</code></td>
										<td>Bibliographic reference, split multiple values by semicolon (;)</td>
										<td class="text-sm">Cinema Context</td>
										<td><div class="badge badge-info badge-xs">Optional</div></td>
									</tr>
									<tr>
										<td><code class="text-xs">sameAs</code></td>
										<td>External identifier URL, split multiple values by semicolon (;)</td>
										<td class="text-sm">http://www.cinemacontext.nl/id/B000016</td>
										<td><div class="badge badge-info badge-xs">Optional</div></td>
									</tr>
								</tbody>
							</table>
						</div>

						<div class="mx-0 mt-4">
							<div
								class="alert bg-info bg-opacity-20 text-info-content flex items-start gap-2 rounded-lg p-3 text-xs sm:text-sm"
							>
								<AlertCircle size={18} class="mt-0.5 flex-shrink-0" />
								<div>
									<strong class="mb-1 block">Note</strong>
									<p>
										For fields that allow multiple values (<code>additionalTypeId</code>,
										<code>additionalTypeName</code>,
										<code>citation</code>, <code>sameAs</code>), separate each value with a
										semicolon (<code>;</code>) character.
										<br /><br />
										If the <code>additionalTypeId</code> and <code>additionalTypeName</code> fields
										are left empty, the type will be <code>Venue</code> by default.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="card from-neutral/5 to-base-200/50 bg-gradient-to-br">
					<div class="card-body">
						<h3 class="card-title mb-4 flex items-center gap-3 text-xl">Dataset Metadata</h3>

						<div class="overflow-x-auto">
							<table class="table-zebra table-sm table">
								<thead>
									<tr>
										<th>Field</th>
										<th>Description</th>
										<th>Example</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td><code class="text-xs">name</code></td>
										<td>Title of your dataset</td>
										<td class="text-sm">Cinema Context</td>
										<td><div class="badge badge-success badge-xs">Required</div></td>
									</tr>
									<tr>
										<td><code class="text-xs">description</code></td>
										<td>Brief description of the dataset content and scope</td>
										<td class="text-sm"
											>Cinema Context is a database of Dutch cinema and film culture.</td
										>
										<td><div class="badge badge-success badge-xs">Required</div></td>
									</tr>
									<tr>
										<td><code class="text-xs">citation</code></td>
										<td>How to cite your dataset (include URL if applicable)</td>
										<td class="text-sm"
											>Cinema Context. n.d. Cinema Context. https://www.cinemacontext.nl/</td
										>
										<td><div class="badge badge-success badge-xs">Required</div></td>
									</tr>
									<tr>
										<td><code class="text-xs">url</code></td>
										<td>URL to the original source or project website</td>
										<td class="text-sm">https://www.cinemacontext.nl/</td>
										<td><div class="badge badge-info badge-xs">Optional</div></td>
									</tr>
									<tr>
										<td><code class="text-xs">dateModified</code></td>
										<td>Date when the dataset was last updated (YYYY-MM-DD)</td>
										<td class="text-sm">2025-03-20</td>
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
