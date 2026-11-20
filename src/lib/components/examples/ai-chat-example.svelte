<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Markdown } from '#lib/pierre/words/index.js';
	import { Button } from '../ui/button';

	const response = `Svelte updates the page when reactive state changes.

Use \`$state\` for local state and read it directly in your markup.`;

	let source = $state(response);
	let streaming = $state(false);
	let timer: ReturnType<typeof setInterval> | undefined;

	function replay() {
		if (timer) clearInterval(timer);

		let offset = 0;
		source = '';
		streaming = true;

		timer = setInterval(() => {
			offset += 2;
			source = response.slice(0, offset);

			if (offset >= response.length) {
				if (timer) clearInterval(timer);
				timer = undefined;
				streaming = false;
			}
		}, 24);
	}

	onDestroy(() => {
		if (timer) clearInterval(timer);
	});
</script>

<div class="w-full overflow-hidden">
	<Button
		type="button"
		variant="secondary"
		class="rounded-full px-4"
		onclick={replay}
		disabled={streaming}
	>
		{streaming ? 'Writing…' : 'Replay'}
	</Button>
	<Markdown {source} {streaming} />
</div>
