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

  // 4. Thanh tìm kiếm sản phẩm thông minh (Header Search Bar)
  const searchForm = document.getElementById('header-search-form');
  const searchInput = document.getElementById('header-search-input');
  const searchDropdown = document.getElementById('search-results-dropdown');

  if (searchInput && searchDropdown) {
    const performSearch = (keyword) => {
      const q = keyword.trim().toLowerCase();
      if (!q) {
        searchDropdown.style.display = 'none';
        searchDropdown.innerHTML = '';
        return;
      }

      const products = window.PRODUCTS_DATA || [];
      const matches = products.filter((item) => {
        const title = (item.title || '').toLowerCase();
        const subtitle = (item.subtitle || '').toLowerCase();
        const definition = (item.definition || '').toLowerCase();
        const app = (item.application || '').toLowerCase();
        return title.includes(q) || subtitle.includes(q) || definition.includes(q) || app.includes(q);
      });

      if (matches.length === 0) {
        searchDropdown.innerHTML = `
          <div class="search-empty-msg">
            Không tìm thấy sản phẩm phù hợp với từ khóa "<strong>${keyword}</strong>"
          </div>
        `;
      } else {
        searchDropdown.innerHTML = matches.slice(0, 5).map((item) => `
          <div class="search-result-item" data-id="${item.id}" role="button" tabindex="0">
            <img src="${item.image || './img/logo-mark.png'}" alt="${item.title}" class="search-result-img" />
            <div class="search-result-info">
              <div class="search-result-title">${item.title} - ${item.subtitle || ''}</div>
              <div class="search-result-meta">
                <span>${item.code}</span> • <span>${item.origin}</span>
              </div>
            </div>
          </div>
        `).join('');

        // Bấm vào kết quả tìm kiếm để mở Modal chi tiết
        searchDropdown.querySelectorAll('.search-result-item').forEach((resItem) => {
          resItem.addEventListener('click', () => {
            const id = resItem.getAttribute('data-id');
            if (window.openProductModal) {
              window.openProductModal(id);
            }
            searchDropdown.style.display = 'none';
          });
        });
      }

      searchDropdown.style.display = 'block';
    };

    searchInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });

    searchInput.addEventListener('focus', (e) => {
      if (e.target.value.trim()) {
        performSearch(e.target.value);
      }
    });

    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = searchInput.value.trim();
        if (val) {
          searchDropdown.style.display = 'none';
          const productsSection = document.getElementById('products');
          if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    }

    // Đóng dropdown khi click bên ngoài hoặc bấm phím ESC
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header-search-wrap')) {
        searchDropdown.style.display = 'none';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchDropdown.style.display = 'none';
      }
    });
  }
}
