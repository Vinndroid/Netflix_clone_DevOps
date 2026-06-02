/* ============================================================
   NETFLIX CLONE — script.js
   Interactivity: search toggle, "My List" toggle on cards,
   hero button feedback, navbar scroll effect, and toast system
   ============================================================ */

(function () {
  'use strict';

  // ── DOM References ──────────────────────────────────────────
  const navbar       = document.getElementById('navbar');
  const searchToggle = document.getElementById('search-toggle');
  const searchInput  = document.getElementById('search-input');
  const btnPlay      = document.getElementById('btn-play');
  const btnMyList    = document.getElementById('btn-mylist');
  const toast        = document.getElementById('toast');

  // ── Toast Notification ──────────────────────────────────────
  let toastTimer = null;

  function showToast(message, duration = 2800) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // ── Navbar: darken on scroll ────────────────────────────────
  function handleNavScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ── Search Toggle ───────────────────────────────────────────
  let searchOpen = false;

  searchToggle.addEventListener('click', () => {
    searchOpen = !searchOpen;
    searchInput.classList.toggle('active', searchOpen);

    if (searchOpen) {
      searchInput.focus();
    } else {
      // If there's text, do a "search"
      const query = searchInput.value.trim();
      if (query.length > 0) {
        showToast(`🔍  Searching for "${query}"…`);
        searchInput.value = '';
      }
    }
  });

  // Submit search on Enter
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query.length > 0) {
        showToast(`🔍  Searching for "${query}"…`);
        searchInput.value = '';
        searchInput.classList.remove('active');
        searchOpen = false;
      }
    }
  });

  // Close search on outside click
  document.addEventListener('click', (e) => {
    if (searchOpen && !e.target.closest('.search-wrapper')) {
      searchInput.classList.remove('active');
      searchOpen = false;
    }
  });

  // ── Hero Buttons ────────────────────────────────────────────
  btnPlay.addEventListener('click', () => {
    showToast('▶  Now playing: Inferno Protocol');
  });

  let inMyList = false;
  btnMyList.addEventListener('click', () => {
    inMyList = !inMyList;
    if (inMyList) {
      btnMyList.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        Added
      `;
      showToast('✅  Added "Inferno Protocol" to My List');
    } else {
      btnMyList.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        My List
      `;
      showToast('❌  Removed "Inferno Protocol" from My List');
    }
  });

  // ── Movie Card Interactions ─────────────────────────────────
  // Play button on cards
  document.querySelectorAll('.movie-card__action-btn--play').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.movie-card');
      const title = card.dataset.title;
      showToast(`▶  Now playing: ${title}`);
    });
  });

  // Add-to-list toggle on cards
  document.querySelectorAll('.movie-card__action-btn--add').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('added');
      const card = btn.closest('.movie-card');
      const title = card.dataset.title;

      if (btn.classList.contains('added')) {
        // Switch icon to checkmark
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`;
        showToast(`✅  Added "${title}" to My List`);
      } else {
        // Switch icon back to plus
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
        showToast(`❌  Removed "${title}" from My List`);
      }
    });
  });

  // Clicking a card itself
  document.querySelectorAll('.movie-card').forEach((card) => {
    card.addEventListener('click', () => {
      const title = card.dataset.title;
      const genre = card.dataset.genre;
      showToast(`🎬  ${title} — ${genre}`);
    });
  });

  // ── Horizontal Scroll with Mouse Drag ───────────────────────
  document.querySelectorAll('.movie-row').forEach((row) => {
    let isDown = false;
    let startX;
    let scrollLeft;

    row.addEventListener('mousedown', (e) => {
      isDown = true;
      row.style.cursor = 'grabbing';
      startX = e.pageX - row.offsetLeft;
      scrollLeft = row.scrollLeft;
    });

    row.addEventListener('mouseleave', () => {
      isDown = false;
      row.style.cursor = '';
    });

    row.addEventListener('mouseup', () => {
      isDown = false;
      row.style.cursor = '';
    });

    row.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - row.offsetLeft;
      const walk = (x - startX) * 1.5;
      row.scrollLeft = scrollLeft - walk;
    });
  });

  // ── Profile click ───────────────────────────────────────────
  document.getElementById('profile-icon').addEventListener('click', () => {
    showToast('👤  Profile settings coming soon!');
  });

  // ── Initial log (proves script is linked) ───────────────────
  console.log('%c NETFLX Clone ', 'background:#e50914;color:#fff;font-size:14px;font-weight:bold;padding:4px 10px;border-radius:4px;', '— script.js loaded ✓');
})();
