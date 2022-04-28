<script lang="ts">
  import type { Category } from "../model";
  export let value: Category | undefined = undefined;
  let color: string | undefined
  $: {
    color = {
      groceries: "blue",
      resturant: "red",
      health: "green",
      furniture: "purple",
      misc: "teal",
    }[value]
  }
</script>

<span class={"category " + color} name={value} on:click>{value}</span>

<style lang="scss">
  span {
    font-size: 1.2rem;
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
</style>
