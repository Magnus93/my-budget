import type { Category } from "./Category";
import type { Transaction } from "./Transaction";
import { Filter } from "./Filter";

export function categorize(actions: {filter: Filter, category: Category}[], transactions: Transaction[]): void {
  actions.forEach((a) => {
    Filter.apply(a.filter, transactions).forEach(t => t.category = a.category)
  })
}

export function toStyle(styleRecord?: Record<string, string>): string {
  return styleRecord ? Object.entries(styleRecord).map(entry => entry[0] + ": " + entry[1] + "; ").join("") : ""
}