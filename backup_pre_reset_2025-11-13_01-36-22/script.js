// Consolidated script.js — single implementation to avoid duplicate declarations
// Provides: dark-mode toggle (persists as 'true'/'false'), section animations, header scroll effects, form submission handling, smooth scroll, and visual helpers.

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const html = document.documentElement;

  // ---- Dark mode toggle (create if missing) ----
  let darkBtn = document.getElementById('darkModeToggle');
  if (!darkBtn) {
    // If button doesn't exist in HTML, create one that matches your template
    darkBtn = document.createElement('button');
    darkBtn.id = 'darkModeToggle';
    darkBtn.className = 'dark-mode-btn';
    darkBtn.setAttribute('aria-label', 'Alternar modo');
    darkBtn.textContent = '🌙';
    document.body.appendChild(darkBtn);
  }

  // Accept legacy values ('enabled') and new boolean strings 'true'/'false'
  const stored = localStorage.getItem('darkMode');
  const isEnabled = stored === 'true' || stored === 'enabled';

  if (isEnabled) {
    body.classList.add('dark-mode');
    html.classList.add('dark-mode');
    darkBtn.textContent = '☀️';
    darkBtn.setAttribute('aria-pressed', 'true');
  } else {
    darkBtn.textContent = '🌙';
    darkBtn.setAttribute('aria-pressed', 'false');
  }

  darkBtn.addEventListener('click', () => {
    const now = body.classList.toggle('dark-mode');
    html.classList.toggle('dark-mode');
    // Persist as 'true'/'false' per your preference
    localStorage.setItem('darkMode', now ? 'true' : 'false');
    darkBtn.textContent = now ? '☀️' : '🌙';
    darkBtn.setAttribute('aria-pressed', now ? 'true' : 'false');

    try {
      darkBtn.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.15)' }, { transform: 'scale(1)' }],
        { duration: 220, easing: 'ease-out' }
      );
    } catch (e) { /* ignore if Web Animations API missing */ }
  });

  // ---- Section fade-up on intersect ----
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideUp 0.8s ease forwards';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    sectionObserver.observe(section);
  });

  // ---- Generic reveal observer for small elements ----
  const revealObserverOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, revealObserverOptions);

  document.querySelectorAll('.testimonial-card, .feature-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });

  // ---- Staggered scroll reveal (adds classes) ----
  const scrollRevealElements = document.querySelectorAll('.form, .about-content, .about-image, .testimonial-card, .feature-item, .contact-item, .contact-cta');
  const scrollRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          const animations = ['scroll-reveal', 'scroll-reveal-left', 'scroll-reveal-right', 'scroll-reveal-zoom', 'scroll-reveal-rotate'];
          const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
          entry.target.classList.add(randomAnimation, 'revealed');
        }, index * 100);
        scrollRevealObserver.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  scrollRevealElements.forEach(el => scrollRevealObserver.observe(el));

  // ---- Fade-in body on load ----
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    setTimeout(() => document.body.style.opacity = '1', 50);
  });

  // ---- Mobile menu toggle (safe guards) ----
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('nav');
  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      nav.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }

  // ---- Header scroll effect ----
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 100) {
        header.style.background = `rgba(255, 255, 255, ${Math.min(currentScroll / 500, 0.98)})`;
        header.style.boxShadow = `0 4px ${Math.min(currentScroll / 10, 20)}px rgba(0,0,0,0.15)`;
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      }

      const hero = document.querySelector('.hero');
      if (hero && currentScroll < window.innerHeight) hero.style.transform = `translateY(${currentScroll * 0.5}px)`;

      const sections = document.querySelectorAll('.about-section, .testimonials-section, .contact-section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
        if (scrollPercent > 0 && scrollPercent < 1) section.style.transform = `translateY(${scrollPercent * -20}px)`;
      });
    });
  }

  // ---- Form submission (AJAX) ----
  const recoveryForm = document.getElementById('recoveryForm');
  const formSuccess = document.getElementById('formSuccess');
  if (recoveryForm) {
    recoveryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(recoveryForm);
      try {
        await fetch('processa_form.php', { method: 'POST', body: formData });
        if (formSuccess) {
          recoveryForm.style.display = 'none';
          formSuccess.classList.add('show');
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        recoveryForm.reset();
      } catch (err) {
        console.error(err);
        alert('❌ Erro ao enviar o formulário. Tente novamente.');
      }
    });
  }

  // ---- Smooth anchor scrolling ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Progress bar ----
  const progressBar = document.createElement('div');
  progressBar.style.position = 'fixed';
  progressBar.style.top = '0';
  progressBar.style.left = '0';
  progressBar.style.height = '4px';
  progressBar.style.background = 'linear-gradient(90deg, var(--color-accent), var(--color-primary))';
  progressBar.style.zIndex = '9999';
  progressBar.style.transition = 'width 0.1s ease';
  document.body.appendChild(progressBar);
  window.addEventListener('scroll', () => {
    const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrollPercent + '%';
  });

  // ---- Hero title typewriter (safe) ----
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent || '';
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '3px solid var(--color-white)';
    heroTitle.style.whiteSpace = 'nowrap';
    heroTitle.style.overflow = 'hidden';
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      } else {
        heroTitle.style.borderRight = 'none';
        heroTitle.style.whiteSpace = 'normal';
      }
    };
    setTimeout(typeWriter, 1000);
  }

  // ---- Buttons magnetic / ripple (safe guards) ----
  document.querySelectorAll('.btn:not(.no-motion)').forEach(button => {
    button.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
    });
    button.addEventListener('mouseleave', function () { this.style.transform = ''; });
    button.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255,255,255,0.5)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s ease-out';
      ripple.style.pointerEvents = 'none';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ---- Testimonial card hover effects ----
  document.querySelectorAll('.testimonial-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animation = `fadeInUp 0.8s ease ${index * 0.2}s forwards`;
    card.addEventListener('mouseenter', function () { this.style.transition = 'all 0.4s cubic-bezier(0.175,0.885,0.32,1.275)'; });
    card.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left; const y = e.clientY - rect.top;
      const centerX = rect.width / 2; const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10; const rotateY = (centerX - x) / 10;
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', function () { this.style.transform = ''; });
  });

  // ---- Progressive reveal for paragraphs in About/Contact ----
  function revealParagraphText(p) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { p.style.opacity = '1'; return; }
    const text = p.textContent.trim(); if (!text) return; p.textContent = '';
    Array.from(text).forEach((ch, i) => {
      const span = document.createElement('span'); span.textContent = ch; span.style.opacity = '0'; span.style.whiteSpace = 'pre-wrap';
      p.appendChild(span); setTimeout(() => { span.style.transition = 'opacity 30ms linear'; span.style.opacity = '1'; }, i * 25);
    });
  }
  function setupSectionReveal(sectionSelector, paragraphSelector) {
    const section = document.querySelector(sectionSelector); if (!section) return;
    const sObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => { if (entry.isIntersecting) { section.querySelectorAll(paragraphSelector).forEach(p => revealParagraphText(p)); obs.unobserve(section); } });
    }, { threshold: 0.2, rootMargin: '0px 0px -20px 0px' });
    sObs.observe(section);
  }
  setupSectionReveal('.about-section', '.about-text p');
  setupSectionReveal('.contact-section', '.contact-description');

  // ---- Inject small helper styles used by runtime (avoid duplicating main CSS) ----
  const style = document.createElement('style');
  style.textContent = `@keyframes ripple { to { transform: scale(4); opacity: 0; } } @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`;
  document.head.appendChild(style);

  // ---- Images opacity transition on load ----
  document.querySelectorAll('img').forEach(img => {
    img.style.opacity = '0'; img.style.transition = 'opacity 0.6s ease';
    img.addEventListener('load', function () { this.style.opacity = '1'; }); if (img.complete) img.style.opacity = '1';
  });
});
