using Dates

function hfun_bar(vname)
  val = Meta.parse(vname[1])
  return round(sqrt(val), digits=2)
end

function hfun_m1fill(vname)
  var = vname[1]
  return pagevar("index", var)
end

function lx_baz(com, _)
  # keep this first line
  brace_content = Franklin.content(com.braces[1]) # input string
  # do whatever you want here
  return uppercase(brace_content)
end

using Dates

function hfun_bloglist()
    # Define posts here directly: (path, date) — newest first
    posts = [
        ("/Blog/2026/juliatutorial/",           "Differential.jl: A tutorial with Lorenz system and Generalised Lotka Volterra", Date(2026,3,3),"/Blog/2026/images/lorenzchaos.png"),
        ("/projects/NetLogoEconomic/",          "An agent based model for a catalysed economy",                     Date(2026, 2, 26),"/assets/images/NetLogoScreenShot.png"),
        ("/Blog/bookreviews/2025WrapUp/",        "Wrap up and analysis of my reading in 2025",                       Date(2026, 2, 23),"/Blog/bookreviews/images/storygraph-wrap-up-2025.png"),
        ("/Blog/2025/google/",                   "Interesting Finds: Google",                                        Date(2025, 9, 3),"/Blog/2025/images/Centrality.svg"),
        ("/Blog/bookreviews/2024WrapUp/",        "Wrap up and analysis of my reading in 2024",                       Date(2025, 3, 5),"/Blog/bookreviews/images/Wrap.png"),
        ("/Blog/bookreviews/books/",             "Books read in first 4 months of 2025",                             Date(2025, 3, 3),nothing),
        ("/Blog/bookreviews/BalladOfSongbirds/", "Book Review: Ballad of Songbirds by Suzanne Collins",              Date(2024, 9, 9),nothing),
        ("/Blog/bookreviews/Kindred/",           "Book Review: Kindred by Octavia Butler",                           Date(2024, 8, 27),"/Blog/bookreviews/images/Kindred.jpg"),
        ("/Blog/bookreviews/April_July24Books/", "Thoughts on books read from April to July 2024",                   Date(2024, 8, 1),nothing),
        ("/Blog/bookreviews/March24Books/",      "Book Reviews for March 2024",                                      Date(2024, 8, 1),nothing),
        ("/Blog/bookreviews/February24Books/",   "Book Reviews for February 2024",                                   Date(2024, 4, 4),"/Blog/bookreviews/images/SecretAdversary.jpg"),
        ("/Blog/bookreviews/SleepingMurder/",    "Book Review: Sleeping Murder by Agatha Christie",                  Date(2023, 12, 24),"/Blog/bookreviews/images/SleepingMurder1.jpeg"),
        ("/Blog/bookreviews/EndlessNight/",      "Book Review: Endless Night by Agatha Christie",                    Date(2023, 12, 4),"/Blog/bookreviews/images/EndlessNight.jpeg"),
        ("/Blog/bookreviews/AThousandSplendidSuns/", "Book Review: A Thousand Splendid Suns by Khaled Hosseini",    Date(2023, 11, 13),"/Blog/bookreviews/images/AThousandSplendidSuns.jpg"),
        ("/Blog/bookreviews/ChristieAppointmentWithDeath/", "Book Review: Appointment With Death by Agatha Christie",Date(2023, 10, 1),"/Blog/bookreviews/images/AppointmentWithDeath.jpeg"),
        ("/Blog/ecology_relationships/ecology_relationship/", "Ecological Interactions, Basic Lotka Volterra",      Date(2023, 9, 10),nothing),
        ("/Blog/digitsum/sum_digits/",           "Playground with digit sum",                                        Date(2023, 9, 5),"/Blog/digitsum/UlamSpiral10e5.png"),
        ("/Blog/uncertainty/uncertainty/",       "Making Peace with Uncertainty",                                    Date(2023, 8, 28),"/assets/images/JurassicPark.gif"),
        ("/Blog/latexpy/",                       "Latexpy: script to generate multiple PDFs with different values",  Date(2022, 9, 2),nothing),
        ("/Blog/network/NetworkScience101/",     "Network Science 101",                                              Date(2022, 7, 24),nothing),
        ("/Old_blog/2021-03-14-pi/pi3/",         "Love Letters to Pi (III): Normality",                             Date(2021, 3, 14),"/Old_blog/2021-03-14-pi/images/PiNeverEnds2-1-1024x764.png"),
        ("/Old_blog/2020-03-15-understanding-the-dynamics-of-disease-spreading-part-1-basic-population-dynamics/disease/", "Understanding Population Dynamics", Date(2020, 3, 15),"/Old_blog/2020-03-15-understanding-the-dynamics-of-disease-spreading-part-1-basic-population-dynamics/images/population-dynamics-introduction-7-638-1.jpg"),
        ("/Old_blog/2020-03-14-love-letters-to-pi-surprising-places-where-pi-pops-up-celebrating-pi-day/pi2/", "Love Letters to Pi (II): Surprising places where Pi pops up", Date(2020, 3, 14),"/Old_blog/2020-03-14-love-letters-to-pi-surprising-places-where-pi-pops-up-celebrating-pi-day/images/PiNeverEnds2-1-1024x764.png"),
        ("/Old_blog/2019-07-03-calculating-pi-recursively-love-letters-to-pi/2019-07-03-calculating-pi-recursively-love-letters-to-pi/", "Calculating Pi Recursively — Love Letters to Pi (I)", Date(2019, 7, 3),"/Old_Blog/2019-07-03-calculating-pi-recursively-love-letters-to-pi/images/04-Fascinating-Facts-Behind-the-Mystery-of-Pi-760x506-1.jpg"),
        ("/Old_blog/Gell-Man/",                  "Gell-Mann’s innovative thinking| The Eight Fold Way",            Date(2019,5,25),nothing),
        ("/Old_blog/2019-03-28-understanding-entropy/2019-03-28-understanding-entropy/", "Understanding Entropy",   Date(2019, 3, 28),"/Old_blog/2019-03-28-understanding-entropy/images/entropy-4-1024x683.jpg"),
    ]

  io = IOBuffer()
    write(io, "<a href=\"/feed.xml\" class=\"rss-button\">Subscribe to RSS Feed</a>\n")
    write(io, "<div class=\"bloglist\">\n")
    for (url, title, date, img) in posts
        datestr = Dates.format(date, "d U, yyyy")
        img_html = isnothing(img) ? "" : """<img src="$img" class="bloglist-img" alt="$title">"""
        write(io, """<p><a href="$url">$img_html<span class="bloglist-title">$title</span></a><span class="post-date">$datestr</span></p>\n""")
    end
    write(io, "</div>\n")
    return String(take!(io))
