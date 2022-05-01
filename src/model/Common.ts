import { writable } from "svelte/store";
import type { Filter } from "./Filter";

export namespace Common {
  export const filter = writable<Filter>({});
}