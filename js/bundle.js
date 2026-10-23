/**
 * UNIVERSAL BUNDLE - VINA KHANG WEBSITE
 * Tự động đồng bộ từ các module: navigation, slider, product-filter, form-validator
 */
(function() {
  /**
 * Module: Navigation
 * Quản lý Menu Mobile, Sticky Header, Scroll to Section & WCAG 2.2 Accessibility
 */

function initNavigation() {
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


  /**
 * Module: Slider
 * Khởi tạo Swiper.js cho Hero Carousel tự động chuyển slide liên tục và mượt mà
 */

function initHeroSlider() {
  const swiperContainer = document.querySelector('.hero-swiper');
  if (!swiperContainer) return;

  const slides = swiperContainer.querySelectorAll('.swiper-slide');
  if (slides.length <= 1) return;

  // 1. Nếu có thư viện Swiper.js
  if (typeof Swiper !== 'undefined') {
    const heroSwiper = new Swiper('.hero-swiper', {
      loop: true,
      speed: 750,
      autoplay: {
        delay: 3800, // Tự động chuyển trang sau mỗi 3.8 giây
        disableOnInteraction: false, // Tiếp tục tự động chạy sau khi người dùng bấm nút
      },
      grabCursor: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      pagination: {
        el: '.hero-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return `<button class="${className}" aria-label="Chuyển đến slide ${index + 1}"></button>`;
        }
      },
      navigation: {
        nextEl: '.hero-btn-next',
        prevEl: '.hero-btn-prev',
      },
      a11y: {
        prevSlideMessage: 'Slide trước đó',
        nextSlideMessage: 'Slide tiếp theo',
        firstSlideMessage: 'Đây là slide đầu tiên',
        lastSlideMessage: 'Đây là slide cuối cùng',
        paginationBulletMessage: 'Chuyển đến slide {{index}}',
      }
    });

    // Kích hoạt đảm bảo autoplay chạy
    if (heroSwiper.autoplay && typeof heroSwiper.autoplay.start === 'function') {
      heroSwiper.autoplay.start();
    }

    return heroSwiper;
  } else {
    // 2. Chế độ Fallback tự động chuyển slide thuần JS (dành cho chế độ offline hoặc khi CDN chưa kịp tải)
    let currentIdx = 0;
    const totalSlides = slides.length;
    const prevBtn = document.querySelector('.hero-btn-prev');
    const nextBtn = document.querySelector('.hero-btn-next');

    slides.forEach((s, idx) => {
      s.style.transition = 'opacity 0.7s ease, visibility 0.7s ease';
      if (idx === 0) {
        s.style.opacity = '1';
        s.style.visibility = 'visible';
        s.style.position = 'relative';
      } else {
        s.style.opacity = '0';
        s.style.visibility = 'hidden';
        s.style.position = 'absolute';
        s.style.top = '0';
        s.style.left = '0';
        s.style.width = '100%';
        s.style.height = '100%';
      }
    });

    function showSlide(idx) {
      slides.forEach((s, i) => {
        if (i === idx) {
          s.style.opacity = '1';
          s.style.visibility = 'visible';
          s.style.zIndex = '2';
        } else {
          s.style.opacity = '0';
          s.style.visibility = 'hidden';
          s.style.zIndex = '1';
        }
      });
      currentIdx = idx;
    }

    function nextSlide() {
      showSlide((currentIdx + 1) % totalSlides);
    }

    function prevSlide() {
      showSlide((currentIdx - 1 + totalSlides) % totalSlides);
    }

    // Tự động chuyển trang sau mỗi 3.8s
    let autoTimer = setInterval(nextSlide, 3800);

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        clearInterval(autoTimer);
        nextSlide();
        autoTimer = setInterval(nextSlide, 3800);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        clearInterval(autoTimer);
        prevSlide();
        autoTimer = setInterval(nextSlide, 3800);
      });
    }
  }
}


  /**
 * Module: Product Filter & Detail Modal
 * Quản lý kho dữ liệu sản phẩm chuẩn Sitemap Vina Khang:
 * [Định nghĩa sản phẩm, Thông số kỹ thuật, Tính năng, Ứng dụng, Hình ảnh thực tế]
 */

