# This file was generated, do not modify it. # hide
using LinearAlgebra

A=diagm([1,2,3,4]) # Diagonal matrix
@show A
@show eigen(A).values # eigenvalues

import Statistics as st

@show st.mean(A)