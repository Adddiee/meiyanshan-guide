<<<<<<< HEAD
import PhotoCarousel from "@/components/PhotoCarousel";

const species = {
  "MYS-001": {
    id: "MYS-001",
    chineseName: "釉彩蠟膜蝦",
    englishName: "Harlequin Shrimp",
    scientificName: "Hymenocera picta",
    category: "甲殼類",
    description:
      "白色身體搭配藍紫色、粉紅色斑塊，外型像穿著彩繪盔甲的小蝦。牠主要以海星為食，是美艷山很值得細找的明星物種。",
    treasureHint:
      "有人正在吃晚餐。如果你找到一顆海星，不妨再多看一眼。",
    rarity: "★★★★☆",
    searchDifficulty: 3,
    depth: "5-20m",
    habitat: "礁石縫隙、海星附近、珊瑚礁區",
    location: "美艷山",
    firstSeen: "2026-06-13",
    photographer: "Lori",
    bestSeason: "全年",
    size: "約3-5cm",
    gallery: [
      "/釉彩蠟膜蝦01_20260613.jpg",
      "/釉彩蠟膜蝦02_20260613.jpg",
      "/釉彩蠟膜蝦03_20260613.jpg",
    ],
  },
  "MYS-002": {
    id: "MYS-002",
    chineseName: "卡森瘤背海蛞蝓",
    englishName: "Carson's Dorid",
    scientificName: "Jorunna parva group / Carson's dorid",
    category: "海蛞蝓",
    description:
      "體型嬌小，外表覆蓋細小突起，看起來像一團白色絨球。屬於海蛞蝓的一種，經常出現在礁岩與海綿生長區域。",
    treasureHint:
      "礁岩上有一小團棉花。如果它好像變了位置，那就不是棉花。",
    rarity: "★★★☆☆",
    searchDifficulty: 3,
    depth: "5-25m",
    habitat: "岩礁表面、海綿附近、海藻區",
    location: "美艷山",
    firstSeen: "2026-06-13",
    photographer: "Lori",
    bestSeason: "冬春較常見",
    size: "約1-3cm",
    gallery: [
      "/卡森瘤背海蛞蝓01_20260613.jpg",
      "/卡森瘤背海蛞蝓02_20260613.jpg",
    ],
  },
  "MYS-003": {
    id: "MYS-003",
    chineseName: "日本矛吻海龍",
    englishName: "Japanese Ghost Pipefish",
    scientificName: "Solenostomus japonicus",
    category: "魚類",
    description:
      "身體細長，擁有極佳的擬態能力。常利用體色與外型融入海藻或海草環境，是潛水員最容易錯過的魚類之一。",
    treasureHint: "你以為自己在看海草。牠也希望你這麼想。",
    rarity: "★★★★☆",
    searchDifficulty: 4,
    depth: "10-35m",
    habitat: "沙地邊緣、海藻區、碎石與礁區交界",
    location: "美艷山",
    firstSeen: "2026-06-13",
    photographer: "Lori",
    bestSeason: "春夏",
    size: "約10-20cm",
    gallery: [
      "/日本矛吻海龍01_202603.jpg",
      "/日本矛吻海龍02_202603.jpg",
    ],
  },
};

function TankLevel({ level }: { level: number }) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((tank) => (
        <div
          key={tank}
          className={`h-7 w-4 rounded-full border ${
            tank <= level
              ? "border-[#2d7780] bg-[#2d7780]"
              : "border-stone-300 bg-transparent"
          }`}
        />
      ))}
=======
import { getSpecies } from "@/lib/species";
import PhotoCarousel from "@/components/PhotoCarousel";

