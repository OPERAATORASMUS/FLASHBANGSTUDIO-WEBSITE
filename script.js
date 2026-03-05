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

function initializeSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .logo a[href^="#"], .btn[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        
        // Smooth scroll with custom easing
        smoothScrollTo(targetPosition, 800);
      }
    });
  });
}

function smoothScrollTo(targetPosition, duration = 800) {
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let start = null;
  
  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };
  
  const animation = (currentTime) => {
    if (start === null) start = currentTime;
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);
    
    window.scrollTo(0, startPosition + distance * ease);
    
    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  };
  
  requestAnimationFrame(animation);
}

function initializeAnimationObserver() {
  const sections = document.querySelectorAll('.section');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
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
