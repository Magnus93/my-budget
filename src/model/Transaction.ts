import { Date } from "isoly"
import { from } from "isoly/dist/CountryCode/Name/ar"
import { Category } from "./Category"

export interface Transaction {
  category?: Category
  description: string
  amount: number
  date: Date
}

export namespace Transaction {
  export function is(value: Transaction | any): value is Transaction {
    return (value.category == undefined || Category.is(value.category)) && 
      typeof value.description == "string" && 
      typeof value.amount == "number" && 
      Date.is(value.date)
  }
  export function sum(transactions: Transaction[]): number {
    return transactions.reduce((r, t) => r + t.amount ,0)
  }
  export function fromCsv(
    csv: string, 
    divider=",", 
    headerMap: Record<string, "description" | "amount" | "date"> = {Text: "description", Belopp: "amount", Datum: "date"}
  ): Transaction[] | undefined {
    let result: Transaction[] | undefined
    let splitted = csv.split(/\r?\n/g)
    let headers = splitted[0].split(divider)
    result = splitted.splice(1).map((row, index) => {
      let values = row.split(divider).map(v => v.trim())
      let transaction = values.reduce((r: Record<string, string|number>, c, i) => {
        let property = headerMap[headers[i]]
        let value = property == undefined 
          ? undefined 
          : property == "description" || property == "date"
          ? c
          : getAmountFromString(c)
        return property ? {...r, [property]: value } : r
      }, {})
      return transaction
    }).filter(t => Transaction.is(t)) as Transaction[]
    return result
  }
  function getAmountFromString(value: string): number | undefined {
    return value == "" 
      ? 0 
      : (/^\-?\d+(\.\d+)?(kr)?$/g.test(value.replace(",", ".").replace(/ /g, "").replace("\r", "")) 
      ? +value.substring(0, value.length-4).replace(",", ".").replace(/ /g, "").replace("\r", "") 
      : undefined)
  }
  // function csvToObject(csv: string, divider=","): Record<string, any>[] {
  //   let result = []
  //   let splitted = csv.split("\n")
  //   headers = splitted[0].split(divider).map(h => h.replace("\r", ""))
  //   splitted.splice(1).forEach((row, index) => {
  //     let values = row.split(divider)
  //     result.push(values.reduce((r, c, i) => ({...r, [headers[i]]: convert(c.trim())}), {}))
  //   })
  //   headerTypes = headers.reduce((r: Record<string, "string" | "number">, h: string) => {
  //     let typ = typeof result[0][h]
  //     return typ == "string" || typ == "number" ? {...r, [h]: typ} : r
  //   }, ({} as Record<string, "string" | "number">))
  //   return result
  // }
}