end


function hfun_cusdis()
    page_id    = Franklin.locvar("cusdis_id")
    page_url   = Franklin.locvar("cusdis_url")
    page_title = Franklin.locvar("cusdis_title")

    # Use defaults if not set in frontmatter
    page_id    = isnothing(page_id)    ? "default"  : page_id
    page_url   = isnothing(page_url)   ? ""          : page_url
    page_title = isnothing(page_title) ? "Blog Post" : page_title

    return """
    <div id="cusdis_thread"
      data-host="https://cusdis.com"
      data-app-id="3fbebddf-252b-4547-9c0f-cb1d9ba878aa"
      data-page-id="$page_id"
      data-page-url="$page_url"
      data-page-title="$page_title"
    ></div>
    <script async defer src="https://cusdis.com/js/cusdis.es.js"></script>
    """
end
# Here are a few (physics) posts from my blog:
# - []()
# - Love Letters to pi: A series of fascinating dive downs into my favorite irrational number
#   - [Part 1](/Old_blog/2019-07-03-calculating-pi-recursively-love-letters-to-pi/2019-07-03-calculating-pi-recursively-love-letters-to-pi/)
#   - [Part 2](/Old_blog/2020-03-14-love-letters-to-pi-surprising-places-where-pi-pops-up-celebrating-pi-day/pi2/)
#   - [Part 3](/Old_blog/2021-03-14-pi/pi3/)
# For all posts, see the [Blog Roll](/Blog/).

