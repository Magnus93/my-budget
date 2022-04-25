<script lang="ts">
  import { writable } from "svelte/store";
  import Edit from "./Edit.svelte";
  import Upload from "./Upload.svelte";
  export let name: string;
  let transactions: Record<string, any>[];
  let headers: string[];
  const tab = writable<"upload" | "edit" | "present">("upload");
  let tabValue: "upload" | "edit" | "present";
  tab.subscribe((value) => {
    tabValue = value;
    console.log;
  });
  const categories: { name: string; color?: string }[] = [
    { name: "groceries", color: "blue" },
    { name: "resturant", color: "red" },
    { name: "health", color: "green" },
    { name: "furniture", color: "purple" },
    { name: "misc", color: "teal" },
  ];
  function uploadHander(
    event: CustomEvent<{
      transactions: Record<string, any>[];
      headers: string[];
    }>
  ) {
    transactions = event.detail.transactions;
    headers = event.detail.headers;
    tab.set("edit");
  }
</script>

<main>
  <header>
    <h1>{name}<i>(Magnus and Yash's Budget)</i></h1>
    <nav>
      <ul>
        <li
          class={tabValue == "upload" && "selected-tab"}
          on:click={() => tab.set("upload")}
        >
          Upload
        </li>
        <li
          class={tabValue == "edit" && "selected-tab"}
          on:click={() => tab.set("edit")}
        >
          Edit
        </li>
        <li
          class={tabValue == "present" && "selected-tab"}
          on:click={() => tab.set("present")}
        >
          Present
        </li>
      </ul>
    </nav>
  </header>
  {#if tabValue == "upload"}<Upload on:upload={uploadHander} />{/if}
  {#if tabValue == "edit"}<Edit {transactions} {headers} {categories} />{/if}
  {#if tabValue == "present"}<div>Present</div>{/if}
</main>

<style type="text/scss">
  header {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
  }
  main {
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
  main > div {
    display: grid;
    /* grid-template-columns: 3fr 1fr; */
  }
  nav {
    display: flex;
    & > ul {
      display: contents;
      & > li {
        display: block;
        padding: 0.75rem 1.25rem;
        margin: 0 0.25rem;
        border-radius: 0.5rem;
        cursor: pointer;
        &:hover {
          outline: 2px solid red;
        }
        &.selected-tab {
          outline: 2px solid pink;
        }
      }
    }
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
