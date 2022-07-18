@def hascytoscape = true
@def hasmath = true
@def hasmathcalc = true
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

**Adjacency Matrix and The network**

~~~

<table>
  <tbody>
    <tr>
      <td>
        <h2>Node</h2>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td><label for="node-id">Id</label></td>
              <td><input id="node-id" type="text" value="6" /></td>
            </tr>
            <tr>
              <td></td>
              <td><label for="node-label">Label</label></td>
              <td><input id="node-label" type="text" value="6" /></td>
            </tr>
            <tr>
              <td></td>
              <td>Action</td>
              <td>
                <button id="node-add" onclick="addNode();">Add</button>
                <button id="node-update" onclick="updateNode();">Update</button>
                <button id="node-remove" onclick="removeNode();">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
      <td>
        <h2>Edge</h2>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td><label for="edge-id">Id</label></td>
              <td><input id="edge-id" type="text" value="3-4" /></td>
            </tr>
            <tr>
              <td></td>
              <td><label for="edge-from">From</label></td>
              <td><input id="edge-from" type="text" value="3" /></td>
            </tr>
            <tr>
              <td></td>
              <td><label for="edge-to">To</label></td>
              <td><input id="edge-to" type="text" value="4" /></td>
            </tr>
            <tr>
              <td></td>
              <td>Action</td>
              <td>
                <button id="edge-add" onclick="addEdge();">Add</button>
                <button id="edge-update" onclick="updateEdge();">Update</button>
                <button id="edge-remove" onclick="removeEdge();">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>

<h1>View</h1>
<table class="view">
  <rowgroup>
    <row height = "50%"/>
  </rowgroup>
  <colgroup>
    <col width="50%" />
    <col width="50%" />
  </colgroup>
  <tbody>
    <tr>
      <td>
        <h2>Nodes</h2>
        <pre id="nodes"></pre>
      </td>
      <td>
        <h2>Network</h2>

        <div id="mynetwork"></div>
      </td>
    </tr>
  </tbody>
</table>

<style>
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

input[type="text"],
pre {
  border: 1px solid lightgray;
}

pre {
  margin: 0;
  padding: 5px;
  font-size: 10pt;
}

#mynetwork {
  width: 100%;
  height: 400px;
  border: 1px solid lightgray;
}

</style>


<script>
var nodes, edges, network;

// convenience method to stringify a JSON object
function toJSON(obj) {
  return JSON.stringify(obj, null, 4);
}

function addNode() {
  try {
    nodes.add({
      id: document.getElementById("node-id").value,
      label: document.getElementById("node-label").value,
    });
  } catch (err) {
    alert(err);
  }
}

function updateNode() {
  try {
    nodes.update({
      id: document.getElementById("node-id").value,
      label: document.getElementById("node-label").value,
    });
  } catch (err) {
    alert(err);
  }
}
function removeNode() {
  try {
    nodes.remove({ id: document.getElementById("node-id").value });
  } catch (err) {
    alert(err);
  }
}

function addEdge() {
  try {
    edges.add({
      id: document.getElementById("edge-id").value,
      from: document.getElementById("edge-from").value,
      to: document.getElementById("edge-to").value,
    });
  } catch (err) {
    alert(err);
  }
}
function updateEdge() {
  try {
    edges.update({
      id: document.getElementById("edge-id").value,
      from: document.getElementById("edge-from").value,
      to: document.getElementById("edge-to").value,
    });
  } catch (err) {
    alert(err);
  }
}
function removeEdge() {
  try {
    edges.remove({ id: document.getElementById("edge-id").value });
  } catch (err) {
    alert(err);
  }
}

function draw() {
  // create an array with nodes
  nodes = new vis.DataSet();
//  nodes.on("*", function () {
//    document.getElementById("nodes").innerText = JSON.stringify(
//      nodes.get(),
//      null,
//      4
//    );
// });
  nodes.add([
    { id: "1", label: "1" },
    { id: "2", label: "2" },
    { id: "3", label: "3" },
    { id: "4", label: "4" },
    { id: "5", label: "5" },
  ]);

  // create an array with edges
  edges = new vis.DataSet();
  edges.add([
    { id: "1-2", from: "1", to: "2" },
    { id: "1-3", from: "1", to: "3" },
    { id: "2-4", from: "2", to: "4" },
    { id: "2-5", from: "2", to: "5" },
  ]);

  // create a network
  var container = document.getElementById("mynetwork");
  var data = {
    nodes: nodes,
    edges: edges,
  };
  Nodes=nodes.get({fields:["id","label"]})
  Edges=edges.get({fields:["from","to"]})
  console.log(Edges)
  var Adj=math.zeros(Nodes.length,Nodes.length)
  for (let edge in Edges){
    from=Edges[edge].from
    to=Edges[edge].to
    console.log(parseInt(to)-1,parseInt(from)-1)
    Adj=math.subset(Adj,math.index(parseInt(to)-1,parseInt(from)-1),1)
    Adj=math.subset(Adj,math.index(parseInt(from)-1,parseInt(to)-1),1)
  }
  console.log(Adj.valueOf())
  var options = {};
  nodes.on("*", function () {
  document.getElementById("nodes").innerText = JSON.stringify(
    Adj.valueOf(),
    null,4
  );
});
  network = new vis.Network(container, data, options);
  
}

window.addEventListener("load", () => {
  draw();
});


</script>
~~~


#### Degree of a node:



Click on the button to add nodes. And drag to connect them.

# Work Under Progress