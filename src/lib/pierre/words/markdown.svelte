<script lang="ts">
	import { createHighlightsPlugin } from '@pierre/words/highlights';
	import { createDomRenderer, type AnimateOptions, type HtmlOptions } from '@pierre/words/html';
	import '@pierre/words/styles.css';
	import type { Action } from 'svelte/action';
	import { fromAction } from 'svelte/attachments';
	import { markdownPlugins, type HighlightOptions } from './highlights.js';

	type Props = {
		source?: string;
		streaming?: boolean;
		parseIncomplete?: boolean;
		animated?: boolean | AnimateOptions;
		caret?: 'block' | 'circle';
		highlight?: boolean | HighlightOptions;
		options?: HtmlOptions;
		class?: string;
	};

	type MarkdownState = Omit<Props, 'class' | 'highlight'>;

	let {
		source = '',
		streaming = false,
		parseIncomplete = true,
		animated = false,
		caret,
		highlight = false,
		options = {},
		class: className
	}: Props = $props();

	let highlightPlugin = $derived.by(() => {
		if (!highlight) return undefined;
		return highlight === true ? markdownPlugins.code : createHighlightsPlugin(highlight);
	});

	let configuredOptions = $derived.by(() => {
		if (!highlightPlugin || options.plugins?.code) return options;
		return {
			...options,
			plugins: { ...options.plugins, code: highlightPlugin }
		};
	});

	const markdown: Action<HTMLDivElement, MarkdownState> = (node, initial) => {
		const renderer = createDomRenderer(node);
		renderer.connect();

		function render(state: MarkdownState) {
			const active = state.streaming ?? false;
			const incomplete = active && (state.parseIncomplete ?? true);

			renderer.configure(state.options ?? {});
			renderer.update(state.source ?? '', incomplete, active, state.animated ?? false, state.caret);
		}

		render(initial);

		return {
			update: render,
			destroy: () => renderer.disconnect()
		};
	};
</script>

<div
	data-markdown="root"
	class={className}
	{@attach fromAction(markdown, () => ({
		source,
		streaming,
		parseIncomplete,
		animated,
		caret,
		options: configuredOptions
	}))}
></div>
