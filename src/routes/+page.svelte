<script lang="ts">
	import AiChatExample from '#lib/components/examples/ai-chat-example.svelte';
	import aiChatExampleCode from '#lib/components/examples/ai-chat-example.svelte?raw';
	import MarkdownCodeExample from '#lib/components/examples/markdown-code-example.svelte';
	import markdownCodeExampleCode from '#lib/components/examples/markdown-code-example.svelte?raw';
	import MarkdownExample from '#lib/components/examples/markdown-example.svelte';
	import markdownExampleCode from '#lib/components/examples/markdown-example.svelte?raw';
	import StreamingCodeExample from '#lib/components/examples/streaming-code-example.svelte';
	import streamingCodeExampleCode from '#lib/components/examples/streaming-code-example.svelte?raw';
	import { CodeFrame } from '#lib/components/ui/code/index.js';
	import { FaviconLink } from '#lib/components/ui/favicon-link/index.js';
	// import { Kbd } from '#lib/components/ui/kbd/index.js';
	import { PMCommand } from '#lib/components/ui/pm-command/index.js';
	import { PreviewComponent } from '#lib/components/ui/preview-component/index.js';
	import { JsonLd, MetaTags } from 'svelte-meta-tags';

	const title = 'Pierre Words for Svelte';
	const description =
		'Render static or streaming Markdown in Svelte with incremental DOM updates and optional syntax highlighting.';
	const socialImage = 'https://raw.githubusercontent.com/SikandarJODD/sv-pierre/main/static/og.png';

	const usageCode = `<script lang="ts">
	import { Markdown } from '@sv-pierre/words';
${'</' + 'script>'}

<Markdown source="# Hello, **Svelte**" />`;
</script>

<MetaTags
	{title}
	{description}
	robots="index,follow"
	additionalRobotsProps={{ maxSnippet: -1, maxImagePreview: 'large', maxVideoPreview: -1 }}
	openGraph={{
		type: 'website',
		title,
		description,
		siteName: title,
		images: [
			{
				url: socialImage,
				width: 1200,
				height: 630,
				type: 'image/png',
				alt: 'Pierre Words for Svelte'
			}
		]
	}}
	twitter={{
		cardType: 'summary_large_image',
		creator: '@Sikandar_Bhide',
		creatorId: '1595792880576401408',
		title,
		description,
		image: socialImage,
		imageAlt: 'Pierre Words for Svelte'
	}}
/>

<JsonLd
	schema={{
		'@type': 'SoftwareSourceCode',
		name: title,
		description,
		codeRepository: 'https://github.com/SikandarJODD/sv-pierre',
		programmingLanguage: 'TypeScript',
		runtimePlatform: 'Svelte 5',
		license: 'https://opensource.org/license/mit',
		author: {
			'@type': 'Person',
			name: 'Bhide Svelte',
			url: 'https://bhide.dev'
		},
		isBasedOn: {
			'@type': 'SoftwareSourceCode',
			name: 'Pierre Words',
			url: 'https://diffs.com/words',
			codeRepository: 'https://github.com/pierrecomputer/pierre'
		}
	}}
/>

