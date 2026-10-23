/**
 * Module: Navigation
 * Quản lý Menu Mobile, Sticky Header, Scroll to Section & WCAG 2.2 Accessibility
 */

export function initNavigation() {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileClose = document.querySelector('.mobile-drawer-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const desktopLinks = document.querySelectorAll('.nav-link');

  // 1. Quản lý Header Sticky khi cuộn trang
  let lastScrollY = window.scrollY;
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (header) {
      if (currentScrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    lastScrollY = currentScrollY;
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mở / Đóng Drawer Mobile
  const openDrawer = () => {
    if (!mobileDrawer || !menuToggle || !mobileOverlay) return;
    mobileDrawer.classList.add('open');
    mobileOverlay.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Đưa focus vào nút đóng để người dùng bàn phím dễ thao tác
    if (mobileClose) {
      mobileClose.focus();
    }
  };

  const closeDrawer = () => {
    if (!mobileDrawer || !menuToggle || !mobileOverlay) return;
    mobileDrawer.classList.remove('open');
    mobileOverlay.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    menuToggle.focus();
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', closeDrawer);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeDrawer);
  }

  // Đóng bằng phím ESC (Tiêu chuẩn tiếp cận WCAG 2.2)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Tự động đóng drawer khi click vào link trong menu mobile
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // 3. Highlight menu item active theo vị trí scroll (Intersection Observer)
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          desktopLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else if (href.startsWith('#')) {
              link.classList.remove('active');
            }
          });
          mobileLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else if (href.startsWith('#')) {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  // 4. Chuyển đổi ngôn ngữ VN / EN (Visual Feedback)
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      langButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.textContent.trim();
      console.info(`[VinaKhang] Ngôn ngữ hiển thị đã đổi sang: ${lang}`);
    });
  });
}
