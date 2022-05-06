<script lang="ts">
  import { writable } from "svelte/store";
  import { Common, Transaction } from "../model";
  import HtmlPresent from "./pages/HtmlPresent.svelte";
  import HtmlEdit from "./pages/HtmlEdit.svelte";
  import HtmlUpload from "./pages/HtmlUpload.svelte";
  export let name: string;
  let transactions: Transaction[];
  const tab = writable<"upload" | "edit" | "present">("upload");
  let tabValue: "upload" | "edit" | "present";
  tab.subscribe((value) => {
    tabValue = value;
  });
  Common.transactions.subscribe((value) => {
    transactions = value
    if (value.length > 0)
      tab.set("edit")
  })
</script>

<div id="root">
  <header>
    <h1>{name + " "}<i>(Magnus and Yash's Budget)</i></h1>
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
    {#if tabValue == "upload"}<HtmlUpload />{/if}
    {#if tabValue == "edit"}<HtmlEdit />{/if}
    {#if tabValue == "present"}<HtmlPresent />{/if}
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
