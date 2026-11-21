<script lang="ts">
	import { TextMorph } from 'torph/svelte';
	import { onDestroy } from 'svelte';
	import { ChatGPT, Claude } from '#lib/components/icons/index.js';
	import { Button } from '#lib/components/ui/button/index.js';

	const docsUrl = 'https://github.com/SikandarJODD/sv-pierre';
	const installCommand = 'pnpm add @sv-pierre/words';

	const chatGptPrompt = `Read ${docsUrl} and add @sv-pierre/words to my Svelte 5 project with ${installCommand}. Do not ask me anything before installing it. Once it is installed, ask what I would like to see next, such as streaming, math, or CJK support.`;

	const claudePrompt = `Read ${docsUrl} and the instructions in my Svelte 5 project. Run ${installCommand} without asking me anything first. Once it is installed, ask what I would like to see next, such as streaming, math, or CJK support.`;

	const copyPrompt = `Please add @sv-pierre/words to this Svelte 5 project.

Read ${docsUrl}, then run:

\`${installCommand}\`

Once it is installed, ask what I would like to see, such as streaming, math, or CJK support.`;

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
		class="rounded-full bg-muted shadow-none"
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
		class="rounded-full border-amber-600/20 bg-amber-600/5 shadow-none hover:bg-amber-600/10"
		aria-label="Open Pierre Words in Claude"
		title="Open in Claude"
	>
		<Claude aria-hidden="true" />
	</Button>
	<Button
		variant="outline"
		size="sm"
		class="overflow-hidden rounded-full text-[13px] font-normal shadow-none"
		onclick={copy}
	>
		<!-- {copied ? 'Copied' : 'Copy Prompt'} -->
		<TextMorph text={copied ? 'Copied' : 'Copy Prompt'} />
	</Button>
</div>
<span aria-live="polite" class="sr-only">{copied ? 'Prompt copied' : ''}</span>
