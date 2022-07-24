@def hascytoscape = true
@def hasmath = true
@def hasmathcalc = true
@def maxtoclevel=4

# Network Science 101 (Graph Theory)

>July 24, 2022


This Blog Post is about learning the basics of Network Science. Networks are all around us. From the electricity grid that supplies the power to your homes to the trasport system (Subway/Metro). 

The tools that will be introduced in this blog post are basically tools that I learned during my Post Graduate degree. *This also doubles as growth along the learning curve of HTML and javascript library vis.js for interactive graph visualisation.  I will be posting an interesting interactive game next week hopefully which requires learning these* We will start with introduction to Graph Theory.

## What are Networks?
A network is a collection of many interconnected objects or things. A famous example being a social network like Facebook or twitter where each twitter account/profile would be an individual object often called as a *node*. And where if one account follow another, they are said to be connected by a *link*. 

Other examples include: Biochecmical Networks/pathways, Ecological Networks such as Food webs, Neural Networks (Artifiial and Natural alike) and Social Systems such as Social Media and Societies.

## Graphs


What are graphs? For many people graphs are confined to what they draw for mathematics examinations in schools. But in mathematical science, graphs have a very distinct definition. Graph is a mathematical structure defined by two components: Vertices (Nodes) and Edges (Links). Where edges denote some kind of connection between them. 

> A Graph $\mathcal{G}(V,E)$ is defined by a set of vertices $V = \{ v_1, v_2, v_3 , \cdots v_n \}$ and a set of Edges $E=\{e_1,e_2,e_3, \cdots ,c_m \}$. Each edge $e$ is a ordered/unordered pair of vertices. 

In the examples below, red circles denote two different graphs. The edge set for each graph is different even when the set of nodes are same. In the right example, the edge set consists of ordered pair of the vertices. For instance, the link from $1$ to $2$ is different from $2$ to $1$. Whereas in the left example the edges are unordered. 
~~~
<div id="cy1" style="width:300px;height:250px;display:inline-block;"></div>
<div id="cy2"style="width:300px;height:250px;display:inline-block;"></div>
<script>
var nodes = new vis.DataSet([
  { id: 1, label: "1" },
  { id: 2, label: "2" },
  { id: 3, label: "3" },
  { id: 4, label: "4" },
  { id: 5, label: "5" },
]);
var edges = new vis.DataSet([
  { from: 1, to: 3 },
  { from: 1, to: 2 },
  { from: 2, to: 4 },
  { from: 2, to: 5 },
  { from: 3, to: 3 },
]);
var container = document.getElementById("cy1");
var data = {
  nodes: nodes,
  edges: edges,
};
var options = {};
var network = new vis.Network(container, data, options);

var nodes = new vis.DataSet([
  { id: 1, label: "1" },
  { id: 2, label: "2" },
  { id: 3, label: "3" },
  { id: 4, label: "4" },
  { id: 5, label: "5" },
]);

var edges = new vis.DataSet([
  { 'arrows':'to',from: 1, to: 3 },
  { 'arrows':'to',from: 1, to: 2 },
  { 'arrows':'to',from: 2, to: 1 },
  { 'arrows':'to',from: 2, to: 4 },
  { 'arrows':'to',from: 2, to: 5 },
  { 'arrows':'to',from: 1, to: 4 }
]);

var container = document.getElementById("cy2");
var data = {
  nodes: nodes,
  edges: edges,
};
var options = {};
var network = new vis.Network(container, data, options);
network.on('click',function(params){
    if((params.nodes.length == 0) && (params.edges.length == 0)) {
        var updatedIds = nodes.add([{
            label:'new',
            x:params.pointer.canvas.x,
            y:params.pointer.canvas.y
        }]);
        network.selectNodes([updatedIds[0]]);
        network.editNode();
    }
});

</script>

~~~

The left graph is an example of an **Undirected Graph**. Whereas the one on the right is an example of a **Directed Graph**.

A real life example for a directed Graph would be this blog post for example. When you arrived at the link you had to click on a button or a hyper link. That is a directed edge with vertices being two different web pages on the world wide web.

