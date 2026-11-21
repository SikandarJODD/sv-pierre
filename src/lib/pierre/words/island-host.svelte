<script lang="ts">
	import type { IslandData } from '@pierre/words/html';
	import { untrack, type Component } from 'svelte';

	type Props = {
		component: Component<{ data: IslandData }>;
		data: IslandData;
	};

	let { component: IslandComponent, data: initialData }: Props = $props();
	let data = $state(untrack(() => initialData));

	export function update(next: IslandData) {
		data = next;
	}
</script>

<IslandComponent {data} />
