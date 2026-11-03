(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Project filters
  const buttons = document.querySelectorAll('.filters button');
  const projects = document.querySelectorAll('.project');
  buttons.forEach(btn => btn.addEventListener('click', () => {
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    const f = btn.dataset.filter;
    projects.forEach(p => {
      const show = f === 'all' || p.dataset.cat.split(' ').includes(f);
      p.hidden = !show;
    });
  }));

  const grid = document.getElementById('project-grid');
  buttons.forEach(btn => btn.addEventListener('click', () => grid.classList.toggle('filtered', btn.dataset.filter !== 'all')));

  // Compare slider
  const cmp = document.querySelector('.cmp');
  const range = cmp && cmp.querySelector('.cmp-range');
  if (range) range.addEventListener('input', () => cmp.style.setProperty('--p', range.value + '%'));

  // Header shadow on scroll
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  // Lightbox
  const lb = document.querySelector('.lightbox');
  const lbImg = lb.querySelector('img');
  const lbCap = lb.querySelector('p');
  let lastFocus = null;
  const close = () => {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  };
  document.querySelectorAll('.p-thumb').forEach(b => b.addEventListener('click', () => {
    lastFocus = b;
    lbImg.src = b.dataset.img;
    lbImg.alt = b.dataset.title || '';
    lbCap.textContent = b.dataset.title || '';
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lb.querySelector('.lightbox-close').focus();
  }));
  lb.querySelector('.lightbox-close').addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && lb.classList.contains('open')) close(); });

  // Contact form -> opens the visitor's email app (no server needed)
  const form = document.getElementById('contact-form');
  const note = document.getElementById('form-note');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const name = (d.get('name') || '').toString().trim();
    const msg = (d.get('msg') || '').toString().trim();
    if (!name || !msg) { note.textContent = 'لطفاً نام و توضیح کوتاه را وارد کنید.'; return; }
    const subject = encodeURIComponent('درخواست مشاوره: ' + d.get('type'));
    const body = encodeURIComponent('نام: ' + name + '\nنوع پروژه: ' + d.get('type') + '\n\n' + msg);
    note.textContent = 'برنامه ایمیل شما باز می‌شود.';
    window.location.href = 'mailto:hello@example.com?subject=' + subject + '&body=' + body;
  });
})();
