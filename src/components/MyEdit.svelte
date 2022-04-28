<script lang="ts">
  import {Category, Transaction} from "../model";
  import MyCategory from "./MyCategory.svelte";
  import MyTextHighlight from "./MyTextHighlight.svelte";
  export let transactions: Transaction[] | undefined = undefined;
  
  let filteredTransactions: Transaction[] | undefined;
  let search
  $: {
    filteredTransactions = transactions;
  }

  function handleFilterEvent(e: Event) {
    console.log(e.target)
    const property = (e.target as HTMLInputElement)?.getAttribute("name")
    search = (e.target as HTMLInputElement).value
    filteredTransactions = transactions.filter(t => RegExp(search, "i").test(t[property]))
  }
  function addToCategory(e: MouseEvent) {
    const category = (e.target as HTMLElement).getAttribute("name")
    if (Category.is(category))
      categorize(category)
  }
  function categorize(category: Category) {
    filteredTransactions.forEach((t, i) => filteredTransactions[i].category = category)
    transactions = transactions
  }
</script>

<div>
  <h2>Edit Transactions</h2>
  <input type="text" name="description" on:input={handleFilterEvent} placeholder="Filter transactions..." />
  <div class="categories">
    {#each Category.types as c}
      <MyCategory value={c} on:click={addToCategory}></MyCategory>
    {/each}
  </div>
  <table>
    <thead>
      <tr>
        {#each  ["Category", "Description", "Amount", "Date"] as h}
          <th class={h == "Amount" ? "right" : "left"}>{h}</th>
        {/each}
      </tr>
    </thead>
      {#each filteredTransactions ?? [] as t}
        <tr>
          <td><MyCategory value={t.category}/></td>
          <td><MyTextHighlight text={t.description} {search} /></td>
          <td class="right">{t.amount.toFixed(2)}</td>
          <td class="center">{t.date}</td>
        </tr>
      {/each}
      <tfoot>
        <tr>
          <td></td>
          <td></td>
            <td>
              {filteredTransactions.reduce((r, c) => (r + c.amount), 0).toFixed(2)}
            </td>
          <td></td>
        </tr>
      </tfoot>
  </table>
</div>

<style type="text/scss">
  input[type=text][name=description] {
    max-width: 40em;
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
      padding: 0.5rem 1rem;
      border-left: 1px solid RGB(var(--tint-color));
      border-right: 1px solid RGB(var(--tint-color));
    }
    .right {
      text-align: right;
    }
    .center {
      text-align: center;
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
