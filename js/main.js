// ===== THEME =====
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  const btn = document.querySelector('.theme-toggle');
  if (btn) btn.textContent = isDark ? '☀️' : '🌙';
}

function applyTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.body.classList.add('dark');
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = '☀️';
  }
}

// ===== TOAST =====
function showToast(message, type = 'info', duration = 3000) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = message;
  document.body.appendChild(t);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => t.classList.add('show'));
  });
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 350);
  }, duration);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

// ===== LOGOUT =====
function logout() {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('userName');
  window.location.href = 'landing.html';
}

// ===== USER NAV STATE =====
function updateNavForUser() {
  const name = localStorage.getItem('userName');
  const loginBtn = document.getElementById('nav-login');
  const signupBtn = document.getElementById('nav-signup');
  const logoutBtn = document.getElementById('nav-logout');
  const greeting = document.getElementById('nav-greeting');

  if (name) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (signupBtn) signupBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'inline-flex';
    if (greeting) {
      greeting.textContent = `Hi, ${name.split(' ')[0]} 👋`;
      greeting.style.display = 'inline-block';
    }
  } else {
    if (loginBtn) loginBtn.style.display = 'inline-flex';
    if (signupBtn) signupBtn.style.display = 'inline-flex';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (greeting) greeting.style.display = 'none';
  }
}

// Run on every page
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  initScrollAnimations();
  updateNavForUser();
});
