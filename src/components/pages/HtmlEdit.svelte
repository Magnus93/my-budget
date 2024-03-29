<script lang="ts">
  import { Category, Transaction, Filter, Common } from "../../model";
  import HtmlCategory from "../HtmlCategory.svelte";
  import HtmlPopup from "../HtmlPopup.svelte";
  import HtmlCategoryOptions from "../HtmlCategoryOptions.svelte";
  import HtmlAmountOptions from "../HtmlAmountOptions.svelte";
  import HtmlDateOptions from "../HtmlDateOptions.svelte";
  import HtmlTextHighlight from "../HtmlTextHighlight.svelte";
  import type { DateRange } from "isoly";
  let transactions: Transaction[] | undefined = undefined;
  let filterValue: Filter = {};

  Common.filter.subscribe((value) => {
    filterValue = value;
    // filteredTransactions = runFilter(filterValue, transactions ?? [])
  });
  Common.transactions.subscribe((value) => {
    transactions = value
  })

  let filteredTransactions: Transaction[] | undefined;
  let search: string;
  $: {
    filteredTransactions = runFilter(filterValue, transactions ?? []);
  }
  function runFilter(f: Filter, t: Transaction[]): Transaction[] {
    return Filter.apply(f, t);
  }
  function handleFilterEvent(e: Event) {
    search = (e.target as HTMLInputElement).value;
    Common.filter.update((value) => ({ ...value, description: search }));
  }
  function addToCategory(e: MouseEvent) {
    const category = (e.target as HTMLElement).getAttribute("name");
    if (Category.is(category)) categorize(category);
  }
  function categorize(category: Category) {
    filteredTransactions.forEach(
      (t, i) => (filteredTransactions[i].category = category)
    );
    transactions = transactions;
  }
  function getDateRange(trans: Transaction[]): Partial<DateRange> {
    return trans.reduce((r: Partial<DateRange>, c) => {
      return {
        start: (c.date < r.start ? c.date : r.start) ?? c.date,
        end: (c.date > r.end ? c.date : r.end) ?? c.date,
      };
    }, {});
  }
</script>

<div>
  <h2>Edit Transactions</h2>
  <input
    type="text"
    name="description"
    on:input={handleFilterEvent}
    placeholder="Filter transactions..."
  />
  <div class="categories">
    {#each [...Category.types, undefined] as c}
      <HtmlCategory value={c} on:click={addToCategory} />
    {/each}
  </div>
  <table>
    <thead>
      <tr>
        <th>
          <div>
            category
            <HtmlPopup>
              <div slot="content"><HtmlCategoryOptions /></div>
            </HtmlPopup>
          </div>
        </th>
        <th>
          <div>
            description
            <HtmlPopup />
          </div>
        </th>
        <th class="left">
          <div>
            amount
            <HtmlPopup>
              <div slot="content"><HtmlAmountOptions /></div>
            </HtmlPopup>
          </div>
        </th>
        <th>
          <div>
            date
            <HtmlPopup>
              <div slot="content">
                <HtmlDateOptions dateRange={getDateRange(transactions)} />
              </div>
            </HtmlPopup>
          </div>
        </th>
      </tr>
    </thead>
    {#each filteredTransactions ?? [] as t}
      <tr>
        <td><HtmlCategory value={t.category} /></td>
        <td><HtmlTextHighlight text={t.description} {search} /></td>
        <td class="right">{t.amount.toFixed(2)}</td>
        <td class="center">{t.date}</td>
      </tr>
    {/each}
    <tfoot>
      <tr>
        <td />
        <td />
        <td class="right">
          {filteredTransactions.reduce((r, c) => r + c.amount, 0).toFixed(2)}
        </td>
        <td>
          {getDateRange(filteredTransactions ?? []).start}<br />
          {getDateRange(filteredTransactions ?? []).end}</td
        >
      </tr>
    </tfoot>
  </table>
</div>

<style type="text/scss">
  input[type="text"][name="description"] {
    max-width: 40em;
  }
  table {
    height: min-content;
    border-collapse: collapse;
    font-size: 1.3rem;
    thead {
      position: sticky;
      top: 0;
      background-color: RGB(var(--shade-color));
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
      background-color: RGB(var(--shade-color));
      position: relative;
      &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: RGB(var(--tint-color));
        top: 0;
        left: 0;
      }
    }
    th {
      text-transform: capitalize;
      & > div {
        display: flex;
      }
    }
    td,
    th {
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
    tr:not(:first-child):hover {
      background-color: RGB(var(--hover-color));
    }
  }
  .categories {
    padding: 1rem 0;
  }
</style>
