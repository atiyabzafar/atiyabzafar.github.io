# This file was generated, do not modify it. # hide
f(x, a) = exp(-a * x) * sin(x)
t = 0:0.1:10
@show y = f.(t, 0.3)   # broadcast over t, scalar a