function TankLevel({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1 text-sm font-medium text-[#2d7780]">
      <span>🤿</span>
      <span>{level.toFixed(1)}</span>
>>>>>>> 8e12887 (update species data and image layout)
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-sm text-stone-500">{label}</p>
      <p className="text-base font-semibold leading-7 text-[#1d1d1f]">
        {value}
      </p>
    </div>
  );
}

export default async function SpeciesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
<<<<<<< HEAD
  const item = species[id as keyof typeof species];

  if (!item) {
    return (
      <main className="min-h-screen bg-[#faf9f5] px-10 py-20 text-[#1d1d1f]">
        <h1 className="text-4xl font-semibold">找不到這個物種</h1>
=======
  const species = await getSpecies();

  const item = species.find((speciesItem) => speciesItem.id === id);

  if (!item) {
    return (
      <main className="min-h-screen bg-[#faf9f5] px-8 py-16 text-[#1d1d1f]">
        <a href="/" className="text-sm font-semibold text-[#2d7780]">
          ← 回到圖鑑
        </a>
        <h1 className="mt-10 text-4xl font-semibold">找不到這個物種</h1>
>>>>>>> 8e12887 (update species data and image layout)
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f5] text-[#1d1d1f]">
<<<<<<< HEAD
      <section className="mx-auto max-w-7xl px-8 pt-10">
=======
      <section className="mx-auto max-w-7xl px-5 pt-8 md:px-8 md:pt-10">
>>>>>>> 8e12887 (update species data and image layout)
        <a href="/" className="text-sm font-semibold text-[#2d7780]">
          ← 回到圖鑑
        </a>
      </section>

<<<<<<< HEAD
      <section className="mx-auto max-w-7xl px-8 pt-8">
        <PhotoCarousel photos={item.gallery} name={item.chineseName} />
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-8 py-12 md:grid-cols-[0.65fr_1.35fr]">
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-[#2d7780]">
=======
      <section className="mx-auto max-w-7xl px-5 pt-6 md:px-8 md:pt-8">
        <PhotoCarousel
        photos={item.gallery}
        name={item.chineseName}
        layout={item.imageLayout}
        />
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-10 md:grid-cols-[0.65fr_1.35fr] md:px-8 md:py-12">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#2d7780]">
>>>>>>> 8e12887 (update species data and image layout)
            {item.id}
          </p>

          <h1 className="text-5xl font-semibold tracking-[-0.06em]">
            {item.chineseName}
          </h1>

          <p className="mt-4 text-2xl text-stone-500">{item.englishName}</p>

          <p className="mt-2 italic text-stone-400">{item.scientificName}</p>

          <div className="mt-8 grid max-w-md grid-cols-2 gap-8">
            <div>
              <p className="mb-2 text-sm text-stone-500">稀有度</p>
              <p className="text-xl tracking-widest text-[#a77b55]">
                {item.rarity}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-stone-500">尋找難度</p>
              <TankLevel level={item.searchDifficulty} />
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <section>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#2d7780]">
              Treasure Hint
            </p>
            <h2 className="mb-4 text-3xl font-semibold tracking-[-0.05em]">
              尋寶提示
            </h2>
            <p className="text-2xl font-medium leading-10 text-stone-700">
              {item.treasureHint}
            </p>
          </section>

          <section className="border-t border-stone-300 pt-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#2d7780]">
              Description
            </p>
            <h2 className="mb-4 text-3xl font-semibold tracking-[-0.05em]">
              物種介紹
            </h2>
            <p className="text-lg leading-9 text-stone-700">
              {item.description}
            </p>
          </section>
        </div>
      </section>

<<<<<<< HEAD
      <section className="mx-auto max-w-7xl px-8 pb-24">
=======
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-24">
>>>>>>> 8e12887 (update species data and image layout)
        <div className="border-t border-stone-300 pt-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#2d7780]">
            Field Notes
          </p>

          <h2 className="mb-8 text-3xl font-semibold tracking-[-0.05em]">
            基本資訊
          </h2>

          <div className="grid gap-x-12 gap-y-7 md:grid-cols-4">
            <Info label="分類" value={item.category} />
            <Info label="體型" value={item.size} />
            <Info label="深度" value={item.depth} />
            <Info label="棲地" value={item.habitat} />
            <Info label="季節" value={item.bestSeason} />
            <Info label="地點" value={item.location} />
            <Info label="首次紀錄" value={item.firstSeen} />
            <Info label="拍攝者" value={item.photographer} />
          </div>
        </div>
      </section>
    </main>
  );
}