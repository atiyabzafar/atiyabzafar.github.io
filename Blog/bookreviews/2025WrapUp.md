@def title = "Reading Wrap Up 2025"
@def tags = ["Blog","BlogPost"]
@def hasplotly = true
@def rss_title = "2025 Reading Wrap Up"
@def rss_description = "Wrap up of my reading habit from 2025"
@def rss_pubdate = Date(2026, 02, 23)

# Reading Wrap Up 2025

The reading theme continued into 2025. If last few years were about establishing the habit, 2025 was about sustaining it through a busy year of PhD work, conference deadlines, a visit abroad to South America, and paper that refused to finish on time. The target this year was informal once again like [last year](/Blog/bookreviews/2024WrapUp/), but again I used storygraph to track my reading. This post is about the numbers and how the year was around reading.

\figenv{Wrap Up 2025 by Storygraph}{/Blog/bookreviews/images/storygraph-wrap-up-2025.png}{width:50%;border: 1px solid red;}

This year, I also joined hand with a few book club fellows in starting a new book club. We meet once a month in a tight knit community and discuss the books we have been reading. It started with sucess and hopefully will continue to go strong as it allows me to explore uncharted territory.

By the end of 2025 I finished **33 books** across **10,059 pages**. A slight bump from 32 books in 2024, and consistent pacing given the circumstances. The first book of the year was *Five Little Pigs* by Agatha Christie and the last was *The Sittaford Mystery* — also Agatha Christie. Make of that what you will.

## Story Graph

StoryGraph continues to be my tracker of choice. No Amazon, simple taps to log, ability to export data, small teacm, and gorgeous wrap-up stats at the end of the year. The full reading list is always available at the [books page](/Blog/bookreviews/books/).


### Pages and Books Read

The year started slowly — just one book in January. February surprisingly had 5 books(helped by graphic novel, yes it is cheeky I know). After that, things settled into a remarkably stable rhythm of 2–3 books per month for the rest of the year. With last half of the year at 3 books per month.

Only 3 books crossed the 500-page mark. I am a short-book person, it turns out — 59% of what I read was under 300 pages.

~~~
<div id="pagesbookschart"></div>
~~~

October was the biggest month by pages (1363), driven by a few longer reads. Unlike 2024, there was no dead month; I read something every single month, which felt like a genuine improvement.

### Books by Genre

~~~
<div id="genrechart"></div>
~~~

Mystery tops the charts with 16 books, followed by Crime (13) and Classics (12). No surprises there , Christie alone accounts for 13 of those books. What is interesting is the spread this year: 19 different genres, compared to a narrower range in 2024. Dystopian (4), Thriller (4), Horror (3), and Romance (3) all made appearances.

I also read one Mathematics textbook, which was necessary for my academic learning. Maybe I should not track it here. But it helped hype up by book count. (Cheeky again, I know.)

### Mood Track

~~~
<div id="moodpiechart"></div>
~~~

In 2025, *mysterious* dethroned *emotional* from the top spot, with 18 books (28%) tagged as mysterious. Dark came second (17%), followed by adventurous (12%). The emotional top spot from 2024 dropped to a tie for fourth place with tense at 9% each. Maybe it was the historical fiction and Manga reads that caused mysterious and dark genres ruse up. 

Storygraph also tracks how your reading mood evolves over the year:

~~~
<div id="moodchart"></div>
~~~

The mood chart for 2025 tells a different story from 2024 — but ends in the same place. In 2024, I started neutral and moved towards positive before a long decline into darkness. In 2025, I started already at -25 and never really escaped the negative half of the scale. February offered a brief positive change, the lightest point of the year, before settling back into the -25 range for most of the spring and summer. Then came a steady decline: July -33, August -38, September -40, October -44, November -50, December -49.

> The y-axis runs from a value of -50 to 50, with -50 representing darker/sadder moods and 50 representing the lightest/happiest moods. The data of month against score are as follows: Jan - -25, Feb - -15, Mar - -25, Apr - -25, May - -25, Jun - -23, Jul - -33, Aug - -38, Sep - -40, Oct - -44, Nov - -50, Dec - -49.

November at -50 is the absolute bottom of the scale. I was reading murder mysteries, dystopian fiction, and dark literary novels about violence, colonialism, and partition. I think reading *Tamas* in November and Stephen King's *Firestarter* brought it down and then the two books by Amitab Ghosh did not help.  It was not a planned descent. It never is. As I wrote in the 2024 wrap-up, perhaps we gravitate to similar content when deep in a genre, or maybbe the reading mood and the mind's mood are not entirely independent of each other.

### Authors

~~~
<div id="authorchart"></div>
~~~

The author chart is dominated by Agatha Christie at 13 books — nearly 40% of my entire year. This year I also discovered **Amitav Ghosh** (2 books), whose *The Hungry Tide* and *Jungle Nama* were among the more difficult reads of the year. R.F. Kuang (2 books) and Jun Mayuzuki (2 books) finishes the tally of the authors I read more than once.

### Bonus: Rating Data

~~~
<div id="ratingchart"></div>
~~~

