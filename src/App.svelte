<script lang="ts">
	export let name: string;
	let text;
  let transactions: Record<string, any>[];
  let headers: string[];

  function handleFileSelected(event: any) {
    const files = event.target.files
    console.log(files);
    const reader = new FileReader();
    reader.onload = (e) => {
      e.target.result
      text = e.target.result;
      transactions = csvToObject(text, ";");
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
    let num: undefined | number
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
    <h2>CSV</h2>
    <h2>Object</h2>
    <!-- <pre>{text}</pre> -->
    <table>
      <thead>
        <tr>
          {#each headers ?? [] as h}
            <th>{h}</th>
          {/each}
        </tr>
        {#each transactions ?? [] as o}
          <tr>
            {#each headers ?? [] as h}
            <td>{o[h]}</td>
            {/each}
          </tr>
        {/each}
        
      </thead>
    </table>
    <pre>{JSON.stringify(transactions, undefined, 2)}</pre>
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
    grid-template-columns: 3fr 1fr;
  }

  table {
    height: min-content;
  }
  tr:nth-child(2n) {
    background-color: aliceblue;
  }
  tr:hover {
    outline: 1px solid blue;
  }

	h1 {
		color: #ff3e00;
		font-size: 3em;
		font-weight: 200;
    margin: 1rem 0;
	}
  h1 > i {
    font-size: 2rem;
  }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>