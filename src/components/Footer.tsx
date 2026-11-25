import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/[0.06] pt-14 pb-0 overflow-hidden bg-[#050507]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          {/* Social Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Kênh chính thức
            </h3>
            <div className="flex items-center gap-2">
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@neuron-bio"
                target="_blank"
                rel="noreferrer"
                aria-label="Kênh YouTube @neuron-bio"
                title="YouTube @neuron-bio"
                className="bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white inline-flex size-9 items-center justify-center rounded-xl transition-colors border border-white/5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M234.33,69.52a24,24,0,0,0-14.49-16.4C185.56,39.88,131,40,128,40s-57.56-.12-91.84,13.12a24,24,0,0,0-14.49,16.4C19.08,79.5,16,97.74,16,128s3.08,48.5,5.67,58.48a24,24,0,0,0,14.49,16.41C69,215.56,120.4,216,127.34,216h1.32c6.94,0,58.37-.44,91.18-13.11a24,24,0,0,0,14.49-16.41c2.59-10,5.67-28.22,5.67-58.48S236.92,79.5,234.33,69.52Zm-73.74,65-40,28A8,8,0,0,1,108,156V100a8,8,0,0,1,12.59-6.55l40,28a8,8,0,0,1,0,13.1Z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@neuron.bio"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok @neuron.bio"
                title="TikTok @neuron.bio"
                className="bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white inline-flex size-9 items-center justify-center rounded-xl transition-colors border border-white/5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.89-4.47V8.7a8.28 8.28 0 0 0 4.88 1.58V6.84a4.88 4.88 0 0 1-1-.15Z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/neuron.bio"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook @neuron.bio"
                title="Facebook"
                className="bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white inline-flex size-9 items-center justify-center rounded-xl transition-colors border border-white/5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact / Sponsorship */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Hợp tác, tài trợ & Nghiên cứu
            </h3>
            <a
              href="mailto:neuronbio.lab@gmail.com"
              className="text-zinc-300 hover:text-emerald-400 inline-flex items-center gap-1.5 transition-colors text-sm font-mono"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              neuronbio.lab@gmail.com
            </a>
            <p className="text-xs text-zinc-500 max-w-sm">
              Sản xuất hoạt hình khoa học, sinh học vi mô & thực vật học 60fps.
            </p>
          </div>

          {/* Navigation & Copyright */}
          <div className="flex flex-col gap-2.5 sm:items-end">
            <div className="flex items-center gap-4 text-xs text-zinc-400 font-medium">
              <Link href="/" className="hover:text-white transition-colors">
                Trang chủ
              </Link>
              <Link href="/#videos" className="hover:text-white transition-colors">
                Video
              </Link>
              <Link href="/stats" className="hover:text-white transition-colors">
                Số liệu & Hành trình
              </Link>
              <Link href="/donate" className="hover:text-white transition-colors">
                Ủng hộ
              </Link>
            </div>
            <p className="text-zinc-500 text-xs font-mono">
              © 2026 Neuron • Kênh hoạt hình khoa học sinh học 60fps
            </p>
          </div>
        </div>
      </div>

      {/* Giant masked watermark at bottom */}
      <div className="-mt-8 sm:-mt-12 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div
          className="text-white/[0.05] translate-y-[32%] text-center text-[clamp(7rem,25vw,18rem)] leading-none font-black tracking-tighter"
          style={{
            maskImage: "linear-gradient(to bottom, black 15%, transparent 75%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 15%, transparent 75%)",
          }}
        >
          neuron
        </div>
      </div>
    </footer>
  );
}
