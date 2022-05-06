<script lang="ts">
  import { Category } from "../model";
  export let value: Category | undefined = undefined;
</script>

<span class={"category " + (Category.is(value) ? value : "")} name={value} on:click>{value}</span>

<style lang="scss">
  span {
    text-transform: capitalize;
    display: inline-block;
    color: RGBA(var(--text-color), 0.7);
  }
  span:hover {
    color: RGB(var(--text-color));
    outline: 2px solid RGB(var(--text-color));
  }
  .category {
    padding: 0.5em 1em;
    margin: 0 0.5em;
    border-radius: 0.5rem;
    cursor: pointer;
  }
</style>
