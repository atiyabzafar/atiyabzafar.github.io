$(document).ready( function() {

  var w, h, fill;
  w = $("#page").width();
  h = 450;
  //fill = d3.scale.category20();

  var vis = d3.select("#chart")
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h);

  var plot = function(thing) {
    console.log('Plotting ' + thing);

    d3.json("https://atiyabzafar.github.io/js/jsons/data" + thing + ".json", function(json) {

      // Debug what's coming in as JSON
      console.log(json);
      console.log(json["nodes"].length);
      console.log(json["links"].length);

    var force = d3.layout.force()
      .charge(-100)
      .linkDistance(60)
      .nodes(json.nodes)
      .links(json.links)
      .size([w, h])
      .start();

    var link = vis.selectAll("line.link")
      .data(json.links);

    link.enter().append("svg:line");

    link.exit().remove();

    link.attr("class", "link")
      //.style("stroke-width", function(d) { return Math.sqrt(d.value); })
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

    var node = vis.selectAll("circle.node")
      .data(json.nodes);

    node.enter().append("svg:circle");

    node.exit().remove();

    node.attr("class", "node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", 5)
      .style("fill","red")
      .call(force.drag);

    node.append("svg:title")
      .text(function(d) { return d.id; });

    vis.style("opacity", 1e-6)
      .transition()
      .duration(1000)
      .style("opacity", 1);

    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

      node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    });

    });

  };


  $("ul.toggles li input").click(function() {
    var theValue = $(this).attr("value");
    console.log('Click ' + theValue);
    plot(theValue);
  });

  plot(2);
});
