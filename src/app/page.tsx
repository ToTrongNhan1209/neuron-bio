import { Metadata } from "next";
import { getLiveVideos } from "@/lib/youtube";
import HomePageClient from "@/components/HomePageClient";

export const metadata: Metadata = {
  title: "Neuron - Sinh học, Tế bào & Hoạt hình 60fps",
  description:
    "Kênh YouTube giải thích sinh học, thực vật học và thế giới vi mô bằng animation vector 60fps chuẩn khoa học. Khám phá các bí ẩn tự nhiên qua từng khung hình.",
};

export default async function HomePage() {
  const { videos, liveCount } = await getLiveVideos();

  return (
    <HomePageClient
      initialVideos={videos}
      initialLiveCount={liveCount}
    />
  );
}