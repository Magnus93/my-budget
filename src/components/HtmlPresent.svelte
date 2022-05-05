<script lang="ts">
  import { onMount } from "svelte";
  import {
    scaleBand,
    select,
    axisBottom,
    axisLeft,
    scaleLinear,
    max,
  } from "d3";
  onMount(() => {
    let data = [
      { name: "A", value: 0.08167 },
      { name: "B", value: 0.01492 },
      { name: "C", value: 0.02782 },
      { name: "D", value: 0.04253 },
      { name: "E", value: 0.12702 },
      { name: "F", value: 0.02288 },
      { name: "G", value: 0.02015 },
      { name: "H", value: 0.06094 },
      { name: "I", value: 0.06966 },
      { name: "J", value: 0.00153 },
      { name: "K", value: 0.00772 },
      { name: "L", value: 0.04025 },
      { name: "M", value: 0.02406 },
      { name: "N", value: 0.06749 },
      { name: "O", value: 0.07507 },
      { name: "P", value: 0.01929 },
      { name: "Q", value: 0.00095 },
      { name: "R", value: 0.05987 },
      { name: "S", value: 0.06327 },
      { name: "T", value: 0.09056 },
      { name: "U", value: 0.02758 },
      { name: "V", value: 0.00978 },
      { name: "W", value: 0.0236 },
      { name: "X", value: 0.0015 },
      { name: "Y", value: 0.01974 },
      { name: "Z", value: 0.00074 },
    ];
    let height = 400;
    let width = 550;
    let margin = { top: 20, right: 20, bottom: 20, left: 20 };

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
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => y(0) - y(d.value))
      .attr("width", x.bandwidth());

    svg.append("g").call(xAxis);

    svg.append("g").call(yAxis);
  });
</script>

<svg height="450" width="600" />
