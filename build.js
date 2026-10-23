/**
 * BUILD SCRIPT: Tự động cập nhật cache các section và bundle JS
 * Giúp website chạy hoàn hảo 100% ở cả 2 chế độ:
 * 1. Double click mở trực tiếp file:// (không bị chặn CORS)
 * 2. Chạy qua Web server (http://localhost...)
 * 
 * Cách dùng: node build.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sectionsDir = path.join(__dirname, 'sections');
const cachePath = path.join(__dirname, 'js', 'modules', 'sections-cache.js');
const bundlePath = path.join(__dirname, 'js', 'bundle.js');

function buildCache() {
  console.log('🔄 Đang đồng bộ các section từ thư mục sections/ vào sections-cache.js...');
  
  if (!fs.existsSync(sectionsDir)) {
    console.error('❌ Không tìm thấy thư mục sections/');
    return;
  }

  const files = fs.readdirSync(sectionsDir).filter(f => f.endsWith('.html'));
  const cache = {};

  for (const file of files) {
    const filePath = path.join(sectionsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    cache['sections/' + file] = content;
    console.log(`  ✓ Đã nạp section: sections/${file}`);
  }

  const jsContent = `/**
 * TỰ ĐỘNG SINH: Fallback cache hỗ trợ cả giao thức file:// và http://
 */
window.__SECTIONS_CACHE__ = ${JSON.stringify(cache, null, 2)};
`;

  fs.writeFileSync(cachePath, jsContent, 'utf8');
  console.log(`✅ Hoàn tất! Đã đồng bộ ${files.length} sections vào hệ thống.`);

  buildBundle();
}

function buildBundle() {
  console.log('📦 Đang đóng gói js/bundle.js universal (chạy được trên cả file:// và http://)...');
  
  const navCode = fs.readFileSync(path.join(__dirname, 'js', 'modules', 'navigation.js'), 'utf8')
    .replace(/export function/g, 'function');
  const sliderCode = fs.readFileSync(path.join(__dirname, 'js', 'modules', 'slider.js'), 'utf8')
    .replace(/export function/g, 'function');
  const prodCode = fs.readFileSync(path.join(__dirname, 'js', 'modules', 'product-filter.js'), 'utf8')
    .replace(/export const/g, 'const')
    .replace(/export function/g, 'function');
  const formCode = fs.readFileSync(path.join(__dirname, 'js', 'modules', 'form-validator.js'), 'utf8')
    .replace(/export function/g, 'function');

  const bundle = `/**
 * UNIVERSAL BUNDLE - VINA KHANG WEBSITE
 * Tự động đồng bộ từ các module: navigation, slider, product-filter, form-validator
 */
(function() {
  ${navCode}

  ${sliderCode}

  ${prodCode}

  ${formCode}

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
`;

  fs.writeFileSync(bundlePath, bundle, 'utf8');
  console.log('✅ Đã tạo thành công js/bundle.js!');
}

buildCache();

if (process.argv.includes('--watch')) {
  console.log('👀 Đang theo dõi thay đổi trong thư mục sections/ và js/modules/...');
  fs.watch(sectionsDir, { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.html')) {
      console.log(`\n🔔 Phát hiện thay đổi tại ${filename}`);
      buildCache();
    }
  });
}
