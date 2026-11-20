<script lang="ts">
	import { onDestroy } from 'svelte';
	import CheckIcon from '@lucide/svelte/icons/check';
	import CopyIcon from '@lucide/svelte/icons/copy';
	import { Button, type ButtonProps } from '#lib/components/ui/button/index.js';
	import { cn } from '#lib/utils.js';
	import type { ClassValue } from 'svelte/elements';

	type CodeBlockCopyButtonProps = Omit<ButtonProps, 'class' | 'onclick'> & {
		class?: ClassValue;
		value: string;
		onclick?: (event: MouseEvent) => void;
	};

	let {
		ref = $bindable(null),
		class: className,
		value,
		variant = 'ghost',
		size = 'icon-md',
		onclick,
		...restProps
	}: CodeBlockCopyButtonProps = $props();

	let copied = $state(false);
	let timeout: ReturnType<typeof setTimeout> | undefined;

	function copy() {
		navigator.clipboard
			.writeText(value)
			.then(() => {
				copied = true;
				clearTimeout(timeout);
				timeout = setTimeout(() => (copied = false), 2000);
			})
			.catch(() => {});
	}

	onDestroy(() => clearTimeout(timeout));
</script>

<Button
	bind:ref
	data-slot="code-block-copy-button"
	data-copied={copied || undefined}
	{variant}
	{size}
	aria-label={copied ? 'Copied' : 'Copy'}
	class={cn(className)}
	onclick={(e: MouseEvent) => {
		onclick?.(e);
		copy();
	}}
	{...restProps}
>
	{#if copied}
		<CheckIcon />
	{:else}
		<CopyIcon />
	{/if}
</Button>
<span aria-live="polite" class="sr-only">{copied ? 'Copied' : ''}</span>
