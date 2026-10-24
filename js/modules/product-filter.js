/**
 * Module: Product Filter & Detail Modal
 * Quản lý kho dữ liệu sản phẩm chuẩn Sitemap Vina Khang:
 * [Định nghĩa sản phẩm, Thông số kỹ thuật, Tính năng, Ứng dụng, Hình ảnh thực tế]
 */

export const PRODUCTS_DATA = [
  {
    id: 1,
    code: '#01',
    category: 'tape',
    categories: ['tape'],
    origin: 'Nhập Khẩu & Gia Công',
    originType: 'cn',
    isPremium: true,
    title: 'Băng Keo Chịu Nhiệt',
    subtitle: 'PTFE Adhesive Tape (Cuộn & Khổ 1m)',
    image: './img/products/bang-keo-chieu-nhiet-tieu-chuan.jpg',
    gallery: [
      './img/products/bang-keo-chieu-nhiet-tieu-chuan.jpg',
      './img/products/bang-keo-nitto-denko.jpg',
      './img/products/bang-keo-vai-chieu-nhiet-co-keo.jpg'
    ],
    definition: 'Băng keo chịu nhiệt PTFE (Teflon) cao cấp kết hợp màng sợi thủy tinh ngâm tẩm nhựa Fluoropolymer và lớp keo dán silicone chịu nhiệt độ cao chuyên dụng. Bề mặt trơn láng chống bám dính tuyệt hảo, độ bền kéo đứt cơ học cao, khi bóc ra không để lại vết keo dơ trên bề mặt kim loại.',
    features: [
      'Bề mặt phủ PTFE chống dính 100%, dễ dàng lau sạch mọi chất keo, màng nhựa nóng chảy.',
      'Lớp keo dán Silicone chịu nhiệt dẻo dai, bám dính siêu chắc trên kim loại, inox, cao su, nhựa.',
      'Chịu nhiệt độ làm việc liên tục từ -73°C đến 260°C (nhiệt đỉnh lên tới 280°C - 300°C).',
      'Đầy đủ quy cách: Cuộn xẻ bản nhỏ theo yêu cầu (13mm, 19mm, 25mm, 50mm...) và cuộn nguyên khổ rộng 1m có màng bóc bảo vệ.'
    ],
    application: 'Thanh hàn nhiệt máy đóng gói bao bì, máy hút chân không thực phẩm, máy ép nhiệt may mặc, bọc bảo vệ con lăn sấy in hoa vải, cách điện bo mạch điện tử.',
    specs: {
      width: 'Bản xẻ 13mm, 19mm, 25mm, 30mm, 50mm... & Khổ rộng 1m',
      length: '10m / cuộn chuẩn hoặc cuộn khổ lớn 10m - 50m',
      thickness: '0.08mm, 0.13mm, 0.18mm, 0.25mm',
      temp: '-73°C đến 260°C (chịu đỉnh 280°C)',
      glue: 'Keo Silicone chịu nhiệt chuyên dụng (có loại màng bóc vàng)',
      color: 'Nâu hổ phách / Nâu cánh gián đậm'
    },
    moreSpecsCount: 2
  },
  {
    id: 2,
    code: '#02',
    category: 'fabric',
    categories: ['fabric'],
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
    id: 3,
    code: '#03',
    category: 'fabric',
    categories: ['fabric'],
    origin: 'Thổ Nhĩ Kỳ / TQ',
    originType: 'cn',
    isPremium: true,
    title: 'Vải Chịu Nhiệt Có Vân',
    subtitle: 'PTFE Thoát Khí Chống Dính (Textured)',
    image: './img/products/vai-chieu-nhiet-co-van.jpg',
    gallery: ['./img/products/vai-chieu-nhiet-co-van.jpg'],
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
    id: 4,
    code: '#04',
    category: 'conveyor',
    categories: ['conveyor'],
    origin: 'May Viền Khuy & Liền Mạch',
    originType: 'cn',
    isPremium: true,
    title: 'Băng Tải Ép Keo',
    subtitle: 'PTFE Fusing Machine Belt',
    image: './img/products/bang-tai-may-ep-keo.jpg',
    gallery: [
      './img/products/bang-tai-may-ep-keo.jpg',
      './img/products/bang-tai-ep-lien-mach.jpg'
    ],
    definition: 'Băng tải máy ép keo PTFE (PTFE Fusing Machine Belt) chuyên dùng trong ngành may mặc, dán ép mex cổ áo, nẹp áo và thân áo. Được sản xuất từ vải sợi thủy tinh cường lực ngâm phủ nhựa Teflon chống dính tuyệt đối, chịu nhiệt độ cao liên tục, gồm cả 2 dạng: may viền vải bấm khuy định hướng và đúc liền mạch Seamless 100% không mối nối.',
    features: [
      'Gia công chuẩn xác theo chu vi, bản rộng mọi dòng máy ép keo (Hashima, Oshima, Meyer, Kannegiesser...).',
      'Bề mặt chống bám dính keo mex tuyệt hảo, vệ sinh lau chùi dễ dàng, không gây ố bẩn vải.',
      'Cung cấp cả dạng may viền dập khuy mắt cáo và dạng đúc liền mạch Seamless không để lại vết hằn nẹp áo.',
      'Độ co giãn cực thấp, chịu lực kéo căng lớn và nhiệt độ làm việc liên tục lên đến 260°C.'
    ],
    application: 'Trang bị trên các dòng máy ép keo mex cổ áo, bo tay, nẹp áo sơ mi, áo vest, lò ép nhiệt phẳng và máy sấy ngành dệt may thời trang xuất khẩu.',
    specs: {
      width: 'Khổ chuẩn: 300mm, 400mm, 450mm, 500mm, 600mm, 900mm, 1200mm... (Cắt theo máy)',
      length: 'Chu vi gia công chính xác theo model máy (1800mm, 2400mm, 3100mm...)',
      thickness: '0.20mm, 0.25mm, 0.35mm, 0.45mm',
      temp: '-73°C đến 260°C (chịu đỉnh 300°C)',
      glue: 'May viền bấm khuy hoặc đúc liền mạch Seamless',
      color: 'Màu đen chống tĩnh điện / Màu nâu hổ phách'
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
export function openProductModal(productId) {
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

export function closeProductModal() {
  const modalBackdrop = document.querySelector('#product-modal');
  if (!modalBackdrop) return;
  modalBackdrop.classList.remove('active');
  modalBackdrop.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

export function initProductFilter() {
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
      filteredData = PRODUCTS_DATA.filter(item => {
        if (Array.isArray(item.categories)) {
          return item.categories.includes(filter);
        }
        return item.category === filter;
      });
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
