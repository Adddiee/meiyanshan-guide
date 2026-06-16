"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function PhotoCarousel({
  photos,
  name,
}: {
  photos: string[];
  name: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden rounded-[1.5rem]">
        <div className="flex">
          {photos.map((photo) => (
            <div key={photo} className="min-w-full">
              <img
                src={photo}
                alt={name}
                className="h-[420px] w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-5 right-5 flex gap-3">
        <button
          onClick={scrollPrev}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/80 text-xl text-[#1d1d1f] backdrop-blur transition hover:bg-white"
        >
          ←
        </button>

        <button
          onClick={scrollNext}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/80 text-xl text-[#1d1d1f] backdrop-blur transition hover:bg-white"
        >
          →
        </button>
      </div>
    </div>
  );
}