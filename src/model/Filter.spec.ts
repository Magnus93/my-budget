import { Filter } from "./Filter"
import { Transaction } from "./Transaction"

describe("Filter", () => {
  let trans: Transaction[] = [
    {category: "furniture", description: "", amount: 30, date: "2022-03-01"},
    {category: "health", description: "", amount: 10, date: "2022-02-01"},
    {category: "health", description: "", amount: 40, date: "2022-05-01"},
    {description: "", amount: 20, date: "2022-06-01"},
    {category: "misc", description: "", amount: 30, date: "2022-12-01"},
  ]
  it("Filter.apply", () => {
    expect(Filter.apply({ category: ["health", undefined] }, trans)).toEqual([trans[1], trans[2], trans[3]])
  })
})