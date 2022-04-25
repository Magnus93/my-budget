<script lang="ts">
  import Category from "./Category.svelte";
  export let headers: string[] | undefined = undefined;
  export let categories: {name: string, color?: string}[] | undefined = undefined;
  export let transactions: Record<string, any>[] | undefined = undefined;
  let filteredTransactions: Record<string, any>[] | undefined;

  $: {
    filteredTransactions = transactions;
  }

  function handleFilterEvent(e: Event) {
    console.log(e.target)
    const property = (e.target as HTMLInputElement)?.getAttribute("name")
    const search = (e.target as HTMLInputElement).value
    console.log(search)
    filteredTransactions = transactions.filter(t => RegExp(search, "i").test(t[property]))
  }
</script>

<div>
  <h2>Edit Transactions</h2>
  <div class="categories">
    Add selection to:
    {#each categories ?? [] as g}
      <Category value={g}></Category>
    {/each}
  </div>
  <table>
    <thead>
      <tr>
        <th></th>
        {#each headers ?? [] as h}
          <th>
            <input type="text" name={h} on:input={handleFilterEvent} />
          </th>
        {/each}
      </tr>
      <tr>
        <th>Category</th>
        {#each headers ?? [] as h}
          <th>{h}</th>
        {/each}
      </tr>
      {#each filteredTransactions ?? [] as o}
        <tr>
          <td>{o.category ?? ""}</td>
          {#each headers ?? [] as h}
            <td>{o[h]}</td>
          {/each}
        </tr>
      {/each}
    </thead>
  </table>
</div>

<style type="text/scss">
  input[type="text"] {
    width: 100%;
  }
  table {
    height: min-content;
    border-collapse: collapse;

    td, th {
      padding: 0.5rem 0.75rem;
    }
    tr:nth-child(2n) {
      background-color: RGB(var(--shade-color));
    }
    tr:not(:first-child):hover {
      background-color: RGB(var(--hover-color));
    }
  }
  .categories {
    padding: 1rem 0;
  }
</style>
