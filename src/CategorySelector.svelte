<script lang="ts">
    export let categories: {name: string, color?: string}[] | undefined = undefined
</script>


<select>
    {#each categories ?? [] as c}
      <option value={c.name}>{c.name}</option>
    {/each}
</select>