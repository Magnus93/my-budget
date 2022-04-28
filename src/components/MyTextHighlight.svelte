<script lang="ts">
  export let text: string;
  export let search: string | undefined = undefined;
  let parts: string | { before: string; marked: string; after: string } = text;
  $: {
    searchChanges(text, search ?? "");
  }
  function searchChanges(text: string, search: string) {
    if (search == "") parts = text;
    else {
      const index = text.search(RegExp(search, "i"));
      parts =
        index == -1
          ? text
          : {
              before: text.substring(0, index),
              marked: text.substring(index, index + search.length),
              after: text.substring(index + search.length),
            };
    }
  }
</script>

<span >
  {#if typeof parts == "string"}
  <span>{parts}</span>
  {:else}
  <span>{parts.before}<mark>{parts.marked}</mark>{parts.after}</span>
  {/if}
</span>
