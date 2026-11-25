# Website Neuron (`@neuron-bio`)

> Website chính thức của kênh **Neuron** (`https://www.youtube.com/@neuron-bio`), được thiết kế và dựng theo phong cách tối giản, khoa học của **Median Lab** (`https://www.median-lab.com/`). Sử dụng công nghệ **Next.js 16 (App Router)** mới nhất, Tailwind CSS, TypeScript, và Lucide React.

---

## 🌟 Giới thiệu

**Neuron** là kênh YouTube tiếng Việt chuyên sản xuất các video hoạt hình khoa học (animation 60fps) giải thích những bí ẩn của thế giới tự nhiên, sinh học vi mô, tế bào và lượng tử sinh học trên nền đen sâu tối giản.

Website này bao gồm đầy đủ 3 trang chính và tính năng chuẩn mực:
1. **Trang chủ (`/`)**:
   - Hero Section với tiêu đề: *"Sinh học, Tế bào và animation"* cùng hiệu ứng radial-grid scan đặc trưng.
   - Nút hành động trực diện: **"Ủng hộ kênh"** và **"Xem trên YouTube"**.
   - Showcase video 6 chủ đề sinh học chuẩn phong cách Median x Neuron (tập 1 "Cây Hét Siêu Âm", tập 2 "Quang Hợp Lượng Tử", "Tế Bào T", "CRISPR-Cas9", "Mycelium", "Điện Thế Hoạt Động").
   - **VideoModal**: Xem nhanh thông tin tập phim, mục lục timestamps, và danh sách tài liệu nghiên cứu tham khảo (Cell, Nature, eLife...).
   - Section gợi ý chủ đề video tiếp theo & nút đăng ký kênh.
2. **Trang Tham gia (`/join-us`)**:
   - Giới thiệu công nghệ sản xuất animation sinh học 60fps bằng **HyperFrames + GSAP**.
   - Bảng thông số: 60 FPS, 100% Vector SVG, kịch bản nghiên cứu >2.000 chữ, sound mix chuẩn -15 LUFS.
   - 3 gói đồng hành (Creator, Creator Pro vĩnh viễn, Studio Collab phát hành quốc tế).
   - FAQ Accordion 9 câu hỏi thường gặp.
3. **Trang Ủng hộ (`/donate`)**:
   - Hỗ trợ 2 cổng: **VietQR tự động** và **PayPal Quốc tế**.
   - Tạo mã VietQR động theo thời gian thực (tùy chỉnh số tiền và nội dung chuyển khoản).
   - Nút sao chép số tài khoản & nội dung chuyển khoản nhanh kèm hiệu ứng chúc mừng (confetti).
   - **Nội dung gợi ý** (signature của Median): Bấm vào bất kỳ chip nào để tự động cập nhật QR và sao chép nội dung chuyển khoản.

---

## 🚀 Hướng dẫn Chạy Website

### 1. Cài đặt dependencies (nếu cần)
```bash
npm install
```

### 2. Chạy ở môi trường Development
```bash
npm run dev
```
Mở trình duyệt tại: `http://localhost:3000`

### 3. Build và chạy Production
```bash
npm run build
npm run start
```

---

## 📁 Cấu trúc Dự án

```text
website-neuron/
├── public/
│   ├── favicon.svg             # Icon favicon Neuron (hình nơ-ron vector)
│   ├── logo.png                # Logo thương hiệu Neuron chuẩn nền trong suốt
│   └── videos/                 # Thumbnail các tập phim khoa học sinh học
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, Google Fonts (Plus Jakarta Sans, JetBrains Mono), SEO Metadata
│   │   ├── globals.css         # Dark theme (#070709), scrollbar, bio-glow
│   │   ├── page.tsx            # Trang chủ (Hero + Video Grid Showcase + CTA)
│   │   ├── join-us/page.tsx    # Trang Tham gia / Source code & Playbook
│   │   └── donate/page.tsx     # Trang Ủng hộ & VietQR tương tác
│   ├── components/
│   │   ├── Header.tsx          # Thanh điều hướng chuẩn Median style
│   │   ├── Footer.tsx          # Footer với mạng xã hội, email tài trợ & watermark lớn
│   │   ├── NeuronLogo.tsx      # Component hiển thị Logo Neuron
│   │   └── VideoModal.tsx      # Modal xem chi tiết video, citations & timestamps
│   └── data/
│       └── videos.ts           # Dữ liệu 6 video khoa học sinh học
└── package.json                # Next.js 16.4.6, React 19, Tailwind CSS
```
