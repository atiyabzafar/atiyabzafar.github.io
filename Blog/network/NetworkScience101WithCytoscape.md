@def hascytoscape = true
@def hasmath = true

# Network Science 101 Part 1 (Graph Theory)

This Blog Post is about learning the basics of Network Science. Networks are all around us. From the electricity grid that supplies the power to your homes to the trasport system (Subway/Metro). 

The tools that will be introduced in this blog post are basically tools that I learned during my Post Graduate degree. We will start with introduction to Graph Theory.

## What are Networks?
A network is a collection of many interconnected objects or things. A famous example being a social network like Facebook or twitter where each twitter account/profile would be an individual object often called as a *node* where if one account follow another, they are said to be connected by a *link*. 

Other examples include: Biochecmical Networks/pathways, Ecological Networks such as Food webs, Neural Networks (Artifiial and Natural alike) and Social Systems such as Social Media and Societies.

## Graphs

What are graphs? For many people Graphs are confined to what they draw for mathematics examinations in schools. But in mathematical science, Graphs have a very distinct definition. Graph is a mathematical structure defined by two components: Vertices (Nodes) and Edges (Links). Where Edges denote some kind of connection between them. 

> A Graph $\mathcal{G}(V,E)$ is defined by a set of vertices $V = \{ v_1, v_2, v_3 , \cdots v_n \}$ and a set of Edges $E=\{e_1,e_2,e_3, \cdots ,c_m \}$. Each edge $e$ is a ordered/unordered pair of vertices. 

In the examples below, red circles denote two different graphs. The Edge set for each graph is different even when the set of nodes are same. In the right example, the edge set consists of Ordered pair of the vertices. For instance, the link from $1$ to $2$ is different from $2$ to $1$. Whereas in the left example the edges are unordered. 
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

// create an array with edges
var edges = new vis.DataSet([
  { from: 1, to: 3 },
  { from: 1, to: 2 },
  { from: 2, to: 4 },
  { from: 2, to: 5 },
  { from: 3, to: 3 },
]);

// create a network
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

// create an array with edges
var edges = new vis.DataSet([
  { 'arrows':'to',from: 1, to: 3 },
  { 'arrows':'to',from: 1, to: 2 },
  { 'arrows':'to',from: 2, to: 1 },
  { 'arrows':'to',from: 2, to: 4 },
  { 'arrows':'to',from: 2, to: 5 },
  { 'arrows':'to',from: 1, to: 4 }
]);

// create a network
var container = document.getElementById("cy2");
var data = {
  nodes: nodes,
  edges: edges,
};
var options = {};
var network = new vis.Network(container, data, options);
console.log(nodes)
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
})

/*var cy = cytoscape({
  container: document.getElementById('cy2'),
  elements: [
    { data: { id: 'a' } },
    { data: { id: 'b' } },
    { data: { id: 'c' } },
    { data: { id: 'd' } },
    {
      data: {
        id: 'ab',
        source: 'a',
        target: 'b'
      }
    },
    {  
      data: {
        id: 'bc',
        source: 'b',
        target: 'c'
      }
    },
    {
    data: {
        id: 'bd',
        source: 'b',
        target: 'd'
      }
    },
    {
    data: {
        id: 'cd',
        source: 'c',
        target: 'd'
      }
    }
    ],
     style: [
        {
            selector: 'node',
            style: {
                shape: 'circle',
                'background-color': 'blue',
                label:'data(id)',
            }
        },
        {
            selector : 'edge',
            style:{
                'curve-style': 'bezier',
                'target-arrow-shape': 'triangle'
            }
        }
        
        ] 
        
});

var cy = cytoscape({
  container: document.getElementById('cy1'),
  elements: [
{ data: { id: 'a' } },
    { data: { id: 'b' } },
    { data: { id: 'c' } },
    { data: { id: 'd' } },
    {
      data: {
        id: 'ab',
        source: 'a',
        target: 'b'
      }
    },
    {  
      data: {
        id: 'bc',
        source: 'b',
        target: 'c'
      }
    },
    {
    data: {
        id: 'bd',
        source: 'b',
        target: 'd'
      }
    },
    {
    data: {
        id: 'cd',
        source: 'c',
        target: 'd'
      }
    }
    ],
     style: [
        {
            selector: 'node',
            style: {
                shape: 'circle',
                'background-color': 'blue',
                label:'data(id)',
            }
        },
        {
            selector : 'edge',
            style:{
                'curve-style': 'bezier',
            }
        }
        
        ] 
        
});
*/
</script>

