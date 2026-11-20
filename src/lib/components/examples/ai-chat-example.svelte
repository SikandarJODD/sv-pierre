<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Markdown } from '#lib/pierre/words/index.js';

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

<div data-not-typeset class="mt-4 overflow-hidden rounded-lg border border-input bg-card">
	<div class="border-b border-border bg-muted/40 px-4 py-3 sm:px-5">
		<p class="text-xs font-medium text-muted-foreground">You</p>
		<p class="mt-1 text-sm text-foreground">How does reactivity work in Svelte?</p>
	</div>

	<div class="min-h-32 px-4 py-4 sm:px-5" aria-live="polite">
		<p class="mb-2 text-xs font-medium text-muted-foreground">Assistant</p>
		<Markdown {source} {streaming} caret="circle" />
	</div>

	<div class="flex justify-end border-t border-border px-3 py-2">
		<button
			type="button"
			onclick={replay}
			disabled={streaming}
			class="cursor-pointer rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-default disabled:opacity-50"
		>
			{streaming ? 'Writing…' : 'Replay'}
		</button>
	</div>
</div>
