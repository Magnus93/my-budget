<script lang="ts">
  import { writable } from "svelte/store";
  import MyEdit from "./MyEdit.svelte";
  import MyUpload from "./MyUpload.svelte";
  export let name: string;
  let transactions: Record<string, any>[];
  let headers: string[];
  let headerTypes: Record<string, "string" | "number">;
  const tab = writable<"upload" | "edit" | "present">("upload");
  let tabValue: "upload" | "edit" | "present";
  tab.subscribe((value) => {
    tabValue = value;
    console.log;
  });
  function uploadHander(
    event: CustomEvent<{
      transactions: (Record<string, any> & {category?: string})[];
      headers: string[];
      headerTypes: Record<string, "string" | "number">
    }>
  ) {
    transactions = event.detail.transactions;
    headers = event.detail.headers;
    headerTypes = event.detail.headerTypes;
    console.log(headerTypes)
    tab.set("edit");
  }
</script>

<div id="root">
  <header>
    <h1>{name+" "}<i>(Magnus and Yash's Budget)</i></h1>
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
  <main>
    {#if tabValue == "upload"}<MyUpload on:upload={uploadHander} />{/if}
    {#if tabValue == "edit"}<MyEdit {transactions} {headers} {headerTypes} />{/if}
    {#if tabValue == "present"}<div>Present</div>{/if}
  </main>
</div>

<style type="text/scss">
  header {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
  }
  main {
    padding: 0 1em;
    margin: 0 auto;
  }
  header {
    background-color: RGB(var(--shade-color));
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
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
            background-color: RGB(var(--hover-color));
          }
          &.selected-tab {
            background-color: RGB(var(--accent-color));
          }
        }
      }
    }
  }
  h1 {
    color: RGB(var(--text-color));
    font-size: 2rem;
    font-weight: 200;
    margin: 0.5rem 0;
  }
  h1 > i {
    font-size: 1rem;
  }
</style>