const PRODUCTS_DATA = [
  {
    id: 1,
    code: '#01',
    category: 'tape',
    origin: 'TRCN: Thổ Nhĩ Kỳ / China',
    originType: 'cn',
    isPremium: false,
    title: 'Băng Keo Chịu Nhiệt',
    subtitle: 'Tiêu Chuẩn',
    image: './img/products/bang-keo-chieu-nhiet-tieu-chuan.jpg',
    definition: 'Băng keo chịu nhiệt PTFE tiêu chuẩn là sự kết hợp giữa màng sợi thủy tinh ngâm tẩm polytetrafluoroethylene (Teflon) và lớp keo dán silicone chịu nhiệt cao chuyên dụng, bề mặt trơn láng chống bám dính tuyệt hảo và cách điện xuất sắc.',
    features: [
      'Bề mặt phủ PTFE chống dính tuyệt đối, dễ dàng lau sạch keo, nhựa nóng chảy bám dính.',
      'Lớp keo dán Silicone chịu nhiệt độ cao, bám dính siêu chắc, khi bóc ra không để lại vết keo dơ.',
      'Hệ số ma sát cực thấp, chịu mài mòn cao trong các chu kỳ ép nhiệt dán túi liên tục.',
      'Kháng tuyệt đối các loại dung môi hữu cơ, axit, kiềm và dầu mỡ công nghiệp.'
    ],
    application: 'Sử dụng rộng rãi trên thanh gia nhiệt máy đóng gói bao bì, máy hàn ép túi PE/PP màng co nhiệt, máy hút chân không thực phẩm, máy ép nhiệt ngành may và bọc bảo vệ con lăn sấy.',
    specs: {
      width: '13mm, 19mm, 25mm, 30mm, 40mm, 50mm, 60mm... (Cắt theo yêu cầu)',
      length: '10m / cuộn chuẩn',
      thickness: '0.13mm, 0.18mm',
      temp: '-73°C đến 260°C',
      glue: 'Keo Silicone chịu nhiệt chuyên dụng (Pressure Sensitive)',
      color: 'Nâu hổ phách tiêu chuẩn'
    },
    moreSpecsCount: 2
  },
  {
    id: 2,
    code: '#02',
    category: 'tape',
    origin: 'JP: Nhật Bản',
    originType: 'jp',
    isPremium: true,
    title: 'Băng Keo Chịu Nhiệt',
    subtitle: 'Cao Cấp — Nitto Denko',
    image: './img/products/bang-keo-nitto-denko.jpg',
    definition: 'Băng dính Teflon cao cấp chính hãng Nitto Denko (Nhật Bản) các model danh tiếng No.903UL / No.973UL-S đạt chuẩn quốc tế UL510 Flammability, chống cháy cấp H, độ bền kéo cơ học và độ bền nhiệt đỉnh cao.',
    features: [
      'Đạt chứng nhận chống cháy quốc tế khắt khe UL510 Flammability (Cách điện Cấp H).',
      'Lớp màng Teflon đồng nhất tuyệt đối không bọt khí, tuổi thọ gấp 3-4 lần băng thông thường.',
      'Độ bền kéo đứt và chống xé rách cực cao khi vận hành liên tục 24/7 ở nhiệt độ lên tới 280°C.',
      'Bảo vệ an toàn cho các bo mạch vi xử lý nhạy cảm và công đoạn hàn thiếc sóng nhiệt.'
    ],
    application: 'Dây chuyền sản xuất pin lithium, bo mạch điện tử, máy dán mép túi tự động tốc độ cao, máy ép nhiệt may mặc cao cấp xuất khẩu sang thị trường Nhật Bản và Châu Âu.',
    specs: {
      width: '13mm, 19mm, 25mm, 30mm, 40mm, 50mm, 60mm... (Cắt theo yêu cầu)',
      length: '10m / cuộn chuẩn',
      thickness: '0.08mm, 0.13mm (No.903UL / No.973UL-S)',
      temp: '-73°C đến 280°C',
      glue: 'Keo Silicone hữu cơ siêu dính Nitto Denko',
      color: 'Nâu cánh gián đậm chuẩn Nitto Japan'
    },
    moreSpecsCount: 2
  },
  {
    id: 3,
    code: '#03',
    category: 'tape',
    origin: 'TRCN: Thổ Nhĩ Kỳ / China',
    originType: 'cn',
    isPremium: false,
    title: 'Băng Keo Chịu Nhiệt',
    subtitle: 'Vải Chịu Nhiệt Có Keo',
    image: './img/products/bang-keo-vai-chieu-nhiet-co-keo.jpg',
    definition: 'Vải sợi thủy tinh dệt gia cường phủ nhựa PTFE chịu nhiệt được tráng sẵn một mặt keo dính silicone (kèm lớp giấy bảo vệ màu vàng), tăng cường độ chịu lực kéo cơ học và chống rách thủng vượt bậc.',
    features: [
      'Độ bền kéo đứt cực lớn nhờ lớp vải dệt thủy tinh cốt lõi gia cường chắc chắn.',
      'Khả năng chống cắt và chống thủng cơ học vượt trội hơn hẳn so with màng film mỏng.',
      'Khổ rộng tới 1m, dễ dàng dán phủ phẳng lên bàn ép hoặc trục lăn lớn.'
    ],
    application: 'Lót máy ép nhiệt màng nhựa PVC, máy dán túi bóng ép nhiệt liên tục, bọc bảo vệ con lăn sấy in hoa vải, băng chuyền nhiệt độ cao.',
    specs: {
      width: '1m (Có thể cắt xẻ bản rộng theo kích thước yêu cầu)',
      length: '10m - 50m / cuộn',
      thickness: '0.13mm, 0.18mm',
      temp: '-73 đến 260°C',
      glue: 'Keo Silicone chịu nhiệt có màng bóc bảo vệ vàng',
      color: 'Nâu sẫm vân sợi thủy tinh dệt'
    },
    moreSpecsCount: 1
  },
  {
    id: 4,
    code: '#04',
    category: 'fabric',
    origin: 'Nhập Khẩu Chính Hãng',
    originType: 'de',
    isPremium: true,
    title: 'Vải Teflon Chịu Nhiệt',
    subtitle: 'PTFE Trơn Láng Không Keo',
    image: './img/products/vai-teflon-chieu-nhiet-cuon.jpg',
    gallery: [
      './img/products/vai-teflon-chieu-nhiet-cuon.jpg',
      './img/products/vai-teflon-chieu-nhiet-trai.jpg',
      './img/products/vai-teflon-chieu-nhiet-tam.jpg',
      './img/products/vai-teflon-chieu-nhiet-kho.jpg'
    ],
    definition: 'Vải sợi thủy tinh dệt cao cấp được phủ đều lớp nhựa huỳnh quang PTFE (Teflon) nguyên chất trên cả hai mặt, bề mặt phẳng mịn trơn láng bóng bẩy, khả năng chịu nhiệt cực cao và hoàn toàn không bám dính bất kỳ loại keo hay nhựa nào.',
    features: [
      'Bề mặt phủ PTFE trơn láng bóng mịn tuyệt đối, hệ số ma sát siêu thấp, chống bám dính 100% mọi chất keo/nhựa.',
      'Chịu nhiệt độ làm việc liên tục từ -73°C đến 260°C (nhiệt đỉnh 300°C), không bắt lửa, chống cháy lan an toàn.',
      'Đạt chuẩn an toàn tiếp xúc thực phẩm trực tiếp (FDA Approved), không mùi vị, không độc hại ở nhiệt độ cao.',
      'Kháng hoàn toàn hóa chất ăn mòn, axit, kiềm mạnh và dầu mỡ công nghiệp, bề mặt cực kỳ dễ lau chùi.'
    ],
    application: 'Tấm lót nướng bánh kẹo và thực phẩm công nghiệp, màng chống dính máy hàn ép nhiệt bao bì màng nhựa, tấm lót ép keo mex may mặc, rèm chắn lò sấy hồng ngoại UV, lớp phủ cách ly ép gỗ laminate và ép nhiệt composite.',
    specs: {
      width: '1m, 1.2m, 1.25m, 1.5m (Cắt tấm phẳng hoặc nguyên cuộn)',
      length: '50m / cuộn hoặc cắt mét dài theo quy cách',
      thickness: '0.08mm, 0.13mm, 0.18mm, 0.25mm, 0.35mm',
      temp: '-73°C đến 260°C (chịu đỉnh 300°C)',
      glue: 'Không keo (Trơn láng bóng 2 mặt)',
      color: 'Nâu cánh gián / Nâu hổ phách bóng mịn'
    },
    moreSpecsCount: 2
  },
  {
    id: 5,
    code: '#05',
    category: 'fabric',
    origin: 'TRCN: Thổ Nhĩ Kỳ / China',
    originType: 'cn',
    isPremium: true,
    title: 'Vải Chịu Nhiệt',
    subtitle: 'Có Vân (Textured Weave)',
    image: './img/products/vai-chieu-nhiet-co-van.jpg',
    definition: 'Vải sợi thủy tinh phủ PTFE có vân (Textured / Embossed PTFE Fabric) dệt từ cốt sợi thủy tinh chất lượng cao với cấu trúc vân ô dệt nổi rõ rệt trên bề mặt, tráng phủ lớp Fluoropolymer chống dính, giúp thoát khí và thoát ẩm tuyệt đối khi ép nhiệt.',
    features: [
      'Bề mặt dập nổi vân ô dệt sợi thủy tinh giúp thoát khí cực tốt, ngăn ngừa bọt khí phồng rộp khi ép nhiệt.',
      'Cốt sợi thủy tinh dệt gia cường chịu lực xé, lực kéo căng và độ bền đâm thủng cơ học vượt bậc.',
      'Khả năng chịu nhiệt bền bỉ từ -73°C đến 260°C (nhiệt đỉnh 300°C), không bắt lửa, chống cháy hoàn toàn.',
      'Kháng 100% dung môi hóa chất ăn mòn, axit, kiềm và các chất tẩy rửa công nghiệp.'
    ],
    application: 'Tấm màng tách khuôn (Release sheet) ép composite sợi carbon, lót bàn ép nhiệt may mặc chống đọng hơi nước, lót lò sấy nông sản thực phẩm cần thoát ẩm bề mặt.',
    specs: {
      width: '1m, 1.2m, 1.25m, 1.5m (Cắt mét dài theo yêu cầu)',
      length: '50m / cuộn chuẩn',
      thickness: '0.13mm, 0.18mm, 0.25mm, 0.35mm',
      temp: '-73°C đến 260°C',
      glue: 'Không keo, bề mặt vân nổi thoáng khí',
      color: 'Trắng ngà / Kem sáng tự nhiên'
    },
    moreSpecsCount: 2
  },
  {
    id: 6,
    code: '#06',
    category: 'conveyor',
    origin: 'Gia Công May Mép Đột Khuy',
    originType: 'cn',
    isPremium: true,
    title: 'Băng Tải Máy Ép Keo',
    subtitle: 'PTFE Fusing Machine Belt',
    image: './img/products/bang-tai-may-ep-keo.jpg',
    gallery: ['./img/products/bang-tai-may-ep-keo.jpg', './img/products/bang-tai-ep-lien-mach.jpg'],
    definition: 'Băng tải máy ép keo PTFE (PTFE Fusing Machine Belt) chuyên dùng trong ngành may mặc, dán ép mex cổ áo, nẹp áo và thân áo. Được sản xuất từ vải sợi thủy tinh cường lực ngâm phủ nhựa Teflon chống dính tuyệt đối, chịu nhiệt độ cao liên tục, hai mép được may viền vải gia cố và bấm khuy định hướng chống chạy lệch băng.',
    features: [
      'Gia công chuẩn xác theo chu vi, bản rộng và cấu hình mọi dòng máy ép keo (Hashima, Oshima, Meyer, Kannegiesser...).',
      'Bề mặt chống bám dính keo mex tuyệt hảo, vệ sinh lau chùi dễ dàng, không gây ố bẩn vải.',
      'Mép băng may viền vải chịu nhiệt cao cấp, dập khuy mắt cáo dẫn hướng chính xác, chống tưa rách mép.',
      'Độ co giãn cực thấp, chịu lực kéo căng lớn và nhiệt độ làm việc liên tục lên đến 260°C.'
    ],
    application: 'Trang bị trên các dòng máy ép keo mex cổ áo, bo tay, nẹp áo sơ mi, áo vest, lò ép nhiệt phẳng và máy sấy ngành dệt may thời trang xuất khẩu.',
    specs: {
      width: 'Khổ chuẩn: 300mm, 400mm, 450mm, 500mm, 600mm, 900mm, 1000mm, 1200mm... (Cắt theo máy)',
      length: 'Chu vi gia công chính xác theo model máy khách hàng (1800mm, 2400mm, 3100mm...)',
      thickness: '0.25mm, 0.35mm, 0.45mm',
      temp: '-73°C đến 260°C (chịu đỉnh 300°C)',
      glue: 'Không keo, phủ PTFE chống dính 2 mặt',
      color: 'Màu đen chống tĩnh điện / Màu nâu hổ phách'
    },
    moreSpecsCount: 2
  },
  {
    id: 7,
    code: '#07',
    category: 'belt',
    origin: 'Đúc Liền Mạch Không Mối Nối',
    originType: 'cn',
    isPremium: true,
    title: 'Dây Đai / Băng Tải Liền Mạch',
    subtitle: 'Đúc Liền Vòng Không Mối Nối (Seamless)',
    image: './img/products/bang-tai-ep-lien-mach.jpg',
    gallery: ['./img/products/bang-tai-ep-lien-mach.jpg', './img/products/bang-tai-may-ep-keo.jpg'],
    definition: 'Dây đai / băng tải máy ép keo đúc liền mạch (Seamless Belt) được dệt tròn liền khối hoàn toàn không có mối dán nối hay răng lược. Sau đó được phủ tráng lớp nhựa PTFE nguyên chất, giúp loại bỏ triệt để tình trạng cộm mép dán, hằn dấu lên nẹp áo may mặc hay đứt gãy khớp nối.',
    features: [
      'Công nghệ dệt liền khối 100% không mối nối, bề mặt phẳng tuyệt đối, tạo đường ép phẳng mịn hoàn hảo trên vải may cao cấp.',
      'Tuổi thọ sử dụng cao gấp 3-4 lần so với băng tải dán đầu thông thường, không lo bong mối nối khi chạy liên tục.',
      'Độ ổn định động học xuất sắc, vận hành êm ái trên trục xoay tốc độ cao không rung lắc.',
      'Pha hạt carbon chống tĩnh điện, ngăn ngừa bám bụi xơ vải may mặc.'
    ],
    application: 'Máy ép keo liên tục ngành may mặc thời trang xuất khẩu, máy hàn miệng túi dán mép bao bì cao cấp tự động, máy ép nhiệt đóng gói kín.',
    specs: {
      width: 'Bản rộng từ 15mm đến 1200mm theo mọi quy cách máy',
      length: 'Chu vi từ 750mm đến 3500mm (chuẩn máy may công nghiệp)',
      thickness: '0.20mm, 0.25mm, 0.35mm',
      temp: '-73°C đến 260°C',
      glue: 'Đúc liền vòng tròn Seamless 360°',
      color: 'Đen chống tĩnh điện (Anti-static Black)'
    },
    moreSpecsCount: 2
  },
  {
    id: 8,
    code: '#08',
    category: 'fabric',
    origin: 'Chống Tĩnh Điện - Carbon Đen',
    originType: 'cn',
    isPremium: false,
    title: 'Vải Chịu Nhiệt',
    subtitle: 'Teflon Chống Tĩnh Điện (Anti-Static)',
    definition: 'Vải Teflon màu đen đặc biệt được pha thêm các hạt carbon dẫn điện giúp phân tán điện tích tĩnh điện phát sinh do ma sát trong môi trường nhiệt khô.',
    features: [
      'Điện trở bề mặt được kiểm soát ngăn ngừa phóng tia lửa điện.',
      'Bảo vệ an toàn tuyệt đối cho linh kiện điện tử nhạy cảm.',
      'Khả năng chịu nhiệt và chống dính giữ nguyên phẩm chất cao của PTFE.'
    ],
    application: 'Sản xuất linh kiện bán dẫn, lắp ráp thiết bị điện tử, băng chuyền vận chuyển bụi bột dễ cháy nổ.',
    specs: {
      width: 'Khổ 1m, 1.25m',
      length: '50m / cuộn',
      thickness: '0.13mm, 0.18mm, 0.25mm',
      temp: '-73 đến 260°C',
      glue: 'Chống tĩnh điện bề mặt',
      color: 'Đen nhám Carbon'
    },
    moreSpecsCount: 2
  },
  {
    id: 9,
    code: '#09',
    category: 'filter',
    origin: 'Lò Hơi & Luyện Kim',
    originType: 'cn',
    isPremium: false,
    title: 'Túi Lọc Bụi PTFE',
    subtitle: 'Chịu Nhiệt Độ Cao 260°C',
    definition: 'Túi lọc bụi may từ nỉ không dệt 100% sợi PTFE kim cương, màng lọc xốp siêu vi xử lý khói thải lò đốt chứa khí axit và nhiệt độ cực cao.',
    features: [
      'Chịu nhiệt độ làm việc liên tục lên đến 260°C.',
      'Kháng 100% tất cả các loại axit mạnh SOx, NOx và hơi ẩm bão hòa.',
      'Bề mặt trơn láng rũ bụi dễ dàng, giảm chênh áp buồng lọc bụi.'
    ],
    application: 'Lò đốt rác công nghiệp y tế, nhà máy nhiệt điện than, luyện kim đúc cán thép, nhà máy sản xuất xi măng hóa chất.',
    specs: {
      width: 'Đường kính D130mm, D160mm... (May theo bản vẽ)',
      length: 'Chiều dài 1m - 6m theo yêu cầu',
      thickness: 'Định lượng 500g - 800g/m²',
      temp: 'Chịu nhiệt liên tục 260°C',
      glue: 'May viền chỉ PTFE chịu nhiệt',
      color: 'Trắng đục hoặc xám ngà'
    },
    moreSpecsCount: 2
  }
];

