d3.select('h1').style('color','blue')
.attr('id','heading')
.text('D3 Graphing trial!');

d3.select('body').append('p')
.text('First Paragraph');

var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");
/*
svg.append('defs').append('marker')
	.attrs({'id':'arrowhead',
    'viewBox':'-0 -5 10 10',
    'refX':13,
    'refY':0,
    'orient':'auto',
    'markerWidth':13,
    'markerHeight':13,
    'xoverflow':'visible'})
	.append('svg:path')
	.attr('d', 'M 0,-5 L 10 ,0 L 0,5')
	.attr('fill', '#999')
	.style('stroke','none');
*/
var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
  .force("link", d3.forceLink().id(function(d) { return d.id; }))
  .force("charge", d3.forceManyBody())
  .force("center", d3.forceCenter(width / 2, height / 2));

d3.json("data.json", function(error, graph) {

var link = svg.append("g")
	.attr("class", "links")
  .selectAll("line")
  .data(graph.links)
  .enter().append("line")
//	.attr("marker-end", "url(#arrowhead)");

var node = svg.append("g")
	.attr("class", "nodes")
  .selectAll("g")
  .data(graph.nodes)
  .enter().append("g")

var circles = node.append("circle")
	.attr("r", 5)
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
