import { Category } from "./Category";
import { Transaction } from "./Transaction";
import { Filter } from "./Filter";

export function categorize(actions: {filter: Filter, category: Category}[], transactions: Transaction[]): void {
  actions.forEach((a) => {
    Filter.apply(a.filter, transactions).forEach(t => t.category = a.category)
  })
}