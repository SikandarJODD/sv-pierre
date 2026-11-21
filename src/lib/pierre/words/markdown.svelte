<script lang="ts">
	import { createHighlightsPlugin } from '@pierre/words/highlights';
	import {
		createDomRenderer,
		type AnimateOptions,
		type HtmlOptions,
		type IslandData
	} from '@pierre/words/html';
	import '@pierre/words/styles.css';
	import { mount, unmount } from 'svelte';
	import type { Action } from 'svelte/action';
	import { fromAction } from 'svelte/attachments';
	import { SvelteMap, SvelteSet } from 'svelte/reactivity';
	import { markdownPlugins, type HighlightOptions } from './highlights.js';
	import IslandHost from './island-host.svelte';
	import type { SvelteIsland, SvelteIslands } from './islands.js';

	type Props = {
		source?: string;
		streaming?: boolean;
		parseIncomplete?: boolean;
		animated?: boolean | AnimateOptions;
		caret?: 'block' | 'circle';
		highlight?: boolean | HighlightOptions;
		options?: Omit<HtmlOptions, 'islands'>;
		islands?: SvelteIslands;
		class?: string;
	};

	type MarkdownState = Omit<Props, 'class' | 'highlight'>;
	type IslandHostInstance = { update(data: IslandData): void };
	type MountedSvelteIsland = {
		component: SvelteIsland['component'];
		content: HTMLElement;
		fallback: HTMLElement;
		instance: IslandHostInstance;
	};

	let {
		source = '',
		streaming = false,
		parseIncomplete = true,
		animated = false,
		caret,
		highlight = false,
		options = {},
		islands,
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
		const mountedIslands = new SvelteMap<string, MountedSvelteIsland>();
		renderer.connect();

		function htmlOptions(state: MarkdownState): HtmlOptions {
			if (!state.islands) return state.options ?? {};

			return {
				...state.options,
				islands: Object.fromEntries(
					Object.entries(state.islands).map(([name, island]) => [
						name,
						{
							fallback: island.fallback,
							inline: island.inline,
							pending: island.pending,
							accepts: island.accepts ?? (() => true)
						}
					])
				)
			};
		}

		function reconcileIslands(registry: SvelteIslands | undefined) {
			const activeKeys = new SvelteSet<string>();

			for (const island of renderer.getIslands()) {
				const entry = registry?.[island.name];
				if (!entry) continue;

				activeKeys.add(island.key);
				const mounted = mountedIslands.get(island.key);

				if (mounted?.content === island.content && mounted.component === entry.component) {
					if (mounted.fallback !== island.fallback) {
						mounted.fallback.removeAttribute('hidden');
						island.fallback.toggleAttribute('hidden', true);
						mounted.fallback = island.fallback;
					}
					mounted.instance.update(island.data);
					continue;
				}

				if (mounted) {
					mounted.fallback.removeAttribute('hidden');
					void unmount(mounted.instance);
				}

				const instance = mount(IslandHost, {
					target: island.content,
					props: { component: entry.component, data: island.data }
				}) as IslandHostInstance;
				island.fallback.toggleAttribute('hidden', true);

				mountedIslands.set(island.key, {
					component: entry.component,
					content: island.content,
					fallback: island.fallback,
					instance
				});
			}

			for (const [key, mounted] of mountedIslands) {
				if (activeKeys.has(key)) continue;
				mounted.fallback.removeAttribute('hidden');
				void unmount(mounted.instance);
				mountedIslands.delete(key);
			}
		}

		function render(state: MarkdownState) {
			const active = state.streaming ?? false;
			const incomplete = active && (state.parseIncomplete ?? true);

			renderer.configure(htmlOptions(state));
			renderer.update(state.source ?? '', incomplete, active, state.animated ?? false, state.caret);
			reconcileIslands(state.islands);
		}

		render(initial);

		return {
			update: render,
			destroy: () => {
				for (const mounted of mountedIslands.values()) {
					mounted.fallback.removeAttribute('hidden');
					void unmount(mounted.instance);
				}
				mountedIslands.clear();
				renderer.disconnect();
			}
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
		options: configuredOptions,
		islands
	}))}
></div>
