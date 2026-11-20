<script lang="ts">
	import { Markdown, markdownPlugins } from '#lib/pierre/words/index.js';

	const source = `A small Svelte counter:

\`\`\`svelte
<script lang="ts">
  let count = $state(0);
<\/script>

<button onclick={() => count++}>
  Count: {count}
</button>
\`\`\``;
</script>

<div data-not-typeset class="mt-4 overflow-hidden rounded-lg border border-input bg-card p-4 sm:p-5">
	<Markdown {source} options={{ plugins: markdownPlugins }} />
</div>
