
export type Category = typeof Category.types[number]
export namespace Category {
  export const types = ["groceries", "resturant", "health", "household", "hobby", "subscriptions", "transport", "misc"] as const
  export function is(value: Category | any): value is Category {
    return types.includes(value)
  }
}