function renderProductCard(product) {
  return `
    <article class="product-card" data-category="${product.category}" data-id="${product.id}">
      <div class="product-card-top">
        <span class="product-code-num">${product.code}</span>
        <div class="product-badge-group">
          ${product.isPremium ? '<span class="badge-premium">Cao Cấp</span>' : ''}
          <span class="badge-origin-pill">${product.origin}</span>
        </div>
      </div>

      <div class="product-card-media open-detail-btn" data-id="${product.id}" title="Click xem chi tiết ${product.title} - ${product.subtitle}">
        ${product.image ? `
          <img src="${product.image}" alt="${product.title} - ${product.subtitle}" class="product-img-real" loading="lazy">
          <div class="product-img-overlay">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"></path>
            </svg>
            <span>Xem chi tiết</span>
          </div>
        ` : `
          <div class="product-placeholder-box">
            <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor"></rect>
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"></circle>
              <polyline points="21 15 16 10 5 21" stroke="currentColor"></polyline>
            </svg>
            <span class="placeholder-text">Hình sản phẩm</span>
          </div>
        `}
      </div>

      <div class="product-card-body">
        <div class="product-title-group">
          <h3 class="product-main-title">
            <a href="javascript:void(0)" class="open-detail-link" data-id="${product.id}">${product.title}</a>
          </h3>
          <div class="product-sub-title">${product.subtitle || ''}</div>
        </div>

        <ul class="product-specs-list" aria-label="Thông số kỹ thuật">
          <li class="product-spec-bullet">
            <span class="orange-dot"></span>
            <span>Khổ chuẩn: ${product.specs.width}</span>
          </li>
          ${product.specs.length ? `
          <li class="product-spec-bullet">
            <span class="orange-dot"></span>
            <span>Chiều dài cuộn: ${product.specs.length}</span>
          </li>` : ''}
          <li class="product-spec-bullet">
            <span class="orange-dot"></span>
            <span>Độ dày: ${product.specs.thickness}</span>
          </li>
          ${product.specs.temp && product.id >= 3 ? `
          <li class="product-spec-bullet">
            <span class="orange-dot"></span>
            <span>Chịu được nhiệt độ: ${product.specs.temp}</span>
          </li>` : ''}
        </ul>

        <div class="product-card-footer">
          <button type="button" class="product-more-link open-detail-btn" data-id="${product.id}" title="Xem định nghĩa, tính năng và ứng dụng chi tiết">+${product.moreSpecsCount} thông số khác</button>
          <button type="button" class="product-arrow-btn open-detail-btn" data-id="${product.id}" aria-label="Xem chi tiết ${product.title} - ${product.subtitle}">
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `;
}

