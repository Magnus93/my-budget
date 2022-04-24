<script lang="ts">
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

  function handleFilterEvent(e: Event) {
    console.log(e.target)
    const property = (e.target as HTMLInputElement)?.getAttribute("name")
    const search = (e.target as HTMLInputElement).value
    console.log(search)
    filteredTransactions = transactions.filter(t => RegExp(search, "i").test(t[property]))
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
    <h2>Transactions</h2>
    <div class="categories">
      Add selection to:
      {#each categories as g}
        <span class={"category " + g.color} name={g.name}>{g.name}</span>
      {/each}
    </div>
    <table>
      <thead>
        <tr>
          {#each headers ?? [] as h}
            <th>
              <input type="text" name={h} on:input={handleFilterEvent} />
            </th>
          {/each}
        </tr>
        <tr>
          {#each headers ?? [] as h}
            <th>{h}</th>
          {/each}
        </tr>
        {#each filteredTransactions ?? [] as o}
          <tr>
            {#each headers ?? [] as h}
            <td>{o[h]}</td>
            {/each}
          </tr>
        {/each}
        
      </thead>
    </table>
  </div>
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
  input[type="text"] {
    width: 100%;
  }
  table {
    height: min-content;
  }
  tr:nth-child(2n) {
    background-color: aliceblue;
  }
  tr:not(:first-child):hover {
    outline: 1px solid blue;
  }
  .categories {
    padding: 1rem 0;
  }
  .category {
    padding: 0.25em 0.75em;
    margin: 0 0.5em;
    border-radius: 0.5rem;
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
  .red, .blue, .orange, .green, .purple, .teal {
    color: white;
  }
  .red {
    background-color: #761f1f;
  }
  .blue {
    background-color: #1f3076;
  }
  .orange {
    background-color: #7e4f19;
  }
  .green {
    background-color: #28761f;
  }
  .purple {
    background-color: #6c1f76;
  }
  .teal {
    background-color: #1f7276;
  }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>