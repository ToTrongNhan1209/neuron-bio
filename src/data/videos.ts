export interface VideoItem {
  id: string;
  episode: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
  youtubeVideoId?: string;
  isPublished?: boolean;
  publishedDate?: string;
  duration: string;
  fps: number;
  tag: string;
  category: "botany" | "quantum" | "immune" | "genetics" | "ecology" | "neuro";
  statusLabel: string;
  statusBadge: string;
  statusColor: "emerald" | "amber" | "blue" | "zinc";
  progressPercent: number;
  progressDetails: string;
  isFeatured?: boolean;
  citations?: string[];
  timestamps?: { time: string; title: string }[];
}

export const VIDEOS: VideoItem[] = [
  {
    id: "cay-het-sieu-am",
    episode: "Tập 01",
    title: "Thế Giới Bí Mật Của Thực Vật: Tại Sao Cây Biết Hét?",
    subtitle: "Cây cối có thực sự biết la hét ở dải tần 40–80 kHz khi khát nước?",
    description:
      "Nghiên cứu chấn động từ ĐH Tel Aviv (Cell 2023) & eLife 2025: Khám phá hiện tượng xâm thực (cavitation) áp suất âm trong mạch gỗ, trí tuệ nhân tạo phân biệt tiếng kêu và thí nghiệm 60 lần thả rơi cây trinh nữ chứng minh ký ức không cần não bộ.",
    thumbnail: "/videos/cay-het-sieu-am.png",
    youtubeUrl: "https://www.youtube.com/@neuron-bio",
    duration: "16:04",
    fps: 60,
    tag: "Thực vật học",
    category: "botany",
    statusLabel: "Hoàn thành dựng 60fps • Sắp công chiếu",
    statusBadge: "Sắp công chiếu",
    statusColor: "emerald",
    progressPercent: 100,
    progressDetails: "File video FullMix 16:04 đã hoàn tất, chuẩn âm thanh -15.7 LUFS, sẵn sàng lên sóng.",
    isFeatured: true,
    citations: [
      "Khait, I. et al. (2023). Sounds emitted by plants under stress are airborne and informative. Cell, 186(7).",
      "Hadany Lab (2025). Female moths incorporate plant acoustic emissions into oviposition decision-making. eLife.",
      "Gagliano, M. et al. (2014). Experience teaches plants to learn faster and forget slower. Oecologia.",
    ],
    timestamps: [
      { time: "00:00", title: "Khu vườn im lặng giả tạo & Dải tần 40–80 kHz" },
      { time: "02:08", title: "Nghịch lý 10,4 m vs Cây 100 m & Lực căng" },
      { time: "04:34", title: "Vụ nổ xâm thực (Cavitation) trong mạch gỗ" },
      { time: "06:36", title: "AI giải mã tiếng cây khát vs bị cắt thân" },
      { time: "07:53", title: "Bướm đêm nghe tiếng cây khát (eLife 2025)" },
      { time: "12:12", title: "Thí nghiệm 60 lần thả rơi cây trinh nữ" },
    ],
  },
  {
    id: "quang-hop-luong-tu",
    episode: "Tập 02",
    title: "Bí Mật Lượng Tử Trong Chiếc Lá: Tại Sao Đạt 95–99%?",
    subtitle: "Cơ học lượng tử trong sinh học: Exciton, Quantum Walk và phức hệ FMO.",
    description:
      "Tại sao tấm pin mặt trời tối tân chỉ đạt 20–25% trong khi chiếc lá cây lại truyền năng lượng photon tới 99% mà không hề bị thất thoát nhiệt? Khám phá hành khách Exciton và hiện tượng Quantum Beats.",
    thumbnail: "/videos/quang-hop-luong-tu.svg",
    youtubeUrl: "https://www.youtube.com/@neuron-bio",
    duration: "14:30",
    fps: 60,
    tag: "Lượng tử sinh học",
    category: "quantum",
    statusLabel: "Đang dựng Animation 60FPS",
    statusBadge: "Đang sản xuất",
    statusColor: "amber",
    progressPercent: 75,
    progressDetails: "Đã hoàn thành kịch bản 3.900 từ & Storyboard 8 chương chuyển động, đang dựng đồ họa phân tử FMO.",
    citations: [
      "Engel, G. S. et al. (2007). Evidence for wavelike energy transfer through quantum coherence in photosynthetic systems. Nature.",
      "Duan, H. G. & Miller, R. J. D. (2017). Nature does not rely on long-lived electronic quantum coherence for photosynthetic energy transfer. PNAS.",
    ],
    timestamps: [
      { time: "00:00", title: "Nghịch lý Tấm Pin 20% vs Chiếc Lá 99%" },
      { time: "03:15", title: "Hành khách Exciton & Cuộc đua 1 Nanosecond" },
      { time: "06:40", title: "Đột phá Berkeley 2007: Phức hệ FMO" },
      { time: "10:20", title: "Cộng hưởng cơ học Vibronic Coupling & LHCII" },
    ],
  },
  {
    id: "he-mien-dich-te-bao-t",
    episode: "Tập 03",
    title: "Hệ Miễn Dịch & Cuộc Chiến Vi Mô: Sát Thủ Tế Bào T",
    subtitle: "Thụ thể TCR, kháng nguyên MHC và cách sát thủ tiêu diệt tế bào ung thư.",
    description:
      "Mỗi giây trôi qua, cơ thể bạn là một chiến trường vi mô khốc liệt. Khám phá cách tế bào T sát thủ (CD8+) kiểm tra thẻ căn cước MHC của hàng tỷ tế bào và kích hoạt cơ chế tự sát apoptosis bằng perforin.",
    thumbnail: "/videos/he-mien-dich-te-bao-t.svg",
    youtubeUrl: "https://www.youtube.com/@neuron-bio",
    duration: "13:45",
    fps: 60,
    tag: "Miễn dịch học",
    category: "immune",
    statusLabel: "Đã có kịch bản & Nghiên cứu",
    statusBadge: "Kịch bản hoàn tất",
    statusColor: "blue",
    progressPercent: 45,
    progressDetails: "Đã tổng hợp tài liệu y sinh TCR/MHC Class I, chuẩn bị thu âm voice studio.",
    citations: [
      "Janeway's Immunobiology (9th Edition). Garland Science.",
      "Allison, J. P. & Honjo, T. (Nobel Prize in Physiology or Medicine 2018). Cancer Immunotherapy via Immune Checkpoint.",
    ],
    timestamps: [
      { time: "00:00", title: "Chiến trường thầm lặng bên trong cơ thể" },
      { time: "03:20", title: "Thẻ căn cước phân tử: Phức hệ MHC Class I" },
      { time: "07:10", title: "Khớp khóa TCR và cú bắt tay định mệnh" },
      { time: "10:45", title: "Cơn bão Perforin & Granzyme xé toạc màng" },
    ],
  },
  {
    id: "crispr-cas9",
    episode: "Tập 04",
    title: "Cây Kéo Phân Tử CRISPR-Cas9 Cắt Dán Mã Di Truyền",
    subtitle: "Từ cơ chế tự vệ của vi khuẩn đến cuộc cách mạng chỉnh sửa ADN sự sống.",
    description:
      "Làm sao một chuỗi ARN dẫn đường sgRNA dài vài chục nucleotide có thể dò tìm chính xác 1 vị trí lỗi duy nhất giữa 3 tỷ cặp base của hệ gen người? Giải mã cơ chế phân tử thay đổi tương lai y học.",
    thumbnail: "/videos/crispr-cas9.svg",
    youtubeUrl: "https://www.youtube.com/@neuron-bio",
    duration: "15:10",
    fps: 60,
    tag: "Công nghệ gen",
    category: "genetics",
    statusLabel: "Đang tổng hợp nghiên cứu",
    statusBadge: "Đang nghiên cứu",
    statusColor: "zinc",
    progressPercent: 25,
    progressDetails: "Đang phân tích cơ chế nhận diện PAM 5'-NGG-3' và cấu trúc 3D của enzyme Cas9.",
    citations: [
      "Doudna, J. A. & Charpentier, E. (2012). A programmable dual-RNA-guided DNA endonuclease in adaptive bacterial immunity. Science.",
      "Hsu, P. D., Lander, E. S., & Zhang, F. (2014). Development and applications of CRISPR-Cas9 for genome engineering. Cell.",
    ],
    timestamps: [
      { time: "00:00", title: "Cuộc chiến tỷ năm giữa Vi khuẩn và Phage" },
      { time: "04:12", title: "Trình tự lặp đối xứng CRISPR & Kho lưu trữ ADN ngoại lai" },
      { time: "08:30", title: "Cách Protein Cas9 quét mã PAM 5'-NGG-3'" },
      { time: "12:15", title: "Hàn gắn đứt gãy kép NHEJ vs HDR" },
    ],
  },
  {
    id: "mang-luoi-mycelium",
    episode: "Tập 05",
    title: "Mạng Lưới Mycelium: 'Internet Tự Nhiên' Của Rừng Già",
    subtitle: "Cách nấm rễ truyền tín hiệu cảnh báo và phân phối carbon giữa các thân cây.",
    description:
      "Dưới lớp đất rừng êm ả là một siêu xa lộ thông tin sinh học chằng chịt. Khám phá cách nấm rễ cộng sinh (mycorrhizae) chia sẻ đường, photpho và gửi tín hiệu cảnh báo sâu bọ giữa những cây cách xa hàng trăm mét.",
    thumbnail: "/videos/mang-luoi-mycelium.svg",
    youtubeUrl: "https://www.youtube.com/@neuron-bio",
    duration: "12:50",
    fps: 60,
    tag: "Sinh thái học",
    category: "ecology",
    statusLabel: "Lên dàn ý kịch bản",
    statusBadge: "Kế hoạch",
    statusColor: "zinc",
    progressPercent: 15,
    progressDetails: "Lập dàn ý các thí nghiệm của GS. Suzanne Simard về sự tương trợ giữa cây bạch dương và thông rụng lá.",
    citations: [
      "Simard, S. W. et al. (1997). Net transfer of carbon between ectomycorrhizal tree species in the field. Nature.",
      "Babikova, Z. et al. (2013). Underground signals carried through fungal networks warn neighbouring plants of aphid attack. Ecology Letters.",
    ],
    timestamps: [
      { time: "00:00", title: "Thực tế về thế giới ngầm dưới chân bạn" },
      { time: "03:40", title: "Giao dịch sòng phẳng: Đường thực vật đổi lấy Khoáng chất" },
      { time: "07:25", title: "Cây mẹ (Mother Tree) và mạng lưới tương trợ" },
      { time: "10:15", title: "Tín hiệu hóa học khẩn cấp qua sợi nấm Hyphae" },
    ],
  },
  {
    id: "dien-the-hoat-dong",
    episode: "Tập 06",
    title: "Điện Thế Hoạt Động Nơ-ron: Một Ý Nghĩ Di Chuyển Ra Sao?",
    subtitle: "Bơm ion Na⁺/K⁺, điện thế nghỉ -70mV và cú phóng điện 120 m/s qua khe synapse.",
    description:
      "Ý thức của bạn được tạo nên từ những xung điện ion chạy liên tục. Tìm hiểu cơ chế kênh cổng điện thế, pha khử cực bùng nổ và cách bóng synapse giải phóng chất dẫn truyền thần kinh dopamine & glutamate.",
    thumbnail: "/videos/dien-the-hoat-dong.svg",
    youtubeUrl: "https://www.youtube.com/@neuron-bio",
    duration: "16:20",
    fps: 60,
    tag: "Thần kinh học",
    category: "neuro",
    statusLabel: "Lên ý tưởng ban đầu",
    statusBadge: "Kế hoạch",
    statusColor: "zinc",
    progressPercent: 10,
    progressDetails: "Nghiên cứu mô hình Hodgkin-Huxley và phương pháp trực quan hóa dòng ion qua màng tế bào thần kinh.",
    citations: [
      "Hodgkin, A. L. & Huxley, A. F. (1952). A quantitative description of membrane current and its application to conduction and excitation in nerve. J Physiol.",
      "Kandel, E. R. (2000). Principles of Neural Science. McGraw-Hill.",
    ],
    timestamps: [
      { time: "00:00", title: "Tốc độ của một suy nghĩ: 120 mét/giây" },
      { time: "03:50", title: "Cục pin sinh học -70mV & Bơm Na+/K+ ATPase" },
      { time: "07:30", title: "Quy luật 'Tất cả hoặc Không' (All-or-None Law)" },
      { time: "11:45", title: "Cú nhảy Saltatory qua eo Ranvier & Giải mã Synapse" },
    ],
  },
];