// Modal Xem Chi Tiết 5 Yếu Tố Chuẩn Sitemap
function openProductModal(productId) {
  const modalBackdrop = document.querySelector('#product-modal');
  if (!modalBackdrop) return;

  const product = PRODUCTS_DATA.find(p => p.id === parseInt(productId, 10));
  if (!product) return;

  const modalMedia = modalBackdrop.querySelector('#modal-media-box');
  const modalTitle = modalBackdrop.querySelector('#modal-title');
  const modalSubtitle = modalBackdrop.querySelector('#modal-subtitle');
  const modalCode = modalBackdrop.querySelector('#modal-code');
  const modalPremium = modalBackdrop.querySelector('#modal-premium');
  const modalOrigin = modalBackdrop.querySelector('#modal-origin');
  const modalDefinition = modalBackdrop.querySelector('#modal-definition');
  const modalFeatures = modalBackdrop.querySelector('#modal-features');
  const modalSpecsTable = modalBackdrop.querySelector('#modal-specs-table');
  const modalApplication = modalBackdrop.querySelector('#modal-application');
  const modalQuoteBtn = modalBackdrop.querySelector('#modal-quote-btn');

  modalTitle.textContent = product.title;
  if (modalSubtitle) modalSubtitle.textContent = product.subtitle || '';
  if (modalCode) modalCode.textContent = product.code;

  if (modalPremium) {
    modalPremium.style.display = product.isPremium ? 'inline-flex' : 'none';
  }

  if (modalOrigin) {
    modalOrigin.textContent = product.origin;
  }

  // Render ảnh thực tế chất lượng cao & Gallery
  if (product.image) {
    const hasGallery = product.gallery && product.gallery.length > 1;
    modalMedia.innerHTML = `
      <div class="modal-real-img-wrap">
        <img id="modal-main-img" src="${product.image}" alt="${product.title} - ${product.subtitle}" class="modal-real-img" />
        <span class="modal-img-badge">Ảnh sản phẩm thực tế kho Vina Khang</span>
      </div>
      ${hasGallery ? `
        <div class="modal-gallery-row">
          ${product.gallery.map((imgSrc, idx) => `
            <button type="button" class="modal-thumb-btn ${imgSrc === product.image ? 'active' : ''}" data-src="${imgSrc}" aria-label="Xem ảnh ${idx + 1}">
              <img src="${imgSrc}" alt="Ảnh ${idx + 1}" />
            </button>
          `).join('')}
        </div>
      ` : ''}
    `;

    if (hasGallery) {
      const thumbs = modalMedia.querySelectorAll('.modal-thumb-btn');
      thumbs.forEach(btn => {
        btn.addEventListener('click', () => {
          const targetSrc = btn.getAttribute('data-src');
          const mainImg = modalMedia.querySelector('#modal-main-img');
          if (mainImg && targetSrc) {
            mainImg.src = targetSrc;
            thumbs.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
          }
        });
      });
    }
  } else {
    modalMedia.innerHTML = `
      <div class="product-placeholder-box" style="height: 100%; border-radius: 12px; background: #F1F5F9;">
        <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor"></rect>
          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"></circle>
          <polyline points="21 15 16 10 5 21" stroke="currentColor"></polyline>
        </svg>
        <span class="placeholder-text">${product.title} (${product.subtitle})</span>
      </div>
    `;
  }

  modalDefinition.textContent = product.definition;
  modalApplication.textContent = product.application;

  // Render bảng thông số chi tiết
  if (modalSpecsTable) {
    const specsItems = [
      { label: 'Khổ chuẩn', val: product.specs.width },
      { label: 'Chiều dài cuộn', val: product.specs.length },
      { label: 'Độ dày vật liệu', val: product.specs.thickness },
      { label: 'Dải nhiệt độ chịu đựng', val: product.specs.temp },
      { label: 'Chất kết dính / Cấu tạo', val: product.specs.glue },
      { label: 'Màu sắc đặc trưng', val: product.specs.color }
    ].filter(item => item.val);

    modalSpecsTable.innerHTML = specsItems.map(item => `
      <div class="modal-spec-row">
        <span class="spec-label">${item.label}:</span>
        <span class="spec-value">${item.val}</span>
      </div>
    `).join('');
  }

  // Render danh sách tính năng nổi bật
  modalFeatures.innerHTML = product.features.map(f => `
    <li class="modal-feature-item">
      <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
      <span>${f}</span>
    </li>
  `).join('');

  // Nút Báo Giá Sản Phẩm Này: Tự động cuộn đến Form và chọn trước sản phẩm
  if (modalQuoteBtn) {
    modalQuoteBtn.onclick = () => {
      closeProductModal();
      const formSection = document.querySelector('#cta');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
      }
      const categorySelect = document.querySelector('#client-product-category');
      if (categorySelect) {
        categorySelect.value = product.category;
      }
      const noteInput = document.querySelector('#client-note');
      if (noteInput) {
        noteInput.value = `[Yêu cầu báo giá]: ${product.code} - ${product.title} (${product.subtitle}). Số lượng: ...`;
        noteInput.focus();
      }
    };
  }

  modalBackdrop.classList.add('active');
  modalBackdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const closeBtn = modalBackdrop.querySelector('.modal-close');
  if (closeBtn) closeBtn.focus();
}

