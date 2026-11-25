export interface RoadmapPoint {
  date: string;
  stage: string;
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
  badge: string;
}

export interface VideoReleaseRecord {
  episode: string;
  title: string;
  status: string;
  duration: string;
  fps: number;
  citationsCount: number;
  tag: string;
  dateEst: string;
}

export const REAL_CHANNEL_INFO = {
  channelName: "neuron biology",
  handle: "@neuron-bio",
  channelUrl: "https://www.youtube.com/@neuron-bio",
  channelId: "UCQGNLL4mw95Z9R1jgYNUZng",
  joinedDate: "06/06/2019",
  country: "Việt Nam",
  status: "Sắp phát hành series",
  firstEpisodeTitle: "Cây Hét Siêu Âm (40–80 kHz)",
  firstEpisodeDuration: "16:04",
  fps: "60 FPS",
  standard: "HyperFrames Vector",
};

export const ROADMAP_DATA: RoadmapPoint[] = [
  {
    date: "06/06/2019",
    stage: "Khởi tạo",
    title: "Thành lập kênh YouTube @neuron-bio",
    description: "Kênh chính thức được đăng ký trên YouTube tại Việt Nam, đặt nền móng cho dự án khoa học giáo dục.",
    status: "completed",
    badge: "06/06/2019",
  },
  {
    date: "11/2024",
    stage: "Nghiên cứu",
    title: "Hoàn thiện NEURON_VIDEO_PLAYBOOK",
    description: "Xây dựng ngôn ngữ thị giác vector đen trắng, chuẩn âm thanh studio -15 LUFS, và quy trình dựng HyperFrames 60fps.",
    status: "completed",
    badge: "Playbook 60FPS",
  },
  {
    date: "Tập 01",
    stage: "Công chiếu",
    title: "Tập 1: Cây Hét Siêu Âm (40–80 kHz)",
    description: "Giải mã cơ chế xâm thực áp suất âm trong mạch gỗ và ký ức thực vật (dựa trên Cell 2023 & eLife 2025). Thời lượng 16:04 @ 60fps.",
    status: "current",
    badge: "Sắp lên sóng",
  },
  {
    date: "Tập 02",
    stage: "Sản xuất",
    title: "Tập 2: Bí Mật Lượng Tử Trong Chiếc Lá",
    description: "Tại sao hiệu suất quang hợp đạt 95–99%? Cơ học lượng tử, hành khách Exciton và phức hệ FMO.",
    status: "upcoming",
    badge: "Đang dựng",
  },
  {
    date: "Tập 03",
    stage: "Kế hoạch",
    title: "Tập 3: Sát Thủ Tế Bào T & Hệ Miễn Dịch",
    description: "Thụ thể TCR, kháng nguyên MHC và cách các chiến binh vi mô tiêu diệt tế bào ung thư.",
    status: "upcoming",
    badge: "Kịch bản",
  },
  {
    date: "Tập 04",
    stage: "Kế hoạch",
    title: "Tập 4: Cây Kéo Phân Tử CRISPR-Cas9",
    description: "Cơ chế cắt dán mã di truyền sự sống và cuộc cách mạng công nghệ sinh học thế giới.",
    status: "upcoming",
    badge: "Kế hoạch",
  },
];

export const REAL_VIDEO_LIST: VideoReleaseRecord[] = [
  {
    episode: "Tập 01",
    title: "Thế Giới Bí Mật Của Thực Vật: Tại Sao Cây Biết Hét Ở Tần Số 40–80 kHz?",
    status: "Sắp công chiếu",
    duration: "16:04",
    fps: 60,
    citationsCount: 5,
    tag: "Thực vật học",
    dateEst: "Tập mở màn",
  },
  {
    episode: "Tập 02",
    title: "Bí Mật Lượng Tử Trong Chiếc Lá: Tại Sao Hiệu Suất Đạt 95–99%?",
    status: "Đang dựng animation",
    duration: "14:30",
    fps: 60,
    citationsCount: 4,
    tag: "Lượng tử sinh học",
    dateEst: "Kế tiếp",
  },
  {
    episode: "Tập 03",
    title: "Hệ Miễn Dịch & Cuộc Chiến Vi Mô: Sát Thủ Tế Bào T Nhận Diện Kẻ Xâm Lăng",
    status: "Đã có kịch bản",
    duration: "13:45",
    fps: 60,
    citationsCount: 6,
    tag: "Miễn dịch học",
    dateEst: "Giai đoạn 2",
  },
  {
    episode: "Tập 04",
    title: "Cây Kéo Phân Tử CRISPR-Cas9: Cắt Dán Mã Di Truyền Sự Sống",
    status: "Đang nghiên cứu",
    duration: "15:10",
    fps: 60,
    citationsCount: 4,
    tag: "Công nghệ gen",
    dateEst: "Giai đoạn 2",
  },
  {
    episode: "Tập 05",
    title: "Mạng Lưới Mycelium: 'Internet Tự Nhiên' Dưới Lòng Đất Rừng Già",
    status: "Lên ý tưởng",
    duration: "12:50",
    fps: 60,
    citationsCount: 5,
    tag: "Sinh thái học",
    dateEst: "Giai đoạn 3",
  },
  {
    episode: "Tập 06",
    title: "Điện Thế Hoạt Động Nơ-ron: Một Ý Nghĩ Thực Sự Di Chuyển Ra Sao?",
    status: "Lên ý tưởng",
    duration: "16:20",
    fps: 60,
    citationsCount: 5,
    tag: "Thần kinh học",
    dateEst: "Giai đoạn 3",
  },
];
