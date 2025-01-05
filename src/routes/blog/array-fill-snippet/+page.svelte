<script lang="ts">
	import Paragraph from '$lib/Paragraph.svelte';
	import BlogPost from '$lib/BlogPost.svelte';
	import Code from '$lib/Code.svelte';
	import Heading from '$lib/Heading.svelte';
</script>

<BlogPost title="A utility function to fill gaps in arrays">
	<Paragraph>
		Here's a neat little helper function that allows you to fill any gaps in arrays. I've mostly
		used it when fetching analytics from a database and I don't want to bother filling in the gaps
		using SQL.
	</Paragraph>
	<Paragraph>It can probably be improved a lot, but this is at least a working version.</Paragraph>

	<Code
		lang="ts"
		text={`/**
 * Safeguard to prevent an infinite loop (optional but recommended)
 */
export const MAX_GAP_ITERATIONS = 1000;

export const fill = <T>(
  arr: T[],
  compare: (prev: T, current: T) => boolean,
  fill: (prev: T) => T
) => {
  const filledArr: T[] = [];

  for (const item of arr) {
    // skip first item so we can compare to previous
    if (filledArr.length === 0) continue;

    let n = 1;

    // add items to array until there isn't a gap any more
    while (compare(filledArr[filledArr.length - 1], item)) {
      filledArr.push(fill(filledArr[filledArr.length - 1]));
      n++;

      if (n >= MAX_GAP_ITERATIONS) {
        throw new Error("error: gap is too big");
      }
    }

    filledArr.push(item);
  }

  return filledArr;
};`}
	/>

	<Heading depth={2}>Example usage</Heading>

	<Code
		lang="ts"
		text={`// array with gaps
const arr = [1,2,6,8]

const filledArr = fill(
  arr,
  // there's a gap if the diff between previous and current is over 1
  (prev, curr) => curr - prev > 1,
  // new value should be 1 larger than previous
  (prev) => prev + 1
)

// filledArr === [1,2,3,4,5,6,7,8]`}
	/>
</BlogPost>
