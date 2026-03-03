# This file was generated, do not modify it. # hide
a=[]
for x ∈ 1:4
    push!(a,x)
end
@show a
println("You can also remove elements from the array")
pop!(a) # remove last element
@show a
popfirst!(a) # or remove first
@show a