\note{Almost all graphs in this page are interactive and nodes can be dragged along and you can zoom in and out as well}

## Properties of Graphs

### Adjacency Matrix :

> The adjacency matrix of a graph $\mathcal{G} (V,E)$ is an $N \times N$ matrix (where $N$ is the number of nodes, or the size of the vertex Set $V$) whose elements are defined as follows 
\begin{aligned}A_{ij}&=1 \quad \text{if} (v_i,v_j) \in E \\ &= 0 \quad \text{otherwise} \end{aligned}

In other words, the $i-j$ elements in the matrix are non-zero only when there is a link from $i$ to $j$. For *undirected graph* as the edge set is formed by unordered pairs, the Adjacency matrix is a *symmetric matrix*.

But for a directed graph, the symmetric is in general a asymmetric matrix. So, the convention of defining the adjacency matrix is often important. Some sources/textbooks consider the reverse notation, where $A_{ji}=1$ when there is a link from $i$ to $j$. We will be using this notation.

**Adjacency Matrix and The network**

Using the above definition, following widget provides the adjacency matrix for an undirected graph. You can click on the canvas anywhere to add a new node. An edge can be made by clicking on the edit button on the top left corner.

~~~

<div id = "max_node", hidden = True></div>

<h1>Adjacency matrix for an indirected Graph</h1>
<table class="view">
  <colgroup>
    <col width="25%" />
    <col width="75%" />
  </colgroup>
  <tbody>
    <tr>
      <td>
        <h2>Matrix</h2>
        <div id="matrix" class="matrix"></div>
      </td>
      <td>
        <h2>Network</h2>
        <div id="mynetwork"></div>
      </td>
    </tr>
  </tbody>
</table>

<style>

.matrix {
    position: relative;
}
body {
    padding: 20px;    
}
.matrix:before, .matrix:after {
    content: "";
    position: absolute;
    top: 0;
    border: 1px solid #000;
    width: 6px;
    height: 100%;
}
.matrix:before {
    left: -6px;
    border-right: 0px;
}
.matrix:after {
    right: -6px;
    border-left: 0px;
}
.matrix td {
    padding: 5px;    
    text-align: center;
}
table.view {
  width: 100%;
}

table td {
  vertical-align: top;
}

table table {
  background-color: #f5f5f5;
  border: 1px solid #e5e5e5;
}

table table td {
  vertical-align: middle;
}

#mynetwork {
  width: 100%;
  height: 400px;
  border: 1px solid lightgray;
}

</style>


<script>
var nodes, edges, network;