~~~

The left graph is an example of an **Undirected Graph**. Whereas the one on the right is an example of a **Directed Graph**.

A real life example for a directed Graph would be this blog post for example. When you arrived at the link you had to click on a button or a hyper link. That is a directed edge with vertices being two different web pages on the world wide web.

\note{Almost all graphs in this page are interactive and nodes can be dragged along and you can zoom in and out as well}

### Properties of Graphs

#### Adjacency Matrix :

> The adjacency matrix of a graph $\mathcal{G} (V,E)$ is an $N \times N$ matrix (where $N$ is the number of nodes, or the size of the vertex Set $V$) whose elements are defined as follows 
\begin{aligned}A_{ij}&=1 \quad \text{if} (v_i,v_j) \in E \\ &= 0 \quad \text{otherwise} \end{aligned}

In other words, the $i-j$ elements in the matrix are non-zero only when there is a link from $i$ to $j$. For *undirected graph* as the edge set is formed by unordered pairs, the Adjacency matrix is a *symmetric matrix*.

But for a directed graph, the symmetric is in general a asymmetric matrix. So, the convention of defining the adjacency matrix is often important. Some sources/textbooks consider the reverse notation, where $A_{ji}=1$ when there is a link from $i$ to $j$. We will be using this notation.


~~~

<style>
body,
select {
  font: 14pt sans;
}
#mynetwork {
  position: relative;
  width: 800px;
  height: 600px;
  border: 1px solid lightgray;
}
table.legend_table {
  font-size: 11px;
  border-width: 1px;
  border-color: #d3d3d3;
  border-style: solid;
}
table.legend_table,
td {
  border-width: 1px;
  border-color: #d3d3d3;
  border-style: solid;
  padding: 2px;
}
div.table_content {
  width: 80px;
  text-align: center;
}
div.table_description {
  width: 100px;
}

#operation {
  font-size: 28px;
}
#node-popUp {
  display: none;
  position: absolute;
  top: 350px;
  left: 170px;
  z-index: 299;
  width: 250px;
  height: 120px;
  background-color: #f9f9f9;
  border-style: solid;
  border-width: 3px;
  border-color: #5394ed;
  padding: 10px;
  text-align: center;
}
#edge-popUp {
  display: none;
  position: absolute;
  top: 350px;
  left: 170px;
  z-index: 299;
  width: 250px;
  height: 90px;
  background-color: #f9f9f9;
  border-style: solid;
  border-width: 3px;
  border-color: #5394ed;
  padding: 10px;
  text-align: center;
}


</style>

<div id="node-popUp">
  <span id="node-operation">node</span> <br />
  <table style="margin: auto">
    <tbody>
      <tr>
        <td>id</td>
        <td><input id="node-id" value="new value" /></td>
      </tr>
      <tr>
        <td>label</td>
        <td><input id="node-label" value="new value" /></td>
      </tr>
    </tbody>
  </table>
  <input type="button" value="save" id="node-saveButton" />
  <input type="button" value="cancel" id="node-cancelButton" />
</div>

<div id="edge-popUp">
  <span id="edge-operation">edge</span> <br />
  <table style="margin: auto">
    <tbody>
      <tr>
        <td>label</td>
        <td><input id="edge-label" value="new value" /></td>
      </tr>
    </tbody>
  </table>
  <input type="button" value="save" id="edge-saveButton" />
  <input type="button" value="cancel" id="edge-cancelButton" />
</div>

<br />
<div id="mynetwork"></div>


<script>
var nodes = null;
var edges = null;
var network = null;
// randomly create some nodes and edges
var data = getScaleFreeNetwork(5);
var seed = 2;


function destroy() {
  if (network !== null) {
    network.destroy();
    network = null;
  }
}

