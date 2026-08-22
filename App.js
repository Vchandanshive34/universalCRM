/**
 * Main application logic for Pulse Studio CRM
 */

function showView(view) {
  document.querySelectorAll('.tab-page').forEach(x => x.classList.toggle('active', x.id === view));
  document.querySelectorAll('[data-view]').forEach(x => x.classList.toggle('active', x.dataset.view === view));

  const names = {
    dashboard: 'Morning, Meera',
    members: 'Members',
    leads: 'Pipeline',
    schedule: 'Sessions',
    payments: 'Billing',
    reports: 'Insights'
  };

  document.getElementById('pageTitle').textContent = names[view];
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function notify(message) {
  const t = document.getElementById('toast');
  t.textContent = message;
  t.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

function searchMembers(value) {
  if (value.trim()) {
    showView('members');
    const q = value.toLowerCase();
    document.getElementById('membersFull').querySelectorAll('.member-row').forEach(r => {
      r.style.display = r.textContent.toLowerCase().includes(q) ? 'grid' : 'none';
    });
  }
}

// Navigation click handler
document.addEventListener('click', e => {
  const b = e.target.closest('[data-view]');
  if (b) showView(b.dataset.view);
});

// Initialize the app on load
document.addEventListener('DOMContentLoaded', function() {
  renderMembers();
  renderLeads();
  renderSchedule();
});
