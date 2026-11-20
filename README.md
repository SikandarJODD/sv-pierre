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

## Credits

Built on [Pierre Words](https://github.com/pierrecomputer/pierre/tree/main/packages/words) and [Pierre Highlights](https://github.com/pierrecomputer/pierre/tree/main/packages/highlights).

## License

[MIT](LICENSE)
