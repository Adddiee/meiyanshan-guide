"use client";

import { useState } from "react";
import {
  FaInstagram,
  FaLine,
  FaFacebook,
  FaThreads,
  FaLink,
  FaImage,
  FaDownload,
} from "react-icons/fa6";

export default function ShareButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cardCopied, setCardCopied] = useState(false);
  const [processingCard, setProcessingCard] = useState(false);

  function getSpeciesId() {
    return window.location.pathname.split("/").filter(Boolean).pop();
  }

  async function getCardBlob() {
    const id = getSpeciesId();

    if (!id) {
      throw new Error("找不到物種編號");
    }

    const imageUrl = `/api/share-card/${encodeURIComponent(id)}`;
    const response = await fetch(imageUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`收藏卡產生失敗：${response.status}`);
    }

    const originalBlob = await response.blob();

    if (!originalBlob.size) {
      throw new Error("收藏卡內容為空");
    }

    const pngBlob =
      originalBlob.type === "image/png"
        ? originalBlob
        : new Blob([originalBlob], {
            type: "image/png",
          });

    return {
      id,
      blob: pngBlob,
    };
  }

  async function downloadCard(blob: Blob, id: string) {
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = downloadUrl;
    link.download = `${id}-MYS-card.png`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => {
      URL.revokeObjectURL(downloadUrl);
    }, 1000);
  }

  async function copyCardImage() {
    if (processingCard) return;

    try {
      setProcessingCard(true);
      setCardCopied(false);

      const { id, blob } = await getCardBlob();

      const canCopyImage =
        typeof navigator.clipboard?.write === "function" &&
        typeof ClipboardItem !== "undefined";

      if (canCopyImage) {
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": blob,
          }),
        ]);

        setCardCopied(true);

        setTimeout(() => {
          setCardCopied(false);
        }, 2500);

        return;
      }

      await downloadCard(blob, id);

      alert(
        "目前瀏覽器不支援直接複製圖片，已自動下載收藏卡 PNG。"
      );
    } catch (error) {
      console.error("複製收藏卡失敗：", error);

      alert(
        "目前無法複製收藏卡圖片，請改用「下載收藏卡」。"
      );
    } finally {
      setProcessingCard(false);
    }
  }

  async function handleDownloadCard() {
    if (processingCard) return;

    try {
      setProcessingCard(true);

      const { id, blob } = await getCardBlob();

      await downloadCard(blob, id);
      setOpen(false);
    } catch (error) {
      console.error("下載收藏卡失敗：", error);
      alert("收藏卡下載失敗，請稍後再試。");
    } finally {
      setProcessingCard(false);
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1800);
    } catch (error) {
      console.error("複製連結失敗：", error);
      alert("複製連結失敗，請手動複製網址。");
    }
  }

  function shareToLine() {
    const url = encodeURIComponent(window.location.href);

    window.open(
      `https://social-plugins.line.me/lineit/share?url=${url}`,
      "_blank",
      "noopener,noreferrer"
    );

    setOpen(false);
  }

  function shareToFacebook() {
    const url = encodeURIComponent(window.location.href);

    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank",
      "noopener,noreferrer"
    );

    setOpen(false);
  }

  function shareToThreads() {
    const text = encodeURIComponent(
      `${document.title}\n${window.location.href}`
    );

    window.open(
      `https://www.threads.net/intent/post?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );

    setOpen(false);
  }

  async function shareToInstagram() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setOpen(false);

      alert(
        "Instagram 目前不支援網頁直接分享連結。\n\n已幫你複製連結，可到 Instagram 限時動態或貼文貼上。"
      );
    } catch (error) {
      console.error("Instagram 連結複製失敗：", error);
      alert("無法自動複製連結，請手動複製網址。");
    }
  }

  const itemClass =
    "flex flex-col items-center gap-2 text-xs font-semibold text-stone-600";

  const iconClass =
    "flex h-12 w-12 items-center justify-center rounded-full bg-[#f4f2ec] text-2xl shadow-sm transition hover:scale-105";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="開啟分享選單"
        className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-[#2d7780] transition hover:bg-[#f4f2ec]"
      >
        分享

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 12v5a2 2 0 002 2h6a2 2 0 002-2v-5M12 3v12m0-12l-4 4m4-4l4 4"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-3 w-80 rounded-3xl border border-stone-200 bg-white p-5 shadow-2xl">
          <p className="mb-4 text-center text-sm font-semibold text-stone-500">
            分享這個物種
          </p>

          <div className="grid grid-cols-4 gap-4">
            <button
              type="button"
              onClick={shareToInstagram}
              className={itemClass}
            >
              <span className={iconClass}>
                <FaInstagram className="text-pink-500" />
              </span>
              Instagram
            </button>

            <button
              type="button"
              onClick={shareToLine}
              className={itemClass}
            >
              <span className={iconClass}>
                <FaLine className="text-[#06C755]" />
              </span>
              LINE
            </button>

            <button
              type="button"
              onClick={shareToFacebook}
              className={itemClass}
            >
              <span className={iconClass}>
                <FaFacebook className="text-[#1877F2]" />
              </span>
              Facebook
            </button>

            <button
              type="button"
              onClick={shareToThreads}
              className={itemClass}
            >
              <span className={iconClass}>
                <FaThreads className="text-black" />
              </span>
              Threads
            </button>
          </div>

          <div className="mt-5 border-t border-stone-200 pt-5">
            <p className="mb-3 text-center text-xs font-semibold tracking-wide text-stone-400">
              收藏卡
            </p>

            <button
              type="button"
              onClick={copyCardImage}
              disabled={processingCard}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2d7780] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#25666d] disabled:cursor-wait disabled:opacity-60"
            >
              <FaImage />

              {processingCard
                ? "正在產生收藏卡…"
                : cardCopied
                  ? "已複製收藏卡"
                  : "複製收藏卡圖片"}
            </button>

            <p className="mt-2 text-center text-[11px] leading-5 text-stone-400">
              複製後可嘗試直接貼到 LINE、訊息或其他支援圖片貼上的 App
            </p>

            <button
              type="button"
              onClick={handleDownloadCard}
              disabled={processingCard}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-3 text-sm font-semibold text-[#2d7780] transition hover:bg-[#f4f2ec] disabled:cursor-wait disabled:opacity-60"
            >
              <FaDownload />
              下載收藏卡
            </button>
          </div>

          <button
            type="button"
            onClick={copyLink}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#f4f2ec] px-4 py-3 text-sm font-semibold text-[#2d7780] transition hover:bg-[#ebe7dd]"
          >
            <FaLink />
            {copied ? "已複製連結" : "複製網頁連結"}
          </button>
        </div>
      )}
    </div>
  );
}