//var A=[[1,2,3],[2,3,4],[3,4,5]]
//output:9.623475382979798,-0.6234753829797994,4.930380657631324e-32
import { Matrix } from './modules/matrix.js';
function main(){
    var A=[[0,1,0,0,0,0],[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,1,0,0,0],[0,0,0,0,0,1],[0,0,0,0,0,0]];
    var AA=[[1,2,3,4],[2,3,4,5],[3,4,5,6],[4,5,6,7]];
    var eig1=eig_powerIteration(A);
    var eig2=orthogonalIteration(A,2);
    var AB = new Matrix([[2, 3, 5], [4, 1, 6], [1, 3, 0]]);
    var e = new EigenvalueDecomposition(AB);
    var real = e.realEigenvalues;
    document.write("<br>"+real+"<br>")
    document.write("<br>"+eig1.val+"<br>")
    document.write("<br>"+eig1.vec+"<br>")
    //document.write(eig2.val+"<br>")
    document.write("<br>"+print_matrix(reduceToHessenberg(AA,4,false))+"<br>")
}
//console.log(A)

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

function eye_matrix(N){
    //Initialising  NxN identity matrix

Matrix = new Array(N);
for( i=0; i< Matrix.length; i++) {
  Matrix[i] = new Array(N);
  for( j=0; j< Matrix.length; j++) {
      if(i!=j){
        Matrix[i][j] = 0;
      }
      else{
          Matrix[i][j]= 1;
      }
  }
}
return Matrix;
}

