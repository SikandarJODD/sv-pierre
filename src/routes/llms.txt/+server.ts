import type { RequestHandler } from './$types';

export const prerender = true;

const body = `# Pierre Words for Svelte

> A Svelte 5 wrapper for Pierre Words. Render static and streaming Markdown with optional syntax highlighting, math, CJK support, and Mermaid diagrams.

## Install

\`\`\`sh
npm install @sv-pierre/words
pnpm add @sv-pierre/words
yarn add @sv-pierre/words
bun add @sv-pierre/words
\`\`\`

## Features

- Static and streaming Markdown
- CommonMark, GFM, tables, task lists, and footnotes
- Incremental DOM updates while streaming
- Optional syntax highlighting and line numbers
- Math, CJK, Mermaid, and Svelte component islands

## Usage

### Basic Markdown

\`\`\`svelte
<script lang="ts">
	import { Markdown } from '@sv-pierre/words';
</script>

<Markdown source="# Hello, **Svelte**" />
\`\`\`

### Streaming

Pass the full text received so far. Set \`streaming\` to false when the stream ends.

\`\`\`svelte
<script lang="ts">
	import { Markdown } from '@sv-pierre/words';

	const source = '# Partial response';
	const streaming = true;
</script>

<Markdown {source} {streaming} animated caret="block" />
\`\`\`

### Syntax highlighting

\`\`\`svelte
<script lang="ts">
	import { Markdown, markdownPlugins } from '@sv-pierre/words';

	const source = '\`\`\`ts\\nconst answer = 42;\\n\`\`\`';
</script>

<Markdown {source} options={{ plugins: markdownPlugins }} />
\`\`\`

### Math and CJK

\`\`\`svelte
<script lang="ts">
	import { Markdown } from '@sv-pierre/words';

	const source = 'Euler: $e^{i\\\\pi} + 1 = 0$. **重要。**请阅读。';
</script>

<Markdown {source} options={{ math: true, cjk: true }} />
\`\`\`

### Renderer options

\`\`\`svelte
<script lang="ts">
	import { Markdown } from '@sv-pierre/words';

	const source = 'Read [the docs](https://example.com). ![Image](https://example.com/image.png)';
</script>

<Markdown
	{source}
	options={{
		controls: false,
		lineNumbers: false,
		urlTransform: (url, type) => (type === 'src' ? null : url)
	}}
/>
\`\`\`

### Mermaid diagrams

Install Pele with \`pnpm add pele\`, then register the renderer.

\`\`\`svelte
<script lang="ts">
	import { createMermaidPlugin, Markdown } from '@sv-pierre/words';
	import { render } from 'pele';

	const source = '\`\`\`mermaid\\nflowchart LR\\n  A[Markdown] --> B[Svelte]\\n\`\`\`';
	const plugins = { mermaid: createMermaidPlugin({ render }) };
</script>

<Markdown {source} options={{ plugins }} />
\`\`\`

## API overview

- \`Markdown\`: renders Markdown from the \`source\` prop
- \`markdownPlugins\`: adds Pierre Highlights syntax highlighting
- \`createMermaidPlugin\`: creates a Mermaid renderer plugin
- \`IslandData\`, \`SvelteIsland\`, and \`SvelteIslands\`: types for Svelte component islands

## Links

- [Source and documentation](https://github.com/SikandarJODD/sv-pierre)
- [npm package](https://www.npmjs.com/package/@sv-pierre/words)
- [Issues](https://github.com/SikandarJODD/sv-pierre/issues)

## Credits

Built by [Bhide Svelte](https://bhide.dev) on [Pierre Words](https://diffs.com/words) and [Pierre Highlights](https://diffs.com/highlights). This project is not maintained or endorsed by Pierre.

## License

MIT
`;

export const GET: RequestHandler = () =>
	new Response(body, {
		headers: {
			'content-type': 'text/plain; charset=utf-8'
		}
	});
