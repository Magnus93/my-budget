<script lang="ts">
  import {Category, Filter} from "../model"
  import { createEventDispatcher } from 'svelte';
  export let filter: Filter
  let options: Record<string, boolean> = Object.fromEntries([...Category.types, "undefined"].map(c => [c, false]))
  let selectedOptions: string[] | undefined
  function handleSelect(e: Event) {
    let name = (e.target as HTMLInputElement).name
    let checked = (e.target as HTMLInputElement).checked
    if (name == "all") {
      let allChecked = Object.values(options).reduce((r, c) => r && c, true)
      allChecked

    } else {
      options[name] = checked
      console.log(name, options[name])
    }
    let noneChecked = !Object.values(options).reduce((r, c) => {
      console.log(c)
      return r || c
    }, false)
    filter.category = noneChecked ? undefined : Object.entries(options).reduce((r: (Category | undefined)[], c) => {
      let cat: string = c[0]
      return c[1] ? [...r, (Category.is(cat) ? cat : undefined)] : r
    }, [])
  }
</script>

<div>
  <fieldset>
    <legend>Filter</legend>
    <div class={"category"}>
      <input
        type="checkbox"
        name="all"
        id="toggle-all"
        on:click={handleSelect}
      />
      <label for="toggle-all">All</label>
    </div>
    {#each Object.entries(options) as [k, v]}
      <div class={"category " + (k ? k : "")} name={k}>
        <input
          type="checkbox"
          name={k}
          id={k}
          on:click={handleSelect}
          checked={v}
        />
        <label for={k}>{k}</label>
      </div>
    {/each}
  </fieldset>
  <fieldset>
    <legend>Sort</legend>
  </fieldset>
</div>

<style lang="scss">
  fieldset {
    margin: 0.5rem 0;
    border-color: transparent;
  }
  div.category {
    display: flex;
    align-items: baseline;
    padding: 0.1rem 1rem;
    margin: 0.5rem 0;
    width: min-content;
    border-radius: 0.5rem;
    & > label {
      padding-left: 1rem;
      color: RGB(var(--text-color), 0.6);
    }
  }
  div.category:hover > label,
  input:checked ~ label {
    color: RGB(var(--text-color));
  }
</style>
