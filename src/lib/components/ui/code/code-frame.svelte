<script lang="ts">
	import Root from '../code-block/code-block.svelte';
	import CopyButton from '../code-block/code-block-copy-button.svelte';
	import HighlightedCode from './highlighted-code.svelte';
	import CodeBlockOverflow from './code-block-overflow.svelte';
	import * as Frame from '#lib/components/ui/frame/index.js';
	import Button from '../button/button.svelte';
	import { TypeScript, Svelte, Terminal, Markdown } from '#lib/components/icons/index.js';
	import { untrack } from 'svelte';
	import type { CodeBlock as CodeBlockData } from './types.js';
	import { toConsumerExampleCode } from './to-consumer-example-code.js';

	let { code, faded = false }: { code: CodeBlockData; faded?: boolean } = $props();
	let isCollapsed = $state(untrack(() => code.isExpand ?? false));
	const consumerCode = $derived(toConsumerExampleCode(code.filecode));
</script>

<Frame.Root class="w-full rounded-xl p-0.5">
	<Frame.Header class="flex-row items-center justify-between gap-2 py-0 pr-1 pl-4">
		<div class="flex min-w-0 items-center gap-1.5">
			{#if code.lang === 'svelte'}
				<Svelte />
			{:else if code.lang === 'typescript'}
				<TypeScript />
				<!-- {:else if code.lang === 'css'}
				<CSS /> -->
			{:else if code.lang === 'markdown'}
				<Markdown />
			{:else if code.lang === 'bash'}
				<Terminal />
			{:else}
				<Svelte />
			{/if}
			<Frame.Title class="truncate font-mono text-xs font-medium text-primary">
				{code.filename}
			</Frame.Title>
		</div>
		<div class="flex items-center gap-1">
			{#if code.isExpand}
				<Button variant="ghost" size="sm" onclick={() => (isCollapsed = !isCollapsed)}>
					{isCollapsed ? 'Expand' : 'Collapse'}
				</Button>
			{/if}
			<CopyButton value={consumerCode} size="icon-sm" class="text-muted-foreground" />
		</div>
	</Frame.Header>

	<Frame.Panel class="overflow-hidden p-0">
		{#if isCollapsed}
			<CodeBlockOverflow
				bind:collapsed={isCollapsed}
				class="scrollbar-hidden max-h-[500px] scroll-fade overflow-auto data-[collapsed=true]:overflow-y-hidden"
			>
				<Root class="min-h-50 rounded-none border-0 dark:bg-transparent">
					<HighlightedCode
						code={consumerCode}
						lang={code.lang}
						highlight={code.highlight}
						hideLines={code.hideLines}
						class="scrollbar-hidden"
					/>
				</Root>
			</CodeBlockOverflow>
		{:else if faded}
			<Root class="scrollbar-hidden h-auto scroll-fade rounded-none border-0 bg-background">
				<HighlightedCode
					code={consumerCode}
					lang={code.lang}
					highlight={code.highlight}
					hideLines={code.hideLines}
					class="scrollbar-hidden"
				/>
			</Root>
		{:else}
			<div class="scrollbar-hidden max-h-[600px] scroll-fade overflow-x-hidden overflow-y-auto">
				<Root class="h-auto rounded-none border-0 bg-background">
					<HighlightedCode
						code={consumerCode}
						lang={code.lang}
						highlight={code.highlight}
						hideLines={code.hideLines}
						class="scrollbar-hidden bg-background"
					/>
				</Root>
			</div>
		{/if}
	</Frame.Panel>
</Frame.Root>
