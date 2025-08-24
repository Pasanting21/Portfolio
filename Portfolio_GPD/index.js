// --- Smooth Scrolling for Navigation ---
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- Dark Mode Toggle Button ---
function createDarkModeToggle() {
  const btn = document.createElement('button');
  btn.className = 'dark-mode-toggle';
  btn.title = 'Toggle dark mode';
  btn.innerHTML = '<span class="icon">🌙</span>';
  Object.assign(btn.style, {
    position: 'absolute',
    right: '2rem',
    top: '2rem',
    background: '#4f8cff',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '2.5rem',
    height: '2.5rem',
    fontSize: '1.3rem',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    transition: 'background 0.3s',
    zIndex: 100
  });
  return btn;
}

const darkModeBtn = createDarkModeToggle();
document.querySelector('header').appendChild(darkModeBtn);

function setDarkMode(on) {
  document.body.classList.toggle('dark-mode', on);
  darkModeBtn.innerHTML = `<span class="icon">${on ? '☀️' : '🌙'}</span>`;
  darkModeBtn.title = on ? 'Switch to light mode' : 'Switch to dark mode';
  localStorage.setItem('darkMode', on ? '1' : '0');
}

// Load dark mode preference
setDarkMode(localStorage.getItem('darkMode') === '1');

darkModeBtn.addEventListener('click', () => {
  setDarkMode(!document.body.classList.contains('dark-mode'));
});

// --- Dynamic Year in Footer ---
const footer = document.querySelector('footer');
if (footer) {
  footer.innerHTML = footer.innerHTML.replace(/20\d{2}/, new Date().getFullYear());
}

// --- Highlight Nav Link on Scroll ---
function highlightNavOnScroll() {
  const sections = document.querySelectorAll('section');
  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    const navLink = document.querySelector(`nav a[href="#${sec.id}"]`);
    if (
      navLink &&
      sec.offsetTop <= scrollPos &&
      sec.offsetTop + sec.offsetHeight > scrollPos
    ) {
      navLink.classList.add('active');
    } else if (navLink) {
      navLink.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', highlightNavOnScroll);
highlightNavOnScroll(); // Initial call

// --- Optional: Add fade-in effect on scroll for sections ---
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('section').forEach(sec => {
  sec.classList.add('fade-section');
  observer.observe(sec);
});