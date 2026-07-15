"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

function isVideoUrl(url: string) {
  return (
    url.includes("/preview") ||
    url.includes("drive.google.com/file/d/") ||
    /\.(mp4|mov|webm)(\?|$)/i.test(url)
  );
}

function toPreviewUrl(url: string) {
  return url.replace("/view", "/preview");
}

function normalizeImagePosition(position?: string) {
  const normalized = String(position || "")
    .trim()
    .toLowerCase();

  const allowedPositions = [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top left",
    "top right",
    "bottom left",
    "bottom right",
    "center top",
    "center bottom",
    "left center",
    "right center",
  ];

  return allowedPositions.includes(normalized)
    ? normalized
    : "center";
}

function MobileWatermarkLogo() {
  return (
    <img
      src="/logo-watermark.png"
      alt=""
      draggable={false}
      onContextMenu={(event) => event.preventDefault()}
      className="
        pointer-events-none
        absolute
        z-30
        select-none
        opacity-90
        drop-shadow-[0_0_12px_rgba(0,0,0,0.7)]
      "
      style={{
        width: "15%",
        maxWidth: "150px",
        right: "2%",
        bottom: "1%",
      }}
    />
  );
}

function DesktopWatermarkLogo() {
  return (
    <img
      src="/logo-watermark.png"
      alt=""
      draggable={false}
      onContextMenu={(event) => event.preventDefault()}
      className="
        pointer-events-none
        absolute
        bottom-[2%]
        right-[2%]
        z-30
        w-[150px]
        max-w-[22%]
        select-none
        opacity-90
        drop-shadow-[0_0_12px_rgba(0,0,0,0.7)]
      "
    />
  );
}

function DesktopContainedImage({
  photo,
  name,
  imagePosition,
}: {
  photo: string;
  name: string;
  imagePosition: string;
}) {
  return (
    <>
      {/* 桌機模糊背景 */}
      <img
        src={photo}
        alt=""
        draggable={false}
        onContextMenu={(event) => event.preventDefault()}
        className="
          absolute
          inset-0
          hidden
          h-full
          w-full
          scale-150
          object-cover
          opacity-75
          blur-2xl
          md:block
        "
        style={{
          objectPosition: imagePosition,
        }}
      />

      <div className="absolute inset-0 hidden bg-black/25 md:block" />

      {/* 桌機主圖與浮水印共同容器 */}
      <div
        className="
          absolute
          inset-0
          z-10
          hidden
          items-center
          justify-center
          md:flex
        "
      >
        <div
          className="
            relative
            flex
            h-full
            max-w-full
            items-center
            justify-center
          "
        >
          <img
            src={photo}
            alt={name}
            draggable={false}
            onContextMenu={(event) => event.preventDefault()}
            className="block h-full max-w-full object-contain"
            style={{
              objectPosition: imagePosition,
            }}
          />

          <DesktopWatermarkLogo />
        </div>
      </div>
    </>
  );
}

