@def tags = ["Blog","BlogPost"]
@def title = "Fun with Pi, complex sums and symmetries, Pi Day 2026"
@def rss_title = "Fun with Pi, complex sums and symmetries, Pi Day 2026"
@def rss_description = "Pi day 2026 post. This is a blog post about an interesting visualisation of sum of two complex numbers and how the irrational number pi has an interesting behavioral role to play."
@def description = "Pi day 2026 post. This is a blog post about an interesting visualisation of sum of two complex numbers and how the irrational number pi has an interesting behavioral role to play."
@def rss_pubdate = Date(2026, 03, 14)
@def og_image = ""
@def cusdis_id    = "piday2026"
@def cusdis_url   = "atiyabzafar.github.io/Blog/2026/pi-day/"
@def cusdis_title = "Pi Day 2026"
@def hasmath = true
@def hasmathjax = true

# Fun with $\pi$, complex sums and symmetries, Pi Day 2026

It is that time of the year again, $\pi$ day is celebrated every year on 14th March. I use the word celebrate, but there are no big parades down the roads, or midnight fireworks. A few enthusiasts on the internet celebrate their irrational affection to the irrational number. I have had a history of writing a letter on $\pi$ and have previously written a few posts about [calculating $\pi$](/Old_blog/2019-07-03-calculating-pi-recursively-love-letters-to-pi/2019-07-03-calculating-pi-recursively-love-letters-to-pi/), [surprising places where $\pi$ is found](/Old_blog/2020-03-14-love-letters-to-pi-surprising-places-where-pi-pops-up-celebrating-pi-day/pi2/), and [how we exist inside the expansion of $\pi$](/Old_blog/2021-03-14-pi/pi3/). This year, I will be talking about an interesting visualisation I found on the internet.

## Never intersecting spirograph?

