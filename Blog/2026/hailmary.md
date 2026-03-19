@def tags = ["Blog","BlogPost"]
@def title = "When stars get sick, astro-epidemiological model: Project Hail Mary a Sci-Fi book review"
@def rss_title = "When stars get sick, astro-epidemiological model: Project Hail Mary a Sci-Fi book review"
@def rss_description = "When stars get sick, astro-epidemiological model: Project Hail Mary a Sci-Fi book review","Exploring the idea of astro-epidemiology, exploring an agent based model of disease spread among stars, inspired from the book Project Hail Mary by Andy Weir"
@def description = "When stars get sick, astro-epidemiological model: Project Hail Mary a Sci-Fi book review","Exploring the idea of astro-epidemiology, exploring an agent based model of disease spread among stars, inspired from the book Project Hail Mary by Andy Weir"
@def rss_pubdate = Date(2026, 03, 19)
@def og_image = "/Blog/2026/images/PHM.png"
@def cusdis_id    = "hailmary"
@def cusdis_url   = "atiyabzafar.github.io/Blog/2026/hailmary/"
@def cusdis_title = "Project Hail Mary A book review"
@def hasmath = true
@def hasmathjax = true

# When stars get sick, astro-epidemiological model: Project Hail Mary a Sci-Fi book review

What would happen if pandemics were not a purely human problem? If the patient zero was not a person, but a star? This complex problem is explored in Andy Weir's science fiction novel, Project Hail Mary (PHM). Released in 2021, the novel received wide acclaim and was loved by many readers. Rated as 4.5 at goodreads with one million ratings and 4.5 at StoryGraph as well, PHM is a really entertaining novel that explores a scenario in which our star, _Sol_, gets infected by a single celled organism which starts 'eating' up the energy reserve of the sun. School teacher, Ryland Grace wakes up alone on a spacecraft with no memory of who he is or why he is there — only to discover he may be humanity's last hope.

In this post, I will be talking about the idea of a cosmic pandemic, an infection spread across the stars. I am not new to epidemiology. I have previously worked on a [project](/projects/ABM/) on an agent based model for disease spread. As a researcher in complexity, when I started reading the book a month ago, I thought about actually modeling this process.

\figenv{My copy of project hail mary that I borrowed from a friend on left, the model on the right}{/Blog/2026/images/PHM.png}{width:100%;border:1px solid red;}

