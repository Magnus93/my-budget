<script lang="ts">
  import {Category} from "../model";
  import MyCategorySelector from "./MyCategorySelector.svelte";
  import MyCategory from "./MyCategory.svelte";
  export let headers: string[] | undefined = undefined;
  export let categories: Category[] | undefined = undefined;
  export let transactions: Record<string, any>[] | undefined = undefined;
  let filteredTransactions: Record<string, any>[] | undefined;
  let selector
  $: {
    filteredTransactions = transactions;
  }

  function handleFilterEvent(e: Event) {
    console.log(e.target)
    const property = (e.target as HTMLInputElement)?.getAttribute("name")
    const search = (e.target as HTMLInputElement).value
    filteredTransactions = transactions.filter(t => RegExp(search, "i").test(t[property]))
  }
  function HandleAddToCategory() {
    let option = selector.getOption()
    filteredTransactions.forEach((t, i) => filteredTransactions[i].category = option)
    transactions = transactions  
  }
</script>

<div>
  <h2>Edit Transactions</h2>
  <div class="categories">
    {#each Category.types as c}
      <MyCategory value={c}></MyCategory>
    {/each}
  </div>
  <table>
    <thead>
      <tr>
        <th><MyCategorySelector bind:this={selector}></MyCategorySelector><button on:click={HandleAddToCategory}>+</button></th>
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
          <td><MyCategory value={o.category}/></td>
          {#each headers ?? [] as h}
            <td>{o[h]}</td>
          {/each}
        </tr>
      {/each}
    </thead>
  </table>
</div>

<style type="text/scss">
  input[type=text] {
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
