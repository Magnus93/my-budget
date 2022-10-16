import type { Category } from "./Category"
import type { Transaction } from "./Transaction"


export type MonthGroup = Map<string, CategoryGroup>
export namespace MonthGroup {
  export function create(transactions?: Transaction[]): MonthGroup {
    let result = new Map()
    return transactions
      ? transactions.reduce((r, c) => MonthGroup.add(r, c), result)
      : result
  }
  export function add(group: MonthGroup, tx: Transaction): MonthGroup {
    const month = tx.date.substring(0, 7)
    const catGroup = group.get(month)
    if (!catGroup)
      group.set(month, CategoryGroup.create([tx]))
    else
      CategoryGroup.add(catGroup, tx)
    return group
  }
}
export type CategoryGroup = Map<Category | "undefined", Transaction[]>
export namespace CategoryGroup {
  export function create(transactions?: Transaction[]): CategoryGroup {
    let result = new Map()
    return transactions ? transactions.reduce((r, c) => CategoryGroup.add(r, c),result) : result
  }
  export function add(group: CategoryGroup, tx: Transaction): CategoryGroup {
    const category = tx.category ?? "undefined"
    return group.set(category, [...group.get(category) ?? [], tx])
  }
}
