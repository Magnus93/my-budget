<script lang="ts">
import { query_selector_all } from "svelte/internal";

  import { Category, Filter, Common } from "../model";
  let options: Record<string, boolean> = Object.fromEntries(
    [...Category.types, "undefined"].map((c) => [c, false])
  );

  function setAll(value: boolean) {
    Object.keys(options).forEach(k => {
      options[k] = value
    })
  }
  function areAllTrue(): boolean {
    return Object.values(options).reduce((r, c) => r && c, true)
  }
  function areAllFalse(): boolean {
    return !Object.values(options).reduce((r, c) => r || c, false)
  }

  function handleSelect(e: Event) {
    let name = (e.target as HTMLInputElement).name;
    let checked = (e.target as HTMLInputElement).checked;
    if (name == "all") 
      setAll(!areAllTrue()) 
    else {
      options[name] = checked;
      console.log(name, options[name]);
    }
    if (areAllFalse())
      Common.filter.update((value) => {
        delete value.category;
        return value;
      });
    else
      Common.filter.update((value) => ({
        ...value,
        category: Object.entries(options).reduce(
          (r: (Category | undefined)[], c) => {
            let cat: string = c[0];
            console.log("Add cat", c[1], Category.is(cat), cat)
            return c[1] ? [...r, Category.is(cat) ? cat : undefined] : r;
          },
          []
        ),
      }));
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
