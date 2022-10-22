# Latexpy 

**A script to automate $\LaTeX$ for generating multiple pdf outputs for changing variables.**

This script was written to generate multiple latex documents by changing defined variable in the latex file. Generating multiple sets for examination are often required and became a necessity in the pandemic with online examinations. As they say 'Necessity is the mother of invention' I wrote this script for a course that I was involved in. 

## Sample $\LaTeX$ file.

Variables that need to be cycled through values can be defined using `\newcommand{variablename}{value}` in the beginning of the `.tex` file.

```LaTeX
\newcommand{\xvar}{49}
\newcommand{\yvar}{48}
\newcommand{\zvar}{47}
\newcommand{\wvar}{46}


\documentclass{article}
\usepackage{amsmath}
\usepackage{amssymb}
\title{File}
\author{Me}
\date{September 21}

\begin{document}
	\maketitle
\section{TEST}
This : $\xvar$  is a variable.$\varphi$. This:new should not be replaced.
\begin{itemize}
    \item $ x = \xvar$ 
    \item $ y = \yvar$
    \item $ z = \zvar$
    \item $ w = \wvar$
\end{itemize}
\end{document}
```

## How to use the script
In the python file (`script.py`) you can find the function replace() defined. It takes the tex file as the first input and a python dictionary as the second input.

**Sample:**
```Python
DICT={
        0:[49,9,9,19,29,39,49],
        1:[48,9,8,18,28,38,48],
        2:[47,9,7,17,27,37,47],
        3:[46,9,6,16,26,36,46]
            }
replace("file.tex",DICT)

```
In the example above, there are 4 variables defined. The value of dictionary key `0` will replace the value of `\xvar` variable, value for key `1` will replace the value for `\yvar` and so on.

The script uses **pdflatex** so make sure you have pdflatex installed in your system before using the script.

Note: the dictionary can be automated and the first value in the dictionary matches the first values in the Skeleton Latex file.