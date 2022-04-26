<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{upload: {transactions: Record<string, any>[], headers: string[]}}>();
  let csv: string;
  let transactions: Record<string, any>[];
  let headers: string[];

  function handleFileSelected(event: any) {
    const files = event.target.files;
    console.log(files);
    const reader = new FileReader();
    reader.onload = (e) => {
      e.target.result;
      csv = e.target.result as string;
      transactions = csvToObject(csv, ";");
      dispatch("upload", {transactions, headers})
    };
    reader.readAsText(files[0]);
  }
  function csvToObject(csv: string, divider=","): Record<string, any>[] {
    let result = []
    let splitted = csv.split("\n")
    headers = splitted[0].split(divider).map(h => h.replace("\r", ""))
    splitted.splice(1).forEach((row) => {
      let values = row.split(divider)
      result.push(values.reduce((r, c, i) => ({...r, [headers[i]]: convert(c.trim())}), {}))
    })
    return result
  }
  function convert(value: string): string | number {
    return value == "" 
    ? 0 
    : (/^\-?\d+(\.\d+)?(kr)?$/g.test(value.replace(",", ".").replace(/ /g, "").replace("\r", "")) 
    ? +value.substring(0, value.length-4).replace(",", ".").replace(/ /g, "").replace("\r", "") 
    : value)
  }
</script>

<h2>Upload CSV</h2>
<input
  type="file"
  id="budget-file"
  name="filename"
  accept=".csv"
  on:change={(e) => {
    console.log(e);
    handleFileSelected(e);
  }}
/>
