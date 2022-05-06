<script lang="ts">
  import { Filter, Transaction, categorize, Common } from "../../model"
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
      transactions = transactions.filter(t => t.amount < 0)
      transactions.forEach(t => t.amount *= -1)
      transactions = transactions
      categorize(Filter.preFilters, transactions)
      Common.transactions.set(transactions)
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
