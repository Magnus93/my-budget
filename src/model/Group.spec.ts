import { MonthGroup, CategoryGroup } from "./Group"
import type { Transaction } from "./Transaction"

const txs: Transaction[] = [
  { date: "2022-01-01", amount: 1, description: "nomnom", category: "resturant" },
  { date: "2022-01-01", amount: 1, description: "nomnom", category: "resturant" },
  { date: "2022-03-01", amount: 1, description: "swim", category: "health" },
  { date: "2022-01-04", amount: 1, description: "other", category: "misc"}
]

describe("Groups", () => {
  it("MonthGroup", () => {
    expect(MonthGroup.create(txs)).toEqual(
      new Map(
        [
          ["2022-01",
            new Map(
              [
                [
                  "resturant",
                  [
                    { date: "2022-01-01", amount: 1, description: "nomnom", category: "resturant" },
                    { date: "2022-01-01", amount: 1, description: "nomnom", category: "resturant" },
                  ]
                ],
                [
                  "misc",
                  [{ date: "2022-01-04", amount: 1, description: "other", category: "misc"}]
                ]
              ]
            ),
          ], [
            "2022-03", new Map([["health", [{ date: "2022-03-01", amount: 1, description: "swim", category: "health" }]]])
          ]
        ]
      )
    )
  })
})