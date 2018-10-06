
console.clear();

const data = [
  {
    title: "boop",
    category: "things",
    radius: 50
  },
  {
    title: "doop",
    category: "stuff",
    radius: 100
  },
  {
    title: "gloop",
    category: "doodads",
    radius: 150
  },
  {
    title: "mcdoop",
    category: "whatchamacallit",
    radius: 80
  },
  {
    title: "bloop",
    category: "whatever",
    radius: 120
  }
];

const bubbleChart = () => {
  let width = 600;
  let height = 400;

  function chart(selection) {
    let svg = d3.selectAll("svg");
    svg.attr("width", width)
      .attr("height", height)

    // stuff here
    let simulation = d3.forceSimulation(data)
      .force("charge", d3.forceManyBody().strength([-100]))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .on("tick", ticked);

    function ticked(e) {
      node.attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; });
      // node = each circle
    }

    let scaleRadius = d3.scaleLinear()
      .domain([d3.min(data, function (d) { return +d.radius }),
      d3.max(data, function (d) { return +d.radius })])
      .range([10, 20]);

    let colorCircles = d3.scaleOrdinal(d3.schemeCategory10);

    let node = svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", function (d) { return scaleRadius(d.radius); })
      .style("fill", function (d) { return colorCircles(d.category); })
      .attr("transform", "translate(" + [width / 2, height / 2] + ")")
  }

  chart.width = function (value) {
    if (!arguments.length) { return width; }
    width = value;

    return chart;
  }

  chart.height = function (value) {
    if (!arguments.length) { return height; }
    height = value;

    return chart;
  }

  return chart;
}



let chart = bubbleChart().width(600).height(400);
d3.select("#chart").data(data).call(chart);

let input = d3.select('#controls input');
input.node().addEventListener('input', (e) => {
  console.log(e.target.value);
})

