/**
 * Modal dialog management
 */

function openModal(html) {
  document.getElementById('modalBody').innerHTML = html;
  document.getElementById('modalOverlay').classList.add('show');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('show');
}

// Close modal when clicking backdrop
document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.addEventListener('click', e => {
      if (e.target.id === 'modalOverlay') closeModal();
    });
  }
});
