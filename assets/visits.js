// Visits: a visit starts when a page opens more than 30 minutes after the last page was opened.
// On the home page, cards of listings dated after the start of the previous visit get the "Novo" badge.
(() => {
  const gap = 30 * 60 * 1000;
  let previous = null;
  try {
    const now = Date.now();
    const lastSeen = Number(localStorage.getItem('visits:last-seen'));
    if (!lastSeen) {
      localStorage.setItem('visits:current-start', String(now));
      localStorage.removeItem('visits:previous-start');
    } else if (now - lastSeen > gap) {
      localStorage.setItem('visits:previous-start', localStorage.getItem('visits:current-start') || String(lastSeen));
      localStorage.setItem('visits:current-start', String(now));
    }
    localStorage.setItem('visits:last-seen', String(now));
    previous = Number(localStorage.getItem('visits:previous-start')) || null;
  } catch (error) {
    return; // storage blocked: every visit counts as the first
  }
  if (previous === null) return;
  document.querySelectorAll('.listing-card').forEach(card => {
    const badge = card.querySelector('.new-badge');
    if (badge) badge.hidden = Number(card.dataset.date) * 1000 <= previous;
  });
})();