A few months ago, I had seen a post on the subreddit [r/oddlysatisfying](https://www.reddit.com/r/oddlysatisfying/s/cvdICSdeTE), it shows a plot of a complex number $z(\theta)=e^{(\theta i)}+e^{(\theta \pi i)}$, for people who know about complex numbers, any complex number can be written as $z=a+ib$ or equivalently $z=\alpha e^{(i \theta)}$.

The angle theta is the angle that the point makes in the complex plane with the real line and $\alpha$ is the distance from the center. This is the radial or polar representation of complex numbers. The polar representation with $\alpha=1$ is famously known as Euler's formula.

Thus, in the visualisation, we are summing two complex numbers, which represent rotation around different points. This is represented as two arms with same length. In each instant, if the first arm rotates by the angle $\theta$, the second one rotates by an angle $\theta \pi$. $\pi$ thus is the orbital speed.

These visualisations remind me of **spirographs**. I remember, when I was in school, I used to have stencils with a circle with jagged edges that could rotate inside  a bigger stencil cut out with gears/teeth on the inside, these would glide on each other and I would use a pencil to trace one point of the circle. This is similar to what is happening in the visualisation, the only difference is that in the reddit post the two rotations occur in the same direction, whereas in a spirograph the rotation is in opposite direction.

\figenv{Spirograph Stencil (Courtesy : etsy)}{/Blog/2026/images/StencilSpirographEtsy.jpg}{width:50%;border:1px solid red;}

The most satisfying part using these stencils used to be the moment when the curve closed and I would start to retrace the already traced curve. This repeating pattern happens because of the speed of rotation, angular velocity. If the ratio of the two $\theta$(s) is a rational number, they will eventually become periodic. The least common multiple of the individual periods would give us the period of the resulting spirograph.

I think I will keep more discussion about spirographs for another post. Let us get back to the illustration in hand.

Let us generalise the complex number sum, by taking the second parameter (taken as $\pi$ above) as $a$.

$$z(a,\theta)=e^{(\theta i)}+e^{(a \theta i)}$$

We can now replace $a$ and see how the trace of the value of $z$ will look like.

\figenv{Trace of z for a=5.}{/Blog/2026/images/5loop.gif}{width:75%;border:1px solid red;}

We see a very pretty, symmetric four leaf structure for $a=5$. Notice, that after a $2 \pi$ radians rotation around origin, we trace back the original path, much like our spirographs. This will be true for any rational ratio.

For $a=1.5$, the path is looped back not after $2\pi$ but $4\pi$ radians. It creates a very interesting cusp shape that is pushed inside. 

\figenv{Trace of z for a=1.5.}{/Blog/2026/images/1_5loop.gif}{width:75%;border:1px solid red;}

But eventually for each fraction we will find that the path will loop back in finite time. Check out the following embedded youtube video for four more cases with different integral $a$ values. Notice how for $a=n+1$, we get $n$ leaf structures in the repeating diagrams. More on this later, when we try to formalise some results analytically.

~~~
<div class="video-container">
    <iframe height="950" width="75%" 
            src="https://www.youtube.com/embed/T1TcH-V4V6A?autoplay=1&mute=1&loop=1&playlist=T1TcH-V4V6A">
      </iframe>
</div>
~~~

Finally, let us see what will happen when we replace $a$ by $\pi$.

## Let us be irrational: $\pi$

So, what happens when we use $a=\pi$, or any irrational number as the angular speed for one circle? We end up with a never intersecting diagram as shown in the post above and as I have recreated it in the video below. Unmute the video for some classical music to go along with the pretty visuals. Notice the zoom and near miss at $t=14\pi$.

~~~
<div class="video-container">
    <iframe height="950" width="75%" 
            src="https://www.youtube.com/embed/BWurRVJxV4U?autoplay=1&mute=1&loop=1&playlist=BWurRVJxV4U">
      </iframe>
</div>
~~~

As you can observe, you expect the periodic behaviour to begin after a while, but the curves do not coincide. In fact, at $t=14\pi$, the curve almost reaches the starting point, but there is a very fine gap that is left, which later does not allow the curves to coincide. For $\pi$ the curve is not periodic.

### For $e$ and $\sqrt{2}$

The following video shows the plots for $z(e,\theta)$(left) and $z(\sqrt{2},\theta)$ (right). Showing that for other irrational numbers, there are no periodic representations.
~~~
<div class="video-container">
    <iframe height="950" width="75%" 
            src="https://www.youtube.com/embed/jhfxYJf9w7M?autoplay=1&mute=1&loop=1&playlist=jhfxYJf9w7M">
      </iframe>
</div>
~~~

The question now arrives, why is it that for rational numbers, we see periodic curves while for irrational there is no periodic behaviour. Let us formally study this complex sum of exponentials and try to answer this question.

## Formal mathematical analysis

Let us look at the complex number $z$ and try to study it by some mathematical analysis

$$
z(a,\theta)=e^{(\theta i)}+e^{(a \theta i)} = \cos (\theta) + i \sin(\theta) + \cos(a\theta)+i \sin\left(a \theta \right)  
$$

Using standard trigonometric formulae:
$$
z(a,\theta) = 2 \cos \left( \theta \left( \frac{a+1}{2} \right) \right) \cos \left( \theta \left( \frac{a-1}{2} \right) \right) + i \ 2 \sin \left( \theta \left( \frac{a+1}{2} \right) \right) \cos \left( \theta \left( \frac{a-1}{2} \right) \right)
$$

Thus, we have:

$$
z(a,\theta)= 2 \cos \left( \theta \left( \frac{a-1}{2} \right) \right) e^{i \theta \left( \frac{a+1}{2} \right) }
$$

Note, we have a real scalar multiplied to the unit complex rotating number. So, $2\left| \cos\left( \theta \left( \frac{a-1}{2} \right) \right) \right|$ is the amplitude whereas, $e^{i \theta \left( \frac{a+1}{2} \right) }$ rotates the complex number.

We had earlier noticed that for $a=n+1$ we have $n$ leaves, now we can show why this is the case. 

Let us try to find the roots of $z$, ignoring the rotating part, $z$ will be zero when $\left| \cos\left( \theta \left( \frac{a-1}{2} \right) \right) \right|=0$

This is true when,
$$
 \theta \left( \frac{a-1}{2} \right) = \frac{ (2n+1)\pi}{2} \implies \theta = \frac{(2n+1)\pi}{a-1}
$$

For a=2, $\theta=\pi,3\pi,5\pi,\cdots$, in which only $\theta=\pi$ lies in one full period, $[0,2\pi]$. Similarly, for $a=3$, only two zeros exist at $\theta=\pi/2, 3\pi/2$. And for general $a=n+1$, there are only $n$ values of $\theta$ in one period. When the value of $z$ reaches zero, it is at the cusp. And thus each cusp corresponds to a leaf. \

As we had mentioned before, for spirographs, the period at which the complete system repeats the pattern is the LCM of the two periods.

The first arm completes one circle or a period in $\theta=2\pi n$, whereas the second arm with rotational speed of $a$ closes after $\theta = 2\pi m /a$. Here both, $m$ and $n$ are integers.

The period of oscillation is therefore, $T=\text{lcm}(2\pi ,2\pi /a)$.

Assuming, $a$ is a rational number which can be written as $p/q$, then $T=\text{lcm}(2\pi ,2 \pi q /p)$.

We want to find the lowest $n$ and $m$ for which:

$$2 \pi n = \frac{2\pi m q}{p} \implies n=\frac{mq}{p},$$

since, $q$ and $p$ are integers and are the fractional representation of the rational number they do not have any common divisor. For $n$ to be an integer, $m$ has to be divisible by $p$. Therefore the minimum value of $m$ for which $n$ is an integer is, $m_{min}=p$. Finally, $n_{min}=\frac{m_{min} q}{p}=\frac{pq}{p}=q$.

Therefore, the smallest orbit for $a=p/q$, is 

$$ T=2\pi n_{min} = 2\pi q$$.

This expression shows why for our case for $a=1.5$ the period $[0,2 \pi]$ did not repeat. We had to go till $4\pi$ to get repeating patterns.

And finally, we can prove why $\pi$ does not show any repeating pattern in this representation. $\pi$ does have rational approximations,  $\pi \simeq 22/7$ is one of the most common ones that we learn in schools. There is a $\sim 10^{-3}$ error bound in this depiction. Thus, when we look at $T=2\pi \times 7 = 14 \pi$, we see that our trace crosses extremely close to the starting point, but not exactly at it. We get the next best rational approximation of $\pi$ at $333/106$. This suggests next close situation will occur at $T=212 \pi$. And to actually see it in the visualisation, I would need to zoom more to see the smaller gap.

So, for $\pi$ the period blows up to $\infty$. And it fills the whole volume without repeating, and same goes for other irrational numbers for the same reason.

Interestingly, we can generalise these for sum of multiple exponentials, $z=\sum_j b_j e^{a_j \theta i}$, which is the complex valued fourier series expansion. Famous math youtuber 3blue1brown has an amazing video that uses these complex fourier series to draw amazing animations. [link here](https://youtu.be/r6sGWTCMz2k)

Infact, if we want to define these types of visualisations formally, these would be degree-2 complex fourier curve. They are also pretty close to epicyclic curve that Ptolemy used to model planetary motion in early Greco-Roman history.

## Comments

{{cusdis}}