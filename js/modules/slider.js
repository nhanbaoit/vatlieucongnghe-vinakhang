/**
 * Module: Slider
 * Khởi tạo Swiper.js cho Hero Carousel tự động chuyển slide liên tục và mượt mà
 */

export function initHeroSlider() {
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
