@def tags = ["Blog","WeeklyPost"]
@def hascytoscape = true

# Theoretical Ecology and Interactions (Lotka Volterra)
\toc
Understanding interaction among different species is very important not just for people planning to study theoretical ecology and biology but also for policymakers and think tanks who wish to understand the world. 

This will be a long blog post on various kinds of interactions we see in our ecological systems and the dynamics involved in them. 

Those who know me, would know that one of my academic curiosity is in understanding ecological networks and the mathematics involved in their population dynamics. This is my way of understanding various kinds of interactions. I have had my introduction to many of them already. But I would still go through them again to start from the basic and then to end at the nitty gritty spicy equations of complicated systems.

I have already written a blog post as an introduction to [Population Dynamics](/Old_blog/2020-03-15-understanding-the-dynamics-of-disease-spreading-part-1-basic-population-dynamics/disease/), where I discuss exponential growth and the importance of logistic curve to introduce a limit to growth. Curious folks can check it out. Let us proceed with our post.

## Ecological Interactions

When we think of ecology, we think of ecosystems and food chains that we studied in schools. One of the simplest example of food-chain is shown below as an interactive network:

~~~
 <style type="text/css">
    #mynetwork {    
        padding: 0;
        margin: auto;
        display: block;
        width: 600px;
        height: 400px;
        border: 2px solid lightgray;
        background-color: #ffffff;
      }
    </style>
   <div id="mynetwork"></div>
    <script type="text/javascript">
      // create an array with nodes
      var nodes = new vis.DataSet([
        { id: 1, label: "Bird" ,shape: "circularImage", image:'https://live.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg'},
        { id: 2, label: "Ladybug" ,shape: "circularImage", image:'https://live.staticflickr.com/3063/2751740612_af11fb090b_b.jpg'},
        { id: 3, label: "Grass Hopper" ,shape: "circularImage", image:'https://live.staticflickr.com/6098/6224655456_f4c3c98589_b.jpg'},
        { id: 4, label: "Cat" ,shape: "circularImage", image:'https://live.staticflickr.com/1261/1413379559_412a540d29_b.jpg'},
        { id: 5, label: "Grass" ,shape: "circularImage", image:'https://live.staticflickr.com/2660/3715569167_7e978e8319_b.jpg'},
      ]);

      // create an array with edges
      var edges = new vis.DataSet([
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 4, to: 1 },
        { from: 2, to: 5 },
        { from: 3, to: 5 },
      ]);

      // create a network
      var container = document.getElementById("mynetwork");
      var data = {
        nodes: nodes,
        edges: edges,
      };
      var options = {
        layout: {
            improvedLayout:true,
            clusterThreshold: 150,
            hierarchical: {
            enabled:true,
            levelSeparation: 150,
            nodeSpacing: 100,
            treeSpacing: 200,
            blockShifting: true,
            edgeMinimization: true,
            parentCentralization: true,
            direction: 'UD',        // UD, DU, LR, RL
            sortMethod: 'directed',  // hubsize, directed
            shakeTowards: 'leaves'  // roots, leaves
            }
        },
        edges: {
          arrows: "to",
        },
        nodes:{
            size:40,
        }
      };
      var network = new vis.Network(container, data, options);
    </script>
~~~

Here, each node represents a species and a link from one species to the other implies that the former eats the latter. A food chain shows a flow of energy through _trophic_ levels. Each level can either be occupied by one species (like Cat being the top _predator_) or multiple species (like Ladybug and Grasshopper in the second level from the bottom). The species that gets eaten is known as the _prey_ while the one that eats the prey is known as the _predator_. The system is thus known as a prey-predator system.

## Basic Lotka-Volterra Model

Lotka (1925) and Volterra (1926) independently came up with a mathematical model that studies predator-prey interactions. Now it is colloquially known as the Lotka-Volterra Model. 

The Lotka-Volterra model is a model for population dynamics involving a prey and a predator. Say, the population density of a herbivore (rabbit, deer, etc.) at time t is denoted by $H(t)$ whereas the population density of a predator (fox, lion, etc.) i.e. the carnivore is denoted by $C(t)$.

The main assumptions of the lotka-volterra model are:

 * Prey population has infinite (buffer) suuply of food (grass) at all times.
 * Rate of change of the population is proportional to its size: $dx/dt \ \propto \ x(t)$
 * Predators have limitless appetite.
 * Food supply of predator population depends only on the size of the prey population. $dC/dt \propto HC$

\begin{align}
\label{eq:prey-predator}
\frac{dH}{dt}&=&\alpha H - \beta HC\\
\frac{dC}{dt}&=& \delta HC-\gamma C
\end{align}

