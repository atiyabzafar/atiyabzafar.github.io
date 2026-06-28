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

  .video-tab:hover {
    background: #e4e4e4;
    color: #111;
  }

  .video-tab.active {
    background: #3b82f6; /* Blue active state */
    color: white;
    box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
  }

/* Video Player Container */
  .video-player-container {
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    background: #000; 
    /* Removed aspect-ratio so the box adapts to the video */
  }

  #sim-player {
    width: 100%;
    height: auto; /* Lets the video dictate its own height */
    max-height: 80vh; /* Prevents ultra-tall videos from taking up the whole screen */
    display: block;
    /* Removed object-fit: cover */
  }

  /* Dark Mode Support */
  @media (prefers-color-scheme: dark) {
    .video-tab { background: #333; color: #ddd; }
    .video-tab:hover { background: #444; color: #fff; }
    .video-tab.active { background: #60a5fa; color: #111; }
  }
</style>

<div class="video-showcase">
  <div class="video-tabs" id="sim-tabs">
    <button class="video-tab active" data-src="/assets/simulations/SandeepCollapseVersion5.mp4">Collapse 1</button>
    <button class="video-tab" data-src="/assets/simulations/FullCollapseVersion5.mp4">Collapse 2</button>
    <button class="video-tab" data-src="/assets/simulations/Animation_100_25.mp4">Average Power Shift</button>
  </div>

  <div class="video-player-container">
    <video id="sim-player" controls autoplay muted loop playsinline>
      <source src="/assets/simulations/FullCollapseVersion5.mp4" type="video/mp4">
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
        
        /* 3. Get the new video URL and update the player */
        const newSrc = this.getAttribute('data-src');
        
        /* Only reload if clicking a different video */
        if (!player.src.endsWith(newSrc)) {
          player.src = newSrc;
          player.load();
          player.play();
        }
      });
    });
  })();
</script>
~~~