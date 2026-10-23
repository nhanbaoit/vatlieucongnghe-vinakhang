/**
 * APP ENTRY POINT - CÔNG TY TNHH THƯƠNG MẠI VINA KHANG
 * Khởi tạo toàn bộ các module chức năng JavaScript
 */

import './modules/sections-cache.js';
import { loadSections } from './modules/section-loader.js';
import { initNavigation } from './modules/navigation.js';
import { initHeroSlider } from './modules/slider.js';
import { initProductFilter } from './modules/product-filter.js';
import { initFormValidator } from './modules/form-validator.js';

document.addEventListener('DOMContentLoaded', async () => {
  console.info('[VinaKhang Website] Hệ thống khởi động thành công với kiến trúc Modular ES6+.');

  // 1. Nạp toàn bộ các section từ thư mục sections/ vào index.html
  await loadSections();

  // 2. Khởi tạo các module chức năng sau khi DOM đã được nạp đầy đủ
  initNavigation();
  initHeroSlider();
  initProductFilter();
  initFormValidator();
  initBackToTop();

  // Khởi tạo nút quay lại đầu trang (Back to Top)
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

  // 3. Khởi tạo tính năng lật danh thiếp đảo chiều mượt mà
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

  initNamecardFlipper();

  // 3. Khởi tạo phím cuộn mượt cho tất cả liên kết anchor
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
