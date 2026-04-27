async function loadSections() {
  // Ensure we have a trailing slash for relative paths to work on GH Pages
  if (window.location.hostname.includes('github.io') && !window.location.pathname.endsWith('/')) {
    window.location.replace(window.location.href + '/');
    return;
  }

  const sections = [
    { id: 'sidebar-hook', file: 'sections/sidebar.html' },
    { id: 'mobile-menu-hook', file: 'sections/mobile-menu.html' },
    { id: 'navbar-hook', file: 'sections/navbar.html' },
    { id: 'hero-hook', file: 'sections/hero.html' },
    { id: 'about-hook', file: 'sections/about.html' },
    { id: 'skills-hook', file: 'sections/skills.html' },
    { id: 'experience-hook', file: 'sections/experience.html' },
    { id: 'projects-hook', file: 'sections/projects.html' },
    { id: 'achievements-hook', file: 'sections/achievements.html' },
    { id: 'certifications-hook', file: 'sections/certifications.html' },
    { id: 'reach-me-hook', file: 'sections/reach-me.html' },
    { id: 'footer-hook', file: 'sections/footer.html' }
  ];

  for (const section of sections) {
    try {
      const response = await fetch(section.file);
      if (!response.ok) throw new Error(`Failed to load ${section.file}`);
      const html = await response.text();
      const hook = document.getElementById(section.id);
      if (hook) {
        hook.outerHTML = html;
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Initialize features after sections are in DOM
  initAnimations();
  initNavScroll();
}

function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

function initNavScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { 
      if (window.scrollY >= s.offsetTop - 120) current = s.id; 
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
}

// Start loading
loadSections();
