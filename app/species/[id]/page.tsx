import { getSpecies } from "@/lib/species";
import PhotoCarousel from "@/components/PhotoCarousel";

function TankLevel({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1 text-sm font-medium text-[#2d7780]">
      <span>🤿</span>
      <span>{level.toFixed(1)}</span>
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
  const species = await getSpecies();

  const item = species.find((speciesItem) => speciesItem.id === id);

  if (!item) {
    return (
      <main className="min-h-screen bg-[#faf9f5] px-8 py-16 text-[#1d1d1f]">
        <a href="/" className="text-sm font-semibold text-[#2d7780]">
          ← 回到圖鑑
        </a>
        <h1 className="mt-10 text-4xl font-semibold">找不到這個物種</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f5] text-[#1d1d1f]">
      <section className="mx-auto max-w-7xl px-5 pt-8 md:px-8 md:pt-10">
        <a href="/" className="text-sm font-semibold text-[#2d7780]">
          ← 回到圖鑑
        </a>
      </section>

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

      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-24">
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