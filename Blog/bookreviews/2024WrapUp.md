@def tags = ["Blog","BlogPost"]
@def hasplotly = true
@def rss_title = "2024 Reading Wrap Up"
@def rss_description = "Wrap up of my reading habit from last year"
@def rss_pubdate = Date(2025,03,5)


# Reading Wrap Up 2024

I started 2024 with the theme of reading. Inspired from a video posted by CGP Grey, a popular YouTuber, I decided not to have a new year resolution. But instead a theme for the year. This allowed me to have a flexibility and avoid fixed quantitative goals. Which with my full time PhD was a god send. 

\figenv{Wrap Up 2024 by Storygraph}{/Blog/bookreviews/images/Wrap.png}{width:50%;border: 1px solid red;}

Just like 2023, I wanted my focus on the reading habit to not only continue on building up my Agatha Christie collection and reading all of them, but also to explore new genres and writers. 

I also joined a book club run by very cool people across india known as BYOB. The abbreviation stands for Bring Your Own Book. The fine folks of the book club meet once a month and discuss either books based on a theme which is decided in the beginning of the month or you can talk about any book. This opened up a new world of reading to me which I am highly grateful for. 

## To track or not to track | Story Graph

I have had a habit of tracking things. I have been tracking the movies I have watched for years on Letterboxd. I have used LastFM's scrobble service to track my listening habit for a long time. But lately it has been a little difficult to keep tracking of the tracking itself. I find that the academic and life responsibilities has forced me to let go of many things. 

So, it was a risky decision to use [Story Graph](www.storygraph.com) which is a website for readers to track their reading activities. The world uses Goodreads to do the same and so have I in the past, but Story Graph provides an alternate service which is not owned by a not so great conglomerate like Amazon. 

It turned out to be a good decision as logging the reading is very simple and takes just a few taps on its app. My full reading list can be found in the updated books list using menu above or the following [link](/Blog/bookreviews/books/). At the end of each month, Story Graph provides stats for the reading of the month and it also provided a lovely detailed reading wrap for the year 2024. Following charts are made using their own wrap.  Storygraph also provides monthly summary graphics which I really like. 
\figenv{February 2025 Summary by Storygraph}{/Blog/bookreviews/images/Feb25.jpeg}{width:50%;border: 1px solid red;}

### Pages and Books Read
I started the year with a tentative unofficial target to read 20 Books. By the end of the year I ended up reading 32 books and around 10,000 pages. Following chart shows the number of pages and books versus time. You can see that the theme was slow in the beginning of the year. It took a while for me to pick up one book. 
~~~
<div id="pagesbookschart"></div>
~~~
February to April showed a steady 3 books pace which died to zero in May. In May I had a seminar for my PhD coursework which took most of my time. It also brought on my first DNF (did not finish) in the form of Notes from Underground by Fyodor Dostoevsky. Perhaps I needed a more calm mind to give justice to dear old Dostevsky. 

Once I was done with my seminar, you can see how quickly my books pace rise up. It was also sped because of graphic novels. Reading graphic novels is, I have found much easier and quicker than reading normal form fiction. The reading pace then showed a steady decline when I started concentrating back on my research work but I tried to not let the reading habit die down completely. 

### Books by Genre

~~~
<div id="genrechart"></div>
~~~
This plot had me really scratching my head initially. I do not remember reading 11 classics. 3 were obvious classics, White Nights, Pride and Prejudice and Picture of Dorian Gray. So I checked out my genre reading list because that is also something that is allowed by storygraph. And I had the classic face palm moment. Ofcourse all Agatha Christie mysteries are categorised as classic fiction. I also read three classic science fiction novels: Kindred by Octavia Butler, Solaris by Stanislaw Lem and Rendezvous with Rama by Arthur C Clarke. It would be interesting to see the Venn Diagrams of the genres and which books are in the intersections of various genres. 


### Mood Track
~~~
<div id="moodpiechart"></div>
~~~

This is an interesting feature unique to storygraph, each book is characterised with certain moods. For instance a Hercule Poirot mystery by Christie would be charectorised as mysterious, funny and/or adventurous. Majority of the books I read turn out to be emotional, msyterious and dark. Another surprising piece in this pie chart is one challenging book. 

Storygraph also provides a moodchart. This is the most interesting part of the year end wrap. Below you can see how the mood of my reading evolved with time. 

~~~
<div id="moodchart"></div>
~~~
I was not able to find the algorithm that they are using to calculate these reading moods. But I would imagine it is a weighted average of the number of books and their corresponding tagged moods. The only information I could find was this text that was embedded in the chart for accessibility reasons(which kudos to them that they have a detailed alt-text for the plot):

> ...The y-axis runs from a value of -50 to 50, with -50 representing darker/sadder moods and 50 representing the lightest/happiest moods. The darker moods are depicted in deep red colors. The middling/neutral moods in yellow/orange colors, and the lightest/happiest moods in green colors. The data of month against score are as follows: Jan - 0, Feb - 20, Mar - 13, Apr - 31, May - 31, Jun - 11, Jul - -3, Aug - -25, Sep - -28, Oct - -44, Nov - -43, Dec - -40...