function draw() {
  destroy();
  nodes = [];
  edges = [];

  // create a network
  var container = document.getElementById("mynetwork");
  var options = {
    layout: { randomSeed: seed }, // just to make sure the layout is the same when the locale is changed
    //locale: document.getElementById("locale").value,
    manipulation: {
      addNode: function (data, callback) {
        // filling in the popup DOM elements
        document.getElementById("node-operation").innerText = "Add Node";
        editNode(data, clearNodePopUp, callback);
      },
      editNode: function (data, callback) {
        // filling in the popup DOM elements
        document.getElementById("node-operation").innerText = "Edit Node";
        editNode(data, cancelNodeEdit, callback);
      },
      addEdge: function (data, callback) {
        if (data.from == data.to) {
          var r = confirm("Do you want to connect the node to itself?");
          if (r != true) {
            callback(null);
            return;
          }
        }
        document.getElementById("edge-operation").innerText = "Add Edge";
        editEdgeWithoutDrag(data, callback);
      },
      editEdge: {
        editWithoutDrag: function (data, callback) {
          document.getElementById("edge-operation").innerText = "Edit Edge";
          editEdgeWithoutDrag(data, callback);
        },
      },
    },
  };
  network = new vis.Network(container, data, options);
}

function editNode(data, cancelAction, callback) {
  document.getElementById("node-label").value = data.label;
  document.getElementById("node-saveButton").onclick = saveNodeData.bind(
    this,
    data,
    callback
  );
  document.getElementById("node-cancelButton").onclick = cancelAction.bind(
    this,
    callback
  );
  document.getElementById("node-popUp").style.display = "block";
}

// Callback passed as parameter is ignored
function clearNodePopUp() {
  document.getElementById("node-saveButton").onclick = null;
  document.getElementById("node-cancelButton").onclick = null;
  document.getElementById("node-popUp").style.display = "none";
}

function cancelNodeEdit(callback) {
  clearNodePopUp();
  callback(null);
}

function saveNodeData(data, callback) {
  data.label = document.getElementById("node-label").value;
  clearNodePopUp();
  callback(data);
}

function editEdgeWithoutDrag(data, callback) {
  // filling in the popup DOM elements
  document.getElementById("edge-label").value = data.label;
  document.getElementById("edge-saveButton").onclick = saveEdgeData.bind(
    this,
    data,
    callback
  );
  document.getElementById("edge-cancelButton").onclick = cancelEdgeEdit.bind(
    this,
    callback
  );
  document.getElementById("edge-popUp").style.display = "block";
}

function clearEdgePopUp() {
  document.getElementById("edge-saveButton").onclick = null;
  document.getElementById("edge-cancelButton").onclick = null;
  document.getElementById("edge-popUp").style.display = "none";
}

function cancelEdgeEdit(callback) {
  clearEdgePopUp();
  callback(null);
}

function saveEdgeData(data, callback) {
  if (typeof data.to === "object") data.to = data.to.id;
  if (typeof data.from === "object") data.from = data.from.id;
  data.label = document.getElementById("edge-label").value;
  clearEdgePopUp();
  callback(data);
}

function init() {
 // setDefaultLocale();
  draw();
}

window.addEventListener("load", () => {
  init();
});




</script>
~~~


#### Degree of a node:


~~~

<button id="addBtn" onclick="addNode()">Add Node</button>
<input type="text" id="node_id" placeholder="enter new node name"> 
<div id="cy" style="width:300px;height:300px"></div>

<script>
var cy = cytoscape({
	  container: document.getElementById('cy'),
    elements: [
    { data: { id: 'a' } },
    { data: { id: 'b' } },
    { data: { id: 'c' } },
    { data: { id: 'd' } },
    {
      data: {
        id: 'ab',
        source: 'a',
        target: 'b'
      }
    },
    {  
      data: {
        id: 'bc',
        source: 'b',
        target: 'c'
      }
    }
    ],
	    style: [
		{
		    selector: 'node',
		    style: {
			shape: 'circle',
			'background-color': 'blue',
			label: 'data(id)',
			
		    }
		},
		{
		selector: 'edge',
			 style:{
			      'width': 3,
			      'line-color': 'grey'
			    }
		}
		]      
	});

	cy.layout({
		name: 'circle',
		animate:false,
		}).run();

var addNode = function() {
  var elem_id = document.getElementById('node_id').value;
  cy.add([{
      data: {
        id: elem_id
      }
    },
  ]);
 // cy.layout(options);
}
</script>

~~~

Click on the button to add nodes. And drag to connect them.