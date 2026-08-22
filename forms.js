/**
 * Form handling and submission logic
 */

/* ===================== ADD MEMBER ===================== */

function openAddMemberModal() {
  openModal(`
    <div class="modal-head"><h3>Add member</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <form onsubmit="submitAddMember(event)">
      <div class="field"><label>Full name</label><input id="mName" required /></div>
      <div class="field"><label>Phone</label><input id="mPhone" required /></div>
      <div class="field"><label>Email</label><input id="mEmail" type="email" /></div>
      <div class="field"><label>Plan</label>
        <select id="mPlan"><option>Unlimited</option><option>Annual</option><option>Core 8</option><option>Elite</option></select>
      </div>
      <div class="field"><label>Start date</label><input id="mDate" type="date" /></div>
      <div class="form-actions">
        <button type="button" class="btn-ghost" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn-submit">Add member</button>
      </div>
    </form>
  `);
}

function submitAddMember(e) {
  e.preventDefault();
  const name = document.getElementById('mName').value.trim();
  const plan = document.getElementById('mPlan').value;
  const initials = name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  members.unshift([
    initials,
    name,
    'Just joined · ' + document.getElementById('mPhone').value,
    plan,
    'Active',
    ''
  ]);

  statMembers++;
  renderMembers();
  closeModal();
  notify(name + ' added as a new member');
}

/* ===================== CREATE SESSION ===================== */

function openCreateSessionModal() {
  openModal(`
    <div class="modal-head"><h3>Create session</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <form onsubmit="submitCreateSession(event)">
      <div class="field"><label>Class name</label><input id="sName" required /></div>
      <div class="field"><label>Trainer</label><input id="sTrainer" required /></div>
      <div class="field"><label>Time</label><input id="sTime" type="time" required /></div>
      <div class="field"><label>Studio</label>
        <select id="sStudio"><option>Studio A</option><option>Studio B</option></select>
      </div>
      <div class="field"><label>Capacity</label><input id="sCap" type="number" min="1" value="20" required /></div>
      <div class="form-actions">
        <button type="button" class="btn-ghost" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn-submit">Create session</button>
      </div>
    </form>
  `);
}

function submitCreateSession(e) {
  e.preventDefault();
  const raw = document.getElementById('sTime').value;
  let [h, m] = raw.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  let h12 = h % 12;
  if (h12 === 0) h12 = 12;
  const time = String(h12).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ' ' + ampm;

  sessions.push({
    time,
    name: document.getElementById('sName').value.trim(),
    trainer: document.getElementById('sTrainer').value.trim(),
    studio: document.getElementById('sStudio').value,
    booked: '0/' + document.getElementById('sCap').value
  });

  renderSchedule();
  closeModal();
  notify('Session created');
}

/* ===================== ADD LEAD ===================== */

function openAddLeadModal() {
  openModal(`
    <div class="modal-head"><h3>Add lead</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <form onsubmit="submitAddLead(event)">
      <div class="field"><label>Full name</label><input id="lName" required /></div>
      <div class="field"><label>Source / note</label><input id="lNote" placeholder="e.g. Instagram enquiry" /></div>
      <div class="field"><label>Stage</label>
        <select id="lStage"><option value="New">New</option><option value="Warm">Warm</option><option value="Hot">Hot</option></select>
      </div>
      <div class="form-actions">
        <button type="button" class="btn-ghost" onclick="closeModal()">Cancel</button>
        <button type="submit" class="btn-submit">Add lead</button>
      </div>
    </form>
  `);
}

function submitAddLead(e) {
  e.preventDefault();
  const stage = document.getElementById('lStage').value;
  const pct = stage === 'Hot' ? 75 : stage === 'Warm' ? 45 : 15;

  leads.unshift({
    name: document.getElementById('lName').value.trim(),
    note: document.getElementById('lNote').value.trim() || 'New enquiry',
    pct,
    tag: stage,
    cls: stage === 'Hot' ? 'hot' : ''
  });

  statEnquiries++;
  renderLeads();
  closeModal();
  notify('Lead added to pipeline');
}

/* ===================== EXPORT CSV ===================== */

function exportCSV() {
  const header = ['Name', 'Status', 'Note', 'Plan'];
  const lines = [header.join(',')];

  members.forEach(r => {
    const row = [r[1], r[4], '"' + r[2].replace(/"/g, '""') + '"', r[3]];
    lines.push(row.join(','));
  });

  const csv = lines.join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'loop-studio-billing.csv';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  notify('CSV downloaded');
}

/* ===================== REPORTS ===================== */

function openReport(type) {
  if (type === 'revenue') {
    openModal(`
      <div class="modal-head"><h3>Monthly revenue report</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
      <div class="report-body">
        <p>August 2026 · Loop Studio, Vashi</p>
        <div class="report-stat"><span>Collected</span><b>₹3,64,000</b></div>
        <div class="report-stat"><span>Outstanding</span><b>₹19,200</b></div>
        <div class="report-stat"><span>Growth vs July</span><b>+9.8%</b></div>
        <div class="report-stat"><span>Renewals due</span><b>9</b></div>
      </div>
      <div class="form-actions"><button class="btn-submit" onclick="closeModal()">Close</button></div>
    `);
  } else {
    openModal(`
      <div class="modal-head"><h3>Member retention report</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
      <div class="report-body">
        <p>Rolling 30-day view · Loop Studio, Vashi</p>
        <div class="report-stat"><span>Active renewal rate</span><b>91%</b></div>
        <div class="report-stat"><span>Active members</span><b>${statMembers}</b></div>
        <div class="report-stat"><span>At-risk (10+ days inactive)</span><b>7</b></div>
        <div class="report-stat"><span>Churned this month</span><b>4</b></div>
      </div>
      <div class="form-actions"><button class="btn-submit" onclick="closeModal()">Close</button></div>
    `);
  }
}