function hfun_blogcarousel()
    posts = [
        ("/Blog/2026/juliatutorial/",       "Differential.jl: A tutorial with Lorenz system and Generalised Lotka Volterra","A tutorial for solving dofferential equation susing Julia and a look at lorenz system with generalise lotka volterr","/Blog/2026/images/lorenzchaos.png"),
        ("/projects/NetLogoEconomic/",        "Agent Based Economic Model",         "Documentation of a catalysed economy model", "/assets/images/NetLogoScreenShot.png"),
        ("/Blog/2025/google/","Interesting Finds: Google, a look at google's page rank algorithm and eigenvector centrality","Exploring the concept of page rank and eigenvector centrality with a look at how google does ranking. Random Networks with centrality","/Blog/2025/images/ratio_50_500_100_500.png"),
        ("/Blog/ecology_relationships/ecology_relationship/","Ecological Interactions, Basic Lotka–Volterra","A look at basic ecological ecology_relationships through mathematical modeling","/Blog/ecology_relationships/images/prey-predator-phaseportrait.svg"),        
        ("/Blog/digitsum/sum_digits/",           "Playground with digit sum",  "Playing around with digit sums and finding some interesting number theoretic observations and fractals","/Blog/digitsum/UlamSpiral10e5.png"),
        ("/Blog/uncertainty/uncertainty/",    "Making Peace with Uncertainty",       "Ian Malcolm, Jurassic Park, uncertainty",    "/assets/images/redditmemegodeltwitter.jpg"),
        ("/Old_blog/2019-03-28-understanding-entropy/2019-03-28-understanding-entropy/",  "Understanding Entropy", "A study of one of the most interesting ideas in physics, entropy through the lens of statistical mechanics", "/Old_blog/2019-03-28-understanding-entropy/images/entropy-4-1024x683.jpg"),
        ("/Old_blog/2020-03-15-understanding-the-dynamics-of-disease-spreading-part-1-basic-population-dynamics/disease/","Understanding Population Dynamics(From old Blog)","Studying population growth models from malthusian to logistic.","Old_blog/2020-03-15-understanding-the-dynamics-of-disease-spreading-part-1-basic-population-dynamics/images/population-dynamics-introduction-7-638-1.jpg"),
        ("/Blog/network/NetworkScience101/",  "Network Science 101",                "An introduction to network science",         nothing),
        ("/Old_blog/2021-03-14-pi/pi3/",    "Love Letters to Pi Part 3, normality of Pi", "A look at normality of my facourite irrational number and the magic hidden in the decimal expansion of it.","/Old_blog/2021-03-14-pi/images/PiNeverEnds2-1-1024x764.png")
    ]

    items = join([begin
        img_html = isnothing(img) ? "" : """<img src="$img" class="carousel-img" alt="$title">"""
        """
        <div class="carousel-item">
          <a href="$url" class="carousel-link">
            $img_html
            <div class="carousel-title">$title</div>
            <div class="carousel-desc">$desc</div>
          </a>
        </div>"""
    end for (url, title, desc, img) in posts], "\n")

    return """
    <div class="carousel-wrapper">
      <button class="carousel-btn prev" onclick="moveCarousel(-1)">&#8592;</button>
      <div class="carousel-track-outer">
        <div class="carousel-track" id="carouselTrack">
          $items
        </div>
      </div>
      <button class="carousel-btn next" onclick="moveCarousel(1)">&#8594;</button>
    </div>
    <script>
    (function() {
      var track = document.getElementById('carouselTrack');
      var idx = 0;
      var visibleCount = Math.floor(track.parentElement.offsetWidth / 280) || 1;
      function getMax() { return Math.max(0, track.children.length - visibleCount); }
      window.moveCarousel = function(dir) {
        visibleCount = Math.floor(track.parentElement.offsetWidth / 280) || 1;
        idx = Math.min(Math.max(idx + dir, 0), getMax());
        track.style.transform = 'translateX(-' + (idx * 280) + 'px)';
      };
      
    })();
    </script>
    """
