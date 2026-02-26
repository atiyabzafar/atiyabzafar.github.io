document.addEventListener("DOMContentLoaded", function() {
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
});
