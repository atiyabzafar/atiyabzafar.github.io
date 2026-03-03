# This file was generated, do not modify it. # hide
function stats(x)
    return minimum(x), maximum(x), sum(x)/length(x)
end
lo, hi, avg = stats([3, 1, 4, 1, 5, 9])
@show lo, hi, avg