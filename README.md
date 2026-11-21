# @sv-pierre/words

Unofficial Svelte 5 wrapper for [`@pierre/words`](https://github.com/pierrecomputer/pierre/tree/main/packages/words).

Render static or streaming Markdown with fast DOM updates. This project is not maintained or endorsed by Pierre.

## Installation

```sh
pnpm add @sv-pierre/words
```

## Features

- Static and streaming Markdown
- CommonMark, GFM, tables, task lists, and footnotes
- Updates only the changed DOM
- Optional code highlighting
- Math and CJK support
- Code controls, line numbers, and streaming effects

## Usage

```svelte
<script lang="ts">
	import { Markdown } from '@sv-pierre/words';
</script>

<Markdown source="# Hello, **Svelte**" />
```

## More examples

### Streaming

Pass the full text received so far. Set `streaming` to `false` when the stream ends.

```svelte
<Markdown {source} {streaming} animated caret="block" />
```

### Code highlighting

```svelte
<script lang="ts">
	import { Markdown, markdownPlugins } from '@sv-pierre/words';
</script>

<Markdown {source} options={{ plugins: markdownPlugins }} />
```

### Renderer options

```svelte
<Markdown
	{source}
	options={{
		math: true,
		cjk: true,
		lineNumbers: true,
		disallowedElements: ['img']
	}}
/>
```

See the [`@pierre/words` docs](https://diffs.com/docs#words) for all renderer options.

### Mermaid diagrams

Install [Pele](https://pele.run), then register its renderer once.

```sh
pnpm add pele
```

```svelte
<script lang="ts">
	import { createMermaidPlugin, Markdown } from '@sv-pierre/words';
	import { render } from 'pele';

	const source = `\`\`\`mermaid
flowchart LR
  A[Markdown] --> B[Pierre Words]
  B --> C[Svelte]
\`\`\``;

	const plugins = { mermaid: createMermaidPlugin({ render }) };
</script>

<Markdown {source} options={{ plugins }} />
```

### Math and CJK

Math renders as SVG without KaTeX or MathJax. CJK mode improves emphasis around Chinese, Japanese, and Korean punctuation.

```svelte
<script lang="ts">
	import { Markdown } from '@sv-pierre/words';

	const source = `Euler's identity is $e^{i\\pi} + 1 = 0$.

**重要。**请阅读。`;
</script>

<Markdown {source} options={{ math: true, cjk: true }} />
```

### Svelte component islands

Use an `island-NAME` fence with a stable, document-unique `id` to mount an interactive Svelte component.

```svelte
<!-- Counter.svelte -->
<script lang="ts">
	import type { IslandData } from '@sv-pierre/words';

	let { data }: { data: IslandData } = $props();
	let count = $state(0);
</script>

<button onclick={() => count++}>
	{typeof data.label === 'string' ? data.label : 'Count'}: {count}
</button>
```

```svelte
<!-- App.svelte -->
<script lang="ts">
	import { Markdown, type SvelteIslands } from '@sv-pierre/words';
	import Counter from './Counter.svelte';

	const source = `\`\`\`island-counter
{"id":"article-votes","label":"Votes"}
\`\`\``;

	const islands = {
		counter: {
			component: Counter,
			fallback: 'Loading counter…',
			accepts: (data) => typeof data.label === 'string'
		}
	} satisfies SvelteIslands;
</script>

<Markdown {source} {islands} />
```

## Credits

Built on [Pierre Words](https://github.com/pierrecomputer/pierre/tree/main/packages/words) and [Pierre Highlights](https://github.com/pierrecomputer/pierre/tree/main/packages/highlights).

## License

[MIT](LICENSE)
