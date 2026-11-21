<script lang="ts">
	import Root from '../code-block/code-block.svelte';
	import Actions from '../code-block/code-block-actions.svelte';
	import CopyButton from '../code-block/code-block-copy-button.svelte';
	import HighlightedCode from './highlighted-code.svelte';
	import CodeBlockOverflow from './code-block-overflow.svelte';
	import type { CodeBlock as CodeBlockData } from './types.js';
	import { toConsumerExampleCode } from './to-consumer-example-code.js';

	let { code }: { code: CodeBlockData } = $props();
	const consumerCode = $derived(toConsumerExampleCode(code.filecode));
</script>

<div class="w-full">
	<div class="overflow-hidden rounded-lg border border-border">
		{#if code.isExpand}
			<CodeBlockOverflow collapsed={true}>
				<Root class="rounded-none border-0 bg-background">
					<Actions class="[[data-slot=code-block]>&]:opacity-100">
						<CopyButton value={consumerCode} variant="secondary" class="text-muted-foreground" />
					</Actions>
					<HighlightedCode
						code={consumerCode}
						lang={code.lang}
						highlight={code.highlight}
						hideLines
						class="scrollbar-hidden"
					/>
				</Root>
			</CodeBlockOverflow>
		{:else}
			<Root class="rounded-none border-0 bg-background">
				<Actions
					class="[[data-slot=code-block]>&]:end-2 [[data-slot=code-block]>&]:top-2 [[data-slot=code-block]>&]:opacity-100"
				>
					<CopyButton
						value={consumerCode}
						size="icon-md"
						variant="secondary"
						class="text-muted-foreground"
					/>
				</Actions>
				<HighlightedCode
					code={consumerCode}
					lang={code.lang}
					highlight={code.highlight}
					hideLines
					class="scrollbar-hidden bg-background"
				/>
			</Root>
		{/if}
	</div>
</div>
