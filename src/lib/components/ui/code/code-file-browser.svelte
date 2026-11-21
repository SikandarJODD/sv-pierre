<script lang="ts">
	import Root from '../code-block/code-block.svelte';
	import CopyButton from '../code-block/code-block-copy-button.svelte';
	import HighlightedCode from './highlighted-code.svelte';
	import type { CodeBlock as CodeBlockData } from './types.js';
	import * as Select from '#lib/components/ui/select/index.js';
	import { Markdown, Svelte, Terminal, TypeScript } from '#lib/components/icons/index.js';
	import { untrack } from 'svelte';
	import { toConsumerExampleCode } from './to-consumer-example-code.js';

	let { code }: { code: CodeBlockData[] } = $props();
	let selectedFilename = $state(untrack(() => code[0]?.filename));
	let selectedCode = $derived(code.find((item) => item.filename === selectedFilename) ?? code[0]);
	const consumerCode = $derived(toConsumerExampleCode(selectedCode.filecode));
</script>

<div class="w-full overflow-hidden rounded-xl border">
	<div class="flex h-11 items-center justify-between gap-3 border-b bg-muted/30 px-2">
		<Select.Root type="single" bind:value={selectedFilename}>
			<Select.Trigger
				size="sm"
				aria-label="Select code file"
				class="max-w-[calc(100%-3rem)] border-0 bg-transparent font-mono text-xs shadow-none hover:bg-muted dark:bg-transparent dark:hover:bg-muted"
			>
				{#if selectedCode.lang === 'svelte'}
					<Svelte class="size-3.5" />
				{:else if selectedCode.lang === 'typescript'}
					<TypeScript class="size-3.5" />
				{:else if selectedCode.lang === 'markdown'}
					<Markdown class="size-3.5" />
				{:else}
					<Terminal class="size-3.5" />
				{/if}
				<span class="truncate">{selectedCode.filename}</span>
			</Select.Trigger>

			<Select.Content class="p-0.5 shadow-sm">
				{#each code as item (item.filename)}
					<Select.Item value={item.filename} label={item.filename}>
						{#if item.lang === 'svelte'}
							<Svelte class="size-3.5" />
						{:else if item.lang === 'typescript'}
							<TypeScript class="size-3.5" />
						{:else if item.lang === 'markdown'}
							<Markdown class="size-3.5" />
						{:else}
							<Terminal class="size-3.5" />
						{/if}
						<span class="font-mono text-xs">{item.filename}</span>
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>

		<CopyButton
			size="icon-md"
			variant="secondary"
			class="shrink-0 text-muted-foreground"
			value={consumerCode}
		/>
	</div>

	<div
		class="relative scrollbar-hidden max-h-[550px] min-h-[32rem] w-full scroll-fade overflow-x-hidden overflow-y-auto border-none"
	>
		<Root class="h-full rounded-none border-0 dark:bg-transparent">
			<HighlightedCode
				code={consumerCode}
				lang={selectedCode.lang}
				highlight={selectedCode.highlight}
				hideLines={false}
				class="scrollbar-hidden"
			/>
		</Root>
	</div>
</div>
