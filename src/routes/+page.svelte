<script lang="ts">
	import AiChatExample from '#lib/components/examples/ai-chat-example.svelte';
	import MarkdownCodeExample from '#lib/components/examples/markdown-code-example.svelte';
	import MarkdownExample from '#lib/components/examples/markdown-example.svelte';
	import * as CodeBlock from '#lib/components/ui/code-block/index.js';
	import { FaviconLink } from '#lib/components/ui/favicon-link/index.js';
	import { Kbd } from '#lib/components/ui/kbd/index.js';
	import { PMCommand } from '#lib/components/ui/pm-command/index.js';
	import { useHighlightedCode } from '#lib/hooks/use-highlighted-code.svelte.js';

	const usageCode = `<script lang="ts">
	import { Markdown } from '@sv-pierre/words';
<\/script>

<Markdown source="# Hello, **Svelte**" />`;

	const usageLines = useHighlightedCode(
		() => usageCode,
		() => 'svelte'
	);
</script>

<main class="typeset typeset-docs mx-auto max-w-[42rem] px-5 py-12 sm:py-20">
	<header>
		<h1>@sv-pierre/words</h1>
		<p>
			A Svelte 5 wrapper for Pierre Words. Render static or streaming Markdown with focused DOM
			updates, syntax highlighting, and the renderer options from Pierre.
		</p>
		<p class="text-sm text-muted-foreground">Press <Kbd>D</Kbd> to switch theme.</p>
	</header>

	<section aria-labelledby="installation">
		<h2 id="installation">Installation</h2>
		<PMCommand
			class="mt-4"
			title="Install @sv-pierre/words"
			command="add"
			args={['@sv-pierre/words']}
		/>
	</section>

	<section aria-labelledby="features">
		<h2 id="features">Features</h2>
		<ul>
			<li>Render static Markdown or update it while text streams in.</li>
			<li>Parse CommonMark, GFM, tables, task lists, and footnotes.</li>
			<li>Update only the DOM that changed between renders.</li>
			<li>Add syntax highlighting, line numbers, math, or CJK support when needed.</li>
			<li>Control incomplete Markdown, streaming carets, and animated updates.</li>
		</ul>
	</section>

	<section aria-labelledby="usage">
		<h2 id="usage">Usage</h2>
		<CodeBlock.Root class="mt-4">
			<CodeBlock.Header>
				<CodeBlock.Title>Svelte</CodeBlock.Title>
				<CodeBlock.Actions>
					<CodeBlock.CopyButton value={usageCode} />
				</CodeBlock.Actions>
			</CodeBlock.Header>
			<CodeBlock.Content>
				{#each usageLines.current as line, index (index)}
					<CodeBlock.Line code={line} />
				{/each}
			</CodeBlock.Content>
		</CodeBlock.Root>
	</section>

	<section aria-labelledby="examples">
		<h2 id="examples">Examples</h2>

		<h3>Markdown text</h3>
		<p>Pass a Markdown string to <code>source</code> and render it as HTML.</p>
		<MarkdownExample />

		<h3>Markdown with code</h3>
		<p>
			Add the Pierre Highlights plugin to render fenced code blocks with light and dark themes.
		</p>
		<MarkdownCodeExample />

		<h3>AI chat</h3>
		<p>
			Pass the full response received so far and keep <code>streaming</code> enabled until the
			response ends.
		</p>
		<AiChatExample />
	</section>

	<section aria-labelledby="credits">
		<h2 id="credits">Credits</h2>
		<p>
			Built on
			<FaviconLink href="https://diffs.com/docs#words">Pierre Words</FaviconLink> and
			<FaviconLink href="https://github.com/pierrecomputer/pierre/tree/main/packages/highlights"
				>Pierre Highlights</FaviconLink
			>. This wrapper is not maintained or endorsed by Pierre.
		</p>
	</section>

	<footer class="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
		<p>
			<FaviconLink href="https://npmx.dev/package/@sv-pierre/words">npmx</FaviconLink>,
			<FaviconLink href="https://www.npmjs.com/package/@sv-pierre/words">npmjs</FaviconLink>,
			<FaviconLink href="https://github.com/SikandarJODD/sv-pierre">GitHub</FaviconLink>, and
			<FaviconLink href="https://bhide.dev">Bhide</FaviconLink>
		</p>
	</footer>
</main>
