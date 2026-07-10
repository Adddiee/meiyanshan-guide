"use client";

import { useState } from "react";

function TankLevel({
  level,
  icon = "/icons/search-difficulty01.png",
  compact = false,
}: {
  level: number;
  icon?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "flex items-center justify-end gap-1.5 text-white"
          : "flex items-center gap-1.5 text-[#2d7780]"
      }
    >
      <img
        src={icon}
        alt="搜尋難度"
        className={compact ? "h-5 w-auto shrink-0" : "h-[24px] w-auto shrink-0"}
      />
      <span className={compact ? "text-xs font-semibold" : "text-base font-semibold"}>
        {level.toFixed(1)}
      </span>
    </div>
  );
}

function SpeciesImage({
  item,
  className = "",
}: {
  item: any;
  className?: string;
}) {
  if (item.imageFit === "contain") {
    return (
      <div className={`relative w-full overflow-hidden ${className}`}>
        <img
          src={item.thumbnail}
          alt=""
          className="absolute inset-0 h-full w-full scale-125 object-cover opacity-80 blur-2xl"
        />

        <div className="absolute inset-0 bg-black/25" />

        <img
          src={item.thumbnail}
          alt={item.chineseName}
          className="relative z-10 h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <img
      src={item.thumbnail}
      alt={item.chineseName}
      className={`w-full object-cover transition duration-700 group-hover:scale-105 ${className}`}
    />
  );
}

function RarityLevel({
  rarity,
  compact = false,
}: {
  rarity: string;
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "flex items-center justify-end gap-1.5 text-white"
          : "flex items-center gap-2 text-[#a77b55]"
      }
    >
      <img
        src="/icons/treasure.png"
        alt="稀有度"
        className={compact ? "h-5 w-auto shrink-0" : "h-6 w-auto shrink-0"}
      />
      <span className={compact ? "text-xs font-semibold" : "text-base font-semibold"}>
        {rarity}
      </span>
    </div>
  );
}

export default function SpeciesGrid({
  species,
  categories,
}: {
  species: any[];
  categories: string[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("全部");

  const filteredSpecies =
    selectedCategory === "全部"
      ? species
      : species.filter((item) => item.category === selectedCategory);

  function categoryCount(category: string) {
    if (category === "全部") return species.length;
    return species.filter((item) => item.category === category).length;
  }

  return (
    <div>
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => {
          const isActive = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={
                isActive
                  ? "shrink-0 rounded-full bg-[#2d7780] px-4 py-2 text-sm font-medium text-white"
                  : "shrink-0 rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-600"
              }
            >
              {category} {categoryCount(category)}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-5 lg:hidden">
        {filteredSpecies.map((item) => (
          <a
            key={item.id}
            href={`/species/${item.id}`}
            className="group cursor-pointer transition duration-300 active:scale-[0.98]"
          >
            <div className="relative overflow-hidden rounded-2xl bg-black">
              <SpeciesImage item={item} className="aspect-square" />

              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 z-20 p-3 text-white">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] opacity-80">
                  {item.id}
                </p>

                <div className="mt-2 flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-[15px] font-semibold leading-tight tracking-[-0.04em]">
                      {item.chineseName}
                    </h3>

                    <p className="mt-1 line-clamp-1 text-[11px] text-white/75">
                      {item.englishName}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <RarityLevel rarity={item.rarity} compact />

                    <div className="mt-1">
                      <TankLevel
                        level={item.searchDifficulty}
                        icon="/icons/search-difficulty02.png"
                        compact
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-10 hidden grid-cols-3 gap-x-8 gap-y-14 lg:grid">
        {filteredSpecies.map((item) => (
          <article key={item.id} className="group flex h-full flex-col">
            <a href={`/species/${item.id}`} className="flex h-full flex-col">
              <div className="overflow-hidden rounded-2xl bg-[#f0eee8]">
                <SpeciesImage item={item} className="aspect-[4/3]" />
              </div>

              <div className="flex flex-1 flex-col pt-7">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a77b55]">
                  {item.id} · {item.category}
                </p>

                <div className="min-h-[112px]">
                  <h3 className="mt-4 line-clamp-2 text-3xl font-semibold tracking-[-0.06em]">
                    {item.chineseName}
                  </h3>

                  <p className="mt-3 line-clamp-1 text-xl text-stone-500">
                    {item.englishName}
                  </p>

                  <p className="mt-1 line-clamp-1 text-sm italic text-stone-400">
                    {item.scientificName}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <RarityLevel rarity={item.rarity} />

                  <span className="text-stone-300">·</span>

                  <TankLevel level={item.searchDifficulty} />
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}