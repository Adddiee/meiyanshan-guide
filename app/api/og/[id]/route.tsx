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
    <svg width="54" height="54" viewBox="0 0 64 64" fill="none">
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
    <svg width="54" height="54" viewBox="0 0 64 64" fill="none">
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

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#f4f2ec",
          padding: "22px",
          display: "flex",
          fontFamily: "sans-serif",
          color: "#1d1d1f",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#fffdf8",
            border: "1px solid #d8cdbd",
            borderRadius: "26px",
            boxShadow: "0 16px 42px rgba(80,60,40,0.18)",
            padding: "26px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "28px",
              height: "392px",
            }}
          >
            <div
              style={{
                width: "52%",
                height: "100%",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid #e3d8c8",
                display: "flex",
                background: "#111",
                position: "relative",
              }}
            >
              <img
                src={item.thumbnail}
                alt={item.chineseName}
                width="600"
                height="392"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit:
                    item.imageFit === "contain" ? "contain" : "cover",
                  position: "relative",
                  zIndex: 1,
                }}
              />

              <div
                style={{
                  position: "absolute",
                  right: "-5px",
                  bottom: "18px",
                  width: "150px",
                  height: "58px",
                  zIndex: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={watermarkUrl}
                  alt=""
                  width="190"
                  height="70"
                  style={{
                    width: "190px",
                    height: "70px",
                    objectFit: "contain",
                    opacity: 2,
                  }}
                />
              </div>
            </div>

            <div
              style={{
                width: "46%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    background: "#2d7780",
                    color: "white",
                    borderRadius: "999px",
                    padding: "4px 12px",
                    fontSize: "16px",
                    letterSpacing: "2px",
                    fontWeight: 800,
                  }}
                >
                  {item.id}
                </div>

                <div
                  style={{
                    fontSize: "22px",
                    color: "#a77b55",
                    fontWeight: 800,
                    letterSpacing: "2px",
                  }}
                >
                  {item.category}
                </div>
              </div>

              <div
                style={{
                  marginTop: "10px",
                  fontSize: "40px",
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: "4px",
                }}
              >
                {item.chineseName}
              </div>

              <div
                style={{
                  marginTop: "5px",
                  marginLeft: "5px",
                  fontSize: "24px",
                  color: "#8a7d72",
                }}
              >
                {item.englishName}
              </div>

              <div
                style={{
                  marginTop: "10px",
                  height: "1px",
                  background: "#ded4c4",
                }}
              />

              <div
                style={{
                  marginTop: "10px",
                  letterSpacing: "2px",
                  display: "flex",
                  alignItems: "center",
                  height: "58px",
                }}
              >
                <div
                  style={{
                    width: "48%",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
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
                        fontSize: "20px",
                        color: "#77716b",
                      }}
                    >
                      稀有度
                    </div>

                    <div
                      style={{
                        marginTop: "1px",
                        fontSize: "20px",
                        letterSpacing: "2px",
                        color: "#a77b55",
                        fontWeight: 900,
                      }}
                    >
                      {item.rarity}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: "1px",
                    height: "68px",
                    background: "#d8cdbd",
                  }}
                />

                <div
                  style={{
                    width: "48%",
                    paddingLeft: "24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
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
                        fontSize: "18px",
                        color: "#77716b",
                      }}
                    >
                      尋找難度
                    </div>

                    <div
                      style={{
                        marginTop: "2px",
                        fontSize: "26px",
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

              <div
                style={{
                  marginTop: "10px",
                  marginRight: "6px",
                  border: "1px solid #dfd5c5",
                  borderRadius: "18px",
                  background: "#faf9f5",
                  padding: "6px 18px 10px",
                  display: "flex",
                  flexDirection: "column",
                  height: "185px",
                }}
              >
                <div
                  style={{
                    fontSize: "22px",
                    color: "#2d7780",
                    fontWeight: 900,
                    marginBottom: "4px",
                    letterSpacing: "2px",
                  }}
                >
                  尋寶提示
                </div>

                <div
                  style={{
                    fontSize: "20px",
                    lineHeight: 1.5,
                    letterSpacing: "1.5px",
                    color: "#2b2b2b",
                  }}
                >
                  {cut(item.treasureHint, 40)}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "12px",
              borderTop: "1px solid #d8cdbd",
              paddingTop: "10px",
              display: "flex",
              height: "78px",
              alignItems: "flex-start",
              letterSpacing: "2px",
            }}
          >
            {[
              {
                label: "體型",
                value: item.size,
                flex: 0.85,
              },
              {
                label: "深度",
                value: item.depth,
                flex: 0.85,
              },
              {
                label: "棲地",
                value: cut(item.habitat, 10),
                flex: 1.15,
              },
              {
                label: "季節",
                value: item.bestSeason,
                flex: 0.8,
              },
              {
                label: "地點",
                value: item.location,
                flex: 0.9,
              },
              {
                label: "首次紀錄",
                value: item.firstSeen,
                flex: 1.15,
              },
              {
                label: "拍攝者",
                value: item.photographer,
                flex: 1.6,
              },
            ].map((field, index, fields) => (
              <div
                key={field.label}
                style={{
                  flex: field.flex,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  padding: "0 12px",
                  borderRight:
                    index === fields.length - 1
                      ? "none"
                      : "1px solid #e1d7c8",
                }}
              >
                <div
                  style={{
                    fontSize: "17px",
                    color: "#2d7780",
                    fontWeight: 900,
                    marginBottom: "6px",
                  }}
                >
                  {field.label}
                </div>

                <div
                  style={{
                    fontSize: "18px",
                    lineHeight: 1.22,
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

          <div
            style={{
              marginTop: "12px",
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
                fontSize: "17px",
                letterSpacing: "6px",
              }}
            >
              美艷山海域生物圖鑑
            </div>

            <div
              style={{
                marginTop: "2px",
                fontSize: "12px",
                letterSpacing: "5px",
              }}
            >
              MEIYANSHAN FIELD GUIDE
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}