<script lang="ts">
  import * as model from "../model"
  export function getOption() {
    console.log(selectElement.value)
    return selectElement.value
  }
  let selectElement: HTMLSelectElement
  
</script>

<select bind:this={selectElement}>
  {#each model.Category.types as c}
    <option value={c}>{c}</option>
  {/each}
</select>
