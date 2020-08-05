function main() {
	var timer;

	var N = 40; // number of nodes
	var m = 0.5; // average in-degree
	var rate = 500;
	var p = m/(N-1);
	var longestchain ;
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
  					"markerWidth":4,
  					"markerHeight":4,
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
      init_nodes.push({
        id: i,
        x: x,
        y: y
      })
    }

	// Defining the link by populating the matrix 
	
	for (i=0; i<N ; i++) {
		for (j=0; j<N;j++) {
		if(i!=j && Math.random()<p)	{
			Matrix[j][i]=1;
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

	function	evolve() {
		console.log(Matrix);
		get_evals();
		evals.sort();
		var pfe=evals[evals.length-1];
		var l2=evals[evals.length-2];
		if (pfe!=0)
		{
			find_evec();
		}
		else{
			degen_evec();
		}
		var vector=[]
		for(i=0; i<evec.length; i++) {
		vector.push({id:i, val:evec[i]});
		}
		
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
		
		var i=0,
			n_links=links.length;
		do{
			if(links.length>0 && (links[i].source.id == hit_node || links[i].target.id == hit_node))
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
					Matrix[i][hit_node]=1
				}
				if(Math.random()<p)
				{
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
				if(x_check[i]==true)
				{
					xx=evec[i];
					k1=h*func(Matrix,evec,t,xx,i);
					k2=h*func(Matrix,evec,t+h*0.5,xx+0.5*k1,i);
					k3=h*func(Matrix,evec,t+h*0.5,xx+0.5*k2,i);
					k4=h*func(Matrix,evec,t+h,xx+k3,i);
					xxn=xx+(k1+2.0*(k2+k3)+k4)/6.0;
					err=np.fabs(xxn-xx)/xx;
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
	//*********************************************************************
	//			Eigen Value calculator using QR algo
	// 
	//	https://gist.github.com/bellbind/60fb876842346864baaf340cb789ad10
	//
	//helpers
	//********************************************************************
	function mat2d(mat) {
		const n = Math.sqrt(mat.length);
		return Array.from(Array(n), (_, i) => mat.slice(i * n, i * n + n));
	}
	function range(n, f = v => v) {
		return Array.from(Array(n), (_, i) => f(i));
	}
	function sum(a, f = v => v) {
		return a.reduce((r, v, i) => r + f(v, i), 0);
	}

	// returns hessenberg matrix: m[y][x] == 0 when y >= x + 2
	function householder(mat) {
		const n = Math.sqrt(mat.length);
		const m = Array.from(mat);
		console.assert(Number.isInteger(n));
		const idx = (x, y) => y * n + x;

		for (let k = 0; k < n - 2; k++) {
			if (Math.abs(m[idx(k, k + 1)]) < Number.EPSILON) continue;
			const u = range(n, i => i <= k ? 0 : m[idx(k, i)]);
			const sigma = Math.sign(u[k + 1]) * Math.hypot(...u);
			u[k + 1] += sigma;
			const norm = Math.sqrt(2 * sigma * u[k + 1]);
			const h = u.map(v => v / norm);
			
			const sdx = range(n, i => sum(h, (v, j) => v * m[idx(j, i)]));
			const sdy = range(n, i => sum(h, (v, j) => v * m[idx(i, j)]));
			const hdx = sum(sdx, (v, i) => v * h[i]);
			const hdy = sum(sdy, (v, i) => v * h[i]);
			const dx = sdx.map((v, i) => 2 * (v - hdx * h[i]));
			const dy = sdy.map((v, i) => 2 * (v - hdy * h[i]));
			
			for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
				m[idx(x, y)] -= h[y] * dy[x] + h[x] * dx[y];
			}
		}
		return m;
	}

	// returns upper triangler matrix: m[y][x] == 0 when y >= x + 1
	function qr(mat) {
		const n = Math.sqrt(mat.length);
		const m = Array.from(mat);
		console.assert(Number.isInteger(n));
		const idx = (x, y) => y * n + x;
		let k = n;

		while (k >= 2) {
			//console.log(k, m[idx(k - 2, k - 1)]);
			//console.log(mat2d(m));
			if (Math.abs(m[idx(k - 2, k - 1)]) < Number.EPSILON) {
				k--;
				continue;
			}
			
			// eigenvalue of last 2x2 sub matrix: l^2 - tr * l + det = 0
			const a = m[idx(k - 1, k - 1)], b = m[idx(k - 2, k - 1)],
				  c = m[idx(k - 1, k - 2)], d = m[idx(k - 2, k - 2)];
			const tr = a * d, det = a * d - b * c;
			const disc = Math.sqrt(tr * tr - 4 * det) || 0;
			const l1 = (tr + disc) / 2, l2 = (tr - disc) / 2;
			const mu = a - (Math.abs(l1) < Math.abs(l2) ? l1 : l2);
			// (option) pre process M = M - mu * I 
			for (let i = 0; i < k; i++) m[idx(i, i)] -= mu;
			
			// init q as unit matrix
			const idxq = (x, y) => y * k + x;
			const q = Array(k * k).fill(0);
			for (let i = 0; i < k; i++) q[idxq(i, i)] = 1;
			
			// rotate to makes M => Q * R (R store to M)
			for (let i = 0; i < k - 1; i++) {
				const a1 = m[idx(i, i)], a2 = m[idx(i, i + 1)]; 
				const base = Math.hypot(a1, a2);
				const cos = base < Number.EPSILON ? 0 : a1 / base;
				const sin = base < Number.EPSILON ? 0 : a2 / base;
				// make R
				m[idx(i, i)] = base;
				m[idx(i, i + 1)] = 0;
				for (let x = i + 1; x < k; x++) {
					const e1 = m[idx(x, i)], e2 = m[idx(x, i + 1)];
					m[idx(x, i)] = e1 * cos + e2 * sin;
					m[idx(x, i + 1)] = e2 * cos - e1 * sin;
				}
				// make Q
				for (let y = 0; y < k; y++) {
					const e1 = q[idxq(i, y)], e2 = q[idxq(i + 1, y)];
					q[idxq(i, y)] = e1 * cos + e2 * sin;
					q[idxq(i + 1, y)] = e2 * cos - e1 * sin;
				}
			}

			// next M as R * Q
			for (let y = 0; y < k; y++) {
				const ry = Array.from(Array(k - y), (_, j) => m[idx(y + j, y)]);
				for (let x = 0; x < k; x++) {
					m[idx(x, y)] = sum(ry, (v, j) => v * q[idxq(x, j + y)]);
				}
			}
			
			// (option) post process M = M + mu * I
			for (let i = 0; i < k; i++) m[idx(i, i)] += mu;        
		}
		return m;
	}

	// list of eigen values square matrix (allow non symmetric)
	function eigenvalues(mat) {
		const ut = qr(householder(mat));
		const n = Math.sqrt(ut.length);
		return range(n, i => ut[i * n + i]);
	}
		// example:
		// m = numpy.mat([[4, -6, 5], [-6, 3, 4], [5, 4, -3]])
		// numpy.linalg.eigvals(m) #=> array([-9.12030391,  9.62192181,  3.4983821 ])
		/*console.log(eigenvalues([
		4, -6, 5,
		-6, 3, 4,
		5, 4, -3
		]));Algorithm need matrix into a one dimensional array
		
		*/
	function get_evals()
	{
		var i;
		var M=[]
		for(i=0;i<Matrix.length;i++)
		{
			for(j=0;j<Matrix.length;j++)
			M.push(Mat[i][j]);
		}
		
		/*var MAT=math.zeros(N,N);
		var i,j;
		for(i=0;i<N;i++){
			for (j=0;j<N;j++)
			{
				MAT.valueOf()[i][j]=Matrix[i][j]
			}
		}
		math.import(numeric, { wrap: true, silent: true })
		
		var ans = numeric.eig(Matrix);
//using numeric library to get eig={lambda: {x:[],y:[]} E:{x:[[],[],..\],y:[[][][]..]}}
		var i;*/
		eig=eigenvalues(M);
		for (i=0;i<eig.length;i++)
			evals[i]=eig[i];
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