export default function PhotoCarousel({
  photos,
  name,
  layout = "square",
  imagePosition = "center",
}: {
  photos: string[];
  name: string;
  layout?: string;
  imagePosition?: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });

  const isLandscape = layout === "landscape";

  const resolvedImagePosition =
    normalizeImagePosition(imagePosition);

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
      setSelectedIndex(
        emblaApi.selectedScrollSnap()
      );
    };

    onSelect();
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  if (!photos.length) {
    return (
      <div
        className="
          flex
          h-[320px]
          w-full
          items-center
          justify-center
          rounded-[1.5rem]
          bg-stone-200
          text-sm
          font-medium
          text-stone-500
          md:h-[540px]
          lg:h-[600px]
        "
      >
        暫無圖片
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={emblaRef}
        className="overflow-hidden rounded-[1.5rem]"
      >
        <div className="flex">
          {photos.map((photo, index) => {
            const isVideo = isVideoUrl(photo);
            const videoSrc = toPreviewUrl(photo);

            return (
              <div
                key={`${photo}-${index}`}
                className="min-w-full"
              >
                {isVideo ? (
                  <div
                    onContextMenu={(event) =>
                      event.preventDefault()
                    }
                    className={
                      isLandscape
                        ? `
                          relative
                          h-[260px]
                          w-full
                          overflow-hidden
                          bg-black
                          md:h-[540px]
                          lg:h-[600px]
                        `
                        : `
                          relative
                          h-[320px]
                          w-full
                          overflow-hidden
                          bg-black
                          md:h-[540px]
                          lg:h-[600px]
                        `
                    }
                  >
                    <iframe
                      src={videoSrc}
                      title={`${name} video ${index + 1}`}
                      className="h-full w-full border-0"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                    />

                    <MobileWatermarkLogo />
                  </div>
                ) : isLandscape ? (
                  <div
                    onContextMenu={(event) =>
                      event.preventDefault()
                    }
                    className="
                      relative
                      h-[260px]
                      w-full
                      overflow-hidden
                      bg-black
                      md:h-[540px]
                      lg:h-[600px]
                    "
                  >
                    {/* 手機版 landscape 背景 */}
                    <img
                      src={photo}
                      alt=""
                      draggable={false}
                      onContextMenu={(event) =>
                        event.preventDefault()
                      }
                      className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        scale-150
                        object-cover
                        opacity-75
                        blur-2xl
                        md:hidden
                      "
                      style={{
                        objectPosition:
                          resolvedImagePosition,
                      }}
                    />

                    <div className="absolute inset-0 bg-black/25 md:hidden" />

                    {/* 手機版 landscape 完整主圖 */}
                    <img
                      src={photo}
                      alt={name}
                      draggable={false}
                      onContextMenu={(event) =>
                        event.preventDefault()
                      }
                      className="
                        relative
                        z-10
                        h-full
                        w-full
                        object-contain
                        md:hidden
                      "
                      style={{
                        objectPosition:
                          resolvedImagePosition,
                      }}
                    />

                    <div className="md:hidden">
                      <MobileWatermarkLogo />
                    </div>

                    {/* 平板與桌機 */}
                    <DesktopContainedImage
                      photo={photo}
                      name={name}
                      imagePosition={
                        resolvedImagePosition
                      }
                    />
                  </div>
                ) : (
                  <div
                    onContextMenu={(event) =>
                      event.preventDefault()
                    }
                    className="
                      relative
                      h-[320px]
                      w-full
                      overflow-hidden
                      bg-black
                      md:h-[540px]
                      lg:h-[600px]
                    "
                  >
                    {/* 手機：square 維持 cover */}
                    <img
                      src={photo}
                      alt={name}
                      draggable={false}
                      onContextMenu={(event) =>
                        event.preventDefault()
                      }
                      className="
                        h-full
                        w-full
                        object-cover
                        md:hidden
                      "
                      style={{
                        objectPosition:
                          resolvedImagePosition,
                      }}
                    />

                    <div className="md:hidden">
                      <MobileWatermarkLogo />
                    </div>

                    {/* 平板與桌機：模糊背景＋完整圖片 */}
                    <DesktopContainedImage
                      photo={photo}
                      name={name}
                      imagePosition={
                        resolvedImagePosition
                      }
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="上一張圖片"
            className="
              absolute
              left-4
              top-1/2
              hidden
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-white/60
              bg-white/80
              text-xl
              text-[#1d1d1f]
              shadow-sm
              backdrop-blur
              transition
              hover:bg-white
              md:flex
            "
          >
            ←
          </button>

          <button
            type="button"
            onClick={scrollNext}
            aria-label="下一張圖片"
            className="
              absolute
              right-4
              top-1/2
              hidden
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-white/60
              bg-white/80
              text-xl
              text-[#1d1d1f]
              shadow-sm
              backdrop-blur
              transition
              hover:bg-white
              md:flex
            "
          >
            →
          </button>

          <div
            className="
              absolute
              bottom-4
              left-1/2
              z-40
              flex
              -translate-x-1/2
              items-center
              gap-2
              rounded-full
              bg-black/35
              px-3
              py-2
              backdrop-blur
            "
          >
            {photos.map((photo, index) => (
              <button
                type="button"
                key={`${photo}-dot-${index}`}
                onClick={() => scrollTo(index)}
                aria-label={`前往第 ${index + 1} 張圖片`}
                className={`h-1.5 rounded-full transition ${
                  selectedIndex === index
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/45"
                }`}
              />
            ))}
          </div>

          <div
            className="
              absolute
              right-4
              top-4
              z-40
              rounded-full
              bg-black/35
              px-3
              py-1
              text-xs
              font-medium
              text-white
              backdrop-blur
            "
          >
            {selectedIndex + 1} / {photos.length}
          </div>
        </>
      )}
    </div>
  );
}