The modal rating this year was 4.0⭐️ with 10 books — almost a third of everything I read. Six books went unrated (mostly ones I tracked but didn't feel strongly enough to rate). No book received below 3.0⭐️. Highest rated books of 2025:

1. 5.0⭐️ — Han Kang's **Human Acts**, Agatha Christie's **Peril at End House**, and Bhisham Sahni's **Tamas** 
2. 4.5⭐️ — Agatha Christie's **A Murder is announced**, Frieda McFadden's **The Housemaid**, Gillian Flynn's **Sharp Objects**, and Amitav Ghosh's **The Hungry Tide** 

~~~
<script>
    var Moods = document.getElementById('moodchart');
    var Pages_Books_Read = document.getElementById('pagesbookschart');
    var Genres = document.getElementById('genrechart');

    var months = ["January","February","March","April","May","June",
                  "July","August","September","October","November","December"];
    var months_short = ["Jan","Feb","Mar","Apr","May","Jun",
                        "Jul","Aug","Sep","Oct","Nov","Dec"];

    var books_read = [1, 5, 3, 2, 3, 2, 3, 3, 3, 3, 3, 3];
    var pages_read = [516, 1172, 648, 615, 825, 757, 928, 723, 790, 1363, 953, 924];
    var moods      = [-25, -15, -25, -25, -25, -23, -33, -38, -40, -44, -50, -49];

    var genres     = ["Mystery","Crime","Classics","Literary","Historical",
                      "Dystopian","Thriller","Contemporary","Horror","Romance",
                      "Science Fiction","Manga","Short Stories","Fantasy"];
    var booksbygenre = [16, 13, 12, 8, 5, 4, 4, 3, 3, 3, 2, 2, 2, 2];

    var moodnames  = ['mysterious','dark','adventurous','tense','emotional',
                      'reflective','sad','challenging','inspiring','informative','lighthearted'];
    var moodnums   = [18, 11, 8, 6, 6, 5, 3, 3, 2, 2, 1];

    var authors    = ["Agatha Christie","R.F. Kuang","Jun Mayuzuki","Amitav Ghosh"];
    var authorbooks = [13, 2, 2, 2];

    var ratinglabels = ["No rating","3.0⭐️","3.5⭐️","4.0⭐️","4.25⭐️","4.5⭐️","5.0⭐️"];
    var ratingnums   = [6, 5, 4, 10, 2, 4, 3];

    // --- Books & Pages chart ---
    var trace1 = {
        x: months,
        y: books_read,
        mode: 'lines+markers',
        name: 'Books Read',
        marker: { color: 'rgb(168, 0, 0)', size: 8 },
        line:   { color: 'rgb(168, 0, 0)', width: 1, shape: 'spline' }
    };
    var trace2 = {
        x: months,
        y: pages_read,
        mode: 'lines+markers',
        name: 'Pages Read',
        marker: { color: 'rgb(128, 0, 128)', size: 8 },
        line:   { color: 'rgb(128, 0, 128)', width: 1, shape: 'spline' },
        yaxis: 'y2'
    };
    var layoutMain = {
        title: { text: 'Books and Pages read in 2025' },
        yaxis: {
            title: { text: 'Books Read', font: { color: 'rgb(168, 0, 0)' } },
            tickfont: { color: 'rgb(168, 0, 0)' },
            side: 'left'
        },
        yaxis2: {
            title: { text: 'Pages Read', font: { color: 'rgb(128, 0, 128)' } },
            tickfont: { color: 'rgb(128, 0, 128)' },
            overlaying: 'y',
            side: 'right'
        }
    };
    Plotly.newPlot(Pages_Books_Read, [trace1, trace2], layoutMain);

    // --- Genre chart (top 14) ---
    var GenreData = [{
        type: 'bar',
        x: booksbygenre,
        y: genres,
        orientation: 'h',
        marker: {
            color: ['rgb(244,67,54)','rgb(112,112,112)','rgb(42,153,136)',
                    'rgb(0,153,198)','rgb(216,157,106)','rgb(103,58,183)',
                    'rgb(255,152,0)','rgb(33,150,243)','rgb(76,175,80)',
                    'rgb(233,30,99)','rgb(0,188,212)','rgb(255,87,34)',
                    'rgb(139,195,74)','rgb(96,125,139)']
        }
    }];
    Plotly.newPlot(Genres, GenreData, {
        title: "Number of Books Read by Genre in 2025",
        xaxis: { title: { text: "Number of Books" } }
    });

    // --- Mood pie chart ---
    var Pie = [{
        values: moodnums,
        labels: moodnames,
        type: 'pie'
    }];
    Plotly.newPlot('moodpiechart', Pie);

    // --- Mood trend chart ---
    Plotly.newPlot(Moods, [{
        x: months_short,
        y: moods,
        mode: 'lines+markers',
        line: { shape: 'spline' },
        marker: {
            color: moods,
            size: 20,
            colorscale: 'Jet',
            cmin: -50,
            cmax: 50
        },
        name: 'Moods'
    }], {
        title: { text: 'Reading Mood (Tracked) in 2025' },
        yaxis: { range: [-55, 55] }
    });

    // --- Author chart ---
    var AuthorData = [{
        type: 'bar',
        x: authorbooks,
        y: authors,
        orientation: 'h',
        marker: { color: ['rgb(244,67,54)','rgb(112,112,112)','rgb(42,153,136)','rgb(0,153,198)'] }
    }];
    Plotly.newPlot('authorchart', AuthorData, {
        title: "Most Read Authors in 2025",
        xaxis: { title: { text: "Number of Books" } }
    });

    // --- Ratings chart ---
    var RatingData = [{
        type: 'bar',
        x: ratinglabels,
        y: ratingnums,
        marker: { color: 'rgba(80, 0, 255, 0.5)' }
    }];
    Plotly.newPlot('ratingchart', RatingData, {
        title: "Star Ratings in 2025",
        xaxis: { title: { text: "Rating" } },
        yaxis: { title: { text: "Number of Books" } }
    });
</script>
~~~
