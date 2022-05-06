import { writable } from "svelte/store";
import type { Filter } from "./Filter";
import type { Transaction } from "./Transaction";

export namespace Common {
  export const filter = writable<Filter>({});
  export const transactions = writable<Transaction[]>([]);
}