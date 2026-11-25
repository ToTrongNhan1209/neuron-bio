import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neuron-bio.com"),
  title: "Sinh học, Tế bào & Tự nhiên kể bằng animation | Neuron",
  description:
    "Neuron là kênh YouTube tiếng Việt giải thích sinh học, thực vật học, thế giới vi mô và tự nhiên bằng animation tối giản chuẩn 60fps. Mỗi video trả lời một câu hỏi hóc búa về sự sống.",
  keywords: [
    "Neuron",
    "Neuron Bio",
    "animation sinh học",
    "khoa học",
    "thực vật học",
    "cây biết hét",
    "quang hợp lượng tử",
    "miễn dịch học",
    "CRISPR",
    "Median Lab",
  ],
  authors: [{ name: "Neuron Lab", url: "https://www.youtube.com/@neuron-bio" }],
  openGraph: {
    title: "Sinh học, Tế bào & Tự nhiên kể bằng animation | Neuron",
    description:
      "Neuron là kênh YouTube tiếng Việt giải thích sinh học, thực vật học, thế giới vi mô và tự nhiên bằng animation tối giản chuẩn 60fps.",
    url: "https://neuron-bio.com",
    siteName: "Neuron",
    images: [
      {
        url: "/videos/cay-het-sieu-am.png",
        width: 1920,
        height: 1080,
        alt: "Neuron - Sinh học bằng Animation",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sinh học, Tế bào & Tự nhiên kể bằng animation | Neuron",
    description:
      "Neuron là kênh YouTube tiếng Việt giải thích sinh học, thực vật học, thế giới vi mô bằng animation 60fps.",
    images: ["/videos/cay-het-sieu-am.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`dark ${jakarta.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#070709] text-[#f4f4f5] antialiased selection:bg-emerald-500/30 selection:text-white">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
