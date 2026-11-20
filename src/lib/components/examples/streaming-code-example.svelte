<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Markdown, markdownPlugins } from '#lib/pierre/words/index.js';
	import { Button } from '../ui/button';

	const response = `## Three useful Svelte bindings

Svelte's \`bind:\` directive keeps an element and a state value in sync. Here are three small patterns you can reuse.

### 1. Filter a list as you type

Bind the input to \`query\`, then derive the visible names from it.

\`\`\`svelte
<script lang="ts">
  const names = ['Ada', 'Grace', 'Linus', 'Margaret', 'Guido'];

  let query = $state('');
  let filtered = $derived(
    names.filter((name) => name.toLowerCase().includes(query.toLowerCase()))
  );
${'</' + 'script>'}

<label>
  Search
  <input bind:value={query} placeholder="Type a name" />
</label>

<ul>
  {#each filtered as name (name)}
    <li>{name}</li>
  {:else}
    <li>No matches</li>
  {/each}
</ul>
\`\`\`

The input updates \`query\`. Svelte recalculates \`filtered\` and updates only the list.

### 2. Show optional details

For a checkbox, bind its \`checked\` property to a boolean.

\`\`\`svelte
<script lang="ts">
  let showDetails = $state(false);
${'</' + 'script>'}

<label>
  <input type="checkbox" bind:checked={showDetails} />
  Show details
</label>

{#if showDetails}
  <p>The workshop starts at 10:00 and lasts about two hours.</p>
{/if}
\`\`\`

There is no change handler to write. The checkbox updates \`showDetails\` directly.

### 3. Sort products with a select

A select can bind to a string. Use that value in a derived sort.

\`\`\`svelte
<script lang="ts">
  type SortOrder = 'name' | 'price';

  const products = [
    { name: 'Notebook', price: 8 },
    { name: 'Pencil', price: 2 },
    { name: 'Backpack', price: 45 }
  ];

  let sortOrder = $state<SortOrder>('name');
  let sortedProducts = $derived(
    [...products].sort((a, b) =>
      sortOrder === 'price' ? a.price - b.price : a.name.localeCompare(b.name)
    )
  );
${'</' + 'script>'}

<select bind:value={sortOrder} aria-label="Sort products">
  <option value="name">Name</option>
  <option value="price">Price</option>
</select>

<ul>
  {#each sortedProducts as product (product.name)}
    <li>{product.name}: \${product.price}</li>
  {/each}
</ul>
\`\`\`

All three examples use local state. No event listeners or manual DOM updates are needed.`;

	let source = $state(response);
	let streaming = $state(false);
	let timer: ReturnType<typeof setInterval> | undefined;

	function replay() {
		if (timer) clearInterval(timer);

		let offset = 0;
		source = '';
		streaming = true;

		timer = setInterval(() => {
			offset += 5;
			source = response.slice(0, offset);

			if (offset >= response.length) {
				if (timer) clearInterval(timer);
				timer = undefined;
				streaming = false;
			}
		}, 16);
	}

	onDestroy(() => {
		if (timer) clearInterval(timer);
	});
</script>

<div class="w-full overflow-hidden">
	<Button
		type="button"
		variant="secondary"
		class="mb-4 rounded-full px-4"
		onclick={replay}
		disabled={streaming}
	>
		{streaming ? 'Writing…' : 'Replay'}
	</Button>
	<Markdown {source} {streaming} options={{ plugins: markdownPlugins }} />
</div>