<main class="typeset typeset-docs mx-auto max-w-[42rem] min-w-0 px-5 py-12 sm:py-20">
	<header>
		<h1 class="mt-0 text-[2.125rem] leading-[1.1] sm:text-[2.3rem]">{title}</h1>
		<p class="max-w-[38rem] text-[1.05rem] leading-7 text-muted-foreground">
			{description}
		</p>
		<p class="mt-5 text-sm text-muted-foreground">
			Unofficial Svelte integration by
			<FaviconLink class="mx-0.5 no-underline hover:no-underline" href="https://bhide.dev">
				Bhide Svelte
			</FaviconLink>. Built on
			<FaviconLink class="mx-0.5 no-underline hover:no-underline" href="https://diffs.com/words">
				Pierre Words
			</FaviconLink>.
		</p>
		<!-- <p class="mt-3 text-sm text-muted-foreground">Press <Kbd>D</Kbd> to switch theme.</p> -->
	</header>

	<section aria-labelledby="installation">
		<h2 id="installation">Installation</h2>
		<PMCommand
			class="mt-4"
			title="Install @sv-pierre/words"
			command="add"
			args={['@sv-pierre/words']}
			variant="default"
		/>
	</section>

	<section aria-labelledby="features">
		<h2 id="features">Features</h2>
		<p>Stream partial Markdown as it arrives and update only the DOM that changed.</p>
		<ul>
			<li>Parse CommonMark, GFM, tables, task lists, and footnotes.</li>
			<li>Add syntax highlighting and line numbers when needed.</li>
			<li>Enable math, CJK support, incomplete parsing, or streaming carets.</li>
		</ul>
	</section>

	<section aria-labelledby="usage">
		<h2 id="usage">Usage</h2>
		<div class="mt-4">
			<CodeFrame
				code={{
					filename: 'code.svelte',
					filecode: usageCode,
					lang: 'svelte',
					hideLines: true
				}}
			/>
		</div>
	</section>

	<section aria-labelledby="examples">
		<h2 id="examples">Examples</h2>

		<h3>Markdown text</h3>
		<p>Pass a Markdown string to <code>source</code> and render it as HTML.</p>
		<div data-not-typeset>
			<PreviewComponent
				code={{
					filename: 'markdown-example.svelte',
					filecode: markdownExampleCode,
					lang: 'svelte'
				}}
				showRetry={false}
				isCentered={false}
			>
				<MarkdownExample />
			</PreviewComponent>
		</div>

		<h3>Markdown with code</h3>
		<p>Add the Pierre Highlights plugin to render fenced code blocks with light and dark themes.</p>
		<div data-not-typeset>
			<PreviewComponent
				code={{
					filename: 'markdown-code-example.svelte',
					filecode: markdownCodeExampleCode,
					lang: 'svelte'
				}}
				showRetry={false}
				isCentered={false}
			>
				<MarkdownCodeExample />
			</PreviewComponent>
		</div>

		<h3>AI chat</h3>
		<p>
			Pass the full response received so far and keep <code>streaming</code> enabled until the response
			ends.
		</p>
		<div data-not-typeset>
			<PreviewComponent
				code={{
					filename: 'ai-chat-example.svelte',
					filecode: aiChatExampleCode,
					lang: 'svelte',
					highlight: [48]
				}}
				showRetry={false}
				isCentered={false}
			>
				<AiChatExample />
			</PreviewComponent>
		</div>

		<h3>Streaming Markdown with code</h3>
		<p>
			Combine streaming, incomplete Markdown parsing, and light/dark syntax highlighting in one
			response.
		</p>
		<div data-not-typeset>
			<PreviewComponent
				code={{
					filename: 'streaming-code-example.svelte',
					filecode: streamingCodeExampleCode,
					lang: 'svelte'
				}}
				showRetry={false}
				isCentered={false}
			>
				<StreamingCodeExample />
			</PreviewComponent>
		</div>

		<p class="mt-8 text-sm text-muted-foreground">
			Missing something?
			<FaviconLink href="https://x.com/messages/compose?recipient_id=1595792880576401408">
				DM me on X
			</FaviconLink>. Found a bug?
			<FaviconLink href="https://github.com/SikandarJODD/sv-pierre/issues">
				Open an issue
			</FaviconLink>.
		</p>
	</section>

	<section aria-labelledby="credits">
		<h2 id="credits">Credits</h2>
		<p>
			Built on
			<FaviconLink href="https://diffs.com/words">Pierre Words</FaviconLink> and
			<FaviconLink href="https://diffs.com/highlights">Pierre Highlights</FaviconLink>. This project
			is not maintained or endorsed by Pierre.
		</p>
	</section>

	<footer data-not-typeset class="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<p>
				Built by
				<FaviconLink class="mx-0.5 no-underline hover:no-underline" href="https://bhide.dev">
					Bhide Svelte
				</FaviconLink>
			</p>

			<nav aria-label="Project links" class="flex flex-wrap items-center gap-x-4 gap-y-2">
				<FaviconLink
					class="mx-0 no-underline hover:no-underline"
					href="https://npmx.dev/package/@sv-pierre/words"
				>
					npmx
				</FaviconLink>
				<FaviconLink
					class="mx-0 no-underline hover:no-underline"
					href="https://www.npmjs.com/package/@sv-pierre/words"
					faviconSrc="https://www.google.com/s2/favicons?domain=npmjs.com&sz=64"
				>
					npm
				</FaviconLink>
				<FaviconLink
					class="mx-0 no-underline hover:no-underline"
					href="https://github.com/SikandarJODD/sv-pierre"
				>
					GitHub
				</FaviconLink>
			</nav>
		</div>
	</footer>
</main>
