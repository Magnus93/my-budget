<script lang="ts">
  import { Date, DateRange } from "isoly";
  import { Common } from "../model";
  export let dateRange: Partial<DateRange>;

  function handleDateChange(e) {
    const name = e.target.name;
    const date = e.target.value;
    if (name == "min" || name == "max")
      Common.filter.update((value) => {
        const property: "gte" | "lte" = { min: "gte", max: "lte" }[name];
        if (Date.is(date))
          value = { ...value, date: { ...value.date, [property]: date } };
        else if (date == "") delete value.date[property];
        return value;
      });
  }
</script>

<div>
  <fieldset>
    <legend>Filter</legend>
    <legend for="min-date">From</legend>
    <input
      type="date"
      for="min-date"
      name="min"
      min={dateRange.start}
      max={dateRange.end}
      on:change={handleDateChange}
    />
    <legend for="max-date">To</legend>
    <input
      type="date"
      for="max-date"
      name="max"
      min={dateRange.start}
      max={dateRange.end}
      on:change={handleDateChange}
    />
  </fieldset>
  <fieldset>
    <legend>Sort</legend>
  </fieldset>
</div>
