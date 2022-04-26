<script lang="ts">
  import {Category} from "../model";
  import MyCategorySelector from "./MyCategorySelector.svelte";
  import MyCategory from "./MyCategory.svelte";
  export let headers: string[] | undefined = undefined;
  export let categories: Category[] | undefined = undefined;
  export let transactions: Record<string, any>[] | undefined = undefined;
  export let headerTypes: Record<string, "string" | "number"> | undefined = undefined;
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
        <th>
          <div>
            <MyCategorySelector bind:this={selector}></MyCategorySelector><button on:click={HandleAddToCategory}>+</button>
          </div>
        </th>
        {#each headers ?? [] as h}
          <th>
            <input type="text" name={h} on:input={handleFilterEvent} />
          </th>
        {/each}
      </tr>
      <tr>
        <th>Category</th>
        {#each headers ?? [] as h}
          <th class={headerTypes[h] == "number" ? "right" : "left"}>{h}</th>
        {/each}
      </tr>
    </thead>
      {#each filteredTransactions ?? [] as t}
        <tr>
          <td><MyCategory value={t.category}/></td>
          {#each headers ?? [] as h}
            <td class={headerTypes[h] == "number" ? "right" : "left"}>{t[h]}</td>
          {/each}
        </tr>
      {/each}
      <tfoot>
        <tr>
          <td></td>
          {#each headers ?? [] as h}
            <td>
              {#if headerTypes[h] == "number"}
                {filteredTransactions.reduce((r, c) => r + (typeof c[h] == "number" ? +c[h] : 0), 0)}
              {/if}
            </td>
          {/each}
        </tr>
      </tfoot>
  </table>
</div>

<style type="text/scss">
  input[type=text] {
    width: 100%;
  }
  table {
    height: min-content;
    border-collapse: collapse;
    thead {
      position: sticky;
      top: 0;
      background-color: RGB(var(--main-color));
      div {
        display: flex;
      }
    }
    tfoot {
      position: sticky;
      bottom: 0;
      background-color: RGB(var(--tint-color));
    }
    td, th {
      padding: 0.5rem 0.75rem;
      border-left: 1px solid RGB(var(--tint-color));
      border-right: 1px solid RGB(var(--tint-color));
    }
    .right {
      text-align: right;
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
