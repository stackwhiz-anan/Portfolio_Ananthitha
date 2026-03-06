// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(l =>
  l.addEventListener('click', () => navLinks.classList.remove('open'))
);

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// Certificate upload & lightbox
function triggerCertUpload(inputId, title) {
  const input = document.getElementById(inputId);
  if (input.dataset.src) {
    openLightbox(input.dataset.src, title);
  } else {
    input.click();
  }
}

function showCert(input, title) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    input.dataset.src = ev.target.result;
    const btn = input.previousElementSibling;
    btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg> View Credential`;
    openLightbox(ev.target.result, title);
  };
  reader.readAsDataURL(file);
}

function openLightbox(src, title) {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxTitle').textContent = title;
  document.getElementById('certLightbox').classList.add('active');
}

function closeLightbox(e) {
  if (e.target === document.getElementById('certLightbox')) {
    document.getElementById('certLightbox').classList.remove('active');
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('certLightbox').classList.remove('active');
  }
});

// Contact form
function handleSubmit() {
  const name = document.getElementById('cname').value.trim();
  const email = document.getElementById('cemail').value.trim();
  const message = document.getElementById('cmessage').value.trim();
  if (!name || !email || !message) {
    alert('Please fill in Name, Email, and Message.');
    return;
  }
  const btn = document.querySelector('.form-submit');
  btn.textContent = '✓ Message Sent!';
  btn.style.background = 'var(--accent)';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = 'Send Message <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/></svg>';
    btn.style.background = 'var(--ink)';
    btn.disabled = false;
    ['cname', 'cemail', 'csubject', 'cmessage'].forEach(id => {
      document.getElementById(id).value = '';
    });
  }, 3000);
}