// Expose globally
if (typeof window !== 'undefined') {
  window.PRODUCTS_DATA = PRODUCTS_DATA;
  window.openProductModal = openProductModal;
  window.closeProductModal = closeProductModal;
}

function closeProductModal() {
  const modalBackdrop = document.querySelector('#product-modal');
  if (!modalBackdrop) return;
  modalBackdrop.classList.remove('active');
  modalBackdrop.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initProductFilter() {
  const tabList = document.querySelector('.tab-list');
  const productGrid = document.querySelector('#product-grid-container');
  const loadMoreWrap = document.querySelector('#product-load-more-wrap');
  const loadMoreBtn = document.querySelector('#load-more-products-btn');

  if (!tabList || !productGrid) return;

  const INITIAL_LIMIT = 8;
  let currentFilter = 'all';
  let isExpanded = false;

  const updateLoadMoreButton = (totalCount) => {
    if (!loadMoreWrap || !loadMoreBtn) return;

    if (totalCount > INITIAL_LIMIT) {
      loadMoreWrap.style.display = 'flex';
      const textEl = loadMoreBtn.querySelector('.load-more-text');
      const countEl = loadMoreBtn.querySelector('.load-more-count');

      if (isExpanded) {
        loadMoreBtn.classList.add('is-expanded');
        loadMoreBtn.setAttribute('aria-expanded', 'true');
        if (textEl) textEl.textContent = 'Thu Gọn Danh Sách';
        if (countEl) countEl.textContent = '';
      } else {
        loadMoreBtn.classList.remove('is-expanded');
        loadMoreBtn.setAttribute('aria-expanded', 'false');
        const remaining = totalCount - INITIAL_LIMIT;
        if (textEl) textEl.textContent = 'Xem Thêm Sản Phẩm Khác';
        if (countEl) countEl.textContent = `(+${remaining})`;
      }
    } else {
      loadMoreWrap.style.display = 'none';
    }
  };

  const renderList = (filter = 'all', scrollToTopOnCollapse = false) => {
    let filteredData = PRODUCTS_DATA;
    if (filter !== 'all') {
      filteredData = PRODUCTS_DATA.filter(item => item.category === filter);
    }

    const totalCount = filteredData.length;
    const itemsToRender = isExpanded ? filteredData : filteredData.slice(0, INITIAL_LIMIT);

    productGrid.style.opacity = '0';
    productGrid.style.transform = 'translateY(10px)';

    setTimeout(() => {
      productGrid.innerHTML = itemsToRender.map(renderProductCard).join('');
      updateLoadMoreButton(totalCount);

      productGrid.style.transition = 'opacity 300ms ease, transform 300ms ease';
      productGrid.style.opacity = '1';
      productGrid.style.transform = 'translateY(0)';

      if (scrollToTopOnCollapse) {
        const productsSection = document.querySelector('#products');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 150);
  };

  // Khởi tạo ban đầu: 8 sản phẩm đầu tiên (2 hàng x 4 sản phẩm)
  renderList('all');

  // Lắng nghe sự kiện chuyển đổi Tabs
  tabList.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;

    const allButtons = tabList.querySelectorAll('.tab-btn');
    allButtons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });

    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    currentFilter = btn.getAttribute('data-filter') || 'all';
    isExpanded = false; // Reset trạng thái mở rộng khi đổi tab
    renderList(currentFilter);
  });

  // Lắng nghe sự kiện click Nút Tải Thêm / Thu Gọn
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      const willCollapse = isExpanded;
      isExpanded = !isExpanded;
      renderList(currentFilter, willCollapse);
    });
  }

  // Sự kiện mở modal chi tiết sản phẩm
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.open-detail-btn, .open-detail-link');
    if (trigger) {
      const id = trigger.getAttribute('data-id');
      if (id) {
        openProductModal(id);
      }
    }

    if (e.target.closest('.modal-close') || e.target.classList.contains('modal-backdrop')) {
      closeProductModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
    }
  });
}


  /**
 * Module: Form Validator & Success Modal Popup
 * Xử lý kiểm tra dữ liệu form báo giá và hiển thị popup thông báo "Đăng ký thành công"
 */

