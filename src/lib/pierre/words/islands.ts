import type { HtmlIsland, IslandData } from '@pierre/words/html';
import type { Component } from 'svelte';

export interface SvelteIsland extends Pick<HtmlIsland, 'fallback' | 'inline' | 'pending'> {
	component: Component<{ data: IslandData }>;
	accepts?: (data: IslandData) => boolean;
}

export type SvelteIslands = Readonly<Record<string, SvelteIsland>>;
