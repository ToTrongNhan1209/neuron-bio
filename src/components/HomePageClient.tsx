"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { VideoItem } from "@/data/videos";
import VideoModal from "@/components/VideoModal";
import GrowthChart from "@/components/GrowthChart";
import { REAL_CHANNEL_INFO } from "@/data/stats";

interface HomePageClientProps {
  initialVideos: VideoItem[];
  initialLiveCount: number;
}

export default function HomePageClient({
  initialVideos,
  initialLiveCount,
}: HomePageClientProps) {
  const [videoList, setVideoList] = useState<VideoItem[]>(initialVideos);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>("Vừa xong");
  const [liveCount, setLiveCount] = useState<number>(initialLiveCount);
  const [newVideoToast, setNewVideoToast] = useState<string | null>(null);

  const prevLiveCountRef = useRef(initialLiveCount);

  // Sync function that queries our no-store Next.js API route
  const syncWithYouTube = useCallback(async (manual = false) => {
    try {
      setIsSyncing(true);
      const res = await fetch("/api/sync-youtube", {
        cache: "no-store",
        headers: {
          "Pragma": "no-cache",
          "Cache-Control": "no-cache",
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.videos && Array.isArray(data.videos)) {
          setVideoList(data.videos);

          const currentLive = data.liveCount || 0;
          if (currentLive > prevLiveCountRef.current) {
            setNewVideoToast(`🎉 Kênh YouTube vừa phát hành video mới!`);
            setTimeout(() => setNewVideoToast(null), 8000);
          }
          prevLiveCountRef.current = currentLive;
          setLiveCount(currentLive);

          const now = new Date();
          setLastSyncTime(
            now.toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          );
        }
      }
    } catch (err) {
      console.error("Auto sync with YouTube failed:", err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Set up continuous background listeners
  useEffect(() => {
    // 1. Initial check shortly after mount
    const initialTimer = setTimeout(() => syncWithYouTube(), 2000);

    // 2. Periodic polling every 30 seconds for real-time video detection
    const interval = setInterval(() => {
      syncWithYouTube();
    }, 30000);

    // 3. Re-sync immediately when tab becomes visible or window gains focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        syncWithYouTube();
      }
    };

    const handleFocus = () => {
      syncWithYouTube();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [syncWithYouTube]);

  return (
    <div className="relative isolate flex flex-col flex-1">
      {/* Background smooth ambient dark glow (taste-skill, no harsh barcode stripes) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[750px] bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(34,197,94,0.12),rgba(255,255,255,0))]"
      />

      {/* Floating Alert if a new video just dropped on YouTube */}
      {newVideoToast && (
        <div className="fixed top-20 right-6 z-50 animate-bounce">
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/50 bg-[#0e1713] px-5 py-3 text-sm text-emerald-300 shadow-2xl backdrop-blur-md">
            <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{newVideoToast}</span>
            <button
              onClick={() => setNewVideoToast(null)}
              className="text-zinc-400 hover:text-white ml-2 text-xs"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative w-full">
        <div className="relative mx-auto w-full max-w-5xl px-6 pt-6 pb-12 sm:pt-12 md:pt-18">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-mono text-zinc-300 backdrop-blur-sm">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Kênh @neuron-bio • Đã tham gia {REAL_CHANNEL_INFO.joinedDate}</span>
            </div>

            {/* Continuous Live YouTube Auto-Sync Indicator */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono text-emerald-400">
              <span
                className={`size-2 rounded-full bg-emerald-400 ${
                  isSyncing ? "animate-ping" : "animate-pulse"
                }`}
              />
              <span>
                {isSyncing
                  ? "Đang quét YouTube..."
                  : `Tự động cập nhật YouTube (${lastSyncTime})`}
              </span>
              <button
                onClick={() => syncWithYouTube(true)}
                disabled={isSyncing}
                title="Bấm để kiểm tra video mới trên kênh YouTube ngay lập tức"
                className="hover:rotate-180 transition-transform duration-500 cursor-pointer text-emerald-300 ml-1 disabled:opacity-50 font-bold"
              >
                ↻
              </button>
            </div>
          </div>

          <h1 className="origin-bottom-left text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-[80px] md:leading-[1.04] text-white">
            Sinh học, Tế bào
            <br />
            và{" "}
            <span className="relative isolate inline-block">
              animation
              <span
                className="bg-emerald-500/25 absolute inset-x-[-2%] bottom-[0.08em] -z-10 h-[0.38em] rounded-sm"
                aria-hidden="true"
              />
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-zinc-400 leading-relaxed sm:text-xl">
            Neuron là kênh YouTube tiếng Việt giải thích sinh học, thực vật học, thế giới vi mô và tự nhiên bằng animation vector đen trắng tự dựng chuẩn 60fps. Mỗi video trả lời một câu hỏi bạn từng thắc mắc nhưng chưa được giải thích thoả đáng.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5 md:mt-10">
            {/* Donate CTA */}
            <Link
              href="/donate"
              className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap transition-all duration-200 bg-white text-black hover:bg-zinc-200 shadow-lg hover:shadow-white/10 h-14 px-8 text-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 256 256"
                className="text-red-500"
                aria-hidden="true"
              >
                <path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z" />
              </svg>
              Ủng hộ kênh
            </Link>

            {/* YouTube Channel CTA */}
            <a
              href={REAL_CHANNEL_INFO.channelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap transition-all duration-200 bg-white/10 text-white hover:bg-white/15 border border-white/10 shadow-sm h-14 px-8 text-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 256 256"
                className="text-red-500"
                aria-hidden="true"
              >
                <path d="M234.33,69.52a24,24,0,0,0-14.49-16.4C185.56,39.88,131,40,128,40s-57.56-.12-91.84,13.12a24,24,0,0,0-14.49,16.4C19.08,79.5,16,97.74,16,128s3.08,48.5,5.67,58.48a24,24,0,0,0,14.49,16.41C69,215.56,120.4,216,127.34,216h1.32c6.94,0,58.37-.44,91.18-13.11a24,24,0,0,0,14.49-16.41c2.59-10,5.67-28.22,5.67-58.48S236.92,79.5,234.33,69.52Zm-73.74,65-40,28A8,8,0,0,1,108,156V100a8,8,0,0,1,12.59-6.55l40,28a8,8,0,0,1,0,13.1Z" />
              </svg>
              Xem trên YouTube
            </a>

            {/* Quick Stats link */}
            <Link
              href="/stats"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 bg-transparent text-zinc-400 hover:text-white h-14 px-5 text-sm"
            >
              Lộ trình & Tiến độ các tập →
            </Link>
          </div>
        </div>
      </section>

      {/* Video Progress Showcase Section (DYNAMIC LIVE SYNC) */}
      <section id="videos" className="mx-auto w-full max-w-6xl scroll-mt-8 px-6 pt-4 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 border-b border-white/10 pb-4 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
                Tiến Trình Sản Xuất & Phát Hành Series
              </span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Kế hoạch & Tiến độ từng tập phim
            </h2>
            <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
              <span className="inline-block size-1.5 rounded-full bg-emerald-400 animate-ping" />
              Hệ thống tự động đồng bộ theo thời gian thực với kênh YouTube @neuron-bio
            </p>
          </div>
          
          <div className="flex items-center gap-3 self-start sm:self-auto">
            {liveCount > 0 ? (
              <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-mono text-emerald-400 font-bold">
                ✓ {liveCount} video đã phát hành trên YouTube
              </span>
            ) : (
              <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-mono text-zinc-400">
                ● Tập 1 chuẩn bị công chiếu
              </span>
            )}
            <Link
              href="/stats"
              className="text-xs font-mono text-emerald-400 hover:underline"
            >
              Xem bảng chi tiết lộ trình →
            </Link>
          </div>
        </div>

        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {videoList.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="group flex flex-col cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Thumbnail Container */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c] shadow-lg">
                <div className="aspect-video w-full relative">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                {/* Top Badges: Episode & Topic Tag */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                  <span className="rounded-md bg-black/75 backdrop-blur-md px-2 py-0.5 text-[11px] font-mono font-bold text-white border border-white/10">
                    {video.episode}
                  </span>
                  <span className="rounded-md bg-black/75 backdrop-blur-md px-2 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/30">
                    {video.tag}
                  </span>
                </div>

                {/* Bottom Badges: Status & Duration */}
                <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
                  <span
                    className={`rounded-md backdrop-blur-md px-2 py-0.5 text-[10px] font-mono font-bold border ${
                      video.isPublished
                        ? "bg-emerald-500/95 text-black border-emerald-400 font-extrabold shadow-md"
                        : video.statusColor === "emerald"
                        ? "bg-black/85 text-emerald-400 border-emerald-500/50"
                        : video.statusColor === "amber"
                        ? "bg-black/85 text-amber-400 border-amber-500/50"
                        : video.statusColor === "blue"
                        ? "bg-black/85 text-blue-400 border-blue-500/50"
                        : "bg-black/85 text-zinc-400 border-white/10"
                    }`}
                  >
                    ● {video.isPublished ? "ĐÃ CÔNG CHIẾU TRÊN YOUTUBE" : video.statusBadge}
                  </span>

                  <span className="rounded-md bg-black/80 backdrop-blur-md px-2 py-0.5 text-[11px] font-mono text-zinc-300 border border-white/10">
                    {video.duration}
                  </span>
                </div>

                {/* Hover Play / Detail Button Overlay */}
                <span className="bg-black/60 absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex size-14 items-center justify-center rounded-full bg-white text-black shadow-xl transition-transform duration-300 group-hover:scale-110">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                      className="ml-0.5 text-black"
                      aria-hidden="true"
                    >
                      <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z" />
                    </svg>
                  </span>
                </span>
              </div>

              {/* Progress Mini Bar */}
              <div className="mt-3.5 flex items-center justify-between text-[11px] font-mono">
                <span className="text-zinc-400 truncate max-w-[200px]">{video.statusLabel}</span>
                <span className="font-bold text-white">{video.progressPercent}%</span>
              </div>
              <div className="mt-1 w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    video.statusColor === "emerald"
                      ? "bg-emerald-500"
                      : video.statusColor === "amber"
                      ? "bg-amber-500"
                      : video.statusColor === "blue"
                      ? "bg-blue-500"
                      : "bg-zinc-600"
                  }`}
                  style={{ width: `${video.progressPercent}%` }}
                />
              </div>

              {/* Title & Description */}
              <h3 className="mt-3 text-lg font-bold tracking-tight text-white transition-colors group-hover:text-emerald-400 leading-snug">
                {video.title}
              </h3>
              <p className="mt-1 text-xs text-zinc-400 leading-relaxed line-clamp-2">
                {video.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* View on YouTube Button */}
        <div className="mt-14 flex justify-center">
          <a
            href={REAL_CHANNEL_INFO.channelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors border border-white/10 bg-[#0e0e12] hover:bg-white/10 text-white shadow-sm h-12 px-6 text-sm"
          >
            Đăng ký nhận thông báo công chiếu trên YouTube @neuron-bio
          </a>
        </div>
      </section>

      {/* Embedded Roadmap Section on Homepage */}
      <section className="mx-auto w-full max-w-6xl px-6 py-6">
        <GrowthChart />
      </section>

      {/* Suggestion / Next Video Call to Action */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-20">
        <div className="mt-12 text-center rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-10 sm:p-14">
          <h2 className="text-3xl font-extrabold tracking-tight text-balance text-white sm:text-4xl">
            Video tiếp theo nên nói về điều gì?
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-zinc-400 leading-relaxed">
            Bạn có thắc mắc sinh học kỳ lạ nào chưa có lời giải? Hãy gửi gợi ý chủ đề kèm ly cà phê ủng hộ để team tiếp tục giải mã thế giới vi mô.
          </p>

          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-center">
            <Link
              href="/donate"
              className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap transition-colors bg-white text-black hover:bg-zinc-200 shadow-md h-14 px-8 text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
                className="text-red-500"
                aria-hidden="true"
              >
                <path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z" />
              </svg>
              Ủng hộ và gợi ý chủ đề
            </Link>

            <a
              href={`${REAL_CHANNEL_INFO.channelUrl}?sub_confirmation=1`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap transition-colors bg-white/10 text-white hover:bg-white/15 border border-white/10 shadow-sm h-14 px-8 text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 256 256"
                className="text-red-500"
                aria-hidden="true"
              >
                <path d="M234.33,69.52a24,24,0,0,0-14.49-16.4C185.56,39.88,131,40,128,40s-57.56-.12-91.84,13.12a24,24,0,0,0-14.49,16.4C19.08,79.5,16,97.74,16,128s3.08,48.5,5.67,58.48a24,24,0,0,0,14.49,16.41C69,215.56,120.4,216,127.34,216h1.32c6.94,0,58.37-.44,91.18-13.11a24,24,0,0,0,14.49-16.41c2.59-10,5.67-28.22,5.67-58.48S236.92,79.5,234.33,69.52Zm-73.74,65-40,28A8,8,0,0,1,108,156V100a8,8,0,0,1,12.59-6.55l40,28a8,8,0,0,1,0,13.1Z" />
              </svg>
              Đăng ký kênh
            </a>
          </div>
        </div>
      </section>

      {/* Video Modal Preview with Live YouTube Player Embed */}
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}
