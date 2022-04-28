import { Date } from "isoly"
import type { Category } from "./Category"
import type { Transaction } from "./Transaction"

export interface Filter {
  category?: (Category | undefined)[]
  description?: string | RegExp
  amount?: {$gte?: number, $lte?: number}
  date?: {$gte?: Date, $lte?: Date}
}

export namespace Filter {
  export function apply(filter: Filter, transactions: Transaction[]): Transaction[] {
    return transactions.filter(t => {
      return (!(filter.category?.length > 0) || filter.category.includes(t.category)) &&
      ((!(typeof filter.description == "string" && filter.description != "")) || RegExp(filter.description, "i").test(t.description)) &&
      ((!(filter.description instanceof RegExp)) || ((filter.description.lastIndex = 0) && filter.description.test(t.description))) &&
      ((!(typeof filter.amount?.$gte == "number")) && filter.amount.$gte <= t.amount) &&
      ((!(typeof filter.amount?.$lte == "number")) && filter.amount.$lte >= t.amount) &&
      ((!Date.is(filter.date?.$gte)) && filter.date.$gte <= t.date) &&
      ((!Date.is(filter.date?.$lte)) && filter.date.$lte >= t.date)
    })
  }
}