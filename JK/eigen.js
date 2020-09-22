//var A=[[1,2,3],[2,3,4],[3,4,5]]
//output:9.623475382979798,-0.6234753829797994,4.930380657631324e-32

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
            document.write(A[i][j]+"|")
        }
        document.write("<br><br>");
    }
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
        const maxIters = 2000;
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

    function ToHessenberg(A){
        /*
        *   See NUMERICAL RECIPES IN FORTRAN 77: 
        *   THE ART OF SCIENTIFIC COMPUTING
        *       Section 11.5
        *       book follows A[1...n] so each index reduced by 1
        */
       const n=A.length;
       var i,j,m;
       var x,y;
       for(m=2;m<n;m++){
           x=0.0;
           i=m;
           for(j=m;j<=n;j++){
               if( Math.abs(A[j-1][m-2]) > Math.abs(x) ){
                   x=A[j-1][m-2];
                   i=j;
               }
           }
           if(i!=m){                    //row interchange
               for(j=m-1; j <=n;j++){
                    y=A[i-1][j-1];
                    A[i-1][j-1]=A[m-1][j-1];
                    A[m-1][j-1]=y;
               }

               for(j=1;j<=n;j++){
                    y=A[j-1][i-1];
                    A[j-1][i-1]=A[j-1][m-1];
                    A[j-1][m-1]=y;
               }
           }

           if(x!=0){                    //Elimination
               for(i=m+1;i<=n;i++){
                   y=A[i-1][m-2];
                   if(y!=0.0){
                       y /= x;
                       A[i-1][m-2]=y;
                       for(j=m;j<=n;j++){
                           A[i-1][j-1]=A[i-1][j-1]-y*A[m-1][j-1];
                        }
                       for(j=1;j<=n;j++){
                            A[j-1][m-1]=A[j-1][m-1]+y*A[j-1][i-1];
                        }                          
                   }//end if
               }//end for
           }//end if
       }//end for
       /*for(i=0;i<n;i++){
           for(j=0;j<n;j++){
               if(i>(j+1))
                A[i][j]=0;
           }
       }*/
       return(A);
    }

    function QR_H(A){
        /*
        *   Finds all eigenvalues of an upper Hessenberg matrix
        *   A is in Hessenberg form already
        */
       var n=A.length;
       var i,its,j,k,l,m,nn,anorm,p,q,r,s,t,u,v,w,s,y,z,mmin;
       anorm=0;
       var wr=new Array(n)      //For real Evals
       var wi=new Array(n)      //For imaginary part
       //Compute matrix norm for possible use
       //in locating single small subdiagonal
       //element.
       for(i=1;i<=n;i++){
           for(j=Math.max(i-1,1);j<=n;j++){
               anorm=anorm+Math.abs(A[i-1][j-1]);
           }
       }
       nn=n;
       t=0.0;
       while (nn>=1) {
           its=0;
           do {
               for(l=nn;l>=2;l--){
                   s=Math.abs(A[l-2][l-2])+Math.abs(A[l-1][l-1]);
                   if(s == 0.0){s=anorm;}
                   if( (Math.abs(A[l-1][l-2]) +s ) ==s ){
                       A[l-1][l-2]=0.0;
                       break;
                   }
               }
               x=A[nn-1][nn-1];
               if (l==nn){
                    wr[nn-1]=x+t;             //check index!!
                    wi[nn-1]=0.0;
                    nn=nn-1;
               }
               else{
                    y=A[nn-2][nn-2];
                    w=A[nn-1][nn-2]*A[nn-2][nn-1];
                    if(l==(nn-1))   {
                        p=0.5*(y-x);
                        q=p*p+w;
                        z=Math.sqrt(Math.abs(q))
                        x+=t;
                        if (q>=0.0){
                            if(p!=0)
                                {z=p+Math.sign(p)*z;}
                            else {z=p+z;}
                            wr[nn-1]=x+z;
                            wr[nn-2]=wr[nn-1];
                            if(z!=0.0){
                                wr[nn-1]=x-(w/z);
                            }
                            wi[nn-1]=0.0;
                            wi[nn-2]=0.0;
                        }
                        else{
                            wr[nn-1]=x+p;
                            wr[nn-2]=wr[nn-1];
                            wi[nn-1]=z;
                            wi[nn-2]=-1.0*wi[nn-1];
                        }
                        nn=nn-2;
                    }
                    else{
                        if (its == 50) {console.log("Too many iterations in hqr");
                        throw new Error("Stop script");
                         }
                        if(its==10 || its==20){
                            t+=x;
                            for(i=1;i<=nn;i++)  
                            {A[i-1][i-1] =A[i-1][i-1] - x;}
                            s=Math.abs(A[nn-1][nn-2])+Math.abs(A[nn-2][nn-3]);
                            x=0.75*s;
                            y=x;
                            w = -0.4375*s*s;
                        }
                        ++its;
                        for(m=(nn-2);m>=l;m--) {
                            z=A[m-1][m-1];
                            r=x-z;
                            s=y-z;
                            p=(r*s-w)/A[m][m-1]+A[m-1][m];
                            q=A[m][m]-z-r-s;
                            r=A[m+1][m];
                            s=Math.abs(p)+Math.abs(q)+Math.abs(r);
                            p/=s;
                            q/=s;
                            r/=s;
                            if(m==l) {break;}
                            u=Math.abs(A[m-1][m-2])*(Math.abs(q)+Math.abs(r));
                            v=Math.abs(p)*(Math.abs(A[m-2][m-2])+Math.abs(z)+Math.abs(A[m][m]));
                            if((u+v)==v) {break;}
                        }
                        for(i=m+2;i<=nn;i++){
                            A[i-1][i-3]=0.0;
                            if(i!=(m+2)) A[i-1][i-4]=0.0;
                        }
                        for(k=m;k<=nn-1;k++){
                            //(Implicit) Double QR step on rows l to nn and columns m to nn
                            if(k!=m){
                                p=A[k-1][k-2];
                                //console.log(k,m);
                                q=A[k][k-2];
                                r=0.0;
                                if(k!=(nn-1)) r=A[k+1][k-2];
                                if( (x=Math.abs(p)+Math.abs(q)+Math.abs(r)) != 0.0){
                                    p/=x;
                                    q/=x;
                                    r/=x;                                    
                                }
                            }
                            if(p==0){s=Math.sqrt(p*p+q*q+r*r)}
                            else {s=Math.sign(p)*Math.sqrt(p*p+q*q+r*r)}
                            
                            if(s!=0.0){
                                if(k==m){
                                    if(l!=m){
                                        A[k-1][k-2]=-A[k-1][k-2];
                                    }
                                } else{
                                    A[k-1][k-2]=-s*x;
                                }
                                p+=s;
                                x=p/s;
                                y=q/s;
                                z=r/s;
                                q /= p;
                                r /= p;
                                for (j=k;j<=nn;j++){
                                    p=A[k-1][j-1]+q*A[k][j-1];
                                    if(k!=(nn-1)){
                                        p+=r*A[k+1][j-1];
                                        A[k+1][j-1] -= p*z;
                                    }
                                    A[k][j-1] -= p*y;
                                    A[k-1][j-1] -= p*x;
                                }
                                mmin=nn<k+3 ? nn:k+3;
                                for(i=l;i<=mmin;i++){
                                    p=x*A[i-1][k-1]+y*A[i-1][k];
                                    if(k!= (nn-1)) {
                                        p += z*A[i-1][k+1];
                                        A[i-1][k+1] -= p*r;
                                    }
                                    A[i-1][k] -= p*q;
                                    A[i-1][k-1] -= p;
                                }
                            }
                        }
                    }
               }
           } while (l < nn-1);
       }
       return {"real":wr,"imaginary":wi };
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

    function QR_basic(A){
        /*
        * explicit QR algorithm without shifts
        *
        */
        const n=A.length;
        var B=copy_matrix(A);
        var U=eye_matrix(n);
        var QR;
        const maxiter=1000;
        const tol=1e-11;
        for(let i=0;i<maxiter;i++){
            QR=math.qr(B);
            B=Matrix_Mul(QR.R,QR.Q);
            U=Matrix_Mul(U,QR.Q);
            
            //test convergence
            var test=0;
            for(let j=0;j<n;j++){
                for(let k=j;k<n;k++){
                    test=test+Math.abs(A[k][j]);
                }
            }
            if(test<tol){
                console.log("break");
                break;
            }
        }
        return(B)
    }

    function eigen_decomp(A){
        var vals,vec,L1,L2,degenerate;
	    var Acopy=copy_matrix(A);
        var eig1=eig_powerIteration(Acopy);
        var H=ToHessenberg(Acopy);
        var eig_QR=QR_H(H);
        const n=A.length;
        vals=new Array(n);
        vec=eig1.vec;
        vals={
            "real":eig_QR.real,"imaginary":eig_QR.imaginary 
        }
        var Reval=[];
        for (i=0;i<n;i++){
            if ( Math.abs(vals.imaginary[i]) < 1e-7)
                Reval.push(vals.real[i])
        }
        Reval.sort();
        L1=Reval[Reval.length-1]
        L2=Reval[Reval.length-2]
        if(Math.abs(L1-L2)<1e-7)
            degenerate=true;
        return { "reval":Reval , "L1":L1, "L2":L2,"vec":vec,"degeneracy": degenerate };

    }
