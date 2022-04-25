<script lang="ts">
  export let value: { name: string; color?: string } | undefined = undefined;
</script>

<span class={"category " + value.color} name={value.name}>{value.name}</span>

<style lang="scss">
  .category {
    padding: 0.25em 0.75em;
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
