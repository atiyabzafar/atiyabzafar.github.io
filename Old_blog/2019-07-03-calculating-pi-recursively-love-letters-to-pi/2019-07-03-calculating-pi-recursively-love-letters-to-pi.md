@def hasmath=true


![](/Old_Blog/2019-07-03-calculating-pi-recursively-love-letters-to-pi/images/04-Fascinating-Facts-Behind-the-Mystery-of-Pi-760x506-1.jpg)

This will be my first post of a series of love letters to the irrational number $\pi$. The ratio of circumference to the diameter of the circle.

There are many ways to calculate Pi. Simply because of the weird fact that the number appears in multitude of locations that are quite surprising. Some methods are pretty simple and some are the most complex to calculate.

## Calculating Pi


Simplest exercise you can work on now. You can just walk into your kitchen, find any circular object. For example I used a circular plate. Using a thread find the circumference-run it around the edge- then using a tape measure find the length of the diameter.

When you have both lengths just divide them, you can use the calculator on the left side of the screen to find out the result. You'll always find the ratio to be around 3 albeit the object was circular. (Now that's an approximation which physicists in general won't like)

## Infinite Series Method

We will be ignoring the geometrical method to calculate $\pi$, because in this post i want to show how to numerically calculate $\pi$. I will be using Python embedded code which you can play around with even without a lot of knowledge of the programming language itself.

The first written description of an infinite series that could be used to compute π was laid out in Sanskrit verse by Indian astronomer Nilakantha Somayaji in his _Tantrasamgraha_, around 1500 AD. Much like other old Indian mathematics works, there was a lack of proof to this series.

Nilakantha attributes the series to an earlier Indian mathematician, Madhava of Sangamagrama, who lived c. 1350 – c. 1425. The series was later in 17th Century rediscovered by Scottish mathematician James Gregory in 1671, and by Leibniz in 1674:

$$  
\frac{\pi}{4}=1-\frac{1}{3}+\frac{1}{5}-\frac{1}{7}+\frac{1}{9}-\ldots  
$$

This series is thus famously known as Gregory-Leibniz series. The formula for π is referred to as _Madhava–Newton series_ or _Madhava–Leibniz series_ or Leibniz formula for pi or Leibnitz–Gregory–Madhava series.

If we keep on calculating this infinite series we would be able to calculate $\frac{\pi}{4}$ and by simply multiplying by 4 we can calculate the value of $\pi$.

Understanding this code is pretty easy we find the kth term in the infinite expansion which is of the form of $\frac{(-1)^{k}}{2 k+1}$. In python the for loop runes from zero to the defined range. So the terms are added from k=0 to k=range.

You can explore the program and observe it working below.  
~~~
<iframe src="https://trinket.io/embed/python/8634f35653?runOption=run" marginwidth="0" marginheight="0" allowfullscreen width="100%" height="300" frameborder="0"></iframe>
~~~
## Using Monte Carlo Method

**Monte Carlo methods** are a broad class of computational algorithms that rely on repeated random sampling to obtain numerical results. The underlying concept is to use randomness to solve problems that might be deterministic in principle. They are often used in physical and mathematical problems and are most useful when it is difficult or impossible to use other approaches.[More](https://en.wikipedia.org/wiki/Monte_Carlo_method)

Lets say i have to solve a problem whose solution i know resembles a random process. So i can perform that random process N number of times and find out my result. Monte Carlo methods are used to solve many complicated systems with multiple Degrees of Freedom.

We are going to look at a shooting problem.Let us say we have a square target with a circular region for bonus points. Each bullet striking inside the circle will be counted while the bullets that strike outside circle are not. _pretty easy game right._

![](/Old_Blog/2019-07-03-calculating-pi-recursively-love-letters-to-pi/images/pi-1.png)

The Square target with side = 2 units and and in-circle of unit radius.

Frequency of the bullets being counted, i.e. the frequency of bullets landing inside the circle will be equal to the probability of bullet falling in the circular region. For an unbiased shooter (completely random) the probability is equal to the ratio of area of circular region to the area of the square.

Let us say f is the frequency of shots, N is the total no. of shots and m is the number of bullets on counted. Area of circle, we all know is given by $A_c= \pi r^2 = \pi$ (r=1 unit) while area of square is given by $A_s=side^2=2^2=4$ (side=2 units)

$$\therefore f=m/N=\frac{\pi}{4} \hspace{1cm} or \hspace{1cm} \pi=\frac{4 \* m}{N}$$

The program below simulates the same using python. I have written it in the simplest form and the program runs 5 times to show how random the result actually is.

random() function generates a random number between 0 and 1 and using appropriate algebra we make sure the numbers lie between -1 and 1. Imagine the figure i made above to be translated so that the centre of the circle lies at the origin. We count the random numbers that are generated inside the circle. Feel free to ask me doubts if any in the comments.  
~~~
<iframe src="https://trinket.io/embed/python/150afb8e41?runOption=run" marginwidth="0" marginheight="0" allowfullscreen width="100%" height="400" frameborder="0"></iframe>
~~~
## Bonus:  
**Bailey–Borwein–Plouffe formula** and comparison with Gregory-Leibniz

  
The BBP (named after Bailey-Borwein-Plouffe) is a formula for calculating [pi](http://mathworld.wolfram.com/Pi.html) discovered by Simon Plouffe in 1995. It converges faster than Gregory-Leibniz formula. We will show this in a while. The BBP formulae is given below.

![](/Old_Blog/2019-07-03-calculating-pi-recursively-love-letters-to-pi/images/bbp-1.png)

BBP formula

Below I have implemented both BBP formula and Gregory Leibniz to calculate the value of pi. We can see how BBP converges to 4 digits accurate value of pi in less than 5 iterations. It is a fast formula that is used to calculate expansions of pi.
~~~
<iframe src="https://trinket.io/embed/python/997255248a?runOption=run" width="100%" height="600" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>
~~~

---

title: "Calculating Pi recursively and using Monte Carlo Simulations | Love Letters to Pi"
date: "2019-07-03"
categories: 
  - "mathematics"
tags: 
  - "mathematics"
  - "physics"
coverImage: "04-Fascinating-Facts-Behind-the-Mystery-of-Pi-760x506-1.jpg"

---
