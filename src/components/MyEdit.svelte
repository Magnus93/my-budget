<script lang="ts">
  import {Category, Transaction} from "../model";
  import MyCategorySelector from "./MyCategorySelector.svelte";
  import MyCategory from "./MyCategory.svelte";
import MyTextHighlight from "./MyTextHighlight.svelte";
  export let transactions: Transaction[] | undefined = undefined;
  let filteredTransactions: Transaction[] | undefined;
  let search
  let selector
  $: {
    filteredTransactions = transactions;
  }

  function handleFilterEvent(e: Event) {
    console.log(e.target)
    const property = (e.target as HTMLInputElement)?.getAttribute("name")
    search = (e.target as HTMLInputElement).value
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
  <input type="text" name="description" on:input={handleFilterEvent} placeholder="Filter transactions..." />
  <MyCategorySelector bind:this={selector}></MyCategorySelector><button on:click={HandleAddToCategory}>+</button>
  <div class="categories">
    {#each Category.types as c}
      <MyCategory value={c}></MyCategory>
    {/each}
  </div>
  <table>
    <thead>
      <tr>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
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
          <td class="right">{t.amount}</td>
          <td class="center">{t.date}</td>
        </tr>
      {/each}
      <tfoot>
        <tr>
          <td></td>
          <td></td>
            <td>
              {filteredTransactions.reduce((r, c) => (r + c.amount), 0)}
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
      padding: 0.5rem 0.75rem;
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
