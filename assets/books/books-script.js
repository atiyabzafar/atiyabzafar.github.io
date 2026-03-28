(function() {
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
      
      // Render initial view (Read This Year)
      renderView('year');
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