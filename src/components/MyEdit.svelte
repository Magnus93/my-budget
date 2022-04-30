<script lang="ts">
  import {Category, Transaction, Filter} from "../model";
  import MyCategory from "./MyCategory.svelte";
  import HtmlPopup from "./HtmlPopup/index.svelte";
  import HtmlAmountOptions from "./HtmlAmountOptions.svelte";
  import HtmlDateOptions from "./HtmlDateOptions.svelte";
  import MyTextHighlight from "./MyTextHighlight.svelte";
  export let transactions: Transaction[] | undefined = undefined;
  let filter: Filter = {}
  
  let filteredTransactions: Transaction[] | undefined;
  let search: string
  $: {
    filteredTransactions = runFilter(filter, transactions ?? []);
  }
  function runFilter(f: Filter, t: Transaction[]): Transaction[] {
    return Filter.apply(f, t)
  }
  function handleFilterEvent(e: Event) {
    search = (e.target as HTMLInputElement).value
    filter.description = search
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
        <th><div>category<HtmlPopup /></div></th>
        <th><div>description<HtmlPopup /></div></th>
        <th class="left"><div>amount<HtmlPopup ><div slot="content"><HtmlAmountOptions/></div></HtmlPopup></div></th>
        <th><div>date<HtmlPopup ><div slot="content"><HtmlDateOptions/></div></HtmlPopup></div></th>
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
    font-size: 1.3rem;
    thead {
      position: sticky;
      top: 0;
      background-color: RGB(var(--main-color));
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    tfoot {
      position: sticky;
      bottom: 0;
    }
    tfoot > tr > td {
      background-color: RGB(var(--tint-color));
      position: relative;
      &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: red;
      }
    }
    th {
      text-transform: capitalize;
      & > div {
        display: flex;
      }
    }
    td, th {
      padding: 0.5em 1em;
      border-left: 1px solid RGB(var(--tint-color));
      border-right: 1px solid RGB(var(--tint-color));
    }
    .right {
      text-align: right;
    }
    .center {
      text-align: center;
    }
    tr:nth-child(2n+1) {
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
