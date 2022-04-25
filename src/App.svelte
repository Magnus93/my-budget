<script lang="ts">
  import Edit from "./Edit.svelte";
	export let name: string;
	let csv: string;
  let transactions: Record<string, any>[];
  let filteredTransactions: Record<string, any>[];
  let headers: string[];
  const categories: {name: string, color?: string}[] = [
    {name: "groceries", color: "blue"},
    {name: "resturant", color: "red"},
    {name: "health", color: "green"},
    {name: "furniture", color: "purple"},
    {name: "misc", color: "teal"},
  ]

  function handleFileSelected(event: any) {
    const files = event.target.files
    console.log(files);
    const reader = new FileReader();
    reader.onload = (e) => {
      e.target.result
      csv = e.target.result as string;
      transactions = csvToObject(csv, ";");
      filteredTransactions = transactions
    }
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

<main>
	<h1>{name}<i>(Magnus and Yash's Budget)</i></h1>
  <fieldset>
    <legend>Upload CSV</legend>
	  <input type="file" id="budget-file" name="filename" accept=".csv" on:change={(e) => {
	  	console.log(e);
	  	handleFileSelected(e);
	  }}>
  </fieldset>
  <div>
    <Edit transactions={transactions} headers={headers} categories={categories}></Edit>
</main>

<style>
	main {
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
  main > div {
    display: grid;
    /* grid-template-columns: 3fr 1fr; */
  }

	h1 {
		color: #ff3e00;
		font-size: 2rem;
		font-weight: 200;
    margin: 0.5rem 0;
	}
  h1 > i {
    font-size: 1rem;
  }
  :global(body) {
    margin: 0;
    padding: 0;
  }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>