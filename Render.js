/**
 * Rendering functions for the dashboard UI
 */

function renderMembers() {
  document.getElementById('memberList').innerHTML = members.slice(0, 3).map(rowHtml).join('');
  document.getElementById('membersFull').innerHTML = members.map(rowHtml).join('');
  document.getElementById('memberCount').textContent = '(' + statMembers + ')';
  document.getElementById('statMembers').textContent = statMembers;
}

function rowHtml(r, i) {
  const cls = i % 3 === 1 ? 'rose' : i % 3 === 2 ? 'amber' : '';
  return `<div class="member-row"><div class="member-avatar ${cls}">${r[0]}</div><div><div class="member-name">${r[1]}</div><div class="member-sub">${r[2]}</div></div><div class="plan">${r[3]}</div><span class="status ${r[5]}">${r[4]}</span><span class="more">•••</span></div>`;
}

function renderLeads() {
  document.getElementById('statEnquiries').textContent = statEnquiries;

  const dash = leads
    .slice(0, 3)
    .map(
      l => `
    <div class="lead"><div class="member-avatar">${l.name
        .split(' ')
        .map(w => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()}</div>
    <div class="lead-info"><strong>${l.name}</strong><span class="member-sub">${l.note}</span><div class="progress"><i style="width:${l.pct}%"></i></div></div>
    <span class="tag ${l.cls}">${l.tag}</span></div>`
    )
    .join('');

  document.getElementById('dashLeads').innerHTML = dash;

  const full =
    `<div class="session"><b class="time">NEW</b><div><strong>${leads.filter(l => l.tag === 'New').length} new enquiries</strong><span>Waiting on first follow-up</span></div><span class="tag">New</span></div>
    <div class="session"><b class="time">HOT</b><div><strong>${leads.filter(l => l.tag === 'Hot').length} hot leads</strong><span>Send a plan recommendation today</span></div><span class="tag hot">Action</span></div>` +
    leads
      .map(
        l => `
    <div class="session"><b class="time" style="font-size:9px">${l.tag.toUpperCase()}</b><div><strong>${l.name}</strong><span>${l.note}</span></div><b class="dots">${l.pct}%</b></div>`
      )
      .join('');

  document.getElementById('leadsPage').innerHTML = full;
}

function renderSchedule() {
  const dash = sessions
    .slice(0, 3)
    .map(
      s => `<div class="session"><b class="time">${s.time.replace(' ', '<br>')}</b><div><strong>${s.name}</strong><span>${s.trainer} · ${s.booked} booked</span></div><b class="dots">⋮</b></div>`
    )
    .join('');

  document.getElementById('dashSchedule').innerHTML = dash;
  document.getElementById('scheduleFull').innerHTML = sessions
    .map(
      s => `<div class="session"><b class="time">${s.time}</b><div><strong>${s.name}</strong><span>${s.trainer} · ${s.studio} · ${s.booked} booked</span></div><b class="dots">⋮</b></div>`
    )
    .join('');
}
