# Pierre Words for Svelte

Unofficial Svelte integration by [Bhide Svelte](https://bhide.dev?utm_source=github&utm_medium=readme&utm_campaign=sv-pierre-words).

Render static and streaming Markdown in Svelte with incremental DOM updates, syntax highlighting, math, and diagrams.

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

### Custom themes

Pass a light and dark theme to `highlight`. This example uses GitHub Light and Vesper.

```svelte
<script lang="ts">
	import { Markdown } from '@sv-pierre/words';
	import light from '@pierre/highlights/themes/github-light';
	import dark from '@pierre/highlights/themes/vesper';

	const source = `\`\`\`ts
const greeting = 'Hello';
\`\`\``;
</script>

<Markdown {source} highlight={{ themes: { light, dark }, defaultColor: 'light-dark()' }} />
```

### Renderer options

Add only the options you need.

```svelte
<script lang="ts">
	import { Markdown } from '@sv-pierre/words';

	const source = '# Hello, **Svelte**';
</script>

<!-- Set math to true to render TeX as SVG. -->
<Markdown {source} options={{ math: true }} />

<!-- Set cjk to true to allow emphasis next to CJK punctuation. -->
<Markdown {source} options={{ cjk: true }} />

<!-- Set controls to false to hide copy and download buttons. -->
<Markdown {source} options={{ controls: false }} />

<!-- Set lineNumbers to false to hide code line numbers. -->
<Markdown {source} options={{ lineNumbers: false }} />

<!-- Use urlTransform to remove image URLs while keeping links. -->
<Markdown {source} options={{ urlTransform: (url, type) => (type === 'src' ? null : url) }} />
```

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
This project is not maintained or endorsed by Pierre.

## License

[MIT](LICENSE)
