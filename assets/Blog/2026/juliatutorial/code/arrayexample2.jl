# This file was generated, do not modify it. # hide
a = [4, 5, 6]
b = Int8[4, 5, 6]
@show a
@show b
println("Arrays are typed — once defined, you cannot push an incompatible type:")
try
    push!(b, 2.5)   # Float64 into an Int8 array → error
catch e
    println("Caught error: ", e)
end
println("But this works fine:")
push!(b, Int8(7))
@show b