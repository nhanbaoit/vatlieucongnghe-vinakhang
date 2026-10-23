/**
 * Module: Form Validator & Success Modal Popup
 * Xử lý kiểm tra dữ liệu form báo giá và hiển thị popup thông báo "Đăng ký thành công"
 */

export function initFormValidator() {
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
