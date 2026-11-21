<script lang="ts">
	import { Markdown } from '#lib/pierre/words/index.js';

	const source = `## Math and CJK

Euler's identity is $e^{i\\pi} + 1 = 0$.

$$
\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
$$

**重要。**请阅读。`;
</script>

<div class="w-full overflow-hidden">
	<Markdown {source} options={{ math: true, cjk: true }} />
</div>
