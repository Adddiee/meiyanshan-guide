import RarityHelp from "@/components/RarityHelp";
import SpeciesGrid from "@/components/SpeciesGrid";
import { getSpecies } from "@/lib/species";

export default async function Home() {
  const species = await getSpecies();

  const speciesCount = species.length;

  const photoCount = species.reduce(
    (sum, item) => sum + item.gallery.length,
    0
  );

  const latestDate = species
    .map((item) => item.firstSeen)
    .filter(Boolean)
    .sort()
    .at(-1);

  const latestMonth = latestDate
    ? new Date(latestDate)
        .toLocaleString("en-US", { month: "short" })
        .toUpperCase()
    : "JUN";

  const latestYear = latestDate ? new Date(latestDate).getFullYear() : 2026;

  const categories = [
    "全部",
    ...Array.from(new Set(species.map((item) => item.category))),
  ];

  return (
    <main className="min-h-screen bg-[#faf9f5] text-[#1d1d1f]">
      <header className="mx-auto max-w-7xl px-5 py-6 md:px-10 md:py-10">
        <div className="flex items-start gap-3 md:gap-6">
          <div className="min-w-0">
            <h1 className="text-3xl font-black tracking-wide sm:text-4xl md:text-5xl">
              美艷山海域生物圖鑑
            </h1>

            <p className="mt-2 text-base text-stone-500 sm:text-xl md:text-2xl">
              MEIYANSHAN Marine Life Journal
            </p>
          </div>

          <img
            src="/MYS-LOGO.svg"
            alt="MYS Logo"
            className="mt-[-4px] h-16 w-16 shrink-0 object-contain sm:h-20 sm:w-20 md:mt-[-8px] md:h-24 md:w-24"
          />
        </div>
      </header>

      <section className="relative mx-auto min-h-[480px] max-w-7xl overflow-hidden px-5 pb-20 pt-8 md:min-h-[760px] md:px-10 md:pb-24 md:pt-12">
        <div className="absolute right-0 top-0 h-[680px] w-full overflow-hidden rounded-sm md:h-[760px]">
          <img
            src="/hero-water.jpg"
            alt="美艷山水面與海底"
            className="h-full w-full object-cover opacity-95"
            style={{ objectPosition: "70% center" }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#faf9f5] via-[#faf9f5]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#faf9f5]" />
        </div>

        <div className="relative z-10 max-w-xl pt-16 md:pt-20">
          <p className="mb-7 text-xs font-semibold uppercase tracking-[0.35em] text-[#2d7780] md:mb-9 md:text-sm md:tracking-[0.45em]">
            Explore Before You Dive
          </p>

          <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.08em] md:text-[6rem]">
            下水前，
            <br />
            先看看今天
            <br />
            會遇見誰。
          </h1>

          <p className="mt-8 max-w-sm text-base font-medium leading-8 text-stone-600 md:mt-10 md:max-w-xl md:text-lg md:leading-9">
            美艷山海域生物圖鑑。
            <br />
            記錄每一次下潛遇見的生命，
            <br />
            也幫助下一位潛水員找到牠們。
          </p>

          <div className="mt-12 flex items-start gap-7 md:mt-20 md:gap-16">
            <div>
              <p className="font-sans text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                {String(speciesCount).padStart(2, "0")}
              </p>
              <p className="mt-2 whitespace-nowrap text-xs font-medium tracking-wide text-stone-500 md:mt-3 md:text-sm">
                已收錄物種
              </p>
            </div>

            <div className="h-14 w-px bg-stone-300 md:h-20" />

            <div>
              <p className="font-sans text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                {String(photoCount).padStart(2, "0")}
              </p>
              <p className="mt-2 whitespace-nowrap text-xs font-medium tracking-wide text-stone-500 md:mt-3 md:text-sm">
                照片紀錄
              </p>
            </div>

            <div className="h-14 w-px bg-stone-300 md:h-20" />

            <div>
              <p className="font-sans text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                {latestMonth}
              </p>
              <p className="mt-2 whitespace-nowrap text-xs font-medium tracking-wide text-stone-500 md:mt-3 md:text-sm">
                最後更新 · {latestYear}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#faf9f5] px-5 pb-24 pt-4 md:px-10 md:pb-32 md:pt-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 border-t border-stone-300 pt-12 md:mb-14 md:pt-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#2d7780] md:mb-4 md:text-sm md:tracking-[0.4em]">
              Field Guide
            </p>

           <div className="flex items-center gap-3">
              <h2 className="text-5xl font-black tracking-tight">
                圖鑑收錄
              </h2>

              <RarityHelp />
            </div>

            <p className="mt-5 max-w-xl text-base leading-8 text-stone-600 md:mt-6 md:text-lg">
              看看今天能遇見誰。
              <br />
              有些很常見，有些可能要找上好幾次才有機會相遇。
            </p>

            <SpeciesGrid species={species} categories={categories} />
          </div>
        </div>
      </section>

      <footer className="bg-[#f4f2ec] px-5 py-10 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 text-sm text-stone-600 md:flex-row md:items-end md:justify-between">
          <p className="max-w-sm text-2xl font-semibold leading-10 tracking-wide text-[#2d7780]">
            記錄每一次下潛，
            <br />
            遇見海洋的驚喜。
          </p>
          <p className="flex-1 px-4 text-center leading-8 text-stone-600 max-w-2xl mx-auto">

            <span className="font-medium">

              © 2026 美艷山圖鑑計畫 All Rights Reserved.

            </span>
            <br />
            我們熱愛海洋，也樂意分享這份美好。
            希望您也尊重並珍惜潛水員們找到的寶藏。


            <span className="block max-w-3xl mx-auto">

              本站所有圖片、影片及文字內容均受著作權法保護。
              歡迎轉載分享，惟請註明出處；未經授權，不得重製、散布或作商業用途。
            </span>
            <span className="text-[#2d7780]">

              🐢 溫馨提醒：沒有註明出處的人，容易錯過大物、遇不到魚群風暴，海蛞蝓也會默默躲起來。

            </span>

          </p>
          <div className="flex gap-8 text-3xl text-black">
            <span>◎</span>
            <span>✉</span>
          </div>
        </div>
      </footer>
    </main>
  );
}