This is a double post, I will be writing my thoughts on the book as a detailed book review at [the end of this post](http://atiyabzafar.github.io/Blog/2026/hailmary/#book_review_personal), at the same time I want to talk about this astro-epidemiology idea and have some fun trying to model the incidents of the novel. With the Ryan Gosling featured movie adaptation releasing tomorrow, I realised this was a good time to write about it. So, without further ado, let us get on with it.

\note{I will not be spoiling major plot points. Only minor spoilers which are revealed in the first few chapters will be used and discussed in this post. I will hide the details for the things that I wish to talk about but think might not be liked by the people who have not read the book. }

## The phage spread

In Project Hail Mary, Astrophage, a unicellular organism is found to be breeding by doubling its population at regular intervals, much like bacteria on Earth. They use self propulsion (read to find out how) and travel at a constant speed $0.92c$. The phage emerged from a certain star, travels at aforementioned speed and infects many stars making astrophage possibly one of the first sci-fi pathogen working at interstellar scale. Recently the show Pluribus, also explored a contagion which is not spread by a pathogen, but by information of the creation of the pathogen.

Much like human diseases, astrophage spreads by a contact process. Once it comes in contact with a star, it can infect its stellar system. There is a little nuance here, which I will avoid to declare so that I do not spoil the movie. I also will not go into the detail about its life cycle, or the process of replication. For these details I would point you to the wonderful novel. But what we can do, is infect a star and simulate the contagion across our stellar neighbourhood.

The "host" of the disease is the star itself. So we start with looking at the stellar neighbourhood of our own sun.

### Stellar Data

I have used the [HYG database](https://github.com/astronexus/HYG-Database/tree/main?tab=readme-ov-file) (*Hipparcos + Yale + Gliese*), a database of almost 120,000 nearby stars with the sun at the center. It gives us information about the distance from the sun, coordinates with the sun at the origin for each star and luminosity of the stars, among other details.

Thus, we can define a sphere of influence for each star. If the pathogen spreads from one star, with appropriate assumptions we can calculate the exposed stars by the presence in the sphere. We can then generate a network along which the disease can spread. More on this later. First let us introduce the model.

## About the model

I have used Agents.jl, a julia library for agent based modeling and have adapted the SIR model in it. SIR model is a standard model used in studying disease spread aka epidemics. In our model, each agent is a star, with parameters like Luminosity and coordinates associated with the agents. The agent or a star can be in either of the 4 states. Susceptible (S) stars are the non-infected stars which can be infected if they come in contact with Astrophage, Infected (I) stars have already been infected by the phage and can infect other stars now, recovered (R) stars are stars that have somehow found immunity (read the novel to find out how and if a star can get immunity) and finally the last block is that of dead stars (D), these are the stars that have dimmed below a certain threshold and has catastrophic results. The following block diagram explains the model.

\figenv{Block diagram of the model}{/Blog/2026/images/Model.svg}{width:100%}


## Model explained

### Infection probability

In this section, I will briefly talk about how a star gets infected in the model, let us assume a star $i$ is already infected, we make an assumption that at a fixed rate, the star will eject the phage "virus" in all directions with equal strength. 

Say, there exists a star $j$, at a distance $d_{ij}$ from the star $i$. The probability of the phage hitting the star $j$ will be proportional to the star's cross section as seen from the star $i$. This is where we introduce the idea of a solid angle. For those, who have not heard of it, a solid angle, is a higher dimensional generalisation of the normal angle. It is the 3D space subtended by a point to a surface. Thus, solid angle subtended from the emitter $i$ to the star $j$ with the surface area $\pi R_j^2$ is given by:

$$
\omega_{ij}=\frac{\pi R_j^{2}}{d^2_{ij}}
$$

Therefore, we can define our **infection probability** of star $j$ getting infected by star $i$ :

$$
\beta_{ij}=\beta_{base} \times \omega_{ij} = \beta_{base} \times \frac{\pi R_j^{2}}{d^2_{ij}}
$$

Okay, so we know $d_{ij}$ from the HYG database, but we do not have information about the size of the star. What we do know in the dataset is the spectral class of star. Here, my astrophysics course in the masters come to rescue. Stars have a very interesting life cycle, I will not be going into the details about the life of a star, or what _main sequence stars_ are, but for now take my word for it that stars can be classified into various categories. Most people would have heard about Red dwarfs for example, which are smaller stars that burn red hot and can be recognised by their color, their radius is much smaller than our sun. How can we find out the radii?

#### Finding out radius of a star

We use the Stefan-Boltzmann law of statistical physics/thermodynamics. Most physics students study this law in their undergraduate courses, when they are taught the black body radiation. What is Stefan-Boltzmann law, in simple words it states that  total energy radiated by a perfect black body per unit time, per unit surface area is proportional to the temperature of the body raised to its fourth power: 

$$
j=\sigma T^4
$$

$\sigma$ here, is known as the Stefan-Boltzmann constant, which is a universal constant. Its value is $\sim 5.6703 \times 10^{−8} W m^{−2}K^{−4}$. But, why am I talking about this thermodynamics law for stars? Well, stars are basically big glowing balls of burning gas. And they can be assumed to be a perfect black body. If we assume that a star is a perfectly spherical black body, we can use it to define the Luminosity of a star $L$:

$$
L=4 \pi R^2 \sigma T^4,
$$
where, $4 \pi R^2$ is the surface area of a sphere and $T$ is the temperature of the star. Or we can write for the radius of a star, which we want:

$$
R={\sqrt {\frac {L}{4\pi \sigma T^{4}}}}
$$

What we know with good accuracy is the Luminosity of our sun, and we can find the temperature of a star from the spectral class of a star. The spectral classes, in decreasing order of temperature are O, B, A, F, G, K, and M. Each of these classes have a corresponding temperature range. We can consider the average of that range as a typical temperature of the class. 

Since both luminosity $L$ and the output are expressed relative to the Sun, the physical constants $4\pi$ and $\sigma$ divide out exactly, leaving a dimensionless ratio that is trivial to compute. 

$$
{\frac {R}{R_{\odot }}} =\left({\frac {T_{\odot }}{T}}\right)^{2}\left({\frac {L}{L_{\odot }}}\right)^{1/2}
$$

The Sun's effective temperature $T_\odot = 5778 \,\text{K}$ acts as the reference. For a star of spectral class M (typical temperature ~3500 K) with luminosity $0.002\,L_\odot$, this gives:
$\frac{R}{R_\odot} = \sqrt{0.002} \times \left(\frac{5778}{3500}\right)^2 \approx 0.032 \times 2.73 \approx 0.12$
A typical M-dwarf is about 12% the radius of the Sun — consistent with published values for stars like Proxima Centauri ($R \approx 0.14\,R_\odot$).

Our data provides a column for the luminosity of the star and the spectral class, from these two columns, we can calculate the radius of the star. Once, we know the radius, we can find out $\beta_{ij}$

### Recovered

We define a recovery probability, this is a model parameter which is very small. The rarest event in the model. The parameter is fixed to be $0.001$ in our run. i.e. $0.1\%/yr$ chance of getting immunity. i.e. immunity is a once in a thousand year event.

### Death of a star

When is a star dead? This is a very interesting question, we can talk about lifecycle of a star as mentioned above. But we are not interested in the death of the star in our model. As we are inhabitant of a planet in our solar system, we want to calculate the chance of survival of an organism in a planetary orbit of the star. An effective extinction event of the stellar civilisation so to speak.

We define a dimming rate and a death threshold. The dimming rate is basically equivalent to the death rate of an earthly disease. The book provides us a soft range for this parameter, the sun gets dimmed measurably in a span of years. This implies that the dimming rate is not very small, but it is without a doubt not as much as 10 % every year. We assume this to be 0.005, or 0.5%/yr. Note that phage doubles exponentially, so this should be considered an initial rate, we do not take into the account of the number of phage in our model. This would require us to go into more complex domain, or define an agent based model.

The death threshold parameter has much wider range and it would depend on how robust a civilisation is when faced by the dimming of the star. For instance, if the civilisation has reached high advancements and sophistication in their science and technology that they have created a [dyson sphere](https://en.wikipedia.org/wiki/Dyson_sphere) around their star, they may as well survive beyond half dimming.

Maunder minima, an event that dimmed our sun by 0.08% caused an ice age like condition. So it is safe to say that even as low as 1% dimming can be catastrophic for life, at least water based life on a planet.

We set the death threshold at 0.3, a star is considered lost when its luminosity falls below 30% of its original value, meaning it has already dimmed by 70%. 

## Results

The simulation runs for 109 stars within a 20 light-year radius of the Sun, connected by a transmission network with a reach of 9 light-years. We begin with a single infected star: **Sirius A** (HIP 32349), the brightest star in our night sky at 8.6 light-years from Earth. Choice of this star as patient zero has no reason. It is strictly personal as I like its name :). Tau Ceti (HIP 8102) is initialised as pre-immune, the single resistant anomaly the book mentions. For the reason why, I will again point you to the wonderful book. Everything else starts susceptible.

\figenv{SIRD epidemic curve over 1000 years on a log scale. The infected count peaks near year 50 and collapses by year 600 as the local cluster burns out.}{/Blog/2026/images/sird_curve.png}{width:100%}

The results are striking in what they *don't* show. Often, in science we find the non results are also interesting results in their own. The susceptible count, the large flat teal line sitting near 10² — barely moves. The semi log axis also helps in appearance of the line is flat, but of the 109 stars in the network, only 14–15 ever become infected at the epidemic's peak. Astrophage does not sweep through the stellar neighbourhood. It is trapped! *The void between stars, the same void that makes interstellar travel so humbling — turns out to be the galaxy's best quarantine barrier.*

### The self-limiting cluster

The epidemic is confined entirely to the not so dense subgraph around Sirius A. The infection front expands rapidly in the first 50 years — seeding 11 new stars by year 10 alone — and then plateaus. This flattened portion persists for nearly 200 years, during which the infected count hovers between 12 and 14. The pathogen cannot bridge the gap to the next stellar cluster. This is **network fragmentation**: the local neighbourhood is not a well connected one, and astrophage is constrained by the topology that makes interstellar travel so difficult. A pathogen that crosses star systems still has to cross the void between them. The transmission limit defined as 9 light years as a parameter constrains the phage spread.

\figenv{Network snapshots at years 0, 10, 25, 50, 100, 200, and 500. Node size reflects luminosity. The infection (red) is confined to the Sirius A neighbourhood throughout. Grey nodes appear at year 500 as the cluster reaches the death threshold.}{/Blog/2026/images/network_snapshots.png}{width:100%}

### The collapse

Around year 250–300, the infected count begins its decline. Stars that were infected in the early years have been dimming at 0.5%/yr throughout, and they now cross the death threshold of $0.3 \, L_{\odot}$. A star infected at year 0 dies around:

$$
t_{\text{death}} = -\frac{\ln(0.3)}{0.005} \approx 240 \text{ years}
$$

The dead star count climbs to 17 by year 500, concentrated entirely in the Sirius A cluster. The grey node visible in the Year 500 panel is Sirius A itself, the brightest star in our sky, dimmed past the point of no return.

### Recovery: a stochastic rarity

Across 20 independent runs with different random seeds, the mean number of recovered stars after 1000 years is **4.75 ± 1.25**. At $p_\text{rec} = 0.001$/yr, recovery is not impossible, it is simply a stochastic random event that occasionally fires. The variance is large because the infected population never exceeds ~14 stars; the law of large numbers does not apply at this scale. In most runs, between 3 and 7 stars stumble into immunity purely by chance. Tau Ceti, in the book, is one such outlier , the one star that found its own answer.

### Does it matter where the epidemic starts?

Notice, I considered Sirius as my patient zero star, there is no reason why no other star should be the origin of the epidemic. Some will be worse for the disease, while some would be better attack points. Running the model 50 times for each of the 109 stars in our neighbourhood, with every star taking a turn as patient zero, reveals a striking spread in outcomes. The top 20 most dangerous index cases are shown below.

\figenv{Epidemic size (peak infected + final dead) for the top 20 patient zero candidates. The dark portion of each bar shows stars that eventually cross the death threshold; the light portion shows the peak concurrent infected count.}{/Blog/2026/images/patient_zero_bar.png}{width:100%}

The most dangerous patient zero is **HIP 82725**, not the closest star, not the brightest, followed closely by **Van Maanen's Star** which is a white dwarf at 14 light-years. **Ross 154**, a dim M-dwarf just 9.7 light-years away, enters the top four. Altair, one of the brightest stars visible from Earth on a summer night, ranks among the fifteen most dangerous epidemic seeds. Note, that in these runs, we do not assume Tau-ceti to be immune from the beginning. If we end up doing that we see very different results.

\figenv{Epidemic size (peak infected + final dead) for the top 20 patient zero candidates assuming Tau is immune. Only one iteration per star.}{/Blog/2026/images/patient_zero_bar_old.png}{width:75%}

The reason is structural. When Tau Ceti is immune, it acts as a **firewall node** — its pre-existing resistance breaks transmission chains that would otherwise pass through it or near it. Stars whose epidemic reach depended on passing through that part of the network are demoted; stars in completely separate subgraphs, like HIP 82725, are unaffected by Tau Ceti's status and rise to the top. One immune star, in the right network position, quietly reshapes the risk profile of every other star in the neighbourhood. Although this is an interesting result, the book _differs here from our model_, in the book Tau Ceti, even though it is immune to the disease acts as a spreader. It is a carrier host of the disease.

Looking at the graph-theoretic properties of these 20 stars against the full network reveals what makes them structurally special.

\figenv{Graph Theoretic properties of top 20 nodes vs all nodes}{/Blog/2026/images/image.png}{width:50%}
If we study the graph theoretic properties of the nodes in the disease network, we find interesting results with the top 20 stars and global averages. The betweenness centrality of top 20 nodes is almost double the average for the whole network. Also, the clustering coefficient decreases when we look at those nodes. This implies that dangerous stars occupy special place in our stellar neighborhood, they are bridges between clusters. The low clustering implies that their neighbourhood is not connected to each other. 

What the bar chart makes clear is that epidemic size is not simply a function of how close a star is to us. Proximity to the Sun does not determine danger; network position does. A star we have never heard of, at 19 light-years, can seed a larger epidemic than Sirius A — our chosen patient zero — simply by virtue of its connectivity. In the book, the origin of astrophage is never the Sun's nearest neighbour. The model suggests that in an astrophage universe, that choice of origin matters enormously.

### What the model cannot capture

This model has deliberate limitations worth naming. We treat each star as a point agent and ignore the detailed life cycle of astrophage, the exponential doubling rate, the depletion of stellar resources as the phage population grows, and the feedback between phage amount and the dimming rate. As the star dims, the rate of growth of the phage would decrease. A more complete model would couple the phage population to the star's energy budget. We also use a fixed dimming rate, where the book implies an accelerating one. The real epidemic in the novel is faster and more catastrophic than our simulation suggests.

Still in our model, the essential epidemiological structure is intact: a pathogen with a fixed spatial range, a low recovery rate, and no immunity in the host population will spread exactly as far as its transmission network allows and then stop. We also do not have a way to model carrier stars, or exposed stars from susceptible.

The model underlines the stakes of the novel, once phage bridges the gap to a well connected star, the cluster around it gets infected in a matter of centuries, with no natural mechanism to stop it. 

>_The sun, in the book, was simply the next in the path._

## Book review (personal)

I love reading science fiction, so I was expecting to like this book. But this book actually went over and beyond my expectations. Project Hail Mary starts with a man, who wakes up disoriented without any memory on a space ship. He slowly recalls his memory and realises he is on a mission to another star and Earth is dying. Our sun is ill. An interstellar pathogen has infected the solar system and we are on a race against time. Our protagonist, Ryland Grace (Hail Mary and Grace, on the nose) is a school teacher. PHM is about his journey and how he uses science and engineering with a surprising friend to save the universe. The novel goes back and forth as Grace remembers his time in Earth, as scientists in Earth grapples with the apocalyptic scenario and his time on the spaceship. 

The science is good, its accurate, people might find it jarring and difficult to follow because Ryland brings out mathematics and does back of the envelope calculations every other page in the book. But it is exciting to me who does this for a living. 

What I loved the most about the book was how well the humour lands and how much heart there is within the long passages about numbers and science. Within the hard science fiction adventure that spans light years, there is an emotional story about trust, friendship and love that binds all beings of the universe.

I cannot say a lot without spoiling a lot of this book. But to me this was a 5/5 book that I would love to read more times. You can see from the length of this post, how much it made me think. But it also made me feel. It made me question a lot about what it means to be brave. What it means to be a good person. And of course it made me wonder what would happen when stars get sick.

To those who have read it, or have now watched the movie, I would say this:

**Jazz Hands**

## Comments

{{cusdis}}

## Archive of more runs

For readers interested in seeing how the epidemic unfolds from different patient zero stars, here are the network snapshots for three of the top candidates.

\figenv{Network snapshots at years 0, 10, 25, 50, 100, 200, and 500. Node size reflects luminosity. The infection (red) is confined to Tau Ceti initially}{/Blog/2026/images/network_snapshots_8102.png}{width:100%}

\figenv{Network snapshots at years 0, 10, 25, 50, 100, 200, and 500. Node size reflects luminosity. The infection (red) is confined to 82725 initially}{/Blog/2026/images/network_snapshots_82725.png}{width:100%}

\figenv{Network snapshots at years 0, 10, 25, 50, 100, 200, and 500. Node size reflects luminosity. The infection (red) is confined to 113020 initially}{/Blog/2026/images/network_snapshots_113020.png}{width:100%}