<script lang="ts">
  import Edit from "./Edit.svelte";
  import Upload from "./Upload.svelte";
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
  function uploadHander(event: CustomEvent<{transactions: Record<string, any>[], headers: string[]}>) {
    transactions = event.detail.transactions
    headers = event.detail.headers
  }
</script>

<main>
	<h1>{name}<i>(Magnus and Yash's Budget)</i></h1>
  <Upload on:upload={uploadHander}></Upload>
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