// Get saved language or default to English
let currentLanguage = localStorage.getItem('language') || 'en';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Set initial language
  setLanguage(currentLanguage);
  
  // Add event listeners to language buttons
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(button => {
    button.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
  
  // Initialize intersection observer for animations
  initializeAnimationObserver();
  
  // Initialize smooth scrolling for navbar links
  initializeSmoothScroll();
  
  // Setup mobile menu toggle if present
  initializeMobileMenu();
});

function initializeAnimationObserver() {
  const sections = document.querySelectorAll('.section');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered animation delay for smoother cascade effect
        entry.target.style.animationDelay = (index * 0.1) + 's';
        entry.target.style.animation = 'fadeInUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });
}


function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // Update all elements with data-i18n attribute
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      if (element.tagName === 'TITLE') {
        element.textContent = translations[lang][key];
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });
  
  // Update elements with data-i18n-placeholder attribute
  const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });
  
  // Update active button
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(button => {
    button.classList.remove('active');
    if (button.getAttribute('data-lang') === lang) {
      button.classList.add('active');
    }
  });
  
  // Update copyright year automatically
  const copyrightElement = document.querySelector('[data-i18n="footer_copyright"]');
  if (copyrightElement) {
    const currentYear = new Date().getFullYear();
    const text = copyrightElement.textContent;
    const updatedText = text.replace(/\d{4}/, currentYear);
    copyrightElement.textContent = updatedText;
  }
}

// Mobile menu toggle logic
function initializeMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!menuToggle || !navLinks) return;

  const closeMenu = () => {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('open');
    document.body.classList.remove('no-scroll');
  };

  menuToggle.addEventListener('click', () => {
    const opening = !navLinks.classList.contains('active');
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('open');
    if (opening) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  });

  // hide menu when link clicked so it collapses on navigation
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}
