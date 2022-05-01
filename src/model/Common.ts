import { writable } from "svelte/store";
import { Filter } from "./Filter";

export namespace Common {
  export const filter = writable<Filter>({});
}