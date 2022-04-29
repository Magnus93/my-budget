import { Filter } from "./Filter"
import { Transaction } from "./Transaction"

describe("Filter", () => {
  let trans: Transaction[] = [
    {category: "furniture", description: "IKEA", amount: 30, date: "2022-03-01"},
    {category: "health", description: "Ica Maxi", amount: 10, date: "2022-02-01"},
    {category: "health", description: "Willys Store", amount: 40, date: "2022-05-01"},
    {description: "Ica Maxi", amount: 20, date: "2022-06-01"},
    {category: "resturant", description: "Max Burgare", amount: 15, date: "2022-02-15"},
    {category: "misc", description: "Il Forno", amount: 110, date: "2022-04-16"},
  ]
  it("Filter.apply", () => {
    expect(Filter.apply({ category: ["health", undefined] }, trans)).toEqual([trans[1], trans[2], trans[3]])
    expect(Filter.apply({ description: "max" }, trans)).toEqual([trans[1], trans[3], trans[4]])
    expect(Filter.apply({ description: /(willys|maxi)/i }, trans)).toEqual([trans[1], trans[2], trans[3]])
    expect(Filter.apply({ amount: {gte: 15} }, trans)).toEqual([trans[0], trans[2], trans[3], trans[4], trans[5]])
    expect(Filter.apply({ amount: {lte: 30} }, trans)).toEqual([trans[0], trans[1], trans[3], trans[4]])
    expect(Filter.apply({ date: {gte: "2022-03-01"} }, trans)).toEqual([trans[0], trans[2], trans[3], trans[5]])
    expect(Filter.apply({ date: {lte: "2022-03-01"} }, trans)).toEqual([trans[0], trans[1], trans[4]])
  })
})