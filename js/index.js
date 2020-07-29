d3.select('h1').style('color','blue')
.attr('id','heading')
.text('D3 Graphing trial!');

d3.select('body').append('p')
.text('First Paragraph');

var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

//svg.call(d3.zoom().on('zoom', zoomed));

var node_radius=7

filearr=["jsons/data1.json","jsons/data1.json","jsons/data1.json"]

filearr.forEach(function (file, i) {
	
var oReq = new XMLHttpRequest();
oReq.addEventListener("load", function(){
    doStuff(JSON.parse(this.responseText));
});
oReq.open("GET", file);
oReq.send();
});

function doStuff(json){
    console.log(json);
}
/*
var oReq = new XMLHttpRequest();
oReq.addEventListener("load", function(){
    doStuff(JSON.parse(this.responseText));
});
oReq.open("GET", "jsons/data1.json");
oReq.send();


// build the arrow.
svg.append("svg:defs").selectAll("marker")
    .data(["end"])      // Different link/path types can be defined here
  .enter().append("svg:marker")    // This section adds in the arrows
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 20)
    .attr("refY", 0)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

//var color = d3.scaleOrdinal(d3.schemeCategory20);
var GRAPH = [];
var NODES=[]
var LINKS=[]

var simulation = d3.forceSimulation()
  //.force("link", d3.forceLink().id(function(d) { return d.id; }).distance(100).strength(1))
  //.force("charge", d3.forceManyBody().strength(-50))
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody().strength(-5))
    .force("center", d3.forceCenter(width / 2, height / 2));

$.getJSON( "jsons/data2.json", function( data){
  GRAPH = data;
  console.log(GRAPH);
  //NODES=GRAPH.nodes;
  //LINKS=GRAPH.links
  console.log(GRAPH.nodes)
	
	var link = svg.append("g")
		.attr("class", "links")
	  .selectAll("line")
	  .data(GRAPH.links)
	  .enter().append("line")
		.attr("marker-end", "url(#end)");


	var node = svg.append("g")
		.attr("class", "nodes")
	  .selectAll("g")
	  .data(GRAPH.nodes)
	  .enter().append("g")

	var circles = node.append("circle")
		.attr("r", node_radius)
		//.attr("fill", function(d) { return color(d.id); })
		.attr("fill","red")
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
		.nodes(GRAPH.nodes)
		.on("tick", ticked);

	simulation.force("link")
		.links(GRAPH.links);

	function ticked() {
	  link
		  .attr("x1", function(d) { return d.source.x; })
		  .attr("y1", function(d) { return d.source.y; })
		  .attr("x2", function(d) { return d.target.x; })
		  .attr("y2", function(d) { return d.target.y; });

	  node
		  .attr("transform", function(d) {
			return "translate(" + d.x + "," + d.y + ")";
		  	//return0	"translate(${d.x},${d.y})";
		  })
	}
	
	/*
/*
function ticked() {

  link.attr('d', (d) => {
    const deltaX = d.target.x - d.source.x;
    const deltaY = d.target.y - d.source.y;
    const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const normX = deltaX / dist;
    const normY = deltaY / dist;
    const sourcePadding = d.left ? 17 : 12;
    const targetPadding = d.right ? 17 : 12;
    const sourceX = d.source.x + (sourcePadding * normX);
    const sourceY = d.source.y + (sourcePadding * normY);
    const targetX = d.target.x - (targetPadding * normX);
    const targetY = d.target.y - (targetPadding * normY);

    return `M${sourceX},${sourceY}L${targetX},${targetY}`;
  });

  node.attr('transform', (d) => `translate(${d.x},${d.y})`);
}*/
//});

//console.log(GRAPH);
//console.log(NODES)
//console.log(LINKS)
/*
function loadJson() {
    obj= $.getJSON('data.json');
    GRAPH=obj.responseJSON.nodes;
 };
loadJson();
console.log(GRAPH)
*/


/*
//d3.json("data.json", function(error, graph) {
d3.json("https://atiyabzafar.github.io/js/data.json", function(error, graph) {	
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
	.attr("r", node_radius)
	//.attr("fill", function(d) { return color(d.id); })
	.attr("fill","red")
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


// Zooming function translates the size of the svg container.
function zoomed() {
	  container.attr("transform", "translate(" + d3.event.transform.x + ", " + d3.event.transform.y + ") scale(" + d3.event.transform.k + ")");
}
*/

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
