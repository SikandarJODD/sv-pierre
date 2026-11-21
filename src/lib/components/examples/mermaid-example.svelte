<script lang="ts">
	import { render } from 'pele';
	import { createMermaidPlugin, Markdown } from '#lib/pierre/words/index.js';

	const source = `\`\`\`mermaid
flowchart LR
  A[Markdown] --> B[Pierre Words]
  B --> C[Svelte]
\`\`\``;

	const plugins = { mermaid: createMermaidPlugin({ render }) };
</script>

<div class="w-full overflow-hidden">
	<Markdown {source} options={{ plugins }} />
</div>
