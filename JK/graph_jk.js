function main() {
	var timer;

	var N = 40; // number of nodes
	var m = 0.5; // average in-degree
	//var rate = 1000;
	//var rate=2000;
	var rate = 2000;		//5 seconds because rk4 taking too much time and process.
	var p = m/(N-1);
	var longestchain=-1 ;
	var width = 800,
		height = 800,
		node_radius = 3;

	var force, nodes=[], links=[], node, link;
	var pfe = 0 , Matrix;

	var evec = new Array(N);
	evec = evec.fill(1./N);			//start with a uniform vector
	
	var evals = new Array(N);
	evals = evals.fill(0);	
	
	var chain = new Array(N);
	chain = chain.fill(0);

	var svg = d3.select("#simulation").append("svg")
		.call(d3.behavior.zoom().on("zoom", function () {
			svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
		}))
		.attr("width", width)
		.attr("height", height);
	
	var defs = svg.append("defs")

		defs.append("marker")
  				.attr({
  					"id":"arrowtip",
  					"viewBox":"0 -5 10 10",
  					"refX":20,
  					"refY":0,
  					"markerWidth":3,
  					"markerHeight":3,
  					"orient":"auto"
  				})
  				.append("path")
  					.attr("d", "M0,-5L10,0L0,5")
  					.attr("class","arrowHead");

/*		svg.append("svg:defs").selectAll("marker")
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
	*/
	init();
	restart();
	timer = setInterval(evolve, rate);

	//copied
	var margin_eigvect = {top: 20, right: 20, bottom: 20, left: 50};
	var width_eigvect = width- margin_eigvect.left - margin_eigvect.right;
	var height_eigvect = Math.floor(width/4)- margin_eigvect.top - margin_eigvect.bottom;

var svg_eigvect = d3.select("#bar")
    .style("width", width+"px")
    .style("height", Math.floor(width/4)+"px")
    .append("svg")
      .attr("width", width)
      .attr("height", Math.floor(width/4));

var g_eigvect = svg_eigvect.append("g")
        .attr("transform", "translate(" + margin_eigvect.left + "," + margin_eigvect.top + ")");

var x_eigvect = d3.scale.ordinal().rangeRoundBands([0, width_eigvect],0.1),
    y_eigvect = d3.scale.linear().rangeRound([height_eigvect, 0]);

    x_eigvect.domain(evec.map(function(d,i) { return i; }));
//    y_eigvect.domain([0, d3.max(bars)]);
    y_eigvect.domain([0, 1]);

    g_eigvect.selectAll(".bar")
          .data(evec)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("id", function(d,i) { return "bar-"+i;})
            .attr("x", function(d,i) { return x_eigvect(i); })
            .style("fill", "steelblue")
            .attr("y", function(d) { return y_eigvect(d); })
            .attr("width", x_eigvect.rangeBand())
            .attr("height", function(d) { return height_eigvect - y_eigvect(d); });

//// now the axes
    g_eigvect.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + y_eigvect(0) + ")")
            .call(d3.svg.axis().scale(x_eigvect).orient("bottom").ticks(10,",.0f"));
              //d3.axisBottom(x_eigvect).ticks(10,",.0f"));

    //g_eigvect.append("text")
    //        .attr("id", "label--x")
    //        .attr("transform", "translate(" + (width_eigvect-15) + "," + (height_eigvect-5) + ")")
    //        .text("Index");

    g_eigvect.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate("+ x_eigvect(0) +","+ y_eigvect(1) + ")")
            .call(d3.svg.axis().scale(y_eigvect).orient("left"));
            //  d3.axisLeft(y_eigvect).ticks(10,",.2f"));

    //g_eigvect.append("text")
    //        .attr("id", "label--y")
    //        .attr("transform", "translate(" + (-25) + "," + (height_eigvect/2+50) + ")rotate(-90)")
    //        .text("eigenvector component");

    g_eigvect.append("text")
            .attr("id", "title--eigvect")
            .attr("transform", "translate(" + (Math.floor(width_eigvect/2)) + ", -2)")
            .text("Perron-Frobenius eigenvector");



	//
	function init(){
	//
	
	var init_nodes=[];
	var i,j,
		x,y;
	
	//Initialising  NxN zero matrix
	
	Matrix = new Array(N);
    for( i=0; i< Matrix.length; i++) {
      Matrix[i] = new Array(N);
      for( j=0; j< Matrix.length; j++) {
        Matrix[i][j] = 0;
      }
    }

	// Defining N nodes and defining their initial position
	
    for (i=0; i<N; i++) {
      x = Math.random() * width;
      y = Math.random() * height;
      init_nodes.push({id: i,x: x,y: y})
    }

	// Defining the link by populating the matrix 
	
	for (i=0; i<N ; i++) {
		for (j=0; j<N;j++) {
		if(i!=j && Math.random()<p)	{
			Matrix[j][i]=1;	//i----->j
			links.push({source: i, target: j});
			}
		}
	}
	
	//
	// DEBUGGING
	//
	//console.log(links)

	/*Matrix[27][28]=1;
	Matrix[28][27]=1;
	links.push({source:27,target:28});
	links.push({source:28,target:27});
	*/

	force = d3.layout.force()
		.size([width, height])
		.nodes(init_nodes)
		.links(links)
		.linkDistance(30)
		.charge(-60)
		.gravity(0.05)
		.on("tick", tick);

	nodes = force.nodes();
	
	node = svg.selectAll(".node");
	link = svg.selectAll(".link");

	node = node.data(nodes);

	node.enter().insert("circle")
		.attr("class", "node")
		.attr("id", function(d,i) { return "node-"+i;})
		.attr("r", node_radius)
		.append("svg:title")
		.text(function(d,i){return i;});
        node.on("mouseover", mouseovernode)
		.on("mouseout", mouseoutnode)
		.on("drag_start",drag_start)
		.on("drag_drag",drag_drag)
		.on("drag_end",drag_end);

		
		/*var drag_handler = d3.behavior.drag()
			.on("start", drag_start)
			.on("drag", drag_drag)
			.on("end", drag_end);	
	
		drag_handler(node);*/

	}//init ends

	function evolve() {
		//console.log(Matrix);
		//get_evals();
		eig=eigen_decomp(Matrix);
		//console.log(eig.L1);
		//console.log(eig.L2);
		//console.log(eig.vec);
		//evals.sort();
		//var pfe=evals[evals.length-1];
		var pfe= eig.L1
		d3.select("#eigval")
		      .text(pfe.toFixed(3));
		var l2=eig.L2
		if (Math.abs(pfe)>1e-7)
		{
			find_evec();
			rate=2000;
/*			evec=eig.vec;
			var sum_vec=math.sum(evec);
			for(let i=0;i<evec.length;i++){
				evec[i]=evec[i]/sum_vec;
			}*/
		}
		else{
			console.log("case when pfe=0")
			rate=500;
			zero_evec();

		}
		
		var maxscale = d3.max(evec);
		if(maxscale>0) {
		  y_eigvect.domain([0, maxscale]);
		} else {
		  maxscale = 1;
		}
		d3.select(".axis--y")
		  .attr("transform", "translate("+ x_eigvect(0) +","+ y_eigvect(maxscale) + ")")
		  .call(d3.svg.axis().scale(y_eigvect).orient("left"));
	
		g_eigvect.selectAll(".bar")
			.data(evec)
			.transition()
			.duration(0.7*rate)
		  		.attr("y", function(d) { return y_eigvect(d); })
		  		.attr("height", function(d) { return height_eigvect - y_eigvect(d); });
		
		d3.select('#pfevec')
				.text((math.max(evec)).toFixed(3))

		var minevec=math.min(evec)

		var vector=[]
		for(i=0; i<evec.length; i++) {
		vector.push({id:i, val:evec[i]});
		}
		var min_ind=[];

		for(let i=0;i<N;i++){
			if( Math.abs(vector[i].val-minevec)<1e-7){
				min_ind.push(vector[i].id);
			}
		}
		console.log(min_ind);
		d3.select('#minevec')
				.text(minevec.toFixed(3)+" occuring "+min_ind.length+" times.")


		//console.log(evec)

		//console.log(math.sum(evec));
		//
		/*vector = vector.sort(function(a, b){return a.val - b.val});
		//sorted eigen vector
		
		var chk=false,
			count=0;
		do{
			if( (vector[count+1].val-vector[count].val) <1e-7){//no. of nodes with minimum pop is more!
				count=count+1;
			}
			else{
			chk=true;
			}
		}while(chk==false);
		
		vector=vector.splice(0,count+1)

		var hit_node = vector[Math.floor(Math.random()*vector.length)].id;*/

		//console.log(hit_node);
		var hit_node= min_ind[Math.floor(Math.random()*min_ind.length)]
		var i=0,
			n_links=links.length;
/*
		for(i=0;i<n_links;i++){
			if(links.length>0){
				if(links[i].source == hit_node)
				{
					links.splice(i,1);	//remove one element at the ith index
					Matrix[links[i].target][links[i].source]=0
				}
				if(links[i].source == hit_node)
				{
					links.splice(i,1);	//remove one element at the ith index
					Matrix[links[i].target][links[i].source]=0
				}
			}
		}*/
		//hit_node=27
		console.log(links)
		do{
			if(links.length>0 && (links[i].source.id == hit_node || links[i].target.id == hit_node))
			{
				links.splice(i,1);	//remove one element at the ith index
				i--;
			}
			i++;
		}while(i<n_links);

		console.log(links)
		
		for(i=0;i<N;i++)
		{
			Matrix[i][hit_node]=0;
			Matrix[hit_node][i]=0;
			if (i!=hit_node)
			{
				if(Math.random()<p)
				{
					links.push({source:hit_node,target:i});
					Matrix[i][hit_node]=1
				}
				if(Math.random()<p)
				{
					links.push({source:i,target:hit_node});
					Matrix[hit_node][i]=1
				}
			}
		}

		//console.log(links)
		
		for(i=0;i<N;i++)
		{
			evec[i]=evec[i]+Math.random()*0.1;
		}
		restart();
	}//evolve ends
	
	function func(A,x,t,xx,i)
	{
		var temp=0,
			temp1=0,
			j;
			
		for(j=0;j<N;j++){
			temp+=A[i][j]*x[j]
		}
		for(j=0;j<N;j++){
			for(k=0;k<N;k++){
				temp1+=A[j][k]*x[k]
			}
		}
		return (temp-xx*temp1)
	}
	
	
	function find_evec()
	{	
		var x_check= new Array(N)
		var tf=100,
			ti=0,
			i=0,
			t=ti,
			xx=0,
			xxn=0,
			h=0.05;
		//console.log(evec)
		for ( i=0;i < N ;i++){
			x_check[i]=false;
			evec[i] = Math.random();
		}	
		//console.log(evec)
		while(t<=tf){
			for(i=0;i<N;i++)
			{
				if(x_check[i]==false)
				{
					xx=evec[i];
					k1=h*func(Matrix,evec,t,xx,i);
					k2=h*func(Matrix,evec,t+h*0.5,xx+0.5*k1,i);
					k3=h*func(Matrix,evec,t+h*0.5,xx+0.5*k2,i);
					k4=h*func(Matrix,evec,t+h,xx+k3,i);
					xxn=xx+(k1+2.0*(k2+k3)+k4)/6.0;
					err=Math.abs(xxn-xx)/xx;
					evec[i]=xxn;
					if(err<=1e-7){
						x_check[i]=true;}
				}	
			}
			t=t+h;
		}
	
	}
	
	
	function longest_chain(i){// FINDS THE SIZE OF LONGEST CHAIN TO
	//NODE i START FROM longest_chain (i ,0)
		var plen =0 ; // length of path
		var j;
		for (j=0;j<N;j++){
			if(Matrix[i][j]==1)// j----->i--
			{
				var temp;
				temp=longest_chain(j);
				if(plen < temp+1){
					plen=temp+1
				}
			}
		}
		chain[i]= plen ;
		if( longestchain < plen )
			longestchain = plen ;
		return(plen)
	}
	
	function zero_evec(){
		longestchain = -1;
		var chain_vec =[]
		var i=0;
		while (i<N)
		{
			longestchain=-1;
			longest_chain(i);
			chain_vec.push({id:i, val:chain[i]});
			i++;
		}
		console.log(chain_vec)

		chain_vec=chain_vec.sort(function (a,b){return a.val-b.val});
	
		var c=1,
			k=0;
		var temp = chain_vec[N -1].val;	//value for the longest chain
		console.log(temp);
		for (k=N -2;k >=0;k --)
		{
			if( chain_vec[k].val!= temp )
			{
				break;
			}
			else
			{
				c++;
			}
		}
		for (let i=0;i<N;i++)
		{
			evec[i]=0.0;
		}
		//console.log(evec)
		//printf ("\n");
		var l;
		for (l=N -1;l>N-c -1;l --)
		{
			veci = chain_vec[l].id;
			//printf (" SAVE :%d\t l = %d\t",veci ,l);
			evec[ veci ]=1.0/(c);
		}
	}

	function tick() {
  
	link.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; });

	node.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; });
	}
	
	
	function restart() {

	link = link.data(links);

	link.enter().insert("line", ".node")
	//        .moveToBack()
		.attr("class", "link")
		.attr({
					"class":"arrow",
					"marker-end":"url(#arrowtip)"
		});

	link.exit()
		.remove();	
		//
		// DEBUGGING
		//
		//console.log(links);
	force.start();
	}
	/////******************/////
  /////******************/////
  function mouseovernode() {
  /////******************/////
    var id = d3.select(this).datum().idx;

    d3.select("#bar-" + id)
        .style("stroke", "black");
        //.attr("fill-opacity", "1.0");

    d3.select(this).transition()
		.duration(400)
		.attr("fill", "orange")
        .attr("r", 10);
  }

  /////******************/////
  /////******************/////
  function mouseoutnode() {
  /////******************/////
    var id = d3.select(this).datum().idx;

    d3.select("#bar-"+id)
        .style("stroke", "white");
        //.attr("fill-opacity", "0.8");

    d3.select(this).transition()
        .duration(400)
        .attr("r", node_radius);
  }

  /////******************/////
  /////******************/////

  //Drag functions 
//d is the node 
function drag_start(d) {
	if (!d3.event.active) simulation.alphaTarget(0.3).restart();
	   d.fx = d.x;
	   d.fy = d.y;
   }
   
   //make sure you can't drag the circle outside the box
   function drag_drag(d) {
	 d.fx = d3.event.x;
	 d.fy = d3.event.y;
   }
   
   function drag_end(d) {
	 if (!d3.event.active) simulation.alphaTarget(0);
	 d.fx = null;
	 d.fy = null;
   }

}	