function initFormValidator() {
  const quoteForm = document.querySelector('#quote-form');
  const successModal = document.querySelector('#success-modal');

  if (!quoteForm) return;

  // Helper kiểm tra và hiển thị/xóa trạng thái lỗi
  const validateField = (input, isValid, errorMsg = '') => {
    if (!input) return isValid;
    const parent = input.closest('.form-group');
    const feedback = parent ? parent.querySelector('.form-feedback') : input.nextElementSibling;

    if (!isValid) {
      input.classList.remove('is-invalid');
      void input.offsetWidth; // Trigger reflow để kích hoạt lại animation shake
      input.classList.add('is-invalid');
      if (feedback && feedback.classList.contains('form-feedback')) {
        feedback.textContent = errorMsg;
      }
      return false;
    } else {
      input.classList.remove('is-invalid');
      if (feedback && feedback.classList.contains('form-feedback')) {
        feedback.textContent = '';
      }
      return true;
    }
  };

  // Mở modal popup Đăng ký thành công
  const openSuccessModal = (name, phone, email) => {
    if (!successModal) return;

    const nameEl = successModal.querySelector('#success-client-name');
    const phoneEl = successModal.querySelector('#success-client-phone');
    const emailEl = successModal.querySelector('#success-client-email');

    if (nameEl) nameEl.textContent = name;
    if (phoneEl) phoneEl.textContent = phone;
    if (emailEl) emailEl.textContent = email;

    successModal.classList.add('active');
    successModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus vào nút xác nhận để hỗ trợ phím Enter và trợ năng
    const confirmBtn = successModal.querySelector('#close-success-modal');
    if (confirmBtn) {
      setTimeout(() => confirmBtn.focus(), 150);
    }
  };

  // Đóng modal popup
  const closeSuccessModal = () => {
    if (!successModal) return;
    successModal.classList.remove('active');
    successModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Gắn sự kiện đóng modal (nút xác nhận, nút x, click backdrop, phím Esc)
  if (successModal) {
    const confirmBtn = successModal.querySelector('#close-success-modal');
    const closeXBtn = successModal.querySelector('#success-modal-close-x');

    if (confirmBtn) confirmBtn.addEventListener('click', closeSuccessModal);
    if (closeXBtn) closeXBtn.addEventListener('click', closeSuccessModal);

    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        closeSuccessModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && successModal.classList.contains('active')) {
        closeSuccessModal();
      }
    });
  }

  // Tự động xóa lỗi khi người dùng bắt đầu nhập
  const inputs = quoteForm.querySelectorAll('.form-control');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) {
        input.classList.remove('is-invalid');
        const parent = input.closest('.form-group');
        const feedback = parent ? parent.querySelector('.form-feedback') : input.nextElementSibling;
        if (feedback && feedback.classList.contains('form-feedback')) {
          feedback.textContent = '';
        }
      }
    });
  });

  // Bắt sự kiện Gửi yêu cầu báo giá
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = quoteForm.querySelector('#client-name');
    const phoneInput = quoteForm.querySelector('#client-phone');
    const emailInput = quoteForm.querySelector('#client-email');

    let isFormValid = true;
    let firstInvalidInput = null;

    // 1. Kiểm tra Họ và Tên (bắt buộc, tối thiểu 2 ký tự)
    const nameVal = nameInput ? nameInput.value.trim() : '';
    if (!nameVal || nameVal.length < 2) {
      const ok = validateField(nameInput, false, 'Vui lòng nhập họ và tên của bạn (tối thiểu 2 ký tự).');
      if (!ok && !firstInvalidInput) firstInvalidInput = nameInput;
      isFormValid = false;
    } else {
      validateField(nameInput, true);
    }

    // 2. Kiểm tra Số điện thoại / Zalo (bắt buộc, 10 số theo chuẩn VN)
    const phoneVal = phoneInput ? phoneInput.value.trim().replace(/[\s.-]+/g, '') : '';
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (!phoneVal || !phoneRegex.test(phoneVal)) {
      const ok = validateField(phoneInput, false, 'Vui lòng nhập số điện thoại hoặc Zalo hợp lệ (10 chữ số).');
      if (!ok && !firstInvalidInput) firstInvalidInput = phoneInput;
      isFormValid = false;
    } else {
      validateField(phoneInput, true);
    }

    // 3. Kiểm tra Email (bắt buộc, đúng định dạng)
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal || !emailRegex.test(emailVal)) {
      const ok = validateField(emailInput, false, 'Vui lòng nhập đúng định dạng email (ví dụ: contact@company.com).');
      if (!ok && !firstInvalidInput) firstInvalidInput = emailInput;
      isFormValid = false;
    } else {
      validateField(emailInput, true);
    }

    // Nếu có trường không hợp lệ: Focus vào ô đầu tiên bị lỗi
    if (!isFormValid) {
      if (firstInvalidInput) {
        firstInvalidInput.focus();
      }
      return;
    }

    // Nếu tất cả hợp lệ: Kích hoạt hiệu ứng loading và mở modal popup Đăng ký thành công
    const submitBtn = quoteForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span style="display: inline-flex; align-items: center; gap: 8px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 0.8s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        ĐANG GỬI YÊU CẦU...
      </span>
    `;

    // Giả lập gửi yêu cầu và hiển thị popup sau 450ms
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      // Mở modal popup Đăng ký thành công
      openSuccessModal(nameVal, phoneVal, emailVal);

      // Đặt lại form về ban đầu
      quoteForm.reset();
      quoteForm.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    }, 450);
  });
}


  function initNamecardFlipper() {
    const flipper = document.getElementById('namecard-flipper');
    const shadow = document.getElementById('namecard-ground-shadow');
    if (!flipper) return;

    let isFlipped = false;
    let isFlipping = false;

    window.flipNamecard = function() {
      if (isFlipping) return;
      isFlipping = true;

      isFlipped = !isFlipped;

      // Lần đầu (mặt trước -> mặt sau): lật 0deg -> 180deg
      // Lần bấm tiếp theo (mặt sau -> mặt trước): lật ngược lại hoàn toàn 180deg -> 0deg
      const targetAngle = isFlipped ? 180 : 0;
      flipper.style.setProperty('--card-rot-y', targetAngle + 'deg');

      // Kích hoạt vệt sáng ánh kim hoàng kim và bóng sàn đổ theo góc xoay
      flipper.classList.remove('is-animating');
      void flipper.offsetWidth;
      flipper.classList.add('is-animating');

      if (shadow) {
        shadow.classList.remove('shadow-flip-anim');
        void shadow.offsetWidth;
        shadow.classList.add('shadow-flip-anim');
      }

      // Đổi cờ .is-flipped đúng thời điểm thẻ vuông góc 90 độ (375ms = nửa chu kỳ 0.75s)
      setTimeout(() => {
        if (isFlipped) {
          flipper.classList.add('is-flipped');
        } else {
          flipper.classList.remove('is-flipped');
        }
      }, 375);

      setTimeout(() => {
        flipper.classList.remove('is-animating');
        isFlipping = false;
      }, 750);
    };

    // Bấm trực tiếp vào danh thiếp để lật và lật ngược lại
    flipper.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      window.flipNamecard();
    });

    // Phím Enter / Space / Mũi tên bàn phím
    flipper.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        window.flipNamecard();
      }
    });

    // Cảm ứng vuốt (Swipe)
    let touchStartX = 0;
    let touchStartY = 0;
    flipper.addEventListener('touchstart', function(e) {
      if (e.touches && e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    flipper.addEventListener('touchend', function(e) {
      if (e.changedTouches && e.changedTouches.length === 1) {
        const diffX = e.changedTouches[0].clientX - touchStartX;
        const diffY = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0 && !isFlipped) {
            window.flipNamecard();
          } else if (diffX > 0 && isFlipped) {
            window.flipNamecard();
          }
        }
      }
    }, { passive: true });
  }

  function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 280) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  function initApp() {
    initNavigation();
    initHeroSlider();
    initProductFilter();
    initFormValidator();
    initNamecardFlipper();
    initBackToTop();

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
