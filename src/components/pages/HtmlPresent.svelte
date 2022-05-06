<script lang="ts">
  import { onMount } from "svelte";
  import { Category, Transaction, Filter, Common } from "../../model";
  import {
    scaleBand,
    select,
    axisBottom,
    axisLeft,
    scaleLinear,
    max,
  } from "d3";
  let transactions: Record<Category | "undefined", Transaction[]>;

  let height = 400;
  let width = window.innerWidth;

  onMount(() => {
    Common.transactions.subscribe((value) => {
      transactions = value.reduce(
        (r, c) => {
          return {
            ...r,
            [c.category ?? "undefined"]: [...r[c.category ?? "undefined"], c],
          };
        },
        {
          groceries: [],
          resturant: [],
          health: [],
          household: [],
          hobby: [],
          subscriptions: [],
          transport: [],
          misc: [],
          undefined: [],
        }
      );
      drawBarChart(
        Object.entries(transactions).map((entry) => {
          const c = entry[0];
          const t = entry[1];
          const amount: number = t.reduce(
            (r: number, b: Transaction) => r + b.amount,
            0
          );
          return { name: c as Category | "undefined", value: amount };
        })
      );
    });
  });
  function drawBarChart(
    data: { name: Category | "undefined"; value: number }[]
  ) {
    let margin = { top: 20, right: 50, bottom: 20, left: 50 };

    let x = scaleBand()
      .domain(data.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.1);
    let y = scaleLinear()
      .domain([0, max(data, (d) => d.value)])
      .range([height - margin.bottom, margin.top]);
    let svg = select("svg");

    let g = svg.append("g").attr("fill", "orange");

    let xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(axisBottom(x));

    let yAxis = (g) =>
      g.attr("transform", `translate(${margin.left},0)`).call(axisLeft(y));

    g.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("fill", (d) => (d.name == undefined ? "grey" : undefined))
      .attr("class", (d) => (d.name ?? "") + " category")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => y(0) - y(d.value))
      .attr("width", x.bandwidth());
    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);
  }
</script>

<svg {height} {width} />
