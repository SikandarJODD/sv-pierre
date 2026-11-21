<script lang="ts">
	import { Markdown, type SvelteIslands } from '#lib/pierre/words/index.js';
	import CounterIsland from './counter-island.svelte';

	const source = `A Svelte component mounted from Markdown:

\`\`\`island-counter
{"id":"demo-counter","label":"Votes"}
\`\`\``;

	const islands = {
		counter: {
			component: CounterIsland,
			fallback: 'Loading counter…',
			accepts: (data) => typeof data.label === 'string'
		}
	} satisfies SvelteIslands;
</script>

<div class="w-full overflow-hidden">
	<Markdown {source} {islands} />
</div>
