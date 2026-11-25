"use client";

import { useEffect } from "react";
import Image from "next/image";
import { VideoItem } from "@/data/videos";

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (video) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl rounded-3xl border border-white/10 bg-[#0e0e12] p-5 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng cửa sổ"
          className="absolute top-5 right-5 z-20 flex size-9 items-center justify-center rounded-full bg-white/10 text-zinc-300 hover:bg-white/20 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Video Player or Thumbnail Frame */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
          {video.youtubeVideoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeVideoId}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 size-full border-0"
            />
          ) : (
            <>
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1 text-xs font-mono font-bold text-white">
                    {video.episode}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md border ${
                      video.statusColor === "emerald"
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                        : video.statusColor === "amber"
                        ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                        : video.statusColor === "blue"
                        ? "bg-blue-500/20 text-blue-400 border-blue-500/40"
                        : "bg-white/10 text-zinc-300 border-white/10"
                    }`}
                  >
                    {video.statusLabel}
                  </span>
                  <span className="rounded-full bg-black/60 px-2.5 py-1 text-xs font-mono text-zinc-300 border border-white/10">
                    ⏱ {video.duration}
                  </span>
                  <span className="rounded-full bg-black/60 px-2.5 py-1 text-xs font-mono text-zinc-300 border border-white/10">
                    ⚡ {video.fps} FPS
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="mt-6">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
            <span>{video.tag}</span>
            <span>•</span>
            <span>
              {video.isPublished
                ? `Đã phát hành ngày ${video.publishedDate || "mới nhất"}`
                : `Tiến độ hoàn thiện: ${video.progressPercent}%`}
            </span>
          </div>

          <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {video.title}
          </h2>

          {/* Progress Bar & Details */}
          <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-zinc-400">Tiến trình sản xuất:</span>
              <span className="font-bold text-white">{video.progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  video.statusColor === "emerald"
                    ? "bg-emerald-500"
                    : video.statusColor === "amber"
                    ? "bg-amber-500"
                    : video.statusColor === "blue"
                    ? "bg-blue-500"
                    : "bg-zinc-500"
                }`}
                style={{ width: `${video.progressPercent}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-zinc-300 leading-relaxed font-mono">
              💡 {video.progressDetails}
            </p>
          </div>

          <p className="mt-4 text-sm text-zinc-300 leading-relaxed">
            {video.description}
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={video.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full font-semibold transition-all bg-white text-black hover:bg-zinc-200 px-6 py-3 text-sm shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" className="text-red-600">
                <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z" />
              </svg>
              {video.isPublished ? "Xem trực tiếp trên YouTube" : "Đăng ký theo dõi trên YouTube @neuron-bio"}
            </a>
            <a
              href="/donate"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold transition-all bg-white/10 text-white hover:bg-white/15 px-5 py-3 text-sm border border-white/10"
            >
              Ủng hộ sản xuất tập này
            </a>
          </div>

          {/* Timestamps */}
          {video.timestamps && video.timestamps.length > 0 && (
            <div className="mt-8 border-t border-white/10 pt-6">
              <h3 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase font-mono">
                Mục lục & Các mốc thời gian (Timestamps)
              </h3>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {video.timestamps.map((ts, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2 text-xs text-zinc-300"
                  >
                    <span className="font-mono font-semibold text-emerald-400">
                      {ts.time}
                    </span>
                    <span className="truncate">{ts.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Citations */}
          {video.citations && video.citations.length > 0 && (
            <div className="mt-6 border-t border-white/10 pt-6">
              <h3 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase font-mono">
                Tài liệu nghiên cứu khoa học tham khảo (Citations)
              </h3>
              <ul className="mt-3 space-y-2 text-xs text-zinc-400 list-disc list-inside">
                {video.citations.map((cite, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {cite}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
