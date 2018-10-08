
var svg = d3.select('svg'),
    width = 400,
    height = 400,
    color = d3.scaleOrdinal(d3.schemeCategory10);

var nodes = [
    { id: 'a', r: 24, x: -40, y: 10 },
    { id: 'b', r: 20, x: -20, y: 50 },
    { id: 'c', r: 10, x: 0, y: 10 },
    { id: 'd', r: 16, x: 40, y: 50 },
    { id: 'e', r: 20, x: 80, y: -10 },
    { id: 'f', r: 16, x: 40, y: -50 },
    { id: 'g', r: 20, x: -80, y: 10 },
    { id: 'h', r: 16, x: -40, y: -50 },
    { id: 'i', r: 20, x: -80, y: 10 }
];

for (var i = 0; i < 100; i++) {
    nodes.push({ id: Math.random()*100, r: Math.random()*20, x: Math.random()*100, y: Math.random()*100 });
}

var simulation = d3.forceSimulation(nodes)
    // scatter bubbles for split second
    //.force('charge', d3.forceManyBody().strength(-100)) // lower is further apart

    // pull bubbles towards their specified position
    .force('x', d3.forceX().x(function (d) {
        return d.x;
    }))
    .force('y', d3.forceY().y(function (d) {
        return d.y;
    }))
    // force bubbles apart from each other
    .force('collision', d3.forceCollide().radius(function(d) {
        return d.r+4;
    }))
    .alphaTarget(1)
    .on('tick', ticked);

var g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
var node = g.append('g').attr('stroke', '#fff').attr('stroke-width', 1.5).selectAll('.node');

restart();

function restart() {

    // Apply the general update pattern to the nodes.
    node = node.data(nodes, function (d) { return d.id; });
    node.exit().remove();
    node = node.enter().append('circle')
        .attr('fill', function (d) { return color(d.id); })
        .attr('r', function (d) { return d.r; })
        //.attr('cx', 10)
        //.attr('cy', -300)
        .merge(node);

    // Update and restart the simulation.
    simulation.nodes(nodes);
    simulation.alpha(1).restart();
}

function ticked() {
    node.attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })

}

let input = d3.select('#controls input');
let button = d3.select('#controls button');

button.node().addEventListener('click', (e) => {
    console.log(input.node().value);

    console.log(simulation);

})

d3.timeout(function () {
    restart();
}, 2000);




// d3.interval(function() {
//   nodes.pop(); // remove e
//   restart();
// }, 2000, d3.now());

// d3.interval(function() {
//   nodes.push({ id: 'e', r: 20 });
//   restart();
// }, 2000, d3.now() + 1000);