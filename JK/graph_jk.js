function main() {
	var timer;

	var N = 40; // number of nodes
	var m = 0.5; // average in-degree
	//var rate = 1000;
	//var rate=2000;
	var rate = 5000;		//5 seconds because rk4 taking too much time and process.
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
        .on("mouseout", mouseoutnode);

	}//init ends

	function evolve() {
		//console.log(Matrix);
		//get_evals();
		eig=eigen_decomp(AA);
		//evals.sort();
		//var pfe=evals[evals.length-1];
		var pfe= eig.L1
		d3.select("#eigval")
		      .text(pfe.toFixed(3));
		//console.log(evals)
		//console.log(pfe)
		//console.log(Matrix)
		//var l2=evals[evals.length-2];
		var l2=eig.L2
		if (Math.abs(L1)>1e-7)
		{
			find_evec();
		}
		else{
			console.log("case when pfe=0")
			degen_evec();
		}
		var vector=[]
		for(i=0; i<evec.length; i++) {
		vector.push({id:i, val:evec[i]});
		}
		console.log(evec)
		vector = vector.sort(function(a, b){return a.val - b.val});
		//sorted eigen vector
		
		var chk=false,
			count=0;
		do{
			if( (vector[count+1].val-vector[count].val) <1e-6){//no. of nodes with minimum pop is more!
				count=count+1;
			}
			else{
			chk=true;
			}
		}while(chk==false);
		
		vector=vector.splice(0,count+1)
		var hit_node = vector[Math.floor(Math.random()*vector.length)].id;
		//console.log(hit_node);
		var i=0,
			n_links=links.length;
		do{
			if(links.length>0 && (links[i].source == hit_node || links[i].target == hit_node))
			{
				links.splice(i,1);	//remove one element at the ith index
				i--;
			}
			i++;
		}while(i<n_links);
		
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
		var tf=300,
			ti=0,
			i=0,
			t=ti,
			xx=0,
			xxn=0,
			h=0.05;
		for ( i=0;i < x_check.length;i++){
			x_check[i]=false;
			evec[i] = 1.0/Math.random();
		}	
		
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
					if(err<=1e-6){
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
		chain [i]= plen ;
		if( longestchain < plen )
			longestchain = plen ;
		return(plen)
	}
	
	function degen_evec(){
		var i=0;
		longestchain = -1;
		var chain_vec =[]

		while (i<N)
		{
			longestchain=-1;
			longest_chain (i);
			chain_vec.push({id:i, val:chain[i]});
			i++;
		}
		chain_vec=chain_vec.sort(function (a,b){return a.val-b.val});
	
		var c=1,
			k=0;
		var temp = chain_vec[N -1].val;	//value for the longest chain
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
		for (i=0;i<N;i++)
		{
			evec[i ]=0.0;
		}
		//printf ("\n");
		var l;
		for (l=N -1;l>N-c -1;l --)
		{
			veci = chain_vec[l].id;
			//printf (" SAVE :%d\t l = %d\t",veci ,l);
			evec[ veci ]=1.0/(c);
		}
	}

	function get_evals()
	{
		var u0= new Array(N);
	 	 u0 = u0.fill(1./N);			//start with a uniform vector
		var E;
		E=eig_powerIteration(Matrix,u0);
		for (i=0;i<N;i++)
			evals[i]=0;
   		 evals[0]=E.val
		console.log(E.val)
	}
  
	function initialise_matrix(N){
    	//Initialising  NxN zero matrix
	
	Matrix = new Array(N);
    for( i=0; i< Matrix.length; i++) {
      Matrix[i] = new Array(N);
      for( j=0; j< Matrix.length; j++) {
        Matrix[i][j] = 0;
      }
    }
    return Matrix;
}
function copy_matrix(A){
    var i,j;
    const n=A.length;
    var D=initialise_matrix(n) ;
    for(i=0;i<n;i++){
        for(j=0;j<n;j++){
            D[i][j]=A[i][j];
        }
    }
    return(D)
}

function norm_vector(v){
    var sum=0;
    for(let i=0;i<v.length;i++){
        sum=sum+v[i]*v[i]
    }
    return(Math.sqrt(sum))
}

function eig_powerIteration ( A , u0) {
    // Compute the largest eigenvalue and eigenvector with the power method
        const maxIters = 1000;
        var k;
        const n = A.length;
        var sum;

        // init with a random u or an initial guess u0
        var u;
        if ( typeof(u0) == "undefined")
            u = randn(n);
        else
            u = u0;
        var norm;
        norm=norm_vector(u)
        for (let i=0;i<n;i++){
            u[i]/norm;
        }
        var lambda = 1;
        var v = new Array(N);
    	v = v.fill(0);	
        for ( k=0; k< maxIters; k++) {		
            // Apply the iteration : u = Au / norm(Au)
            for(let i=0;i<n;i++){
                sum=0
                for (let j=0;j<n;j++){
                   sum=sum+A[i][j]*u[j];
                }
                v[i]=sum
            }
            //u = mulMatrixVector(A, u) ;
            lambda = norm_vector(v);
		if(lambda>1e-6){
		    for(let i=0;i<n;i++){
			u[i]=v[i]/lambda;
		    }
		}
		else {
			u.fill(0.0);
		}
            //u = mulScalarVector(1/ lambda, u);				
        }
        return { "val" : lambda, "vec" : u};
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
}	
