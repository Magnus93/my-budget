
export type Category = "groceries" | "resturant" | "health" | "furniture" | "misc"
export namespace Category {
  export const types = ["groceries" , "resturant" , "health" , "furniture" , "misc"] as const
  export function is(value: Category | any): value is Category {
    return types.includes(value)
  }
}