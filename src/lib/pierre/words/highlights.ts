import { createHighlightsPlugin } from '@pierre/words/highlights';
import dark from '@pierre/highlights/themes/pierre-dark';
import light from '@pierre/highlights/themes/pierre-light';
import type { PluginConfig } from '@pierre/words/html';

export type HighlightOptions = Parameters<typeof createHighlightsPlugin>[0];

export const markdownPlugins = {
	code: createHighlightsPlugin({
		themes: { light, dark },
		defaultColor: 'light-dark()'
	})
} satisfies PluginConfig;
