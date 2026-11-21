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
		const actionLeft = frameWidth - actionsWidth + 6;
		const curveEnd = actionLeft + 4;
		const curveStart = curveEnd - 48;

		return [
			`M 18 ${bodyTop}`,
			`H ${curveStart}`,
			`C ${curveStart + 36} ${bodyTop} ${curveEnd - 28} ${top} ${curveEnd} ${top + 3}`,
			`H ${right - 26}`,
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
			class="pointer-events-none absolute inset-0 size-full"
			viewBox={`0 0 ${frameWidth} ${frameHeight}`}
			aria-hidden="true"
		>
			<path
				d={outline}
				fill="var(--background)"
				stroke="var(--border)"
				stroke-width="1"
				stroke-linecap="round"
				stroke-linejoin="round"
				vector-effect="non-scaling-stroke"
				class="fill-muted"
			/>
		</svg>
	{/if}
	<div bind:clientWidth={actionsWidth} class="absolute top-2 right-1 z-10 bg-muted">
		{@render actions()}
	</div>
	<div class="relative z-10 bg-muted">
		{@render children()}
	</div>
</div>
