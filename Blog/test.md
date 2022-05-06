@def hascode = true
@def hasplotly = true


```julia:ex1
using PlotlyJS
z =  [10     10.625  12.5  15.625  20
     5.625  6.25    8.125 11.25   15.625
     2.5    3.125   5.    8.125   12.5
     0.625  1.25    3.125 6.25    10.625
     0      0.625   2.5   5.625   10]

data   = contour(; z=z)
layout = Layout(; title="Basic Contour Plot")
plt    = plot(data, layout)

fdplotly(json(plt)) # hide
```
\textoutput{ex1}


### Using `\fig{...}` (recommended)


Now you might use `\fig{...}` to insert graph [just like normal](/syntax/markdown/#inserting_a_figure). This also work fine with `Plots.jl` and `PlotlyBase.jl`.

**Note**: `\fig{...}` will call the JavaScript function `PlotlyJS_json` defined [above](#pre-requisites). You might customize the behavior by modifying the JavaScript. Also make sure `@def hasplotly = true` is properly set.

`````plaintext
```julia:ex2
using PlotlyJS
p=plot(
     scatter(x=1:10, y=rand(10), mode="markers"),
     Layout(title="Responsive Plots")
     )
savejson(p, joinpath(@OUTPUT, "plotlyex.json"))  # savejson is an alternative to savefig # hide
# PlotlyBase.json (also exported by PlotlyJS) often gives a smaller json compared to PlotlyJS.savefig # hide
```

\fig{plotlyex}
`````

This code block gives:

```julia:ex2
using PlotlyJS
p=plot(
     scatter(x=1:10, y=rand(10), mode="markers"),
     Layout(title="Responsive Plots")
     )
savejson(p, joinpath(@OUTPUT, "plotlyex.json"))  # savejson is an alternative to savefig # hide
# PlotlyBase.json (also exported by PlotlyJS) often gives a smaller json compared to PlotlyJS.savefig # hide
```
 
\fig{plotlyex}


**Note**: The plot will be automatically resized when the browser window size changes due to the JavaScript function provided above. This, however, will ignore the `layout.height` and the `layout.width` supplied in the json. It gives good output in most cases. But if you need fine control over the size of the figure, please modify the JavaScript.