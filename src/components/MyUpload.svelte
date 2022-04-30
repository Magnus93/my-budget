<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Filter, Transaction, categorize } from "../model"
  const dispatch = createEventDispatcher<{upload: {transactions: Transaction[]}}>();
  let csv: string;
  let transactions: Transaction[];

  function handleFileSelected(event: any) {
    const files = event.target.files;
    console.log(files);
    const reader = new FileReader();
    reader.onload = (e) => {
      e.target.result;
      csv = e.target.result as string;
      transactions = Transaction.fromCsv(csv, ";");
      categorize(Filter.preFilters, transactions)
      dispatch("upload", {transactions})
    };
    reader.readAsText(files[0]);
  }
</script>

<h2>Upload CSV</h2>
<input
  type="file"
  id="budget-file"
  name="filename"
  accept=".csv"
  on:change={handleFileSelected}
/>
