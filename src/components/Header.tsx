"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NeuronLogo from "./NeuronLogo";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { label: "Video", href: "/#videos" },
    { label: "Số liệu & Hành trình", href: "/stats" },
    { label: "Ủng hộ", href: "/donate" },
  ];

  return (
    <header className="w-full px-6 py-6 sm:px-10 z-30 transition-all border-b border-white/[0.04]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-90"
          aria-label="Neuron — về trang chủ"
        >
          <NeuronLogo size="md" withAura />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Điều hướng chính">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 h-9 px-3.5 text-xs sm:text-sm focus-visible:ring-1 focus-visible:outline-none ${
                  isActive
                    ? "bg-white/10 text-white font-bold border border-white/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* YouTube Quick Link button */}
          <a
            href="https://www.youtube.com/@neuron-bio"
            target="_blank"
            rel="noreferrer"
            aria-label="Kênh YouTube @neuron-bio"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 h-9 px-3.5 text-xs text-zinc-300 hover:text-white hover:bg-white/10 border border-white/10 ml-1.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 256 256"
              className="text-red-500"
              aria-hidden="true"
            >
              <path d="M234.33,69.52a24,24,0,0,0-14.49-16.4C185.56,39.88,131,40,128,40s-57.56-.12-91.84,13.12a24,24,0,0,0-14.49,16.4C19.08,79.5,16,97.74,16,128s3.08,48.5,5.67,58.48a24,24,0,0,0,14.49,16.41C69,215.56,120.4,216,127.34,216h1.32c6.94,0,58.37-.44,91.18-13.11a24,24,0,0,0,14.49-16.41c2.59-10,5.67-28.22,5.67-58.48S236.92,79.5,234.33,69.52Zm-73.74,65-40,28A8,8,0,0,1,108,156V100a8,8,0,0,1,12.59-6.55l40,28a8,8,0,0,1,0,13.1Z" />
            </svg>
            <span className="hidden sm:inline">YouTube</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
