<script lang="ts">
  import * as model from "../model"
</script>

<select>
  {#each model.Category.types as c}
    <option value={c}>{c}</option>
  {/each}
</select>
