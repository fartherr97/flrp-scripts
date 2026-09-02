(function () {
  const res = (typeof GetParentResourceName === 'function') ? GetParentResourceName() : 'chat';
  const messagesEl = document.getElementById('messages');
  const inputWrap = document.getElementById('inputWrap');
  const inputEl = document.getElementById('input');
  const sugEl = document.getElementById('suggestions');

  const suggestions = {}; // name -> {name, help}
  let fadeTimer = null;

  function post(name, data) {
    return fetch(`https://${res}/${name}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data || {}),
    }).catch(() => {});
  }

  // ---- message rendering ----------------------------------------------------
  function scheduleFade() {
    if (fadeTimer) clearTimeout(fadeTimer);
    messagesEl.classList.remove('faded');
    fadeTimer = setTimeout(() => {
      if (inputWrap.classList.contains('hidden')) messagesEl.classList.add('faded');
    }, 12000);
  }

  function addMessage(m) {
    m = m || {};
    const el = document.createElement('div');
    el.className = 'msg';
    const color = Array.isArray(m.color) ? `rgb(${m.color[0]},${m.color[1]},${m.color[2]})` : null;
    const args = Array.isArray(m.args) ? m.args.slice() : [String(m.message || '')];

    // Convention: first arg is the sender name, the rest is the body.
    if (args.length > 1) {
      const name = document.createElement('span');
      name.className = 'name';
      name.textContent = args.shift();
      if (color) name.style.color = color;
      el.appendChild(name);
    }
    el.appendChild(document.createTextNode(args.join(' ')));

    messagesEl.appendChild(el);
    while (messagesEl.children.length > 60) messagesEl.removeChild(messagesEl.firstChild);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    scheduleFade();
  }

  // ---- suggestions ----------------------------------------------------------
  function renderSuggestions() {
    const val = inputEl.value.trim();
    if (!val.startsWith('/') || val.length < 2) { sugEl.classList.add('hidden'); return; }
    const q = val.toLowerCase();
    const matches = Object.values(suggestions)
      .filter(s => s.name.toLowerCase().startsWith(q))
      .slice(0, 6);
    if (!matches.length) { sugEl.classList.add('hidden'); return; }
    sugEl.innerHTML = '';
    matches.forEach(s => {
      const row = document.createElement('div');
      row.className = 'sug';
      const c = document.createElement('span'); c.className = 'cmd'; c.textContent = s.name;
      const h = document.createElement('span'); h.className = 'help'; h.textContent = s.help || '';
      row.appendChild(c); row.appendChild(h);
      sugEl.appendChild(row);
    });
    sugEl.classList.remove('hidden');
  }

  // ---- open / close ---------------------------------------------------------
  function open(prefill) {
    inputEl.value = prefill || '';
    inputWrap.classList.remove('hidden');
    messagesEl.classList.remove('faded');
    if (fadeTimer) clearTimeout(fadeTimer);
    setTimeout(() => inputEl.focus(), 0);
    renderSuggestions();
  }

  function close(send) {
    const message = send ? inputEl.value.trim() : '';
    inputWrap.classList.add('hidden');
    sugEl.classList.add('hidden');
    inputEl.value = '';
    scheduleFade();
    post('sent', { message });
  }

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); close(true); }
    else if (e.key === 'Escape') { e.preventDefault(); inputWrap.classList.add('hidden'); sugEl.classList.add('hidden'); inputEl.value = ''; post('closed', {}); }
  });
  inputEl.addEventListener('input', renderSuggestions);

  // ---- messages from the game -----------------------------------------------
  window.addEventListener('message', (ev) => {
    const d = ev.data || {};
    switch (d.type) {
      case 'OPEN': open(d.prefill); break;
      case 'MESSAGE': addMessage(d.message); break;
      case 'SUGGEST_ADD':
        if (d.suggestion && d.suggestion.name) suggestions[d.suggestion.name] = d.suggestion;
        break;
      case 'SUGGEST_REMOVE': delete suggestions[d.name]; break;
      case 'CLEAR': messagesEl.innerHTML = ''; break;
    }
  });
})();
