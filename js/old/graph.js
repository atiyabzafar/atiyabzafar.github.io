d3.select('h1').style('color','blue')
.attr('id','heading')
.text('D3 Graphing trial for Graph Evolution!');

d3.select('body')
.attr("width", "100%")
.attr("height", "100%")
.call(d3.zoom().on("zoom", function () {
  svg.attr("transform", d3.event.transform)
   }))

var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height")

var node_radius=6

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
  //.force("link", d3.forceLink().id(function(d) { return d.id; }).distance(100).strength(1))
  //.force("charge", d3.forceManyBody().strength(-50))
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody().strength(-10))
    .force("center", d3.forceCenter(width / 2, height / 2));
//var i=2;
//for (i = 2; i < 12; i++) {

  //d3.json("jsons/data"+i+".json", function(error, graph) {
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
  /*invalidation.then(() => simulation.stop());
    return Object.assign(svg.node(), {
      update({nodes, links}) {
        // Make a shallow copy to protect against mutation, while
        // recycling old nodes to preserve position and velocity.
        const old = new Map(node.data().map(d => [d.id, d]));
        nodes = nodes.map(d => Object.assign(old.get(d.id) || {}, d));
        links = links.map(d => Object.assign({}, d));
        node = node
          .data(nodes, d => d.id)
          .join(enter => enter.append("circle")
            .attr("r", 5)
            .call(drag(simulation))
            .call(node => node.append("title").text(d => d.id)));
        link = link
          .data(links, d => [d.source, d.target])
          .join("line");
        simulation.nodes(nodes);
        simulation.force("link").links(links);
        simulation.alpha(1).restart().tick();
        ticked(); // render now!
      }
    });
  */
  });
//}//for loop ends
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


d3.select('body').append('p')
.text('This shows an interactive simulation for a network. Each node is linked by an attractive force along the edges. Also there is present a many body repulsive force acting between nodes.\
      You can zoom in via double click/mouse wheel. Nodes can be dragged around but it causes the nodes to move away as the many body repulsion gets disturbed. The canvas(region behind the nodes can be dragged along as well. \
      This will move the whole graph.');


// Zooming function translates the size of the svg container.
//function zoomed() {
//	  container.attr("transform", "translate(" + d3.event.transform.x + ", " + d3.event.transform.y + ") scale(" + d3.event.transform.k + ")");
//}
