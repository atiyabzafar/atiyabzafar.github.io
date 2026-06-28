~~~
<style>
  /* Centers the entire showcase on the page */
  .video-showcase {
    max-width: 1000px;
    margin: 3rem auto; 
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  /* Tab Styling */
  .video-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .video-tab {
    padding: 0.6rem 1.2rem;
    cursor: pointer;
    border: none;
    background: #f0f0f0;
    color: #444;
    border-radius: 6px;
    font-size: 0.95rem;
    font-weight: 600;
    transition: all 0.2s ease;
  }

  .video-tab:hover { background: #e4e4e4; color: #111; }
  .video-tab.active { background: #3b82f6; color: white; box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3); }

  /* Instructions Box */
  .video-instructions {
    background: #f8f9fa;
    border-left: 4px solid #3b82f6;
    padding: 1rem 1.2rem;
    margin-bottom: 1.5rem;
    border-radius: 0 8px 8px 0;
    width: 100%;
    font-size: 0.95rem;
    color: #555;
    line-height: 1.5;
  }
  .video-instructions p { margin: 0 0 0.5rem 0; }
  .video-instructions p:last-child { margin: 0; }
  .video-instructions strong { color: #222; }

  /* Video Player Container */
  .video-player-container {
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    background: #000; 
  }

  #sim-player {
    width: 100%;
    height: auto; 
    max-height: 80vh; 
    display: block;
    transition: opacity 0.3s ease; /* Smooth transition for loading state */
  }

  /* Dark Mode Support */
  @media (prefers-color-scheme: dark) {
    .video-tab { background: #333; color: #ddd; }
    .video-tab:hover { background: #444; color: #fff; }
    .video-tab.active { background: #60a5fa; color: #111; }
    .video-instructions { background: #1e1e1e; border-left-color: #60a5fa; color: #ccc; }
    .video-instructions strong { color: #fff; }
  }
</style>

<div class="video-showcase">
  <div class="video-tabs" id="sim-tabs">
    <button class="video-tab active" data-src="/assets/simulations/SandeepCollapseVersion5.webm">Collapse 1</button>
    <button class="video-tab" data-src="/assets/simulations/FullCollapseVersion5.webm">Collapse 2</button>
    <button class="video-tab" data-src="/assets/simulations/Animation_100_25.webm">Average Power Shift</button>
  </div>

  <div class="video-instructions">
    <p>Select <strong>Collapse 1</strong> and <strong>Collapse 2</strong> to see individual collapses and how the system evolves to reach collapse.</p>
    <p>Select <strong>Average Power Shift</strong> to see the average behaviour across multiple collapses.</p>
  </div>

  <div class="video-player-container">
    <video id="sim-player" controls autoplay muted loop playsinline preload="metadata">
      <source src="/assets/simulations/SandeepCollapseVersion5.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</div>

<script>
  (function(){
    /* Select the tabs and the video element */
    const tabs = document.querySelectorAll('.video-tab');
    const player = document.getElementById('sim-player');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        /* 1. Remove active state from all tabs */
        tabs.forEach(t => t.classList.remove('active'));
        
        /* 2. Add active state to the clicked tab */
        this.classList.add('active');
        
        /* 3. Get the new video URL */
        const newSrc = this.getAttribute('data-src');
        
        /* Only reload if clicking a different video */
        if (!player.src.endsWith(newSrc)) {
          /* Dim video to indicate loading */
          player.style.opacity = '0.5';
          
          player.src = newSrc;
          player.load();
          
          /* Restore brightness and play once loaded */
          player.addEventListener('canplay', function() {
             player.style.opacity = '1';
             player.play();
          }, { once: true });
        }
      });
    });
  })();
</script>
~~~