function print_matrix(A){
    var i,j;
    const n=A.length;
    for(i=0;i<n;i++){
        for(j=0;j<n;j++){
            document.write("  "+A[i][j]+"  ")
        }
        document.write("<br>");
    }
    return(D)
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
        if ( typeof(u0) == "undefined"){
            u=new Array(n)
            for(let l=0;l<n;l++)
                u[l]=Math.random();
        }
        else
            u = u0;
        var norm;
        norm=norm_vector(u)
        for (let i=0;i<n;i++){
            u[i]/norm;
        }
        var lambda = 1;
        var v = new Array(n);
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
            if (lambda>1e-6){
                for(let i=0;i<n;i++){
                    u[i]=v[i]/lambda;
                }
            }
            else{
                u.fill(0.0);
            }
            //u = mulScalarVector(1/ lambda, u);				
        }
        return { "val" : lambda, "vec" : u};
    }

    /**
     * 
     * @param {Matrix} A 
     * @param {Matrix} B 
     */
    function Matrix_Mul(A,B){
        var C;
        const p=A.length,
            q=A[0].length,
            r=B.length,
            s=B[0].length;
        if(q!=r){
            console.log("Multiplication Error, column of A must be equal to row of B");
        }
        C=new Array(p);
        for(let i=0;i<p;i++){
            C[i]=new Array(s);
            for (let j=0;j<s;j++){
                C[i][j]=0.0;
                for(let k=0;k<r;k++){
                    C[i][j]=C[i][j]+A[i][k]*B[k][j];
                }
            }
        }
        return (C);
    }

    function matrix_substract(A,B){
        var C;
        var n=A.length;
        console.log(A)
        C=new Array(n);
        for(let i=0;i<n;i++){
            C[i]=new Array(n);
            for (let j=0;j<n;j++){
                C[i][j]=A[i][j]-B[i][j];
                //console.log(i)
            }
        }
        return C;
    }


    //
    //Adapted from Lalolib https://mlweb.loria.fr
    //
    function orthogonalIteration(A,n_evals){
        if(n_evals==1){
            return eig_powerIteration(A)
        }
        const maxIters = 1500;
        var k;
        const n = A.length;
        var sum;
        //initialising an n x r=n_evals random matrix and normalising it
        	
        Q = new Array(n);
        for(let i=0; i< Q.length; i++) {
            Q[i] = new Array(n_evals);
            for(let j=0; j< n_evals; j++) {
                Q[i][j] = Math.random();
            }
        }
        norm_vec=new Array(n_evals)
        for(let i=0;i<n_evals;i++){
            sum=0
            for(let j=0;j<n;j++)
            {
                sum=sum+Q[i][j]*Q[i][j]
            }
            norm_vec[i]=Math.sqrt(sum)
        }
        var Z;
        var V;
        var sub;
        const tol=1e-11;
        for(k=0;k<maxIters;k++){
            Z=Matrix_Mul(A,Q);
            if(Math.floor(k/50)==k/50){
                //convergence test
                V = Matrix_Mul(math.transpose(Q), Z);
                sub=math.subtract( Z, Matrix_Mul(Q, math.diag(math.diag(V)) ) )
                var sum_mat=0
                for (let i=0;i<sub.length;i++){
                    for(let j=0;j<sub[0].length;j++){
                        sum_mat=sum_mat+sub[i][j]*sub[i][j];
                    }
                }
                if ( Math.sqrt(sum_mat) < tol )
				    break;
            }
            Q = math.qr(Z).Q;
            
        }
        V=Matrix_Mul(math.transpose(Q),Matrix_Mul(A,Q));
        return  {"val":math.diag(V),"U":Q };
    }

    function House(x){
        /*
        *   Finds householder transformations utilda 
        *   see pg 120 of Demmel
        */
       const n=x.length;
       var utilda=new Array(n);
        for(let i=0;i<n;i++){
            if(i==0){
                sgn=Math.sign(x[0])
                if(x[0]==0)
                    sgn=1
                utilda[i]=x[0]+sgn*norm_vector(x);
            }
            else{
                utilda[i]=x[i];
            }
        }
        return utilda;
    }

    function reduceToHessenberg (A, n,Qrequired){
        /*See page 175 of Demmel Applied Numerical Linear Algebra
        *(Algorithm 4.6. Reduction to upper Hessenberg form)
        *
        */
        //set Q=I if Qrequired is true
        
        var P;
        for(let i=0;i<n-2;i++){
            n_x=n-i-1;
            var utilda;
            var x= new Array(n_x)
            var indx=i+1;
            for(let j=0;j<n_x;j++){
                x[j]=A[indx][i];
                indx=indx+1;
            }
            utilda=House(x)
            uuT=new Array(n_x);
            var factor=norm_vector(utilda)
            factor=(2.0/(factor*factor));
            for(let i=0;i<n_x;i++){
                uuT[i]=new Array(n_x);
                for (let j=0;j<n_x;j++){
                    uuT[i][j]=(factor ) * (utilda[i]*utilda[j]);
                }
            }
            var I=eye_matrix(n_x);
            P=matrix_substract(I,uuT);
            //console.log(I)
            //console.log(uuT)
            //console.log(P)
            var PA=Matrix_Mul(P,submat(A,i+1,n,i,n));
            var AP=Matrix_Mul(submat(A,1,n,i+1,n),P);
            var rindx=i+1;
            var cindx;
            for(let j=0;j<n-i-1;j++){
                cindx=i;
                for(let k=0;k<n-i;k++){
                    A[rindx][cindx]=PA[j][k];
                    cindx=cindx+1;
                }
                rindx=rindx+1;
            }
            rindx=1;
            for(let j=0;j<n-1;j++){
                cindx=i+1;
                for(let k=0;k<n-i-1;k++){
                    A[rindx][cindx]=AP[j][k];
                    cindx=cindx+1;
                }
                rindx=rindx+1;
            }
        }
        return(A)
    }

    function submat(A,p,q,r,s){
        /*
        *   Generate a submatrix of A with rows p to q
        *   and columns r to s
        *   i.e. return A[p:q][r:s]
        */
       const n_r=q-p;
       const n_c=s-r;
       const r0=r;
       const p0=p;
       var M = new Array (n_r);
       for(let i=0;i<n_r;i++){
           M[i] = new Array(n_c);
           r=r0;
           for(let j=0;j<n_c;j++){
               M[i][j]=A[p][r]
               r=r+1;
           }
           p=p+1;
       }
       return M;
    }


    /*function hqr2(nn, e, d, V, H) {
        let n = nn - 1;
        let low = 0;
        let high = nn - 1;
        let eps = Number.EPSILON;
        let exshift = 0;
        let norm = 0;
        let p = 0;
        let q = 0;
        let r = 0;
        let s = 0;
        let z = 0;
        let iter = 0;
        let i, j, k, l, m, t, w, x, y;
        let ra, sa, vr, vi;
        let notlast, cdivres;
      
        for (i = 0; i < nn; i++) {
          if (i < low || i > high) {
            d[i] = H.get(i, i);
            e[i] = 0;
          }
      
          for (j = Math.max(i - 1, 0); j < nn; j++) {
            norm = norm + Math.abs(H.get(i, j));
          }
        }
      
        while (n >= low) {
          l = n;
          while (l > low) {
            s = Math.abs(H.get(l - 1, l - 1)) + Math.abs(H.get(l, l));
            if (s === 0) {
              s = norm;
            }
            if (Math.abs(H.get(l, l - 1)) < eps * s) {
              break;
            }
            l--;
          }
      
          if (l === n) {
            H.set(n, n, H.get(n, n) + exshift);
            d[n] = H.get(n, n);
            e[n] = 0;
            n--;
            iter = 0;
          } else if (l === n - 1) {
            w = H.get(n, n - 1) * H.get(n - 1, n);
            p = (H.get(n - 1, n - 1) - H.get(n, n)) / 2;
            q = p * p + w;
            z = Math.sqrt(Math.abs(q));
            H.set(n, n, H.get(n, n) + exshift);
            H.set(n - 1, n - 1, H.get(n - 1, n - 1) + exshift);
            x = H.get(n, n);
      
            if (q >= 0) {
              z = p >= 0 ? p + z : p - z;
              d[n - 1] = x + z;
              d[n] = d[n - 1];
              if (z !== 0) {
                d[n] = x - w / z;
              }
              e[n - 1] = 0;
              e[n] = 0;
              x = H.get(n, n - 1);
              s = Math.abs(x) + Math.abs(z);
              p = x / s;
              q = z / s;
              r = Math.sqrt(p * p + q * q);
              p = p / r;
              q = q / r;
      
              for (j = n - 1; j < nn; j++) {
                z = H.get(n - 1, j);
                H.set(n - 1, j, q * z + p * H.get(n, j));
                H.set(n, j, q * H.get(n, j) - p * z);
              }
      
              for (i = 0; i <= n; i++) {
                z = H.get(i, n - 1);
                H.set(i, n - 1, q * z + p * H.get(i, n));
                H.set(i, n, q * H.get(i, n) - p * z);
              }
      
              for (i = low; i <= high; i++) {
                z = V.get(i, n - 1);
                V.set(i, n - 1, q * z + p * V.get(i, n));
                V.set(i, n, q * V.get(i, n) - p * z);
              }
            } else {
              d[n - 1] = x + p;
              d[n] = x + p;
              e[n - 1] = z;
              e[n] = -z;
            }
      
            n = n - 2;
            iter = 0;
          } else {
            x = H.get(n, n);
            y = 0;
            w = 0;
            if (l < n) {
              y = H.get(n - 1, n - 1);
              w = H.get(n, n - 1) * H.get(n - 1, n);
            }
      
            if (iter === 10) {
              exshift += x;
              for (i = low; i <= n; i++) {
                H.set(i, i, H.get(i, i) - x);
              }
              s = Math.abs(H.get(n, n - 1)) + Math.abs(H.get(n - 1, n - 2));
              x = y = 0.75 * s;
              w = -0.4375 * s * s;
            }
      
            if (iter === 30) {
              s = (y - x) / 2;
              s = s * s + w;
              if (s > 0) {
                s = Math.sqrt(s);
                if (y < x) {
                  s = -s;
                }
                s = x - w / ((y - x) / 2 + s);
                for (i = low; i <= n; i++) {
                  H.set(i, i, H.get(i, i) - s);
                }
                exshift += s;
                x = y = w = 0.964;
              }
            }
      
            iter = iter + 1;
      
            m = n - 2;
            while (m >= l) {
              z = H.get(m, m);
              r = x - z;
              s = y - z;
              p = (r * s - w) / H.get(m + 1, m) + H.get(m, m + 1);
              q = H.get(m + 1, m + 1) - z - r - s;
              r = H.get(m + 2, m + 1);
              s = Math.abs(p) + Math.abs(q) + Math.abs(r);
              p = p / s;
              q = q / s;
              r = r / s;
              if (m === l) {
                break;
              }
              if (
                Math.abs(H.get(m, m - 1)) * (Math.abs(q) + Math.abs(r)) <
                eps *
                  (Math.abs(p) *
                    (Math.abs(H.get(m - 1, m - 1)) +
                      Math.abs(z) +
                      Math.abs(H.get(m + 1, m + 1))))
              ) {
                break;
              }
              m--;
            }
      
            for (i = m + 2; i <= n; i++) {
              H.set(i, i - 2, 0);
              if (i > m + 2) {
                H.set(i, i - 3, 0);
              }
            }
      
            for (k = m; k <= n - 1; k++) {
              notlast = k !== n - 1;
              if (k !== m) {
                p = H.get(k, k - 1);
                q = H.get(k + 1, k - 1);
                r = notlast ? H.get(k + 2, k - 1) : 0;
                x = Math.abs(p) + Math.abs(q) + Math.abs(r);
                if (x !== 0) {
                  p = p / x;
                  q = q / x;
                  r = r / x;
                }
              }
      
              if (x === 0) {
                break;
              }
      
              s = Math.sqrt(p * p + q * q + r * r);
              if (p < 0) {
                s = -s;
              }
      
              if (s !== 0) {
                if (k !== m) {
                  H.set(k, k - 1, -s * x);
                } else if (l !== m) {
                  H.set(k, k - 1, -H.get(k, k - 1));
                }
      
                p = p + s;
                x = p / s;
                y = q / s;
                z = r / s;
                q = q / p;
                r = r / p;
      
                for (j = k; j < nn; j++) {
                  p = H.get(k, j) + q * H.get(k + 1, j);
                  if (notlast) {
                    p = p + r * H.get(k + 2, j);
                    H.set(k + 2, j, H.get(k + 2, j) - p * z);
                  }
      
                  H.set(k, j, H.get(k, j) - p * x);
                  H.set(k + 1, j, H.get(k + 1, j) - p * y);
                }
      
                for (i = 0; i <= Math.min(n, k + 3); i++) {
                  p = x * H.get(i, k) + y * H.get(i, k + 1);
                  if (notlast) {
                    p = p + z * H.get(i, k + 2);
                    H.set(i, k + 2, H.get(i, k + 2) - p * r);
                  }
      
                  H.set(i, k, H.get(i, k) - p);
                  H.set(i, k + 1, H.get(i, k + 1) - p * q);
                }
      
                for (i = low; i <= high; i++) {
                  p = x * V.get(i, k) + y * V.get(i, k + 1);
                  if (notlast) {
                    p = p + z * V.get(i, k + 2);
                    V.set(i, k + 2, V.get(i, k + 2) - p * r);
                  }
      
                  V.set(i, k, V.get(i, k) - p);
                  V.set(i, k + 1, V.get(i, k + 1) - p * q);
                }
              }
            }
          }
        }
      
        if (norm === 0) {
          return;
        }
      
        for (n = nn - 1; n >= 0; n--) {
          p = d[n];
          q = e[n];
      
          if (q === 0) {
            l = n;
            H.set(n, n, 1);
            for (i = n - 1; i >= 0; i--) {
              w = H.get(i, i) - p;
              r = 0;
              for (j = l; j <= n; j++) {
                r = r + H.get(i, j) * H.get(j, n);
              }
      
              if (e[i] < 0) {
                z = w;
                s = r;
              } else {
                l = i;
                if (e[i] === 0) {
                  H.set(i, n, w !== 0 ? -r / w : -r / (eps * norm));
                } else {
                  x = H.get(i, i + 1);
                  y = H.get(i + 1, i);
                  q = (d[i] - p) * (d[i] - p) + e[i] * e[i];
                  t = (x * s - z * r) / q;
                  H.set(i, n, t);
                  H.set(
                    i + 1,
                    n,
                    Math.abs(x) > Math.abs(z) ? (-r - w * t) / x : (-s - y * t) / z,
                  );
                }
      
                t = Math.abs(H.get(i, n));
                if (eps * t * t > 1) {
                  for (j = i; j <= n; j++) {
                    H.set(j, n, H.get(j, n) / t);
                  }
                }
              }
            }
          } else if (q < 0) {
            l = n - 1;
      
            if (Math.abs(H.get(n, n - 1)) > Math.abs(H.get(n - 1, n))) {
              H.set(n - 1, n - 1, q / H.get(n, n - 1));
              H.set(n - 1, n, -(H.get(n, n) - p) / H.get(n, n - 1));
            } else {
              cdivres = cdiv(0, -H.get(n - 1, n), H.get(n - 1, n - 1) - p, q);
              H.set(n - 1, n - 1, cdivres[0]);
              H.set(n - 1, n, cdivres[1]);
            }
      
            H.set(n, n - 1, 0);
            H.set(n, n, 1);
            for (i = n - 2; i >= 0; i--) {
              ra = 0;
              sa = 0;
              for (j = l; j <= n; j++) {
                ra = ra + H.get(i, j) * H.get(j, n - 1);
                sa = sa + H.get(i, j) * H.get(j, n);
              }
      
              w = H.get(i, i) - p;
      
              if (e[i] < 0) {
                z = w;
                r = ra;
                s = sa;
              } else {
                l = i;
                if (e[i] === 0) {
                  cdivres = cdiv(-ra, -sa, w, q);
                  H.set(i, n - 1, cdivres[0]);
                  H.set(i, n, cdivres[1]);
                } else {
                  x = H.get(i, i + 1);
                  y = H.get(i + 1, i);
                  vr = (d[i] - p) * (d[i] - p) + e[i] * e[i] - q * q;
                  vi = (d[i] - p) * 2 * q;
                  if (vr === 0 && vi === 0) {
                    vr =
                      eps *
                      norm *
                      (Math.abs(w) +
                        Math.abs(q) +
                        Math.abs(x) +
                        Math.abs(y) +
                        Math.abs(z));
                  }
                  cdivres = cdiv(
                    x * r - z * ra + q * sa,
                    x * s - z * sa - q * ra,
                    vr,
                    vi,
                  );
                  H.set(i, n - 1, cdivres[0]);
                  H.set(i, n, cdivres[1]);
                  if (Math.abs(x) > Math.abs(z) + Math.abs(q)) {
                    H.set(
                      i + 1,
                      n - 1,
                      (-ra - w * H.get(i, n - 1) + q * H.get(i, n)) / x,
                    );
                    H.set(
                      i + 1,
                      n,
                      (-sa - w * H.get(i, n) - q * H.get(i, n - 1)) / x,
                    );
                  } else {
                    cdivres = cdiv(
                      -r - y * H.get(i, n - 1),
                      -s - y * H.get(i, n),
                      z,
                      q,
                    );
                    H.set(i + 1, n - 1, cdivres[0]);
                    H.set(i + 1, n, cdivres[1]);
                  }
                }
      
                t = Math.max(Math.abs(H.get(i, n - 1)), Math.abs(H.get(i, n)));
                if (eps * t * t > 1) {
                  for (j = i; j <= n; j++) {
                    H.set(j, n - 1, H.get(j, n - 1) / t);
                    H.set(j, n, H.get(j, n) / t);
                  }
                }
              }
            }
          }
        }
      
        for (i = 0; i < nn; i++) {
          if (i < low || i > high) {
            for (j = i; j < nn; j++) {
              V.set(i, j, H.get(i, j));
            }
          }
        }
      
        for (j = nn - 1; j >= low; j--) {
          for (i = low; i <= high; i++) {
            z = 0;
            for (k = low; k <= Math.min(j, high); k++) {
              z = z + V.get(i, k) * H.get(k, j);
            }
            V.set(i, j, z);
          }
        }
      }*/