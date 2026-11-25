"use client";

import { useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";

export default function DonatePage() {
  const [qrDisplayMode, setQrDisplayMode] = useState<"original" | "dynamic">("original");

  // Real Account info from uploaded QR image
  const bankName = "Techcombank";
  const bankFullName = "Ngân hàng TMCP Kỹ thương Việt Nam";
  const accountNumber = "1234678905";
  const accountName = "TO TRONG NHAN";

  const [amount, setAmount] = useState<number | "">("");
  const [memo, setMemo] = useState("Ung ho Neuron");
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const suggestedAmounts = [
    { label: "20.000đ", value: 20000, desc: "Cốc cà phê nhỏ" },
    { label: "50.000đ", value: 50000, desc: "Tiếp lửa 1 tập" },
    { label: "100.000đ", value: 100000, desc: "Ủng hộ nghiên cứu" },
    { label: "200.000đ", value: 200000, desc: "Đồng hành nhiệt thành" },
    { label: "500.000đ", value: 500000, desc: "Tài trợ sản xuất" },
  ];

  const suggestedMemos = [
    "Ủng hộ Neuron ❤️",
    "Neuron ơi làm về ADN đi",
    "Cho mình xin một video về Miễn dịch học",
    "Ad giải thích Quang hợp lượng tử với",
    "Vì sao cây biết la hét khi khát nước?",
    "Làm về CRISPR-Cas9 nhé Neuron",
    "Một cốc cà phê cho người dựng animation ☕",
    "Nơ-ron và điện thế hoạt động hay quá",
    "Cảm ơn kênh, tiếp tục ra video nhé!",
  ];

  // Convert memo to ascii for VietQR banking compatibility
  const cleanMemo = (text: string) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .trim();
  };

  // Techcombank NAPAS code is TCB
  const dynamicVietQrUrl = `https://img.vietqr.io/image/TCB-1234678905-compact2.png?amount=${
    amount || ""
  }&addInfo=${encodeURIComponent(cleanMemo(memo))}&accountName=${encodeURIComponent(accountName)}`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);

    // Fire cute celebration confetti
    try {
      confetti({
        particleCount: 32,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#22c55e", "#ffffff", "#e11d48"],
      });
    } catch {
      // ignore
    }
  };

  const handleSelectMemo = (suggested: string) => {
    setMemo(suggested);
    setQrDisplayMode("dynamic");
    copyToClipboard(cleanMemo(suggested), "memo");
  };

  const handleSelectAmount = (val: number | "") => {
    setAmount(val);
    setQrDisplayMode("dynamic");
  };

  return (
    <div className="relative isolate flex flex-col flex-1 pb-24">
      {/* Background smooth ambient glow (taste-skill style) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[650px] bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(34,197,94,0.12),rgba(255,255,255,0))]"
      />

      {/* Header */}
      <section className="relative w-full">
        <div className="relative mx-auto w-full max-w-4xl px-6 pt-6 pb-8 sm:pt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 mb-5">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            Cổng ủng hộ & Đồng hành cùng Neuron
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Ủng hộ kênh
          </h1>
          <p className="mt-3 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Mọi đóng góp của bạn là nguồn động lực to lớn để Neuron tiếp tục nghiên cứu và sản xuất những thước phim hoạt hình khoa học 60fps chất lượng nhất. Xin cảm ơn sự hỗ trợ từ bạn! ❤️
          </p>
        </div>
      </section>

      {/* Main Donation Container: Techcombank Dedicated */}
      <section className="mx-auto w-full max-w-4xl px-6">
        <div className="grid gap-8 md:grid-cols-12 items-start">
          {/* Left Column: QR Code Display Card */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="w-full rounded-3xl border border-white/10 bg-[#0e0e12] p-6 text-center shadow-2xl flex flex-col items-center">
              
              {/* QR Mode Switch Tabs */}
              <div className="flex items-center gap-1.5 rounded-full bg-white/5 p-1 border border-white/5 mb-4 text-[11px] font-semibold w-full">
                <button
                  onClick={() => setQrDisplayMode("original")}
                  className={`flex-1 rounded-full py-1.5 transition-all ${
                    qrDisplayMode === "original"
                      ? "bg-emerald-500 text-black font-bold shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Mã QR gốc của bạn
                </button>
                <button
                  onClick={() => setQrDisplayMode("dynamic")}
                  className={`flex-1 rounded-full py-1.5 transition-all ${
                    qrDisplayMode === "dynamic"
                      ? "bg-emerald-500 text-black font-bold shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  QR tự điền số tiền
                </button>
              </div>

              {/* QR Image Frame */}
              <div className="relative aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-2xl bg-white p-2 shadow-inner border border-zinc-200 flex items-center justify-center">
                {qrDisplayMode === "original" ? (
                  <Image
                    src="/images/user_qr.png"
                    alt="Techcombank TO TRONG NHAN QR"
                    fill
                    priority
                    className="object-contain p-1"
                  />
                ) : (
                  <Image
                    src={dynamicVietQrUrl}
                    alt="VietQR Techcombank Dynamic"
                    fill
                    unoptimized
                    priority
                    className="object-contain p-2"
                  />
                )}
              </div>

              <div className="mt-3 text-[11px] font-mono text-zinc-400">
                {qrDisplayMode === "original"
                  ? "✓ Mã QR Techcombank chính chủ"
                  : "✓ Mã QR tự động cập nhật số tiền & lời nhắn"}
              </div>

              <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
                Mở ứng dụng ngân hàng bất kỳ (Techcombank, VCB, MB, MoMo...) và quét mã để chuyển khoản tức thì.
              </p>

              {/* Info preview pill */}
              <div className="mt-4 w-full rounded-xl bg-white/5 p-3 text-xs text-zinc-300 border border-white/5 text-left space-y-1.5 font-mono">
                <div className="flex justify-between">
                  <span className="text-zinc-400 font-sans">Số tiền:</span>
                  <span className="font-bold text-emerald-400">
                    {amount ? `${Number(amount).toLocaleString("vi-VN")} đ` : "Tùy tâm"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400 font-sans">Nội dung:</span>
                  <span className="text-white truncate max-w-[160px] font-medium">
                    {cleanMemo(memo)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Account Details & Interactive Controls */}
          <div className="md:col-span-7 flex flex-col gap-6">
            {/* Account Detail Card */}
            <div className="rounded-3xl border border-white/10 bg-[#0e0e12] p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Thông tin chuyển khoản</h2>
                <span className="rounded-full bg-red-500/15 border border-red-500/30 px-2.5 py-0.5 text-xs font-semibold text-red-400 font-mono">
                  Techcombank
                </span>
              </div>

              <div className="mt-5 space-y-3.5">
                {/* Bank */}
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3.5 border border-white/5">
                  <div>
                    <div className="text-xs text-zinc-400">Ngân hàng thụ hưởng</div>
                    <div className="text-sm font-semibold text-white">{bankFullName}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(bankName, "bank")}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                      copiedType === "bank"
                        ? "bg-emerald-500 text-black font-bold"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {copiedType === "bank" ? "Đã chép ✓" : "Sao chép"}
                  </button>
                </div>

                {/* Account Number */}
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3.5 border border-white/5">
                  <div>
                    <div className="text-xs text-zinc-400">Số tài khoản</div>
                    <div className="text-lg font-mono font-bold text-white tracking-wider">
                      {accountNumber}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(accountNumber, "stk")}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                      copiedType === "stk"
                        ? "bg-emerald-500 text-black font-bold"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {copiedType === "stk" ? "Đã chép STK ✓" : "Sao chép"}
                  </button>
                </div>

                {/* Account Name */}
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3.5 border border-white/5">
                  <div>
                    <div className="text-xs text-zinc-400">Tên người thụ hưởng</div>
                    <div className="text-sm font-bold text-white uppercase tracking-wide">
                      {accountName}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(accountName, "name")}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                      copiedType === "name"
                        ? "bg-emerald-500 text-black font-bold"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {copiedType === "name" ? "Đã chép tên ✓" : "Sao chép"}
                  </button>
                </div>
              </div>

              {/* Quick Amount Select Chips */}
              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Chọn mức ủng hộ nhanh
                  </label>
                  <span className="text-[11px] text-zinc-500">Tùy chọn</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestedAmounts.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => handleSelectAmount(s.value)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                        amount === s.value
                          ? "bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20"
                          : "bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/5"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                  <button
                    onClick={() => handleSelectAmount("")}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                      amount === ""
                        ? "bg-emerald-500 text-black font-bold"
                        : "bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/5"
                    }`}
                  >
                    Tùy tâm
                  </button>
                </div>
              </div>

              {/* Custom Memo Input */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Lời nhắn kèm theo
                  </label>
                  <button
                    onClick={() => copyToClipboard(cleanMemo(memo), "memo")}
                    className="text-xs text-emerald-400 hover:underline"
                  >
                    {copiedType === "memo" ? "Đã chép nội dung ✓" : "Sao chép lời nhắn"}
                  </button>
                </div>
                <input
                  type="text"
                  value={memo}
                  onChange={(e) => {
                    setMemo(e.target.value);
                    setQrDisplayMode("dynamic");
                  }}
                  placeholder="Nhập lời nhắn hoặc gợi ý chủ đề..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Suggested Memo Chips */}
            <div className="rounded-3xl border border-white/10 bg-[#0e0e12] p-6 sm:p-7 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white">Nội dung gợi ý (Bấm để tự điền & chép)</h3>
                <span className="text-xs text-zinc-500">Tự động gắn vào QR</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedMemos.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectMemo(item)}
                    className={`rounded-full px-3.5 py-1.5 text-xs transition-all text-left ${
                      memo === item
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 font-medium"
                        : "bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white border border-white/5"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
