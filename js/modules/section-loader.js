/**
 * SECTION LOADER - NẠP DỮ LIỆU TỪ THƯ MỤC SECTIONS/ VÀO INDEX.HTML
 * Tự động tìm các thẻ có thuộc tính [data-include="sections/..."] và chèn nội dung vào DOM
 */

export async function loadSections() {
  const includeElements = document.querySelectorAll('[data-include]');
  if (includeElements.length === 0) return;

  const loadTasks = Array.from(includeElements).map(async (el) => {
    const sectionPath = el.getAttribute('data-include');
    try {
      const response = await fetch(sectionPath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const htmlContent = await response.text();
      
      // Tạo phần tử tạm để parse và trích xuất
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      
      // Thay thế phần tử giữ chỗ bằng nội dung thực tế
      el.replaceWith(...tempDiv.childNodes);
      console.log(`[SectionLoader] Đã tải thành công: ${sectionPath}`);
    } catch (error) {
      console.warn(`[SectionLoader] Không thể fetch trực tiếp ${sectionPath}:`, error.message);
      
      // Nếu mở bằng file:// hoặc bị chặn CORS, thử fallback từ cached registry nếu có
      if (window.__SECTIONS_CACHE__ && window.__SECTIONS_CACHE__[sectionPath]) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = window.__SECTIONS_CACHE__[sectionPath];
        el.replaceWith(...tempDiv.childNodes);
        console.log(`[SectionLoader] Đã tải từ cache fallback: ${sectionPath}`);
      } else {
        el.innerHTML = `
          <div style="padding: 20px; text-align: center; background: #FFF3CD; color: #856404; border: 1px solid #FFEEBA; border-radius: 8px; margin: 10px;">
            <p><strong>Lưu ý:</strong> Đang mở file qua giao thức <code>file://</code> nên trình duyệt chặn fetch file <code>${sectionPath}</code>.</p>
            <p style="font-size: 13px; margin-top: 6px;">Vui lòng mở qua <strong>Live Server</strong> (VSCode) hoặc chạy lệnh <code>npx serve</code> trong terminal.</p>
          </div>
        `;
      }
    }
  });

  await Promise.all(loadTasks);
}
