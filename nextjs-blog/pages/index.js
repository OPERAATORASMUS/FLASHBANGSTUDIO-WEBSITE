import { useState, useEffect } from 'react';
import Head from 'next/head';
import { translations } from '../lib/translations';

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Get saved language or default to English
    const savedLang = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLang);
    document.documentElement.lang = savedLang;

    // Initialize intersection observer for animations
    initializeAnimationObserver();

    // Initialize smooth scrolling
    initializeSmoothScroll();
  }, []);

  const setLanguage = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  };

  const initializeAnimationObserver = () => {
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
  };

  const initializeSmoothScroll = () => {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .logo a[href^="#"], .btn[href^="#"]');

    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          const navHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetSection.offsetTop - navHeight;

          smoothScrollTo(targetPosition, 800);
        }
      });
    });
  };

  const smoothScrollTo = (targetPosition, duration = 800) => {
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
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('no-scroll');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('no-scroll');
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
  };

  const t = (key) => translations[currentLanguage]?.[key] || key;

  return (
    <div>
      <Head>
        <title>{t('page_title')}</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Syncopate:wght@700&family=Inter:wght@400;600;900&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
          <a href="#hero">
            <img src="/seljale.png" alt="Flashbang Studio Logo" />
          </a>
        </div>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#meist" onClick={closeMenu}>{t('nav_about')}</a></li>
          <li><a href="#portfoolio" onClick={closeMenu}>{t('nav_portfolio')}</a></li>
          <li><a href="#galerii" onClick={closeMenu}>{t('nav_gallery')}</a></li>
          <li><a href="#kontakt" onClick={closeMenu}>{t('nav_contact')}</a></li>
        </ul>
        <div className="language-switcher">
          <button
            className={`lang-btn ${currentLanguage === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
          >
            EN
          </button>
          <button
            className={`lang-btn ${currentLanguage === 'et' ? 'active' : ''}`}
            onClick={() => setLanguage('et')}
          >
            ET
          </button>
        </div>
        <div className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="hero" className="hero-section">
        <div className="hero-content">
          <h1 className="glitch" data-text="FLASHBANG">FLASHBANG</h1>
          <h1 className="glitch outline" data-text="STUDIO">STUDIO</h1>
          <p>{t('hero_tagline')}</p>
          <a href="#portfoolio" className="btn">{t('hero_button')}</a>
        </div>
      </header>

      {/* About Section */}
      <section id="meist" className="section dark">
        <div className="container layout-split">
          <div className="text-content">
            <h2>{t('about_title')}</h2>
            <p>{t('about_text_1')}</p>
            <p>{t('about_text_2')}</p>
          </div>
          <div className="image-content border-img">
            <div
              className="placeholder-img"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfoolio" className="section light">
        <div className="container">
          <h2 className="text-black">{t('portfolio_title')}</h2>
          <div className="grid portfolio-grid">
            <div className="grid-item">
              <div className="item-overlay">
                <h3>{t('project_alpha_title')}</h3>
                <span>{t('project_alpha_type')}</span>
              </div>
            </div>
            <div className="grid-item">
              <div className="item-overlay">
                <h3>{t('project_flight_title')}</h3>
                <span>{t('project_flight_type')}</span>
              </div>
            </div>
            <div className="grid-item">
              <div className="item-overlay">
                <h3>{t('project_brand_title')}</h3>
                <span>{t('project_brand_type')}</span>
              </div>
            </div>
            <div className="grid-item">
              <div className="item-overlay">
                <h3>{t('project_speed_title')}</h3>
                <span>{t('project_speed_type')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galerii" className="section dark">
        <div className="container">
          <h2>{t('gallery_title')}</h2>
          <p className="subtitle">{t('gallery_subtitle')}</p>
          <div className="grid gallery-grid">
            <div className="gallery-item placeholder-bg-1"></div>
            <div className="gallery-item placeholder-bg-2"></div>
            <div className="gallery-item placeholder-bg-3"></div>
            <div className="gallery-item placeholder-bg-4"></div>
            <div className="gallery-item placeholder-bg-5"></div>
            <div className="gallery-item placeholder-bg-6"></div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="section light">
        <div className="container text-center">
          <h2 className="text-black">{t('contact_title')}</h2>
          <p className="text-black">{t('contact_text')}</p>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <input
              type="text"
              placeholder={t('contact_name_placeholder')}
              required
            />
            <input
              type="email"
              placeholder={t('contact_email_placeholder')}
              required
            />
            <textarea
              rows="5"
              placeholder={t('contact_description_placeholder')}
              required
            ></textarea>
            <button type="submit" className="btn btn-black">{t('contact_button')}</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <img src="/rinnale.png" alt="Flashbang Studio" className="footer-logo" />
          <div className="social-links">
            <a href="#">INSTAGRAM</a>
            <a href="#">VIMEO</a>
            <a href="#">YOUTUBE</a>
          </div>
          <p>{t('footer_copyright')}</p>
        </div>
      </footer>
    </div>
  );
}
