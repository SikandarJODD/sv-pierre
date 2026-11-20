<script lang="ts">
	import { Markdown } from '#lib/pierre/words/index.js';

	const source = `## Release notes

The wrapper now supports **streaming Markdown**, task lists, and footnotes.

- [x] Render the first response
- [ ] Add the next example`;
</script>

<div class="w-full overflow-hidden">
	<Markdown {source} />
</div>
