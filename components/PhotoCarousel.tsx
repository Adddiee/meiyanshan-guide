"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function PhotoCarousel({
  photos,
  name,
  layout = "square",
}: {
  photos: string[];
  name: string;
  layout?: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const isLandscape = layout === "landscape";

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden rounded-[1.5rem]">
        <div className="flex">
          {photos.map((photo) => (
            <div key={photo} className="min-w-full">
              {isLandscape ? (
                <div className="relative h-[260px] w-full overflow-hidden bg-black md:h-[420px]">
                  <img
                    src={photo}
                    alt=""
                    className="absolute inset-0 h-full w-full scale-150 object-cover blur-2xl opacity-75"
                  />

                  <div className="absolute inset-0 bg-black/25" />

                  <img
                    src={photo}
                    alt={name}
                    className="relative z-10 h-full w-full object-contain"
                  />
                </div>
              ) : (
                <img
                  src={photo}
                  alt={name}
                  className="h-[320px] w-full object-cover md:h-[420px]"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {photos.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/80 text-xl text-[#1d1d1f] shadow-sm backdrop-blur transition hover:bg-white md:flex"
          >
            ←
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/80 text-xl text-[#1d1d1f] shadow-sm backdrop-blur transition hover:bg-white md:flex"
          >
            →
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/35 px-3 py-2 backdrop-blur">
            {photos.map((photo, index) => (
              <button
                key={photo}
                onClick={() => scrollTo(index)}
                className={`h-1.5 rounded-full transition ${
                  selectedIndex === index
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/45"
                }`}
              />
            ))}
          </div>

          <div className="absolute right-4 top-4 rounded-full bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {selectedIndex + 1} / {photos.length}
          </div>
        </>
      )}
    </div>
  );
}