The above equations could also be calculated using chemical dynamics (see [Appendix](#appendix)). 

Often the growth rate of the predator is taken as same as the decline rate of the herbivore ($\delta$ and $\beta$), but a more general model is with different growth rates. See the appendix for explanation of each term in the above equations.

We can study the dynamics of these equations by performing linear stability analysis.

The steady-state population can be evaluated by equating $\dot{H}$ and $\dot{C}$ equal to $0$. Denoted by $(H^\star,C^\star)$ the steady state points are : $A(0,0),B(\gamma/\delta,\alpha/\beta)$

Jacobian of the dynamics is :
$$
J_{\left(H^\star,C^\star\right)}=\begin{bmatrix}
\alpha-\beta C & -\beta H \\
\delta C & \delta H -\gamma 
\end{bmatrix}  
$$

For fixed point A: 

$$
J_A=\begin{bmatrix}
\alpha &0\\
0&-\gamma
\end{bmatrix}
$$
which implies for positive $\alpha$ and $\gamma$ the eigenvalues are negative and thus point $A$ is stable fixed point. This trivial fixed point of the dynamics implies that if we start the system with both species extinct the species will remain extinct. 

And for fixed point B:

$$
J_B=\begin{bmatrix}
0 &\frac{\beta\gamma}{\delta}\\
\frac{\delta\alpha}{\beta}&0
\end{bmatrix}
$$

The eigenvalues are $\pm\left(\sqrt{\alpha \gamma}\right)i$ thus the fixed point B is a center and the system rotates around the fixed point depending on the initial conditions. Thus if we look at the solutiions as plots of population with time, the population of both the herbivore and the carnivore will oscilate with time.

\figenv{Prey-Predator Time Series showing oscillatory solutions}{/Blog/ecology_relationships/images/prey-predator-time.svg}{width:70%;border: 1px solid red;}

This can be better visualised by studying phase portrait when we plot the population of the herbivore v/s carnivore. Phase trajectories starting from different initial conditions are shown in the phase portrait below for the parameter sets:[$\alpha,\beta,\gamma,\delta$]=[$1,2,1,2$]

\figenv{Prey-Predator Time Series showing oscillatory solutions}{/Blog/ecology_relationships/images/prey-predator-phaseportrait.svg}{width:70%;border: 1px solid red;}

## More ecological interactions

Predation is not the only possible ecological interaction. Symbiosis is a term that many of us have studied in schools, symbiosis is the term used for long term interaction between two species. The following table mentiond different kind of relationships between two species and the effect that the relationship cause. (+ve implies benefit and -ve implies harm)

| Relationship | Species 1 | Species 2  |
|-----------|-----------|-----------|
| Mutualism     | +     | +    |
| Neutralism | 0 |0 |
| Antagonism/Competition | -| -|
| Parasitism | - |+|
| Amensalism | - | 0 |
| Commensalism | + | 0 |

As shown in the [appendix](#appendix), we can model the ecological interactions as chemical dynamics. Similarly, we can model symbiotic relationships as general mathematical model[^1]. Perhaps in next blog post I can explore more of these interactions. 

## Appendix

### Lotka-Volterra using chemical reaction dynamics

Ecological relationships can also be studied using chemical reaction dynamics. This is known as Ecological Stoichiometry. 
Say, H is the number of harbivores, F is the amount of food (grass), C is the amount of Carnivores and D is the carcass of the predator.
\begin{align}
F+H &\xrightarrow{k_1}2H\\
H+C &\xrightarrow{k_2}2C\\
C &\xrightarrow{k_3}D
\end{align}
Herbivore(H) eat food(F) and get energy to replicate/reproduce to give 2 herbivores with rate $k_1$.
A Herbivore and a Carnivore interact with rate $k_2$, in the interaction the Carnivore eats the herbivore, gets energy and reproduces to get two Carnivores. And finally, the Carnivore dies with the rate $k_3$.

[The Law of mass action](https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Supplemental_Modules_(Physical_and_Theoretical_Chemistry)/Equilibria/Chemical_Equilibria/Mass_Action_Law) can now be used to find out the rate equations:

\begin{align}

\frac{dH}{dt}=-k_1 FH +2k_1 FH - k_2 HC &= k_1 FH - k_2 HC\\
\frac{dC}{dt}=-k_2 HC + 2 k_2 HC -k_3C &= k_2 HC -k_3C

\end{align}

Now for constant food source, this equatioon can be directly compared with the prey predator system above.

[^1]: Untangling Complex Systems
