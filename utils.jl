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
        ("/projects/NetLogoEconomic/",          "An agent based model for a catalysed economy",                     Date(2026, 2, 26)),
        ("/Blog/bookreviews/2025WrapUp/",        "Wrap up and analysis of my reading in 2025",                       Date(2026, 2, 23)),
        ("/Blog/2025/google/",                   "Interesting Finds: Google",                                        Date(2025, 9, 3)),
        ("/Blog/bookreviews/2024WrapUp/",        "Wrap up and analysis of my reading in 2024",                       Date(2025, 3, 5)),
        ("/Blog/bookreviews/books/",             "Books read in first 4 months of 2025",                             Date(2025, 3, 3)),
        ("/Blog/bookreviews/BalladOfSongbirds/", "Book Review: Ballad of Songbirds by Suzanne Collins",              Date(2024, 9, 9)),
        ("/Blog/bookreviews/Kindred/",           "Book Review: Kindred by Octavia Butler",                           Date(2024, 8, 27)),
        ("/Blog/bookreviews/April_July24Books/", "Thoughts on books read from April to July 2024",                   Date(2024, 8, 1)),
        ("/Blog/bookreviews/March24Books/",      "Book Reviews for March 2024",                                      Date(2024, 8, 1)),
        ("/Blog/bookreviews/February24Books/",   "Book Reviews for February 2024",                                   Date(2024, 4, 4)),
        ("/Blog/bookreviews/SleepingMurder/",    "Book Review: Sleeping Murder by Agatha Christie",                  Date(2023, 12, 24)),
        ("/Blog/bookreviews/EndlessNight/",      "Book Review: Endless Night by Agatha Christie",                    Date(2023, 12, 4)),
        ("/Blog/bookreviews/AThousandSplendidSuns/", "Book Review: A Thousand Splendid Suns by Khaled Hosseini",    Date(2023, 11, 13)),
        ("/Blog/bookreviews/ChristieAppointmentWithDeath/", "Book Review: Appointment With Death by Agatha Christie",Date(2023, 10, 1)),
        ("/Blog/ecology_relationships/eccology_relationship/", "Ecological Interactions, Basic Lotka Volterra",      Date(2023, 9, 10)),
        ("/Blog/digitsum/sum_digits/",           "Playground with digit sum",                                        Date(2023, 9, 5)),
        ("/Blog/uncertainty/uncertainty/",       "Making Peace with Uncertainty",                                    Date(2023, 8, 28)),
        ("/Blog/latexpy/",                       "Latexpy: script to generate multiple PDFs with different values",  Date(2022, 9, 2)),
        ("/Blog/network/NetworkScience101/",     "Network Science 101",                                              Date(2022, 7, 24)),
        ("/Old_blog/2021-03-14-pi/pi3/",         "Love Letters to Pi (III): Normality",                             Date(2021, 3, 14)),
        ("/Old_blog/2020-03-15-understanding-the-dynamics-of-disease-spreading-part-1-basic-population-dynamics/disease/", "Understanding Population Dynamics", Date(2020, 3, 15)),
        ("/Old_blog/2020-03-14-love-letters-to-pi-surprising-places-where-pi-pops-up-celebrating-pi-day/pi2/", "Love Letters to Pi (II): Surprising places where Pi pops up", Date(2020, 3, 14)),
        ("/Old_blog/2019-07-03-calculating-pi-recursively-love-letters-to-pi/2019-07-03-calculating-pi-recursively-love-letters-to-pi/", "Calculating Pi Recursively — Love Letters to Pi (I)", Date(2019, 7, 3)),
        ("/Old_blog/Gell-Man/",                  "Gell-Mann’s innovative thinking| The Eight Fold Way",            Date(2019,5,25)),
        ("/Old_blog/2019-03-28-understanding-entropy/2019-03-28-understanding-entropy/", "Understanding Entropy",   Date(2019, 3, 28)),
    ]

    io = IOBuffer()
    write(io, "<a href=\"/feed.xml\" class=\"rss-button\">Subscribe to RSS Feed</a>\n")
    write(io, "<div class=\"bloglist\">\n")
    for (url, title, date) in posts
        datestr = Dates.format(date, "d U, yyyy")
        write(io, """<p><a href="$url">$title</a><span class="post-date">$datestr</span></p>\n""")
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
