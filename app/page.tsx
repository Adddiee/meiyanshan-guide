const species = [
  {
    id: "MYS-001",
    name: "釉彩蠟膜蝦",
    englishName: "Harlequin Shrimp",
    scientificName: "Hymenocera picta",
    category: "甲殼類",
    rarity: "★★★★☆",
    searchDifficulty: 3,
    image: "/釉彩蠟膜蝦01_20260613.jpg",
    note: "像彩繪瓷器一樣華麗，常與海星、礁縫環境有關。",
    layout: "square",
  },
  {
    id: "MYS-002",
    name: "卡森瘤背海蛞蝓",
    englishName: "Carson's Dorid",
    scientificName: "Jorunna parva group",
    category: "海蛞蝓",
    rarity: "★★★☆☆",
    searchDifficulty: 3,
    image: "/卡森瘤背海蛞蝓01_20260613.jpg",
    note: "白色身體與黃色突起非常醒目，適合新手練習觀察微小生物。",
    layout: "square",
  },
  {
    id: "MYS-003",
    name: "日本矛吻海龍",
    englishName: "Japanese Ghost Pipefish",
    scientificName: "Solenostomus japonicus",
    category: "魚類",
    rarity: "★★★★☆",
    searchDifficulty: 4,
    image: "/日本矛吻海龍01_202603.jpg",
    note: "細長、擬態感強，常常明明在眼前卻很容易錯過。",
    layout: "landscape",
  },
];

function imageClass(layout: string) {
  if (layout === "landscape") return "aspect-[16/9] object-cover";
  if (layout === "portrait") return "aspect-[4/5] object-cover";
  return "aspect-square object-cover";
}

function TankLevel({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((tank) => (
        <div
          key={tank}
          className={`h-4 w-2 rounded-full border ${
            tank <= level
              ? "border-[#2d7780] bg-[#2d7780]"
              : "border-stone-300 bg-transparent"
          }`}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf9f5] text-[#1d1d1f]">
      <header className="mx-auto flex max-w-7xl items-start justify-between px-5 py-6 md:px-10 md:py-10">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] md:text-lg md:tracking-[0.24em]">
            美艷山海域生物圖鑑
          </p>
          <p className="mt-1 text-xs tracking-wide text-stone-600 md:text-sm">
            MEIYANSHAN Marine Life Journal
          </p>
        </div>

        <nav className="hidden items-center gap-12 text-sm font-medium text-stone-700 md:flex">
          <span>圖鑑</span>
          <span>觀察紀錄</span>
          <span>關於計畫</span>
          <span className="text-2xl leading-none">☰</span>
        </nav>
      </header>

      <section className="relative mx-auto min-h-[680px] max-w-7xl overflow-hidden px-5 pb-20 pt-8 md:min-h-[760px] md:px-10 md:pb-24 md:pt-12">
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
                03
              </p>
              <p className="mt-2 whitespace-nowrap text-xs font-medium tracking-wide text-stone-500 md:mt-3 md:text-sm">
                已收錄物種
              </p>
            </div>

            <div className="h-14 w-px bg-stone-300 md:h-20" />

            <div>
              <p className="font-sans text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                07
              </p>
              <p className="mt-2 whitespace-nowrap text-xs font-medium tracking-wide text-stone-500 md:mt-3 md:text-sm">
                照片紀錄
              </p>
            </div>

            <div className="h-14 w-px bg-stone-300 md:h-20" />

            <div>
              <p className="font-sans text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                JUN
              </p>
              <p className="mt-2 whitespace-nowrap text-xs font-medium tracking-wide text-stone-500 md:mt-3 md:text-sm">
                最後更新 · 2026
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

            <h2 className="text-4xl font-semibold tracking-[-0.06em] md:text-5xl">
              圖鑑收錄
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-stone-600 md:mt-6 md:text-lg">
              看看今天能遇見誰。
              <br />
              有些很常見，有些可能要找上好幾次才有機會相遇。
            </p>
          </div>

          {/* Mobile / Tablet compact guide */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:hidden">
            {species.map((item) => (
              <a
                key={item.id}
                href={`/species/${item.id}`}
                className="group cursor-pointer transition duration-300 active:scale-[0.98]"
              >
                <div className="relative overflow-hidden rounded-2xl bg-[#f0eee8]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] opacity-80">
                      {item.id}
                    </p>
                    <h3 className="mt-1 line-clamp-2 text-[15px] font-semibold leading-tight tracking-[-0.04em]">
                      {item.name}
                    </h3>
                    <p className="mt-1 line-clamp-1 text-[11px] text-white/75">
                      {item.englishName}
                    </p>
                  </div>
                </div>

                <div className="pt-3">
                  <div className="space-y-2">
                    <div>
                      <p className="mb-1 text-[11px] font-medium text-stone-500">
                        稀有度
                      </p>
                      <p className="text-sm tracking-widest text-[#a77b55]">
                        {item.rarity}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1 text-[11px] font-medium text-stone-500">
                        尋找難度
                      </p>
                      <TankLevel level={item.searchDifficulty} />
                    </div>
                  </div>

                  <p className="mt-3 line-clamp-2 text-[11px] font-medium leading-4 text-stone-600">
                    {item.note}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Desktop masonry guide */}
          <div className="hidden columns-1 gap-8 lg:block lg:columns-3">
            {species.map((item) => (
              <article
                key={item.id}
                className="group mb-14 break-inside-avoid"
              >
                <a href={`/species/${item.id}`}>
                  <div className="overflow-hidden rounded-2xl bg-[#f0eee8]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`${imageClass(
                        item.layout
                      )} w-full transition duration-700 group-hover:scale-105`}
                    />
                  </div>

                  <div className="pt-7">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a77b55]">
                      {item.id} · {item.category}
                    </p>

                    <h3 className="mt-4 text-3xl font-semibold tracking-[-0.06em]">
                      {item.name}
                    </h3>

                    <p className="mt-3 text-xl text-stone-500">
                      {item.englishName}
                    </p>

                    <p className="mt-1 text-sm italic text-stone-400">
                      {item.scientificName}
                    </p>

                    <div className="mt-5 flex items-center gap-4">
                      <p className="text-lg tracking-widest text-[#a77b55]">
                        {item.rarity}
                      </p>
                      <TankLevel level={item.searchDifficulty} />
                    </div>

                    <p className="mt-6 max-w-sm text-base leading-8 text-stone-600">
                      {item.note}
                    </p>

                    <span className="mt-8 inline-flex items-center gap-8 text-sm font-semibold text-[#2d7780]">
                      查看詳情
                      <span className="text-2xl leading-none">→</span>
                    </span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#f4f2ec] px-5 py-10 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 text-sm text-stone-600 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xs text-lg leading-8 text-[#2d7780]">
            記錄每一次下潛，
            <br />
            遇見海洋的驚喜。
          </p>

          <p>© 2026 美艷山圖鑑計畫</p>

          <div className="flex gap-8 text-3xl text-black">
            <span>◎</span>
            <span>✉</span>
          </div>
        </div>
      </footer>
    </main>
  );
}