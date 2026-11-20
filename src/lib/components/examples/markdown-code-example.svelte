<script lang="ts">
	import { Markdown, markdownPlugins } from '#lib/pierre/words/index.js';

	const source = `A small Svelte counter:

\`\`\`svelte
<script lang="ts">
  let count = $state(0);
${'</' + 'script>'}

<button onclick={() => count++}>
  Count: {count}
</button>
\`\`\``;
</script>

<div class="w-full overflow-hidden">
	<Markdown {source} options={{ plugins: markdownPlugins }} />
</div>
