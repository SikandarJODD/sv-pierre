<script lang="ts">
	import { Markdown } from '#lib/pierre/words/index.js';

	const source = `## Release notes

The wrapper now supports **streaming Markdown**, task lists, and footnotes.

- [x] Render the first response
- [ ] Add the next example`;
</script>

<div data-not-typeset class="mt-4 rounded-lg border border-border bg-card p-4 sm:p-5">
	<Markdown {source} />
</div>
