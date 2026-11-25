import { VIDEOS, VideoItem } from "@/data/videos";

export interface YouTubeLiveEntry {
  videoId: string;
  title: string;
  published: string;
  thumbnail: string;
  description: string;
  watchUrl: string;
}

export const CHANNEL_ID = "UCQGNLL4mw95Z9R1jgYNUZng";
export const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

// Parse XML string without external heavy deps
export function parseYouTubeXml(xml: string): YouTubeLiveEntry[] {
  const entries: YouTubeLiveEntry[] = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match: RegExpExecArray | null;

  while ((match = entryRegex.exec(xml)) !== null) {
    const block = match[1];
    const videoIdMatch = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const titleMatch = block.match(/<title>([^<]+)<\/title>/);
    const publishedMatch = block.match(/<published>([^<]+)<\/published>/);
    const thumbMatch = block.match(/<media:thumbnail[^>]+url="([^"]+)"/);
    const descMatch = block.match(/<media:description>([\s\S]*?)<\/media:description>/);

    if (videoIdMatch && titleMatch) {
      const videoId = videoIdMatch[1].trim();
      entries.push({
        videoId,
        title: titleMatch[1].trim(),
        published: publishedMatch ? publishedMatch[1].trim() : "",
        thumbnail: thumbMatch
          ? thumbMatch[1].trim()
          : `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        description: descMatch ? descMatch[1].trim() : "",
        watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
      });
    }
  }

  return entries;
}

// Format ISO date to Vietnamese localized string
function formatPublishDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${d.getFullYear()}`;
  } catch {
    return isoString;
  }
}

// Merge live YouTube entries with our planned pipeline
export function mergeWithLiveYouTube(liveEntries: YouTubeLiveEntry[]): {
  mergedVideos: VideoItem[];
  liveCount: number;
} {
  // Clone static list
  const list: VideoItem[] = JSON.parse(JSON.stringify(VIDEOS));
  const matchedVideoIds = new Set<string>();

  liveEntries.forEach((live, idx) => {
    // Attempt match with planned episodes
    const cleanTitle = live.title.toLowerCase();
    
    // Find matching episode
    const matched = list.find((v) => {
      // Episode 1 match
      if (
        cleanTitle.includes("tập 1") ||
        cleanTitle.includes("tập 01") ||
        cleanTitle.includes("ep 1") ||
        cleanTitle.includes("ep 01") ||
        cleanTitle.includes("cây hét") ||
        cleanTitle.includes("siêu âm") ||
        cleanTitle.includes("40-80") ||
        cleanTitle.includes("40–80") ||
        cleanTitle.includes("thực vật phát ra âm thanh")
      ) {
        return v.id === "cay-het-sieu-am";
      }
      // Episode 2 match
      if (
        cleanTitle.includes("tập 2") ||
        cleanTitle.includes("tập 02") ||
        cleanTitle.includes("ep 2") ||
        cleanTitle.includes("ep 02") ||
        cleanTitle.includes("lượng tử") ||
        cleanTitle.includes("chiếc lá") ||
        cleanTitle.includes("quang hợp")
      ) {
        return v.id === "quang-hop-luong-tu";
      }
      // Episode 3 match
      if (
        cleanTitle.includes("tập 3") ||
        cleanTitle.includes("tập 03") ||
        cleanTitle.includes("ep 3") ||
        cleanTitle.includes("ep 03") ||
        cleanTitle.includes("miễn dịch") ||
        cleanTitle.includes("tế bào t") ||
        cleanTitle.includes("t-cell") ||
        cleanTitle.includes("sát thủ")
      ) {
        return v.id === "he-mien-dich-te-bao-t";
      }
      // Episode 4 match
      if (
        cleanTitle.includes("tập 4") ||
        cleanTitle.includes("tập 04") ||
        cleanTitle.includes("ep 4") ||
        cleanTitle.includes("ep 04") ||
        cleanTitle.includes("crispr") ||
        cleanTitle.includes("cas9") ||
        cleanTitle.includes("kéo sinh học") ||
        cleanTitle.includes("chỉnh sửa gen")
      ) {
        return v.id === "crispr-cas9";
      }
      // Episode 5 match
      if (
        cleanTitle.includes("tập 5") ||
        cleanTitle.includes("tập 05") ||
        cleanTitle.includes("ep 5") ||
        cleanTitle.includes("ep 05") ||
        cleanTitle.includes("mycelium") ||
        cleanTitle.includes("nấm") ||
        cleanTitle.includes("rừng") ||
        cleanTitle.includes("wood wide web")
      ) {
        return v.id === "mang-luoi-mycelium";
      }
      // Episode 6 match
      if (
        cleanTitle.includes("tập 6") ||
        cleanTitle.includes("tập 06") ||
        cleanTitle.includes("ep 6") ||
        cleanTitle.includes("ep 06") ||
        cleanTitle.includes("nơ-ron") ||
        cleanTitle.includes("điện thế hoạt động") ||
        cleanTitle.includes("synapse") ||
        cleanTitle.includes("xung thần kinh")
      ) {
        return v.id === "dien-the-hoat-dong";
      }
      return false;
    });

    if (matched) {
      matchedVideoIds.add(live.videoId);
      matched.isPublished = true;
      matched.statusLabel = "ĐÃ CÔNG CHIẾU TRÊN YOUTUBE";
      matched.statusBadge = "Đang phát hành";
      matched.statusColor = "emerald";
      matched.progressPercent = 100;
      matched.youtubeUrl = live.watchUrl;
      matched.youtubeVideoId = live.videoId;
      matched.thumbnail = live.thumbnail;
      matched.publishedDate = formatPublishDate(live.published);
      matched.progressDetails = `Đã phát hành chính thức trên kênh YouTube @neuron-bio ngày ${formatPublishDate(
        live.published
      )}. Bấm để xem ngay!`;
    } else {
      // It's a new or bonus video uploaded directly on YouTube!
      if (!list.some((item) => item.youtubeVideoId === live.videoId)) {
        matchedVideoIds.add(live.videoId);
        list.unshift({
          id: `yt-${live.videoId}`,
          episode: `Video Mới`,
          title: live.title,
          subtitle: live.description.slice(0, 140) || "Video mới nhất từ kênh YouTube @neuron-bio.",
          description: live.description,
          thumbnail: live.thumbnail,
          youtubeUrl: live.watchUrl,
          youtubeVideoId: live.videoId,
          isPublished: true,
          publishedDate: formatPublishDate(live.published),
          duration: "Xem ngay",
          fps: 60,
          tag: "YouTube Mới Nhất",
          category: "botany",
          statusLabel: "MỚI NHẤT TRÊN YOUTUBE",
          statusBadge: "Đang phát hành",
          statusColor: "emerald",
          progressPercent: 100,
          progressDetails: `Đăng tải ngày ${formatPublishDate(live.published)} trên kênh @neuron-bio.`,
          isFeatured: true,
        });
      }
    }
  });

  return {
    mergedVideos: list,
    liveCount: liveEntries.length,
  };
}

// Fetch and merge YouTube live videos
export async function getLiveVideos(): Promise<{
  videos: VideoItem[];
  liveCount: number;
  lastSynced: string;
}> {
  try {
    const res = await fetch(RSS_URL, {
      next: { revalidate: 15 },
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    if (!res.ok) {
      return {
        videos: VIDEOS,
        liveCount: 0,
        lastSynced: new Date().toISOString(),
      };
    }

    const xmlText = await res.text();
    const liveEntries = parseYouTubeXml(xmlText);
    const { mergedVideos, liveCount } = mergeWithLiveYouTube(liveEntries);

    return {
      videos: mergedVideos,
      liveCount,
      lastSynced: new Date().toISOString(),
    };
  } catch (error) {
    console.error("YouTube auto-sync error:", error);
    return {
      videos: VIDEOS,
      liveCount: 0,
      lastSynced: new Date().toISOString(),
    };
  }
}
