
export type Category = "groceries" | "resturant" | "health" | "furniture" | "hobby" | "subscriptions" | "misc"
export namespace Category {
  export const types = ["groceries", "resturant", "health", "furniture", "hobby", "subscriptions", "misc"] as const
  export function is(value: Category | any): value is Category {
    return types.includes(value)
  }
}