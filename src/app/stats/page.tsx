import type { Metadata } from "next";
import Link from "next/link";
import GrowthChart from "@/components/GrowthChart";
import { REAL_CHANNEL_INFO, REAL_VIDEO_LIST } from "@/data/stats";
import { getLiveVideos } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Số liệu & Hành trình phát triển | Neuron",
  description:
    "Thông tin thực tế kênh YouTube @neuron-bio (thành lập 06/06/2019), lộ trình sản xuất series hoạt hình sinh học 60fps và kế hoạch phát hành.",
};

export default async function StatsPage() {
  const { videos, liveCount } = await getLiveVideos();

  // Find if Episode 1 or others are live
  const ep1 = videos.find((v) => v.id === "cay-het-sieu-am");
  const isEp1Live = ep1?.isPublished;

  return (
    <div className="relative isolate flex flex-col flex-1 pb-24">
      {/* Background smooth ambient dark glow (taste-skill, no harsh barcode stripes) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px] bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(34,197,94,0.12),rgba(255,255,255,0))]"
      />

      {/* Hero Header */}
      <section className="relative w-full">
        <div className="relative mx-auto w-full max-w-5xl px-6 pt-6 pb-8 sm:pt-12 md:pt-16 text-center sm:text-left">
          <div className="flex flex-wrap items-center gap-2 mb-5 justify-center sm:justify-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Số liệu thực tế kênh YouTube @neuron-bio
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono text-zinc-300">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{liveCount > 0 ? `${liveCount} video đang phát hành` : "Tự động đồng bộ với YouTube"}</span>
            </div>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.08]">
            Hành trình khoa học
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-emerald-400">
              qua từng khung hình 60fps
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed">
            Kênh YouTube chính thức <strong>neuron biology</strong> (<code>@neuron-bio</code>), đã tham gia vào <strong>ngày 06 tháng 06 năm 2019</strong>. Dưới đây là thông số thực tế, lộ trình sản xuất series hoạt hình và kế hoạch phát hành từng tập.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5 justify-center sm:justify-start">
            <a
              href={REAL_CHANNEL_INFO.channelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold transition-all bg-white text-black hover:bg-zinc-200 shadow-lg h-12 px-6 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" className="text-red-600">
                <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z" />
              </svg>
              Xem kênh YouTube
            </a>
            <Link
              href="/donate"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold transition-all bg-white/10 text-white hover:bg-white/15 border border-white/10 h-12 px-6 text-sm"
            >
              Ủng hộ kênh
            </Link>
          </div>
        </div>
      </section>

      {/* KPI Stats Grid: FIXED LAYOUT (No more text clipping or truncation) */}
      <section className="mx-auto w-full max-w-5xl px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Ngày tham gia YouTube */}
          <div className="rounded-2xl border border-white/10 bg-[#0e0e12] p-5 sm:p-6 transition-all duration-300 hover:border-white/20">
            <div className="text-xs text-zinc-400 font-medium mb-1.5 flex items-center justify-between">
              <span>Ngày tham gia YouTube</span>
              <span className="size-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">
              {REAL_CHANNEL_INFO.joinedDate}
            </div>
            <div className="mt-1 text-[11px] text-zinc-500 font-mono">
              Thành lập 06/06/2019
            </div>
          </div>

          {/* Card 2: Quốc gia & Kênh */}
          <div className="rounded-2xl border border-white/10 bg-[#0e0e12] p-5 sm:p-6 transition-all duration-300 hover:border-white/20">
            <div className="text-xs text-zinc-400 font-medium mb-1.5 flex items-center justify-between">
              <span>Kênh chính thức</span>
              <span className="text-emerald-400 text-xs">VN</span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-emerald-400 tracking-tight">
              {REAL_CHANNEL_INFO.handle}
            </div>
            <div className="mt-1 text-[11px] text-zinc-500">
              Quốc gia: {REAL_CHANNEL_INFO.country}
            </div>
          </div>

          {/* Card 3: Chuẩn Dựng Hoạt Hình */}
          <div className="rounded-2xl border border-white/10 bg-[#0e0e12] p-5 sm:p-6 transition-all duration-300 hover:border-white/20">
            <div className="text-xs text-zinc-400 font-medium mb-1.5 flex items-center justify-between">
              <span>Định dạng Video</span>
              <span className="text-xs font-mono text-zinc-400">1080p</span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">
              {REAL_CHANNEL_INFO.fps}
            </div>
            <div className="mt-1 text-[11px] text-zinc-500">
              {REAL_CHANNEL_INFO.standard}
            </div>
          </div>

          {/* Card 4: Tập Mở Màn */}
          <div className="rounded-2xl border border-white/10 bg-[#0e0e12] p-5 sm:p-6 transition-all duration-300 hover:border-white/20">
            <div className="text-xs text-zinc-400 font-medium mb-1.5 flex items-center justify-between">
              <span>Tập 01 Mở Màn</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${isEp1Live ? "bg-emerald-500 text-black" : "bg-emerald-500/20 text-emerald-400"}`}>
                {isEp1Live ? "ĐÃ CHIẾU" : "16:04"}
              </span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-emerald-400 tracking-tight truncate">
              Cây Hét Siêu Âm
            </div>
            <div className="mt-1 text-[11px] text-zinc-500">
              {isEp1Live ? "Đã phát hành trên YouTube" : "Tần số 40–80 kHz • Sắp chiếu"}
            </div>
          </div>
        </div>
      </section>

      {/* Main Roadmap Section */}
      <section className="mx-auto w-full max-w-5xl px-6 py-6">
        <GrowthChart />
      </section>

      {/* Real Video Pipeline Table with live YouTube status */}
      <section className="mx-auto w-full max-w-5xl px-6 py-8">
        <div className="rounded-3xl border border-white/10 bg-[#0e0e12] p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5 gap-2">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Kế hoạch phát hành 6 tập phim đầu tiên
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Quy trình nghiên cứu và dựng hoạt hình vector tuân thủ NEURON_VIDEO_PLAYBOOK
              </p>
            </div>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-mono text-emerald-400 self-start sm:self-auto">
              Chuẩn 60 FPS
            </span>
          </div>

          {/* Video List */}
          <div className="mt-6 divide-y divide-white/5">
            {videos.slice(0, 6).map((video, idx) => (
              <div
                key={video.id || idx}
                className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-white/[0.02] px-3 -mx-3 rounded-xl transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <span className="font-mono text-xs font-bold text-emerald-400 rounded-md bg-emerald-500/10 px-2.5 py-1 border border-emerald-500/20 shrink-0">
                    {video.episode}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      {video.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                      <span className="text-emerald-400/90">{video.tag}</span>
                      <span>•</span>
                      <span>⏱ {video.duration}</span>
                      <span>•</span>
                      <span>⚡ {video.fps} FPS</span>
                      {video.citations && video.citations.length > 0 && (
                        <>
                          <span>•</span>
                          <span>📚 {video.citations.length} tài liệu khoa học</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="sm:shrink-0 self-end sm:self-center flex items-center gap-2">
                  {video.isPublished && video.youtubeUrl ? (
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-mono font-bold text-black hover:bg-emerald-400 transition-colors flex items-center gap-1.5"
                    >
                      <span>▶ Xem trên YouTube</span>
                    </a>
                  ) : (
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-mono font-medium ${
                        video.statusBadge === "Sắp công chiếu"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold"
                          : "bg-white/5 text-zinc-400 border border-white/5"
                      }`}
                    >
                      {video.statusBadge || "Đang phát triển"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}