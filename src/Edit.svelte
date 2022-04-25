<script lang="ts">
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
      <span class={"category " + g.color} name={g.name}>{g.name}</span>
    {/each}
  </div>
  <table>
    <thead>
      <tr>
        {#each headers ?? [] as h}
          <th>
            <input type="text" name={h} on:input={handleFilterEvent} />
          </th>
        {/each}
      </tr>
      <tr>
        {#each headers ?? [] as h}
          <th>{h}</th>
        {/each}
      </tr>
      {#each filteredTransactions ?? [] as o}
        <tr>
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
  }
  tr:nth-child(2n) {
    background-color: RGB(var(--shade-color));
  }
  tr:not(:first-child):hover {
    background-color: RGB(var(--hover-color));
  }
  .categories {
    padding: 1rem 0;
  }
  .category {
    padding: 0.25em 0.75em;
    margin: 0 0.5em;
    border-radius: 0.5rem;
  }
  .red, .blue, .orange, .green, .purple, .teal {
    color: white;
  }
  .red {
    background-color: #761f1f;
  }
  .blue {
    background-color: #1f3076;
  }
  .orange {
    background-color: #7e4f19;
  }
  .green {
    background-color: #28761f;
  }
  .purple {
    background-color: #6c1f76;
  }
  .teal {
    background-color: #1f7276;
  }
</style>