Each mood must have some score, where positive ones will have a positive value whereas the negative moods would have negative values. Then they are weighted by the amount of pages read in that month. And at the end it is normalised to [-50,50] range. 

As one can see, the mood trend just declined as the year reached halfway mark. Post June the weight crossed the x-axis and it was predominantly serious and sad reading. Ofcourse, I was reading post apocalyptic stories, dark science fiction novels, a book about the last bookshop in london during the blitz and mysterious christie novels about Murders. It was not a decision I made halfway through 2024 to read more sad fiction. It just happened. Perhaps we gravitate to similar content when we are reading a certain genre. Or maybe the aid in interpolation of the mood trend follows the interpolation in our minds too. 


### Bonus: Rating Data
This I added just for fun. I do not really take rating things seriously. May it be a movie or a book. And I have been known to "give out stars". So it comes to no surprise that there are no books rated less than 3 stars. 
~~~
<div id="ratingchart"></div>
~~~
For curious people: 
Highest rated book : 
1. White Nights by Fyodor Dostoevsky: 5/5
2. Kindred by Octavia butler: 4.5/5
3. The Miraculous Journey of Edward Tulane by Kate DiCamillo: 4.5/5
4. The picture of Dorian Gray by Oscar Wilde: 4.5/5
5. The Firl from the Other Side (Vol.4) A graphic novel/manga by Nagabe : 4.5/5 


~~~
<script>
    Moods = document.getElementById('moodchart');
    Pages_Books_Read=document.getElementById('pagesbookschart');
    Genres= document.getElementById('genrechart');

    var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    var books_read = [0,3,3,3,0,3,6,6,4,2,1,2];
    var pages_read = [0,828,865,871,0,1267,1556,1954,1249,663,377,672];
    var moods = [0, 20, 13, 31, 31, 11, -3, -25, -28, -44, -43, -40];
    var booksbygenre = [11,9,8,8,6];
    var genres=["Classics","Literary","Fantasy","Mystery","Science Fiction"];
    var moodnames=['emotional', 'mysterious', 'dark', 'reflective', 'adventurous', 'hopeful', 'tense', 'sad', 'lighthearted', 'inspiring', 'informative', 'funny', 'challenging'];
    var moodnums=[16,13,13,9,8,6,4,2,1,1,1,1,1];
    var ratinglabels=["3.0⭐️","3.25⭐️","3.5⭐️","4.0⭐️","4.25⭐️","4.5⭐️","5.0⭐️"];
    var ratingnums=[1,1,2,5,1,4,1];

    var RatingData=[{
        type: 'bar',
        x: ratinglabels,
        y: ratingnums,
        marker:{
            color:'rgba(80,0,255,0.5)'
        }
    }];

    Plotly.newPlot('ratingchart',RatingData,{
        
    });
    var GenreData = [{
    type: 'bar',
    x: booksbygenre,
    y: genres,
    marker:{
        color: ['rgb(255, 0, 0)', 'rgba(9, 255, 0, 0.8)', 'rgb(243, 227, 0)', 'rgb(255, 0, 221)', 'rgb(89, 0, 255)']
    },
    orientation: 'h'
    }];

    Plotly.newPlot(Genres, GenreData,{
        title: "Number of Books Ready by Genre",
        xaxis:{
            title:{
                text:"Number of Books"
            }
        }
    });

    var Pie=[
        {
            values: moodnums,
            labels: moodnames,
            type: 'pie'
        }
    ];
    Plotly.newPlot('moodpiechart', Pie,);



    Plotly.newPlot(Moods,
        [{
            x:months,
            y:moods,
            mode: 'lines+markers',
            line: {
                shape: 'spline',
            },
            marker:
            {
                color:moods,
                size: 20,
                colorscale: 'Jet',
            },
            name: 'Moods',
        }],
        {
           title: {text: 'Reading Mood (Tracked) in 2024'}
        }
    );

    var trace1={
            x:months,
            y:books_read,
            mode: 'lines+markers',  
            marker: 
            {
                color: 'rgb(168, 0, 0)',
                size: 8
            },
            name:'Books Read',
            line: 
            {
                color: 'rgb(168, 0, 0)',
                width: 1,
                shape: 'spline',
            }
        };
    var trace2={
            x:months,
            y:pages_read,
            mode: 'lines+markers',  
            marker: 
            {
                color: 'rgb(128, 0, 128)',
                size: 8
            },
            name:'Pages Read',
            line: 
            {
                color: 'rgb(128, 0, 128)',
                width: 1,
                shape: 'spline',
            },
            yaxis:'y2',
        };
    data=[trace1,trace2];
    var layoutmain = {
    title: {text: 'Books and Pages read in 2024'},
    yaxis: {
            title: {
            text: 'Books Read',
            font: {color : 'rgb(168, 0, 0)'}
            },
            tickfont:{color: 'rgb(168, 0, 0)'},
            side: 'left'
        },
    yaxis2: {
            title: {
            text: 'Pages Read',
            font: {color: 'rgb(128, 0, 128)'}
            },
            tickfont: {color: 'rgb(128, 0, 128)'},
            overlaying: 'y',
            side: 'right'
        }
    };
    Plotly.newPlot(Pages_Books_Read,data,layoutmain);

</script>
~~~