function draw() {
  nodes = new vis.DataSet();
  nodes.add([
    { id: "1", label: "1" },
    { id: "2", label: "2" },
    { id: "3", label: "3" },
    { id: "4", label: "4" },
    { id: "5", label: "5" },
  ]);
  edges = new vis.DataSet();
  edges.add([
    { id: "1-2", from: "1", to: "2" },
    { id: "1-3", from: "1", to: "3" },
    { id: "2-4", from: "2", to: "4" },
    { id: "2-5", from: "2", to: "5" },
  ]);
  var container = document.getElementById("mynetwork");
  var data = {
    nodes: nodes,
    edges: edges,
  };

  var options = {
    interaction:{
        dragNodes:true,
        dragView: true,
        hideEdgesOnDrag: false,
        hideEdgesOnZoom: false,
        hideNodesOnDrag: false,
        hover: false,
        hoverConnectedEdges: true,
        keyboard: {
          enabled: false,
          speed: {x: 10, y: 10, zoom: 0.02},
          bindToWindow: true,
          autoFocus: true,
        },
        multiselect: true,
        navigationButtons: false,
        selectable: true,
        selectConnectedEdges: true,
        tooltipDelay: 300,
        zoomSpeed: 1,
        zoomView: true
      },
      manipulation: {
        addNode: false,
        addEdge: function(edgeData,callback) {
          if (edgeData.from === edgeData.to) {
            var r = confirm("Do you want to connect the node to itself?");
            if (r === true) {
              callback(edgeData);
            }
          }
          else {
            callback(edgeData);
          }
        getAdj();
        }
      }
  };
  function getAdj(){
    Nodes=nodes.get({fields:["id","label"]});
    Edges=edges.get({fields:["from","to"]});
    
    var Adj=math.zeros(Nodes.length,Nodes.length);
    for (let edge in Edges){
      from=Edges[edge].from;
      to=Edges[edge].to;
      /*console.log(parseInt(to)-1,parseInt(from)-1);*/
      Adj=math.subset(Adj,math.index(parseInt(to)-1,parseInt(from)-1),1);
      Adj=math.subset(Adj,math.index(parseInt(from)-1,parseInt(to)-1),1);
    };
    printmat(Adj);
  }
  function printmat(Adj){
    var  arrText='';
    for (var i = 0; i < Adj.size()[0]; i++) {
        for (var j = 0; j < Adj.size()[1]; j++) {
            arrText+=Adj.valueOf()[i][j]+"\t";
        }
        arrText+="\n";
        document.getElementById("matrix").innerText = arrText;
    };
  };
  getAdj();
  network = new vis.Network(container, data, options);
  var max_node = document.getElementById("max_node");
  max_node.innerText = 5;
  network.on('click',function(params){
    if((params.nodes.length == 0) && (params.edges.length == 0)) {
        var max_node = document.getElementById("max_node");
        let new_id = parseInt(max_node.innerText)+1;
        var updatedIds = nodes.add([{
            id :  String(new_id),
            label: String(new_id),
            x:params.pointer.canvas.x,
            y:params.pointer.canvas.y
        }]);
        max_node.innerText = new_id;
        getAdj()
    }
  });
  
}

window.addEventListener("load", () => {
  draw();
});


</script>
~~~


## Degree of a node:

**Degree** of a node is defined as the number of links that are attached to a node. For an undirected graph, since there is no directionality in the links, we have only one measure (degree). Whereas for a directed graph, we can define **In-Degree** and **Out-Degree** for a node. The former being the total number of links that are coming into the node and the latter being the total number of links going away from the node.

This is a property of a node of the graph. i.e. each individual node of the graph can have different degree. For a graph, we can define a measure known as *Average Degree*, which is nothing but the sum of all individual degrees divided by the number of nodes.

*In the widget below, you can edit the graph and see how the degree of the node changes. The node labels are individual degrees of nodes. And the average degree is displayed after the graph. If you hover the cursor on the node the node id will be shown.*

~~~
<div id="degnetwork" ></div>
<div id="AverageDegree"></div>
<style>
body {
    padding: 20px;    
}
#degnetwork {
  width: 100%;
  height: 400px;
  border: 1px solid lightgray;
}

</style>

<script>
var nodes2, edges2, network2;

