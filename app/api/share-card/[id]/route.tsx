import { ImageResponse } from "next/og";
import { getSpecies } from "@/lib/species";

export const runtime = "edge";

const WATERMARK_PATH = "/logo-watermark.png";

function cut(text: string, max: number) {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

function TreasureIcon() {
  return (
    <svg width="68" height="68" viewBox="0 0 64 64" fill="none">
      <path
        d="M10 28h44v24H10V28Z"
        stroke="#c79b38"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M16 28v-6c0-7 6-12 16-12s16 5 16 12v6"
        stroke="#c79b38"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M10 36h44" stroke="#c79b38" strokeWidth="4" />
      <path d="M32 28v24" stroke="#c79b38" strokeWidth="4" />
      <rect
        x="27"
        y="34"
        width="10"
        height="8"
        rx="2"
        stroke="#c79b38"
        strokeWidth="3"
      />
    </svg>
  );
}

function DifficultyIcon() {
  return (
    <svg width="68" height="68" viewBox="0 0 64 64" fill="none">
      <path
        d="M18 44c9-3 16-9 21-18"
        stroke="#2d7780"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M26 34l-8-8"
        stroke="#2d7780"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M39 26l10 8"
        stroke="#2d7780"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="43" cy="18" r="5" fill="#2d7780" />
      <circle cx="53" cy="11" r="4" fill="#2d7780" />
      <path
        d="M14 49c10 3 25 2 38-5"
        stroke="#2d7780"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const origin = new URL(request.url).origin;

  const species = await getSpecies();
  const item = species.find((speciesItem) => speciesItem.id === id);

  if (!item) {
    return new Response("Not found", { status: 404 });
  }

  const watermarkUrl = `${origin}${WATERMARK_PATH}`;
  const shortId = item.id.replace("MYS-", "");

  const basicInfo = [
    {
      label: "體型",
      value: item.size,
      width: "25%",
    },
    {
      label: "深度",
      value: item.depth,
      width: "25%",
    },
    {
      label: "季節",
      value: item.bestSeason,
      width: "25%",
    },
    {
      label: "棲地",
      value: cut(item.habitat, 20),
      width: "25%",
    },
    {
      label: "地點",
      value: item.location,
      width: "25%",
    },
    {
      label: "首次紀錄",
      value: item.firstSeen,
      width: "25%",
    },
    {
      label: "拍攝者",
      value: item.photographer,
      width: "50%",
    },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "1080px",
          height: "1440px",
          background:
            "linear-gradient(145deg,#080705 0%,#f5fbfb 45%,#d3e5e7 100%)",
          padding: "12px",
          display: "flex",
          fontFamily: "sans-serif",
          color: "#1d1d1f",
        }}
      >
        {/* 外層卡框 */}
        <div
          style={{
            width: "100%",
            height: "100%",
            padding: "8px",
            border: "3px solid #cfc1aa",
            borderRadius: "50px",
            background: "#DBBADD",
            boxShadow: "0 22px 60px rgba(65, 48, 30, 0.2)",
            display: "flex",
          }}
        >
          {/* 內層卡框 */}
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#fffdf8",
              border: "1px solid #e7ddcd",
              borderRadius: "40px",
              padding: "26px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* 圖片與名稱區 */}
            <div
              style={{
                width: "100%",
                height: "680px",
                borderRadius: "30px",
                overflow: "hidden",
                background: "#111",
                border: "2px solid rgba(255,255,255,0.5)",
                position: "relative",
                display: "flex",
              }}
            >
              <img
                src={item.thumbnail}
                alt={item.chineseName}
                width="1000"
                height="680"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit:
                    item.imageFit === "contain" ? "contain" : "cover",
                  position: "relative",
                  zIndex: 1,
                }}
              />

              {/* 左側深色漸層 */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 5,
                  display: "flex",
                  background:
                    "linear-gradient(90deg, rgba(8,15,16,0.92) 0%, rgba(8,15,16,0.77) 18%, rgba(8,15,16,0.34) 34%, rgba(8,15,16,0) 56%)",
                }}
              />

              {/* MYS 編號吊牌 */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "36px",
                  zIndex: 20,
                  width: "122px",
                  height: "174px",
                  padding: "28px 10px 24px",
                  borderRadius: "0 0 30px 30px",
                  background:
                    "linear-gradient(180deg, #347f87 0%, #246b73 100%)",
                  color: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.22)",
                }}
              >
                <div
                  style={{
                    fontSize: "25px",
                    fontWeight: 900,
                    letterSpacing: "5px",
                  }}
                >
                  MYS
                </div>

                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "31px",
                    fontWeight: 900,
                    letterSpacing: "4px",
                  }}
                >
                  {shortId}
                </div>
              </div>

              {/* 分類 */}
              <div
                style={{
                  position: "absolute",
                  top: "194px",
                  left: "58px",
                  zIndex: 20,
                  color: "#dfbd91",
                  fontSize: "23px",
                  fontWeight: 900,
                  letterSpacing: "4px",
                  textShadow: "0 2px 8px rgba(0,0,0,0.55)",
                }}
              >
                {item.category}
              </div>

              {/* 中文名稱 */}
              <div
                style={{
                  position: "absolute",
                  top: "248px",
                  left: "92px",
                  zIndex: 20,
                  color: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize: "48px",
                  fontWeight: 900,
                  lineHeight: 1.04,
                  letterSpacing: "1px",
                  textShadow: "0 3px 12px rgba(0,0,0,0.68)",
                }}
              >
                {Array.from(item.chineseName).map((character, index) => (
                  <div
                    key={`${character}-${index}`}
                    style={{
                      display: "flex",
                    }}
                  >
                    {character}
                  </div>
                ))}
              </div>

              {/* 中文英文之間的線 */}
              <div
                style={{
                  position: "absolute",
                  top: "278px",
                  left: "78px",
                  zIndex: 20,
                  width: "2px",
                  height: "285px",
                  background: "rgba(255,255,255,0.62)",
                }}
              />

              {/* 英文名稱 */}
              <div
                style={{
                  position: "absolute",
                  top: "304px",
                  left: "77px",
                  zIndex: 20,
                  width: "390px",
                  color: "#dfbd91",
                  fontSize: "26px",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  whiteSpace: "nowrap",
                  transform: "rotate(90deg)",
                  transformOrigin: "top left",
                  textShadow: "0 2px 8px rgba(0,0,0,0.55)",
                }}
              >
                {item.englishName}
              </div>

              {/* 浮水印 */}
              <div
                style={{
                  position: "absolute",
                  right: "-28px",
                  bottom: "22px",
                  width: "260px",
                  height: "96px",
                  zIndex: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={watermarkUrl}
                  alt=""
                  width="260"
                  height="96"
                  style={{
                    width: "260px",
                    height: "96px",
                    objectFit: "contain",
                    opacity: 1,
                  }}
                />
              </div>
            </div>

            {/* 稀有度 / 尋找難度 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "1px solid #ded4c4",
                padding: "14px 70px 12px",
                minHeight: "112px",
              }}
            >
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "22px",
                }}
              >
                <TreasureIcon />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: "23px",
                      color: "#77716b",
                    }}
                  >
                    稀有度
                  </div>

                  <div
                    style={{
                      marginTop: "2px",
                      fontSize: "30px",
                      color: "#a77b55",
                      fontWeight: 900,
                      letterSpacing: "2px",
                    }}
                  >
                    {item.rarity}
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: "1px",
                  height: "82px",
                  background: "#d8cdbd",
                }}
              />

              <div
                style={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "22px",
                }}
              >
                <DifficultyIcon />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: "23px",
                      color: "#77716b",
                    }}
                  >
                    尋找難度
                  </div>

                  <div
                    style={{
                      marginTop: "2px",
                      fontSize: "34px",
                      color: "#2d7780",
                      fontWeight: 900,
                      letterSpacing: "2px",
                    }}
                  >
                    {item.searchDifficulty.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>

            {/* 尋寶提示 */}
            <div
              style={{
                marginTop: "8px",
                border: "1px solid #ddd1bf",
                borderRadius: "24px",
                background:
                  "linear-gradient(145deg, #fbf9f4 0%, #f6f1e8 100%)",
                padding: "14px 24px 18px",
                display: "flex",
                flexDirection: "column",
                minHeight: "180px",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
              }}
            >
              <div
                style={{
                  fontSize: "26px",
                  color: "#2d7780",
                  fontWeight: 900,
                  marginBottom: "7px",
                  letterSpacing: "2px",
                }}
              >
                尋寶提示
              </div>

              <div
                style={{
                  fontSize: "26px",
                  lineHeight: 1.5,
                  letterSpacing: "1.2px",
                  color: "#2b2b2b",
                }}
              >
                {cut(item.treasureHint, 72)}
              </div>
            </div>

            {/* 基本資訊 */}
            <div
              style={{
                marginTop: "8px",
                borderTop: "1px solid #d8cdbd",
                borderBottom: "1px solid #d8cdbd",
                padding: "10px 0 12px",
                display: "flex",
                flexWrap: "wrap",
                rowGap: "12px",
              }}
            >
              {basicInfo.map((field) => (
                <div
                  key={field.label}
                  style={{
                    width: field.width,
                    minHeight: "72px",
                    padding: "0 24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  <div
                    style={{
                      fontSize: "24px",
                      color: "#2d7780",
                      fontWeight: 900,
                      marginBottom: "5px",
                      letterSpacing: "1.5px",
                    }}
                  >
                    {field.label}
                  </div>

                  <div
                    style={{
                      fontSize: "22px",
                      lineHeight: 1.8,
                      letterSpacing: "1px",
                      color: "#1d1d1f",
                      fontWeight: 800,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {field.value}
                  </div>
                </div>
              ))}
            </div>

            {/* 品牌名稱 */}
            <div
              style={{
                marginTop: "10px",
                paddingTop: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                color: "#2d7780",
                fontWeight: 900,
              }}
            >
              <div
                style={{
                  fontSize: "30px",
                  letterSpacing: "8px",
                }}
              >
                美艷山海域生物圖鑑
              </div>

              <div
                style={{
                  marginTop: "3px",
                  fontSize: "18px",
                  letterSpacing: "6px",
                }}
              >
                MEIYANSHAN FIELD GUIDE
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1440,
    }
  );
}