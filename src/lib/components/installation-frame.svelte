<script lang="ts">
	import type { Snippet } from 'svelte';

	let { actions, children }: { actions: Snippet; children: Snippet } = $props();

	let frameWidth = $state(0);
	let frameHeight = $state(0);
	let actionsWidth = $state(0);

	const outline = $derived.by(() => {
		if (!frameWidth || !frameHeight || !actionsWidth) return '';

		const inset = 0.5;
		const bodyTop = 40;
		const top = inset;
		const right = frameWidth - inset;
		const bottom = frameHeight - inset;
		const actionLeft = frameWidth - actionsWidth - 4;
		const curveEnd = actionLeft - 4;
		const curveStart = Math.max(24, curveEnd - 54);

		return [
			`M 18 ${bodyTop}`,
			`H ${curveStart}`,
			`C ${curveStart + 30} ${bodyTop} ${curveEnd - 24} ${top} ${curveEnd} ${top}`,
			`H ${right - 20}`,
			`Q ${right} ${top} ${right} ${top + 20}`,
			`V ${bottom - 16}`,
			`Q ${right} ${bottom} ${right - 16} ${bottom}`,
			`H 16`,
			`Q ${inset} ${bottom} ${inset} ${bottom - 16}`,
			`V 58`,
			`Q ${inset} ${bodyTop} 18 ${bodyTop}`,
			'Z'
		].join(' ');
	});
</script>

<div
	bind:clientWidth={frameWidth}
	bind:clientHeight={frameHeight}
	class="relative px-1 pt-11 pb-1"
	data-not-typeset
>
	{#if outline}
		<svg
			class="pointer-events-none absolute inset-0 size-full overflow-visible"
			viewBox={`0 0 ${frameWidth} ${frameHeight}`}
			fill="none"
			aria-hidden="true"
		>
			<path
				d={outline}
				stroke="var(--border)"
				stroke-width="1"
				vector-effect="non-scaling-stroke"
			/>
		</svg>
	{/if}
	<div bind:clientWidth={actionsWidth} class="absolute top-1 right-1 z-10">
		{@render actions()}
	</div>
	<div class="relative z-10">
		{@render children()}
	</div>
</div>
