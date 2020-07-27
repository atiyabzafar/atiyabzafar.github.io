d3.select('h1').style('color','blue')
.attr('id','heading')
.text('D3 Graphing trial!');

d3.select('body').append('p')
.text('First Paragraph');

var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

// build the arrow.
svg.append("svg:defs").selectAll("marker")
    .data(["end"])      // Different link/path types can be defined here
  .enter().append("svg:marker")    // This section adds in the arrows
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 20)
    .attr("refY", 0)
    .attr("markerWidth", 5)
    .attr("markerHeight", 5)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
  .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(50).strength(1))
  .force("charge", d3.forceManyBody().strength(-30))
  .force("center", d3.forceCenter(width / 2, height / 2));

d3.json("data.json", function(error, graph) {
	
var link = svg.append("g")
	.attr("class", "links")
  .selectAll("line")
  .data(graph.links)
  .enter().append("line")
	.attr("marker-end", "url(#end)");


var node = svg.append("g")
	.attr("class", "nodes")
  .selectAll("g")
  .data(graph.nodes)
  .enter().append("g")

var circles = node.append("circle")
	.attr("r", 7)
	.attr("fill", function(d) { return color(d.id); })
	.call(d3.drag()
		.on("start", dragstarted)
		.on("drag", dragged)
		.on("end", dragended));

var lables = node.append("text")
	.text(function(d) {
	  return d.id; 
	})
	.attr('x', 6)
	.attr('y', 3);

node.append("title")
	.text(function(d) { return d.id; });

simulation
	.nodes(graph.nodes)
	.on("tick", ticked);

simulation.force("link")
	.links(graph.links);

function ticked() {
  link
	  .attr("x1", function(d) { return d.source.x; })
	  .attr("y1", function(d) { return d.source.y; })
	  .attr("x2", function(d) { return d.target.x; })
	  .attr("y2", function(d) { return d.target.y; });

  node
	  .attr("transform", function(d) {
		return "translate(" + d.x + "," + d.y + ")";
	  })
}
});

function dragstarted(d) {
if (!d3.event.active) simulation.alphaTarget(0.3).restart();
d.fx = d.x;
d.fy = d.y;
}

function dragged(d) {
d.fx = d3.event.x;
d.fy = d3.event.y;
}

function dragended(d) {
if (!d3.event.active) simulation.alphaTarget(0);
d.fx = null;
d.fy = null;
}
