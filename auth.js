/**
 * Authentication module for Pulse Studio CRM
 */

function attemptLogin() {
  const u = document.getElementById('loginUser').value.trim().toLowerCase();
  const p = document.getElementById('loginPass').value;
  const match = credentials.find(c => c.user.toLowerCase() === u && c.pass === p);
  const err = document.getElementById('loginError');

  if (!match) {
    err.style.display = 'block';
    return;
  }

  err.style.display = 'none';
  currentUser = match;
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('appRoot').classList.add('show');

  const initials = match.display
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  document.getElementById('avatarBtn').textContent = initials;

  renderOwnerNav();
  notify('Signed in as ' + match.display + ' (' + match.role + ')');
}

function renderOwnerNav() {
  const nav = document.getElementById('mainNav');
  document.getElementById('accessNavBtn')?.remove();

  if (currentUser && currentUser.role === 'Owner') {
    const b = document.createElement('button');
    b.id = 'accessNavBtn';
    b.innerHTML = '<span class="ico">🔒</span><span>Login access</span>';
    b.onclick = openAccessModal;
    nav.appendChild(b);
  }
}

function openAccountModal() {
  if (!currentUser) return;

  openModal(`
    <div class="modal-head"><h3>Account</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <p style="color:var(--muted);font-size:12.5px;margin-top:-6px">Signed in as <b>${currentUser.display}</b> · ${currentUser.role}</p>
    <div class="form-actions">
      ${currentUser.role === 'Owner' ? '<button class="btn-ghost" onclick="closeModal();openAccessModal()">Login access</button>' : ''}
      <button class="btn-submit" onclick="logout()">Sign out</button>
    </div>
  `);
}

function logout() {
  closeModal();
  currentUser = null;
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('appRoot').classList.remove('show');
  document.getElementById('loginPass').value = '';
}

/* ===================== ACCESS / CREDENTIALS (owner only) ===================== */

function openAccessModal() {
  if (!currentUser || currentUser.role !== 'Owner') {
    notify('Only the studio owner can view login access');
    return;
  }
  renderAccessModal();
}

function renderAccessModal() {
  const rows = credentials
    .map(
      (c, i) => `
    <div class="cred-row">
      <div><b>${c.display}</b>${c.user} · ${'•'.repeat(Math.min(c.pass.length, 10))}</div>
      <span class="role-badge ${c.role === 'Owner' ? 'owner' : ''}">${c.role}</span>
    </div>`
    )
    .join('');

  openModal(`
    <div class="modal-head"><h3>Login access</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <p style="color:var(--muted);font-size:12.5px;margin-top:-8px">Visible to the studio owner only. Add a login for new front-desk staff.</p>
    <div style="margin:12px 0 18px">${rows}</div>
    <form onsubmit="addCredential(event)">
      <div class="field"><label>Staff name</label><input id="credName" required /></div>
      <div class="field"><label>Username</label><input id="credUser" required /></div>
      <div class="field"><label>Password</label><input id="credPass" type="text" required /></div>
      <div class="field"><label>Role</label>
        <select id="credRole"><option value="Staff">Staff</option><option value="Owner">Owner</option></select>
      </div>
      <div class="form-actions">
        <button type="button" class="btn-ghost" onclick="closeModal()">Close</button>
        <button type="submit" class="btn-submit">Add login</button>
      </div>
    </form>
  `);
}

function addCredential(e) {
  e.preventDefault();
  const user = document.getElementById('credUser').value.trim();

  if (credentials.some(c => c.user.toLowerCase() === user.toLowerCase())) {
    notify('That username already exists');
    return;
  }

  credentials.push({
    user,
    pass: document.getElementById('credPass').value,
    role: document.getElementById('credRole').value,
    display: document.getElementById('credName').value.trim()
  });

  notify('Login added for ' + user);
  renderAccessModal();
}
