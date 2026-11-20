<script lang="ts">
	import './layout.css';
	import type { LayoutProps } from './$types';
	import { activeElement, PressedKeys } from 'runed';
	import { ModeWatcher, toggleMode } from 'mode-watcher';

	let { children }: LayoutProps = $props();
	let keys = new PressedKeys();
	keys.onKeys(['d'], () => {
		if (
			activeElement.current?.localName === 'input' ||
			activeElement.current?.localName === 'textarea'
		)
			return;
		toggleMode();
	});
</script>

<ModeWatcher defaultMode="light" />

{@render children()}
