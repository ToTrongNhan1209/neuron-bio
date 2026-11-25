"use client";

import { useState } from "react";
import { ROADMAP_DATA, RoadmapPoint } from "@/data/stats";

export default function GrowthChart() {
  const [selectedPoint, setSelectedPoint] = useState<RoadmapPoint>(ROADMAP_DATA[2]);

  return (
    <div className="w-full rounded-3xl border border-white/10 bg-[#0c0c10] p-6 sm:p-8 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
              Lộ Trình Phát Hành & Kế Hoạch Sản Xuất
            </span>
          </div>
          <h3 className="mt-1 text-2xl font-bold text-white tracking-tight">
            Tiến Trình Sản Xuất Series Hoạt Hình 60FPS
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Dữ liệu thực tế kênh @neuron-bio (thành lập 06/06/2019) • Cập nhật tiến độ sản xuất từng tập
          </p>
        </div>

        <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-mono text-zinc-300 self-start sm:self-auto">
          Chuẩn HyperFrames 60FPS
        </span>
      </div>

      {/* Visual Roadmap Steps Bar */}
      <div className="mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {ROADMAP_DATA.map((item, idx) => {
            const isSelected = selectedPoint.title === item.title;
            const isCurrent = item.status === "current";
            return (
              <button
                key={idx}
                onClick={() => setSelectedPoint(item)}
                className={`flex flex-col items-start p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-white/10 border-emerald-500 shadow-md shadow-emerald-500/10"
                    : isCurrent
                    ? "bg-emerald-500/5 border-emerald-500/40 hover:bg-emerald-500/10"
                    : "bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/15"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="font-mono text-[11px] font-bold text-zinc-400">
                    {item.date}
                  </span>
                  <span
                    className={`size-2 rounded-full ${
                      item.status === "completed"
                        ? "bg-white"
                        : item.status === "current"
                        ? "bg-emerald-400 animate-ping"
                        : "bg-zinc-600"
                    }`}
                  />
                </div>
                <div className="text-xs font-bold text-white truncate w-full">
                  {item.stage}
                </div>
                <span
                  className={`mt-2 rounded-md px-2 py-0.5 text-[10px] font-mono font-medium ${
                    item.status === "completed"
                      ? "bg-white/10 text-zinc-300"
                      : item.status === "current"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-white/5 text-zinc-500"
                  }`}
                >
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Roadmap Highlight Card */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
                {selectedPoint.date} • {selectedPoint.stage}
              </span>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] text-emerald-400 font-mono">
                {selectedPoint.badge}
              </span>
            </div>
            <h4 className="mt-1.5 text-lg font-bold text-white">
              {selectedPoint.title}
            </h4>
            <p className="mt-1 text-sm text-zinc-400 leading-relaxed max-w-2xl">
              {selectedPoint.description}
            </p>
          </div>

          <a
            href="https://www.youtube.com/@neuron-bio"
            target="_blank"
            rel="noreferrer"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold transition-all bg-white text-black hover:bg-zinc-200 px-5 py-2.5 text-xs shrink-0 self-start sm:self-center shadow"
          >
            Theo dõi trên YouTube
          </a>
        </div>
      </div>
    </div>
  );
}
