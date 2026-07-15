"use client";

import { useEffect, useRef, useState } from "react";

const rarityLevels = [
  ["漂流物", "海裡的日常風景"],
  ["小發現", "常常會出現的小驚喜"],
  ["寶物", "偶爾送上的禮物"],
  ["稀有寶物", "並非每天都會現身，需要運氣"],
  ["珍寶", "需要等待對的季節，或符合特定條件"],
  ["秘寶", "一年可能只遇到幾次"],
  ["深海秘寶", "非常難遇見，值得專程尋找"],
  ["傳說秘寶", "幾乎不曾現身的夢幻紀錄"],
  ["海神寶藏", "美艷山代表級夢幻物種"],
];

const explorerLevels = [
  ["1.0", "新手探索者", "適合剛開始認識海洋生物的潛水員。"],
  ["2.0", "初階潛水員", "已能觀察多數常見生物，具備基本潛水能力。"],
  ["3.0", "進階觀察者", "擁有穩定中性浮力與良好觀察能力。"],
  ["4.0", "資深尋寶者", "能依環境、季節與生物習性尋找目標物種。"],
  [
    "5.0",
    "美艷山獵寶人",
    "能發現多數人容易錯過的珍稀生物，是美艷山真正的獵寶高手。",
  ],
];

export default function RarityHelp() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="group relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label="查看稀有度與尋找難度說明"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="
          inline-flex
          items-center
          justify-center
          text-[22px]
          leading-none
          text-[#2d7780]
          transition
          hover:scale-110
          hover:text-[#24656d]
          focus:outline-none
        "
      >
        ⓘ
      </button>

      <div
        className={`
          fixed
          left-1/2
          top-1/2
          z-[100]
          max-h-[82vh]
          w-[calc(100vw-2rem)]
          max-w-[40rem]
          -translate-x-1/2
          -translate-y-1/2
          overflow-y-auto
          rounded-3xl
          border
          border-stone-200
          bg-white
          p-5
          shadow-[0_24px_80px_rgba(50,40,30,0.24)]
          transition
          duration-150

          md:absolute
          md:left-0
          md:top-full
          md:mt-3
          md:max-h-[75vh]
          md:w-[40rem]
          md:max-w-[calc(100vw-4rem)]
          md:translate-x-0
          md:translate-y-0
          md:origin-top-left

          ${
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0 md:-translate-y-1"
          }
        `}
      >
        {/* 稀有度說明 */}
        <section>
          <div className="mb-4">
            <p className="text-sm font-semibold tracking-[0.16em] text-[#2d7780]">
              稀有度等級
            </p>

            <p className="mt-1 text-xs leading-5 text-stone-500">
              依美艷山海域的實際觀察紀錄與遇見頻率分類。
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-stone-200">
            <div className="grid grid-cols-[7rem_1fr] bg-[#f4f2ec] px-4 py-2.5 text-xs font-semibold text-stone-600">
              <div>等級</div>
              <div>說明</div>
            </div>

            <div className="divide-y divide-stone-100">
              {rarityLevels.map(([level, description]) => (
                <div
                  key={level}
                  className="grid grid-cols-[7rem_1fr] gap-3 px-4 py-2.5"
                >
                  <p className="text-sm font-semibold text-[#1d1d1f]">
                    {level}
                  </p>

                  <p className="text-sm leading-6 text-stone-600">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 尋找難度說明 */}
        <section className="mt-7 border-t border-stone-200 pt-6">
          <div className="mb-4">
            <p className="text-sm font-semibold tracking-[0.16em] text-[#2d7780]">
              尋找難度（探索等級）
            </p>

            <p className="mt-1 text-xs leading-5 text-stone-500">
              依潛水技巧、觀察能力，以及尋找目標物種所需的經驗進行分級。
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-stone-200">
            <div className="grid grid-cols-[3.5rem_7.5rem_1fr] bg-[#f4f2ec] px-4 py-2.5 text-xs font-semibold text-stone-600">
              <div>等級</div>
              <div>稱號</div>
              <div>說明</div>
            </div>

            <div className="divide-y divide-stone-100">
              {explorerLevels.map(([level, title, description]) => (
                <div
                  key={level}
                  className="grid grid-cols-[3.5rem_7.5rem_1fr] gap-3 px-4 py-3"
                >
                  <p className="text-sm font-semibold text-[#2d7780]">
                    {level}
                  </p>

                  <p className="text-sm font-semibold text-[#1d1d1f]">
                    {title}
                  </p>

                  <p className="text-sm leading-6 text-stone-600">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="
            mt-5
            flex
            w-full
            items-center
            justify-center
            rounded-full
            bg-[#f4f2ec]
            px-4
            py-2.5
            text-sm
            font-semibold
            text-[#2d7780]
            transition
            hover:bg-[#ebe7dd]
            md:hidden
          "
        >
          知道了
        </button>
      </div>

      {open && (
        <button
          type="button"
          aria-label="關閉說明"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[90] bg-black/25 backdrop-blur-[1px] md:hidden"
        />
      )}
    </div>
  );
}