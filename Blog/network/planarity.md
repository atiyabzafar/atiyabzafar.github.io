# Planarity: The network science game 

@@im-25
![planarity](/Blog/network/images/planarity.png)
@@

## Motivation and history
The motivation behind this post was the time I spent/wasted on a lightweight puzzle app on my android phone on many sleepless tense nights during the pandemic. The app in question is known as Puzzles. Rather simple and not very creative naming. But the app is a gold mine for mind puzzles for satisfying that little itch at the back of your head. 

The games in the app it turned out was made by Simon Tatham a software engineer out of Cambridge UK. And as he so wonderfully clarifies on his website, he made these games so that there could be lightweight games that could work on any operating system and he could play in between his work sessions. He also so humbly credits each game to its original creator. And among all the thirty or so games the last game is called as Untangle. This post is about Untangle. (Fun fact: Simon is the mind behing PuTTY that many of you might have used to connect to servers via SSH)

I spent a lot of time playing this game and decided to make my own version. What followed was months of procrastination for picking up another project and abandoning it. I have found this is something I have done for many projects and I hope this blog would help in finishing and resolving many of them. 

Alright coming back to the history. It did not took me too long to reach to the original source and finding about the original creator of the game, John Tantalo. (Source of his website and the app made by Simon at the end of this page)

John made the first game using Flash that is now as dead as the website that it was hosted at. But let us not lament on the demise of flash games in this post-even though it still saddens me. Coming back to Planarity the original game was made in 2005 and updated algorithm was posted on 3 April 2007. I will leave the more curious to read more in the sources section at the end of the page. 

Let me now mention more about my version of the game and introduce what exacly are planar graphs.

## When is a Graph "Planar"?

**Planar Graphs:**  A planar graph is a graph that can be drawn in a plane or a 2D surface without the edges intersecting at any point except at the nodes. Or in fancier graph theoretic terminology: Planar graphs are graphs that can be embedded into a plane.

Following examples are of some graphs that are planar:
@@im-50
![planar-example](/Blog/network/images/planar_eg.png)
@@
Following examples are non-planar graphs.W
@@im-50
![non-planqWr-example](/Blog/network/images/non-planar-eg.png)
@@
## Some properties of Planar Graphs

### Faces:

A planar graphs divide plane into many regions which are known as faces. If we move the nodes of a planar graph around (as long as it stays a planar graph) the number of faces remains constant. Therefore number of faces is a property of the graph itself. 
This leads directly to Euler Formula for planar Graphs:

### Euler Formula:
For any planar graph with $v$ vertices, $e$ edges and $f$ faces, we have

$$v−e+f=2$$

The number of faces $f$ must include the outer universe as one unique face of the plane. i.e. for example 1 above, the  number of faces would be 5 and not 4.

You can see the number of vertices and edges in the game below and verify for yourself that this formula holds for the graph when it is a planar graph.


Finally you can try on the game!: (For more adventurous and curious folks detailed algorithm as to how we make sure each graph generated has a solution and is planar will be explained in the next blogpost)
## Planarity

The graph will light up once you have solved it

~~~
<span>The number of edges </span>
<span id="edges" >Number of edges in the graph</span>
~~~

~~~
{{insert /planarity/app1.html}}
~~~

~~~
<p>
    Visualisation using <a href="http://js.cytoscape.org">Cytoscape.js</a><br/>
</p>
~~~

##  A lesson in game development

I hope the game worked for you. (Please let me know if you faced any glitches.) Now this project just like other projects that i have worked on started as a curiosity. I had never made an interactive project before. Especially a game. 

The first version I developed, just from the experience of playing the game. Back then I had not gone through all the other versions that people have created already. As it turned out i faced a huge issue when the version 0 was finished. 

*The game started with graphs having no solutions!* i.e. no matter how many moves a player makes the graph would never be untangled! 

This problem made me learn a valuable lesson in game development : *Level design*

## Sources and further reading:

* Simon Tatham's Portable Puzzle Collection [Link](https://www.chiark.greenend.org.uk/~sgtatham/puzzles/)
* John Tantalo's Website about the game:[Link](http://johntantalo.com/wiki/Planarity/) 
  * The link also has a list of other people and their version of planarity the game!
* [Wikipedia entry on Planarity Game](https://en.wikipedia.org/wiki/Planarity)
* 