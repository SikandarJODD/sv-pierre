<script lang="ts">
	import type { IslandData } from '#lib/pierre/words/index.js';

	let { data }: { data: IslandData } = $props();
	let count = $state(0);
	let label = $derived(typeof data.label === 'string' ? data.label : 'Count');
</script>

<button
	type="button"
	class="rounded-lg border border-border bg-background px-4 py-2 font-medium hover:bg-muted"
	onclick={() => count++}
>
	{label}: {count}
</button>
