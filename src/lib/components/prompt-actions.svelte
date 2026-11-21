<script lang="ts">
	import { onDestroy } from 'svelte';
	import { ChatGPT, Claude } from '#lib/components/icons/index.js';
	import { Button } from '#lib/components/ui/button/index.js';

	const docsUrl = 'https://github.com/SikandarJODD/sv-pierre';
	const installCommand = 'pnpm add @sv-pierre/words';

	const chatGptPrompt = `Read ${docsUrl}. Explain what @sv-pierre/words does and how to add it to a Svelte 5 project. Use ${installCommand}. Ask which features I need, such as streaming, syntax highlighting, math, CJK, Mermaid, line numbers, controls, or Svelte islands. Then show a short setup for those choices.`;

	const claudePrompt = `Read ${docsUrl} and the instructions in my Svelte 5 project. Ask which @sv-pierre/words features I want, such as streaming, syntax highlighting, math, CJK, Mermaid, line numbers, controls, or Svelte islands. Then run ${installCommand}, set up only my choices, and run the project checks.`;

	const copyPrompt = `Add @sv-pierre/words to this Svelte 5 project.

Read ${docsUrl} first. Ask which features I want, such as streaming, syntax highlighting, math, CJK, Mermaid, line numbers, controls, or Svelte islands. Then:

1. Run \`${installCommand}\`.
2. Add only the options I choose.
3. Show the files you changed and how to use them.
4. Run the project checks.`;

	const chatGptUrl = `https://chatgpt.com/?q=${encodeURIComponent(chatGptPrompt)}`;
	const claudeUrl = `https://claude.ai/code/new?q=${encodeURIComponent(claudePrompt)}`;

	let copied = $state(false);
	let timeout: ReturnType<typeof setTimeout> | undefined;

	function copy() {
		navigator.clipboard
			.writeText(copyPrompt)
			.then(() => {
				copied = true;
				clearTimeout(timeout);
				timeout = setTimeout(() => (copied = false), 2000);
			})
			.catch(() => {});
	}

	onDestroy(() => clearTimeout(timeout));
</script>

<div class="flex items-center justify-end gap-1" data-not-typeset>
	<Button
		href={chatGptUrl}
		target="_blank"
		rel="noreferrer"
		variant="outline"
		size="icon-sm"
		class="rounded-full shadow-none"
		aria-label="Ask ChatGPT about Pierre Words"
		title="Ask ChatGPT"
	>
		<ChatGPT aria-hidden="true" class="size-5.5" />
	</Button>
	<Button
		href={claudeUrl}
		target="_blank"
		rel="noreferrer"
		variant="outline"
		size="icon-sm"
		class="rounded-full shadow-none"
		aria-label="Open Pierre Words in Claude"
		title="Open in Claude"
	>
		<Claude aria-hidden="true" />
	</Button>
	<Button variant="outline" size="sm" class="rounded-full shadow-none" onclick={copy}>
		{copied ? 'Copied' : 'Copy Prompt'}
	</Button>
</div>
<span aria-live="polite" class="sr-only">{copied ? 'Prompt copied' : ''}</span>