function draw1() {
  nodes2 = new vis.DataSet();
  nodes2.add([
    { id: "1", label: "1" ,title: "1" },
    { id: "2", label: "2" ,title: "2" },
    { id: "3", label: "3" ,title: "3" },
    { id: "4", label: "4" ,title: "4" },
    { id: "5", label: "5" ,title: "5" },
  ]);
  edges2 = new vis.DataSet();
  edges2.add([
    { id: "1-2", from: "1", to: "2" },
    { id: "1-3", from: "1", to: "3" },
    { id: "2-4", from: "2", to: "4" },
    { id: "2-5", from: "2", to: "5" },
  ]);
  var container = document.getElementById("degnetwork");
  var data = {
    nodes: nodes2,
    edges: edges2,
  };

  var options = {
    interaction:{
        dragNodes:true,
        dragView: true,
        hideEdgesOnDrag: false,
        hideEdgesOnZoom: false,
        hideNodesOnDrag: false,
        hover: false,
        hoverConnectedEdges: true,
        keyboard: {
          enabled: false,
          speed: {x: 10, y: 10, zoom: 0.02},
          bindToWindow: true,
          autoFocus: true,
        },
        multiselect: true,
        navigationButtons: false,
        selectable: true,
        selectConnectedEdges: true,
        tooltipDelay: 300,
        zoomSpeed: 1,
        zoomView: true
      },
      manipulation: {
        addNode: false,
        addEdge: function(edgeData,callback) {
          if (edgeData.from === edgeData.to) {
            var r = confirm("Do you want to connect the node to itself?");
            if (r === true) {
              callback(edgeData);
            }
          }
          else {
            callback(edgeData);
          }
        change_lable();
        }
      },
       physics:{
      enabled: true,
      barnesHut: {
        theta: 0.5,
        gravitationalConstant: -1000,
        centralGravity: 0.4,
        springLength: 95,
        springConstant: 0.04,
        damping: 0.2,
        avoidOverlap: 0
      },
      maxVelocity: 50,
      minVelocity: 0.1,
      solver: 'barnesHut',
      stabilization: {
        enabled: true,
        iterations: 1000,
        updateInterval: 100,
        onlyDynamicEdges: false,
        fit: true
      },
      timestep: 0.5,
      adaptiveTimestep: true,
      wind: { x: 0, y: 0 }
    }
  };
  network2 = new vis.Network(container, data, options);
  function change_lable(){
    var max_node = document.getElementById("max_node");
    let max_id = parseInt(max_node.innerText);
    deg=[];
    let ds=0;
    cols=['#82EDFD','#62C5DA','#0492C2','#2732C2','#1620A6','#060D6A','#03073E','#010426','#000000'];
    for (let nid=1;nid<=max_id;nid++){
      deg.push(network2.getConnectedEdges(nid).length);
      ds=ds+deg[nid-1];
      nodes2.update({id:String(nid),label:String(deg[nid-1]),title:String(nid),
      color:{
        background:cols[deg[nid-1]]
      },
      font:{
        color:'#ffffff',
        strokeWidth: 1,
        strokeColor:'#000000'
      }
      });
    }
  var avdeg=document.getElementById("AverageDegree");
  avdeg.innerText='Average Degree = '+ds/max_id;
  /*console.log(ds,max_id)*/
  }

  change_lable();
  network2.on('click',function(params){
    if((params.nodes.length == 0) && (params.edges.length == 0)) {
        var max_node = document.getElementById("max_node");
        let new_id = parseInt(max_node.innerText)+1;
        var updatedIds = nodes.add([{
            id :  String(new_id),
            label: String(new_id),
            title : String(new_id),
            x:params.pointer.canvas.x,
            y:params.pointer.canvas.y
        }]);
        max_node.innerText = new_id;
        change_lable();
    }
  });
  
}

window.addEventListener("load", () => {
  draw1();
});

</script>
~~~


## Degree of node and Adjacency Matrix

Degree of a node for an undirected graph can also be calculated from the Adjacency matrix. 

$$k_i=\sum_{j=1}^{N} A_{ij}$$

Where $k_i$ is the degree of $i^{th}$ node and there are $N$ nodes. Note that this is just the sum of $i^{th}$ row of the matrix.

The average degree is therefore,

$$k_{avg}= \sum_{i=1}^N \frac{k_i}{N}$$

For a directed graph, The In-Degree can be defined as the sum of the row elements while Out-Degree can be defined as the sum of all elements in the column.

\begin{align}k_i^{(in)} &= \sum_{j=1}^{N} A_{ij} \\ k_i^{(out)}&=\sum_{j=1}^{N} A_{ji}\end{align}

\note{Sum of the in-degrees or out-degrees of individual nodes gives us sum of all non-zero elements of the adjacency matrix. Which is the number of edges in the graph. i.e. if $L$ is the number of edges/links in the graph:
$$k_{avg}^{in/out}=L/N$$
For an undireccted graph, the things get a bit more complicated as we over count while taking the sum of the degrees which can be easily derived and left to the reader.}

That is it from me for today. Hopefully next week we will be discussing a special kind of graph. Planar Graphs! And you will be able to play a famous game involving the concept of planarity of graph. 