end

function hfun_readingcarousel()
    books = [
        ("/Blog/bookreviews/2025WrapUp/",              "Reading Wrap Up 2025",                   "33 books, 10,059 pages across a busy PhD year",                    "/Blog/bookreviews/images/storygraph-wrap-up-2025.png"),
        ("/Blog/bookreviews/2024WrapUp/",              "Reading Wrap Up 2024",                   "32 books and the year reading became a habit",                     nothing),
        ("/Blog/bookreviews/Kindred/",                 "Kindred — Octavia Butler",               "A haunting masterpiece on slavery and time travel",                nothing),
        ("/Blog/bookreviews/BalladOfSongbirds/",       "Ballad of Songbirds & Snakes",           "The Hunger Games prequel — a villain's origin story",             nothing),
        ("/Blog/bookreviews/AThousandSplendidSuns/",   "A Thousand Splendid Suns",               "Khaled Hosseini's devastating story of two Afghan women",          nothing),
        ("/Blog/bookreviews/SleepingMurder/",          "Sleeping Murder — Agatha Christie",      "Miss Marple's last case and one of Christie's finest",            nothing),
        ("/Blog/bookreviews/EndlessNight/",            "Endless Night — Agatha Christie",        "Christie's darkest and most psychological thriller",              nothing),
        ("/Blog/bookreviews/February24Books/",         "February 2024 Reviews",                  "The Secret Adversary, Midnight Library and The Big Four",         nothing),
        ("/Blog/bookreviews/March24Books/",            "March 2024 Reviews",                     "The Forever War, Seven Dials Mystery, Before Coffee Gets Cold",   nothing),
        ("/Blog/bookreviews/April_July24Books/",       "April–July 2024 Reviews",                "Pride and Prejudice, Brazen, White Nights and more",              nothing),
        ("/Blog/bookreviews/books/",                   "All Books Read",                         "Full list of every book tracked since I started reading logs",    nothing),
    ]

    items = join([begin
        img_html = isnothing(img) ? "" : """<img src="$img" class="carousel-img" alt="$title">"""
        """
        <div class="carousel-item">
          <a href="$url" class="carousel-link">
            $img_html
            <div class="carousel-title">$title</div>
            <div class="carousel-desc">$desc</div>
          </a>
        </div>"""
    end for (url, title, desc, img) in books], "\n")

    return """
    <div class="carousel-wrapper">
      <button class="carousel-btn prev" onclick="moveReadingCarousel(-1)">&#8592;</button>
      <div class="carousel-track-outer">
        <div class="carousel-track" id="readingCarouselTrack">
          $items
        </div>
      </div>
      <button class="carousel-btn next" onclick="moveReadingCarousel(1)">&#8594;</button>
    </div>
    <script>
    (function() {
      var track = document.getElementById('readingCarouselTrack');
      var idx = 0;
      var visibleCount = Math.floor(track.parentElement.offsetWidth / 280) || 1;
      function getMax() { return Math.max(0, track.children.length - visibleCount); }
      window.moveReadingCarousel = function(dir) {
        visibleCount = Math.floor(track.parentElement.offsetWidth / 280) || 1;
        idx = Math.min(Math.max(idx + dir, 0), getMax());
        track.style.transform = 'translateX(-' + (idx * 280) + 'px)';
      };
      setInterval(function() {
        idx = (idx >= getMax()) ? 0 : idx + 1;
        track.style.transform = 'translateX(-' + (idx * 280) + 'px)';
      }, 8500);
    })();
    </script>
    """
end
