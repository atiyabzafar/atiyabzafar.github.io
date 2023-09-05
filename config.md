<!--
Add here global page variables to use throughout your website.
-->

@def title = "Atiyab's Blog"
@def description = "journey through physics"
@def website_url = "https://atiyabzafar.github.io/"
@def mintoclevel = 2
@def author = "Atiyab Zafar"
@def hasplotly = false
@def hascytoscape = false
@def hasmathcalc = false
@def hasmathjax = false

+++
author = "Atiyab Zafar"
mintoclevel = 2

# Add here files or directories that should be ignored by Franklin, otherwise
# these files might be copied and, if markdown, processed by Franklin which
# you might not want. Indicate directories by ending the name with a `/`.
# Base files such as LICENSE.md and README.md are ignored by default.
ignore = ["node_modules/"]

# RSS (the website_{title, descr, url} must be defined to get RSS)
generate_rss = true
website_title = "Atiyab's Blog"
website_descr = "Atiyab's Blog"
website_url   = "https://atiyabzafar.github.io/"
+++

<!--
Add here global latex commands to use throughout your pages.
-->
\newcommand{\R}{\mathbb R}
\newcommand{\scal}[1]{\langle #1 \rangle}
\newcommand{\note}[1]{@@note @@title ⚠ Note@@ @@content #1 @@ @@}

\newcommand{\figenv}[3]{
~~~
<figure style="text-align:center;">
<img src="!#2" style="padding:0;#3" alt="#1"/>
<figcaption>#1</figcaption>
</figure>
~~~
}