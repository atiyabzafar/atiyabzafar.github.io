@def tags= ["BookReviews"]
@def rss_description = "Books I have read"
@def description = "Books I have read"
@def rss_pubdate = Date(2025,03,3)
@def rss_title = "Updated chronological list of my reads"
@def title = "Updated chronological list of my reads"
@def cusdis_id    = "books"
@def cusdis_url   = "https://atiyabzafar.github.io/Blog/bookreviews/books/"
@def cusdis_title = "Books Read"
@def og_image = "/assets/images/Reading_heatmap.png"

# Books Read

A heatmap showing how often I read. Each cell correspond to a day and the number inside the cell shows how many pages were read that day. 

\figenv{Reading Heatmap (Updated February 2026)}{/assets/images/Reading_heatmap.png}{width:50%;border: 1px solid red;}

In the following section, you can scroll through the books I have read and tracked using StoryGraph
~~~
<style>
  /* --- App Container & Tabs --- */
  #books-app {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    margin: 2rem 0;
  }

  .books-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid #eaeaea;
    padding-bottom: 0px;
  }

  .book-tab {
    background: none;
    border: none;
    padding: 0.6rem 1.2rem;
    font-size: 0.95rem;
    font-weight: 600;
    color: #666;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px; /* Overlaps the container border */
    transition: all 0.2s ease;
  }

  .book-tab:hover {
    color: #111;
  }

  .book-tab.active {
    color: #3b82f6;
    border-bottom-color: #3b82f6;
  }

  /* --- Grid Layout (From Previous Step) --- */
  .books-grid-layout {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1.2rem;
  }

  .book-card {
    background: #fff;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04);
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    container-type: inline-size; 
  }

  .book-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
  }

  .book-cover-wrapper {
    position: relative;
    width: 100%;
    height: 180px;
    background: #f4f4f5;
    border-bottom: 1px solid #eaeaea;
    overflow: hidden;
  }

  .book-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    transition: transform 0.3s ease;
  }

  .book-card:hover .book-cover {
    transform: scale(1.05);
  }

  .book-genres-overlay {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(2px);
    display: flex;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.4rem;
    padding: 1rem;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .book-card:hover .book-genres-overlay { opacity: 1; }

  .genre-tag {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.3);
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
    border-radius: 12px;
    text-align: center;
  }

  .book-info {
    padding: 0.8rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .book-title {
    font-size: clamp(0.85rem, 6.5cqi, 1.1rem);
    font-weight: 600;
    color: #111;
    margin: 0 0 0.2rem 0;
    line-height: 1.2;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .book-author {
    font-size: clamp(0.75rem, 5.5cqi, 0.9rem);
    color: #666;
    margin: 0 0 0.6rem 0;
  }

  .book-date {
    margin-top: auto;
    border-top: 1px solid #eaeaea;
    padding-top: 0.5rem;
    font-size: clamp(0.65rem, 4.5cqi, 0.8rem);
    color: #888;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  /* --- Table Layout --- */
  .books-table-layout {
    width: 100%;
    overflow-x: auto; /* Allows horizontal scrolling on small phones */
  }

  .books-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
  }

  .books-table th, .books-table td {
    padding: 0.8rem;
    text-align: left;
    border-bottom: 1px solid #eaeaea;
    font-size: 0.9rem;
  }

  .books-table th {
    background: #f8f9fa;
    font-weight: 600;
    color: #333;
  }

  .table-cover-img {
    width: 40px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
    background: #f4f4f5;
  }

  .table-genres {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }

  .table-genre-tag {
    background: #f3f4f6;
    color: #374151;
    font-size: 0.7rem;
    padding: 0.1rem 0.4rem;
    border-radius: 8px;
  }

  /* Dark Mode Support */
  @media (prefers-color-scheme: dark) {
    .books-tabs { border-color: #333; }
    .book-tab { color: #aaa; }
    .book-tab:hover { color: #eee; }
    .book-tab.active { color: #60a5fa; border-bottom-color: #60a5fa; }
    
    .book-card { background: #1e1e1e; border-color: #333; }
    .book-cover-wrapper { background: #2a2a2a; border-color: #333; }
    .book-title { color: #f5f5f5; }
    .book-author { color: #aaa; }
    .book-date { border-color: #333; color: #aaa; }
    
    .books-table th { background: #222; color: #ddd; border-color: #333; }
    .books-table td { border-color: #333; color: #ccc; }
    .table-genre-tag { background: #333; color: #ddd; }
  }
</style>

<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js"></script>

<div id="books-app">
  <div class="books-tabs" id="books-tabs" style="display: none;">
    <button class="book-tab active" data-view="all">All Books</button>
    <button class="book-tab" data-view="year">Read This Year</button>
    <button class="book-tab" data-view="table">Table View</button>
  </div>
  
  <div id="books-loading" style="text-align: center; padding: 2rem; color: #666;">Loading Library...</div>
  <div id="books-content"></div>
</div>

<script>
  (function() {
    // ⚠️ UPDATE THIS URL to point to your CSV
    const csvUrl = "/assets/CardView for export.csv";

    const contentDiv = document.getElementById('books-content');
    const loadingDiv = document.getElementById('books-loading');
    const tabsContainer = document.getElementById('books-tabs');
    const tabs = document.querySelectorAll('.book-tab');

    let globalBooksData = [];

    // 1. Fetch Data Once
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        loadingDiv.style.display = 'none';
        tabsContainer.style.display = 'flex'; // Reveal tabs
        
        // Clean and process data once
        globalBooksData = results.data.map(processBook);
        
        // Render initial view (All Books)
        renderView('all');
      },
      error: function(err) {
        loadingDiv.innerText = "Error loading books.";
      }
    });

    // 2. Data Cleaning Function
    function processBook(book) {
      let title = book["file name"] || "Unknown Title";
      const author = book["author"] || "Unknown Author";
      const rawGenre = book["genre"] || "";
      const dateRead = book["last_date_read"] || "";
      
      const suffix = " by " + author;
      if (title.endsWith(suffix)) {
        title = title.substring(0, title.length - suffix.length);
      }

      const genreParts = rawGenre.split(",").map(g => g.trim()).filter(g => g);
      const uniqueGenres = [...new Set(genreParts)];

      let parsedDate = null;
      let formattedDate = "-";
      if (dateRead) {
        parsedDate = new Date(dateRead);
        formattedDate = parsedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }

      return {
        title: title,
        author: author,
        cover: book["cover"] || "",
        genres: uniqueGenres,
        rawDate: dateRead,
        parsedDate: parsedDate,
        formattedDate: formattedDate
      };
    }

    // 3. Tab Click Listeners
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        // Update active tab styling
        tabs.forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        
        // Render the chosen view
        const view = e.target.getAttribute('data-view');
        renderView(view);
      });
    });

    // 4. View Router
    function renderView(viewType) {
      if (viewType === 'all') {
        renderGrid(globalBooksData);
      } 
      else if (viewType === 'year') {
        const currentYear = new Date().getFullYear();
        const thisYearBooks = globalBooksData.filter(b => b.parsedDate && b.parsedDate.getFullYear() === currentYear);
        renderGrid(thisYearBooks);
      } 
      else if (viewType === 'table') {
        renderTable(globalBooksData);
      }
    }

    // 5. Render Grid (Used by 'all' and 'year')
    function renderGrid(data) {
      if (data.length === 0) {
        contentDiv.innerHTML = `<div style="padding: 2rem; text-align: center; color: #888;">No books found for this selection.</div>`;
        return;
      }

      let html = `<div class="books-grid-layout">`;
      data.forEach(book => {
        const topGenres = book.genres.slice(0, 4);
        const genreHtml = topGenres.map(g => `<span class="genre-tag">${g}</span>`).join("");

        html += `
          <div class="book-card">
            <div class="book-cover-wrapper">
              ${book.cover ? `<img src="${book.cover}" class="book-cover" loading="lazy">` : `<div class="book-cover" style="display:flex;align-items:center;justify-content:center;color:#999;">No Cover</div>`}
              <div class="book-genres-overlay">${genreHtml}</div>
            </div>
            <div class="book-info">
              <div class="book-title" title="${book.title}">${book.title}</div>
              <div class="book-author">${book.author}</div>
              <div class="book-date">
                <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                ${book.formattedDate}
              </div>
            </div>
          </div>
        `;
      });
      html += `</div>`;
      contentDiv.innerHTML = html;
    }

    // 6. Render Table
    function renderTable(data) {
      let html = `
        <div class="books-table-layout">
          <table class="books-table">
            <thead>
              <tr>
                <th style="width: 50px;">Cover</th>
                <th>Title</th>
                <th>Author</th>
                <th>Genres</th>
                <th style="width: 120px;">Date Read</th>
              </tr>
            </thead>
            <tbody>
      `;

      data.forEach(book => {
        const topGenres = book.genres.slice(0, 3);
        const genreHtml = topGenres.map(g => `<span class="table-genre-tag">${g}</span>`).join("");

        html += `
          <tr>
            <td>
              ${book.cover ? `<img src="${book.cover}" class="table-cover-img" loading="lazy">` : `<div class="table-cover-img" style="display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:#999;">None</div>`}
            </td>
            <td><strong>${book.title}</strong></td>
            <td>${book.author}</td>
            <td><div class="table-genres">${genreHtml}</div></td>
            <td style="color: #666;">${book.formattedDate}</td>
          </tr>
        `;
      });

      html += `</tbody></table></div>`;
      contentDiv.innerHTML = html;
    }
  })();
</script>
~~~


## 2025
Reading wrapup post: [Click here](/Blog/bookreviews/2025WrapUp/)


|Finished|Book Title|Author|Rating|Review|
|:-------------:|:------------:|-------|--------|------|
|2025/01/30|Five Little Pigs|Agatha Christie|~~~<div class="Stars" style="--rating: 4;" aria-label="Rating of this book is 4 out of 5.">~~~||
|2025/02/05|Carrie Soto Is Back|Taylor Jenkins Reid|~~~<div class="Stars" style="--rating: 4;" aria-label="Rating of this book is 4 out of 5.">~~~||
|2025/02/05|Kowloon Generic Romance, Vol. 1 and 2|Jun Mayuzuki, 眉月じゅん|~~~<div class="Stars" style="--rating: 3;" aria-label="Rating of this book is 3 out of 5.">~~~||
|2025/02/16|Human Acts|Han Kang|~~~<div class="Stars" style="--rating: 5;" aria-label="Rating of this book is 5 out of 5.">~~~||
|2025/02/25|Mrs McGinty's Dead|Agatha Christie|~~~<div class="Stars" style="--rating: 3.5;" aria-label="Rating of this book is 3.5 out of 5.">~~~||
|2025/03/04|Markov Chains: From Theory to Implementation and Experimentation|Paul A. Gagniuc|------|Text Book|
|2025/03/17|The Maniac|Benjamin Lebatut|~~~<div class="Stars" style="--rating: 3.5;" aria-label="Rating of this book is 3.5 out of 5.">~~~||
|2025/04/05|The Mirror Crack'd from Side to Side|Agatha Christie|~~~<div class="Stars" style="--rating: 3;" aria-label="Rating of this book is 3 out of 5.">~~~||
|2025/04/24|Three Act Tragedy|Agatha Christie|~~~<div class="Stars" style="--rating: 4.25;" aria-label="Rating of this book is 4.25 out of 5.">~~~||
|2025/05/05|Orbital|Samantha Harvey|~~~<div class="Stars" style="--rating: 4;" aria-label="Rating of this book is 4 out of 5.">~~~||
|2025/05/08|Sharp Objects|Gillian Flynn|~~~<div class="Stars" style="--rating: 4.5;" aria-label="Rating of this book is 4.5 out of 5.">~~~||
|2025/06/13|The Labours of Hercules|Agatha Christie|~~~<div class="Stars" style="--rating: 3;" aria-label="Rating of this book is 3 out of 5.">~~~||
|2025/06/27|A Murder is Announced|Agatha Christie|~~~<div class="Stars" style="--rating: 4.5;" aria-label="Rating of this book is 4.5 out of 5.">~~~||
|2025/07/11|Sunrise on the Reaping|Suzanne Collins|~~~<div class="Stars" style="--rating: 3;" aria-label="Rating of this book is 3 out of 5.">~~~||
|2025/07/12|Tender is the Flesh|Augustina Bazterrica|~~~<div class="Stars" style="--rating: 4;" aria-label="Rating of this book is 4 out of 5.">~~~||
|2025/07/22|Death in the Clouds|Agatha Christie|~~~<div class="Stars" style="--rating: 4;" aria-label="Rating of this book is 4 out of 5.">~~~||
|2025/08/11|Lord Edgeware Dies|Agatha Christie|~~~<div class="Stars" style="--rating: 3;" aria-label="Rating of this book is 3 out of 5.">~~~||
|2025/08/26|One Two Buckle My Shoe|Agatha Christie|~~~<div class="Stars" style="--rating: 4.25;" aria-label="Rating of this book is 4.25 out of 5.">~~~||
|2025/08/28|Gabriel's Inferno|Sylvain REynard|~~~<div class="Stars" style="--rating: 2.5;" aria-label="Rating of this book is 2.5 out of 5.">~~~||
|2025/09/13|Before We Forget Kindness|Toshikazu Kawaguchi|~~~<div class="Stars" style="--rating: 2;" aria-label="Rating of this book is 2 out of 5.">~~~||
|2025/09/19|Your Utopia|Bora Chung|~~~<div class="Stars" style="--rating: 3;" aria-label="Rating of this book is 3 out of 5.">~~~||
|2025/09/30|At Bertram's Hotel|Agatha Christie|~~~<div class="Stars" style="--rating: 4;" aria-label="Rating of this book is 4 out of 5.">~~~||
|2025/10/14|Katabasis|R. F. Kuang|~~~<div class="Stars" style="--rating: 4;" aria-label="Rating of this book is 4 out of 5.">~~~||
|2025/10/17|Peril at End House|Agatha Christie|~~~<div class="Stars" style="--rating: 5;" aria-label="Rating of this book is 5 out of 5.">~~~||
|2025/10/26|The housemaid|Frieda Mcfadden|~~~<div class="Stars" style="--rating: 4.5;" aria-label="Rating of this book is 4.5 out of 5.">~~~||
|2025/11/3|Tamas|Bhisham Sahni|~~~<div class="Stars" style="--rating: 5;" aria-label="Rating of this book is 5 out of 5.">~~~||
|2025/11/21|Firestarter|Stephen King|~~~<div class="Stars" style="--rating: 4;" aria-label="Rating of this book is 4 out of 5.">~~~||
|2025/11/27|Cat Among the Pigeons|Agatha Christie|~~~<div class="Stars" style="--rating: 3.5;" aria-label="Rating of this book is 3.5 out of 5.">~~~||
|2025/12/08|The Hungry Tide|Amitav Ghosh|~~~<div class="Stars" style="--rating: 4.5;" aria-label="Rating of this book is 4.5 out of 5.">~~~||
|2025/12/18|The Sittaford Mystery|Agatha Christie|~~~<div class="Stars" style="--rating: 4;" aria-label="Rating of this book is 4 out of 5.">~~~||
|2025/12/31|Jungle Nama: A story of the Sunderban|Amitav Ghosh|~~~<div class="Stars" style="--rating: 3.5;" aria-label="Rating of this book is 3.5 out of 5.">~~~||






|------|------|------|------|------|


## 2024

|Finished|Book Title|Author|Rating|Review|
|:-------------:|:------------:|-------|--------|------|
|6 February 2024|The Secret Adversary| Agatha Christie|~~~
<div class="Stars" style="--rating: 3.5;" aria-label="Rating of this book is 3.5 out of 5.">~~~|[link](/Blog/bookreviews/February24Books/)|
|20 February 2024|Midnigth Library| Matt Haig|~~~
<div class="Stars" style="--rating: 4;" aria-label="Rating of this book is 4 out of 5.">~~~|[link](/Blog/bookreviews/February24Books/)|
|24 February 2024|The Big Four| Agatha Christie|~~~
<div class="Stars" style="--rating: 2.75;" aria-label="Rating of this book is 2.75 out of 5.">~~~|[link](/Blog/bookreviews/February24Books/)|
|6 March 2024|The Forever War| Joe Haldeman|~~~
<div class="Stars" style="--rating: 4.5;" aria-label="Rating of this book is 4.5 out of 5.">~~~|------|
|14 March 2024|The Seven Dials Mystery| Agatha Christie|~~~
<div class="Stars" style="--rating: 3;" aria-label="Rating of this book is 3 out of 5.">~~~|------|
|20 March 2024|Before the Coffee Gets Cold| Toshikazu Kawaguchi|~~~
<div class="Stars" style="--rating: 3;" aria-label="Rating of this book is 3 out of 5.">~~~|------|
|6 April 2024|Pride and Prejudice| Jane Austen|~~~
<div class="Stars" style="--rating: 4.5;" aria-label="Rating of this book is 4.5 out of 5.">~~~|------|
|15 April 2024|Tales from the cafe| Toshikazu Kawaguchi|~~~
<div class="Stars" style="--rating: 2.5;" aria-label="Rating of this book is 2 out of 5.">~~~|------|
|30 April 2024|Before Your Memory Fades| Toshikazu Kawaguchi|~~~
<div class="Stars" style="--rating: 2.5;" aria-label="Rating of this book is 2.5 out of 5.">~~~|------|
|4 July 2024|Brazen: Rebel Ladies Who Rocked The World| Pénélope Bagieu|~~~
<div class="Stars" style="--rating: 5;" aria-label="Rating of this book is 5 out of 5.">~~~|------|
|5 July 2024|Before We Say Goodbye| Toshikazu Kawaguchi|~~~
<div class="Stars" style="--rating: 2.5;" aria-label="Rating of this book is 2.5 out of 5.">~~~|------|
|6 July 2024| I Want to Eat Your Pancreas| Yoru Sumino|~~~
<div class="Stars" style="--rating: 3;" aria-label="Rating of this book is 3 out of 5.">~~~|------|
|17 July 2024|White Nights| Fyodor Dostoevsky|~~~
<div class="Stars" style="--rating: 5;" aria-label="Rating of this book is 5 out of 5.">~~~|------|
|30 July 2024|The Girl from the Other Side: Siúil, a Rún Vol. 1 (Manga)| Nagabe|~~~
<div class="Stars" style="--rating: 4;" aria-label="Rating of this book is 4 out of 5.">~~~|------|
|31 July 2024|Amygdalatropolis| B.R. Yeager|~~~
<div class="Stars" style="--rating: 4.5;" aria-label="Rating of this book is 4.5 out of 5.">~~~|------|
|8 August 2024|Kindred| Octavia E. Butler|~~~
<div class="Stars" style="--rating: 4.5;" aria-label="Rating of this book is 4.5 out of 5.">~~~|[link](/Blog/bookreviews/Kindred/)|
|8 August 2024|The Girl from the Other Side: Siúil, a Rún Vol. 2-3 (Manga)| Nagabe|~~~
<div class="Stars" style="--rating: 4;" aria-label="Rating of this book is 4 out of 5.">~~~|------|
|15 August 2024|Prey| Michael Crichton|~~~
<div class="Stars" style="--rating: 5;" aria-label="Rating of this book is 5 out of 5.">~~~|------------|
|20 August 2024|The Girl from the Other Side: Siúil, a Rún Vol. 4-5 (Manga)| Nagabe|~~~
<div class="Stars" style="--rating: 4;" aria-label="Rating of this book is 4 out of 5.">~~~|------|
|2024/08/25|The Ballad of Songbirds and Snakes|Suzanne Collins|~~~<div class="Stars" style="--rating: 3.5;" aria-label="Rating of this book is 3.5 out of 5.">~~~|[link](/Blog/bookreviews/BalladOfSongbirds/)|
|2024/09/04|The Picture of Dorian Gray|Oscar Wilde|~~~<div class="Stars" style="--rating: 4.5;" aria-label="Rating of this book is 4.5 out of link5.">~~~|------
|2024/09/14|Solaris|Stanisław Lem|~~~<div class="Stars" style="--rating: 4;" aria-label="Rating of this book is 4 out of 5.">~~~|------|
|2024/09/23|The ABC Murders|Agatha Christie|~~~<div class="Stars" style="--rating: 4;" aria-label="Rating of this book is 4 out of 5.">~~~|------|
|2024/09/26|The Miraculous Journey of Edward Tulane|Kate DiCamillo|~~~<div class="Stars" style="--rating: 4.5;" aria-label="Rating of this book is 4.5 out of 5.">~~~|------|
|2024/10/21|Cursed Bunny|Bora Chung|~~~<div class="Stars" style="--rating: 4;" aria-label="Rating of this book is 4 out of 5.">~~~|------|
|2024/10/28|Rendezvous with Rama|Arthur C. Clarke|~~~<div class="Stars" style="--rating: 4;" aria-label="Rating of this book is 4 out of 5.">~~~|------|
|2024/11/06|Conversations with Friends|Sally Rooney|~~~<div class="Stars" style="--rating: 2.5;" aria-label="Rating of this book is 2.5 out of 5.">~~~|------|
|2024/12|The Last Bookshop in London|Madeline Martin|~~~<div class="Stars" style="--rating: 3.5;" aria-label="Rating of this book is  3.5 out of 5.">~~~|------|
|2024/12/26|The Mystery of the Blue Train|Agatha Christie|~~~<div class="Stars" style="--rating: 3.5;" aria-label="Rating of this book is 3.5 out of 5.">~~~|Although the suspects were obvious. Christie still managed-in the classic Poirot fashion- to twist the method of the madness just enough to keep me engrossed.|


## 2023

|Finished|Book Title|Author|Rating|Review|
|:-------------:|:------------:|-------|--------|------|
|January,  2023| Sad Cypress|Agatha Christie| ~~~
<div class="Stars" style="--rating: 3;" aria-label="Rating of this product is 3 out of 5.">
~~~|link|
|February, 2023| Murder in Mesopotamia| Agatha Christie| ~~~<div class="Stars" style="--rating: 3;" aria-label="Rating of this product is 3 out of 5.">~~~|link|
|March 26, 2023| Analogia | George Dyson |~~~<div class="Stars" style="--rating: 3.5;" aria-label="Rating of this product is 3.5 out of 5.">~~~|link|
|March, 2023 | Murder is Easy | Agatha Christie|~~~<div class="Stars" style="--rating: 5;" aria-label="Rating of this product is 5 out of 5.">~~~|link|
|April 2023 | The Mysterious Affair at Styles| Agatha Christie|~~~<div class="Stars" style="--rating: 4.5;" aria-label="Rating of this book is 4.5 out of 5.">~~~|link|
|April 2023 | Curtain, Poirot's Last Case | Agatha Christie|~~~<div class="Stars" style="--rating: 3.5;" aria-label="Rating of this book is 3.5 out of 5.">~~~|link|
|May 12, 2023| Your Name (Novelisation)| Makoto Shinkai|~~~<div class="Stars" style="--rating: 3;" aria-label="Rating of this book is 3 out of 5.">~~~|link|
|June, 2023| Cards on the Table|Agatha Christie|~~~<div class="Stars" style="--rating: 3.5;" aria-label="Rating of this book is 3.5 out of 5.">~~~|link|
|July, 2023| Evil Under the Sun|Agatha Christie|~~~<div class="Stars" style="--rating: 4;" aria-label="Rating of this book is 4 out of 5.">~~~||
|August, 2023|Elephants Can Remember|Agatha Christie|~~~<div class="Stars" style="--rating: 3.5;" aria-label="Rating of this book is 3.5 out of 5.">~~~||
|August 30, 2023| Jurassic Park| Michael Crichton|~~~<div class="Stars" style="--rating: 5;" aria-label="Rating of this book is 5 out of 5.">~~~|[link](/Blog/uncertainty/uncertainty/)|
|September, 2023|Appointment With Death| Agatha Christie|~~~<div class="Stars" style="--rating: 3.5;" aria-label="Rating of this book is 3.5 out of 5.">~~~|
|October, 2023|Muder on the Orient Express|Agatha Christie|~~~<div class="Stars" style="--rating: 4;" aria-label="Rating of this book is 4 out of 5.">~~~|[link](/Blog/bookreviews/ChristieAppointmentWithDeath/)|
|November 13, 2023| A Thouand Splendid Suns|Khaled Hosseini|~~~<div class="Stars" style="--rating: 5;" aria-label="Rating of this book is 5 out of 5.">~~~|[link](/Blog/bookreviews/AThousandSplendidSuns/)|
|November, 2023|Endless Night|Agatha Christie|~~~<div class="Stars" style="--rating: 3;" aria-label="Rating of this book is 3 out of 5.">~~~|[link](/Blog/bookreviews/EndlessNight/)|
|December 24, 2023| Sleeping Murder|Agatha Christie|~~~<div class="Stars" style="--rating: 3;" aria-label="Rating of this book is 3 out of 5.">~~~|[link](/Blog/bookreviews/SleepingMurder/)|
|--------|-------|-------|-------|------|


## 2022

|Finished|Book Title|Author|Rating|Review|
|:-------------:|:------------:|-------|--------|------|
|2022/01/24|進撃の巨人-Shingeki no Kyojin Attack on Titan (Manga)|Hajime Isayama|4|NA
|2022/02/09|Entangled Life: How Fungi Make Our Worlds, Change Our Minds & Shape Our Futures|Merlin Sheldrake|5|NA
|2022/03/16|Azaadi: Freedom. Fascism. Fiction|Arundhati Roy|4|NA
|2022/03/18|Our Mathematical Universe: My Quest for the Ultimate Nature of Reality|Max Tegmark|4|NA
|2022/04|Phase Transitions (Primers in Complex Systems, 3)|Ricard V. Solé|0|NA
|2022/05/28|Midnight’s Children|Salman Rushdie|4|NA
|2022/06/27|The Uninhabitable Earth: A Story of the Future|David Wallace-Wells|4|NA
|2022/07/20|Never Let Me Go|Kazuo Ishiguro|4|NA
|2022/08/08|Humble Pi: A Comedy of Maths Errors|Matt    Parker|0|NA
|2022/09/06|Normal People|Sally Rooney|4|NA
|2022/10/13|Where the Crawdads Sing|Delia Owens|2|N

## 2021


|Finished|Book Title|Author|Rating|Review|
|:-------------:|:------------:|-------|--------|------|
|2020/10/01|Chaos: Making a New Science|James Gleick|5|NA|
|2020/12/01|What If? Serious Scientific Answers to Absurd Hypothetical Questions|Randall Munroe|0|NA|
|2021/01/03|Chronicle of a Death Foretold|Gabriel García Márquez|4|NA|
|2021/01/10|The Mysterious Affair at Styles (Hercule Poirot, #1)|Agatha Christie|4|NA|
|2021/05/01|The God Delusion|Richard Dawkins|4|NA|
|2020/12/31|His Dark Materials (His Dark Materials #1-3)|Philip Pullman|5|NA|
|2021/01/23|Man’s Search for Meaning|Viktor E. Frankl|5|NA|
|2021/03/22|The Order of Time|Carlo Rovelli|5|NA|
|2021/04/02|Animal Farm: The Graphic Novel|Odyr|5|NA|
|2021/04/21|The Grand Design|Stephen Hawking|0|NA|
|2021/05/02|The Alchemist|Paulo Coelho|3|NA|
|2021/05/04|Fahrenheit 451|Ray Bradbury|5|NA|
|2021/05/08|Persepolis: The Story of a Childhood (Persepolis, #1)|Marjane Satrapi|5|NA|
|2021/05/14|The Kite Runner|Khaled Hosseini|5|NA|
|2021/05/29|Sapiens: A Brief History of Humankind|Yuval Noah Harari|4|NA|
|2021/07/08|Jonathan Livingston Seagull|Richard Bach|3|NA|
|2021/09/06|Homo Deus: A History of Tomorrow|Yuval Noah Harari|4|NA|
|2021/09/12|When We Cease to Understand the World|Benjamín Labatut|5|NA|


## TBR

|Book Title|Author|
|:------------:|-------|
|Chaos and Dynamical Systems (Primers in Complex Systems, 7)|David P. Feldman|
|A Life on Our Planet: My Witness Statement and a Vision for the Future|David Attenborough|
|The Immortal Life of Henrietta Lacks|Rebecca Skloot|
|Harlem Shuffle (Ray Carney, #1)|Colson Whitehead|
|Rock Paper Scissors|Alice Feeney|
|Beasts of a Little Land|Juhea Kim|
|Cloud Cuckoo Land|Anthony Doerr|
|Bewilderment|Richard Powers|
|Project Hail Mary|Andy Weir|
|Helgoland: Making Sense of the Quantum Revolution|Carlo Rovelli|
|Yellowface|R.F. Kuang|
|Homegoing|Yaa Gyasi|
|Otherlands|Thomas Halliday|
|Life As No One Knows It: The Physics of Life's Emergence|Sara Imari Walker|
|A Life on Our Planet: My Witness Statement and a Vision for the Future|David Attenborough|
|Gödel, Escher, Bach: an Eternal Golden Braid|Douglas R. Hofstadter|
|Bewilderment|Richard Powers|
|Tomorrow, and Tomorrow, and Tomorrow|Gabrielle Zevin|
|I Contain Multitudes: The Microbes Within Us and a Grander View of Life|Ed Yong|

## Comments

{{cusdis}}