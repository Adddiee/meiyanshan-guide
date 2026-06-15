const species = [
  {
    id: "MYS-001",
    name: "釉彩蠟膜蝦",
    englishName: "Harlequin Shrimp",
    scientificName: "Hymenocera picta",
    category: "甲殼類",
    difficulty: "★★★★☆",
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
    difficulty: "★★★☆☆",
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
    difficulty: "★★★★☆",
    image: "/日本矛吻海龍01_202603.jpg",
    note: "細長、擬態感強，常常明明在眼前卻很容易錯過。",
    layout: "landscape",
  },
];

function imageClass(layout: string) {
  if (layout === "landscape") {
    return "aspect-[16/9] object-cover";
  }

  if (layout === "portrait") {
    return "aspect-[4/5] object-cover";
  }

  return "aspect-square object-cover";
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf9f5] text-[#1d1d1f]">
      <header className="mx-auto flex max-w-7xl items-start justify-between px-10 py-10">
        <div>
          <p className="text-lg font-semibold tracking-[0.24em]">
            美艷山海域生物圖鑑
          </p>
          <p className="mt-1 text-sm tracking-wide text-stone-600">
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

      <section className="relative mx-auto min-h-[760px] max-w-7xl overflow-hidden px-10 pb-24 pt-12">
        <div className="absolute right-0 top-0 h-[760px] w-[100%] overflow-hidden rounded-sm">
          <img
            src="/hero-water.jpg"
            alt="美艷山水面與海底"
            className="h-full w-full object-cover opacity-95"
            style={{
              objectPosition: "70% center",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#faf9f5] via-[#faf9f5]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#faf9f5]" />
        </div>

        <div className="relative z-10 max-w-xl pt-20">
          <p className="mb-9 text-sm font-semibold uppercase tracking-[0.45em] text-[#2d7780]">
            Explore Before You Dive
          </p>

          <h1 className="text-6xl font-semibold leading-[1.02] tracking-[-0.08em] md:text-[6rem]">
            下水前，
            <br />
            先看看今天
            <br />
            會遇見誰。
          </h1>

          <p className="mt-10 max-w-xl text-lg font-medium leading-9 text-stone-600">
            美艷山海域生物圖鑑。
            <br />
            記錄每一次下潛遇見的生命，
            <br />
            也幫助下一位潛水員找到牠們。
          </p>

          <div className="mt-20 flex items-start gap-16">
            <div>
              <p className="font-sans text-6xl font-semibold tracking-[-0.05em] text-[#1d1d1f]">
                03
              </p>
              <p className="mt-3 whitespace-nowrap text-sm font-medium tracking-wide text-stone-500">
                已收錄物種
              </p>
            </div>

            <div className="h-20 w-px bg-stone-300" />

            <div>
              <p className="font-sans text-6xl font-semibold tracking-[-0.05em] text-[#1d1d1f]">
                07
              </p>
              <p className="mt-3 whitespace-nowrap text-sm font-medium tracking-wide text-stone-500">
                照片紀錄
              </p>
            </div>

            <div className="h-20 w-px bg-stone-300" />

            <div>
              <p className="font-sans text-6xl font-semibold tracking-[-0.05em] text-[#1d1d1f]">
                JUN
              </p>
              <p className="mt-3 whitespace-nowrap text-sm font-medium tracking-wide text-stone-500">
                最後更新 · 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#faf9f5] px-10 pb-32 pt-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 border-t border-stone-300 pt-16">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.4em] text-[#2d7780]">
              Field Guide
            </p>

            <h2 className="text-5xl font-semibold tracking-[-0.06em]">
              圖鑑收錄
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
              看看今天能遇見誰。
              <br />
              有些很常見，有些可能要找上好幾次才有機會相遇。
            </p>
          </div>

          <div className="columns-1 gap-8 md:columns-2 lg:columns-3">
            {species.map((item) => (
              <article
                key={item.id}
                className="mb-14 break-inside-avoid group"
              >
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

                  <div className="mt-5 inline-flex rounded-full bg-[#edf1ef] px-4 py-2 text-sm font-medium text-stone-600">
                    尋找難度 {item.difficulty}
                  </div>

                  <p className="mt-6 max-w-sm text-base leading-8 text-stone-600">
                    {item.note}
                  </p>

                  <a className="mt-8 inline-flex items-center gap-8 text-sm font-semibold text-[#2d7780]">
                    查看詳情
                    <span className="text-2xl leading-none">→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#f4f2ec] px-10 py-10">
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