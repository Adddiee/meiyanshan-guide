export type Species = {
  id: string;
  public: boolean;
  featured: boolean;
  heroPhoto: boolean;
  chineseName: string;
  englishName: string;
  scientificName: string;
  category: string;
  description: string;
  treasureHint: string;
  imageLayout: string;
  imageFit: string;
  thumbnail: string;
  gallery: string[];
  rarity: string;
  depth: string;
  habitat: string;
  location: string;
  firstSeen: string;
  photographer: string;
  searchDifficulty: number;
  bestSeason: string;
  size: string;
  keywords: string[];
  notes: string;
};

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR4Gnejjt-Gyg5aTjNFJFD-Exud3SSxzlXC1iCsDwMwLPk-Jyj37FxjJ_hBRolcNx3M1Qwd0PVxbQDR/pub?gid=0&single=true&output=csv";

function parseCSV(text: string) {
  const rows: string[][] = [];
  let current = "";
  let row: string[] = [];
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"' && nextChar === '"') {
      current += '"';
      i++;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      row.push(current);
      current = "";
    } else if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (current || row.length > 0) {
        row.push(current);
        rows.push(row);
        row = [];
        current = "";
      }
    } else {
      current += char;
    }
  }

  if (current || row.length > 0) {
    row.push(current);
    rows.push(row);
  }

  return rows;
}

export async function getSpecies(): Promise<Species[]> {
  const response = await fetch(SHEET_CSV_URL, {
    cache: "no-store",
  });

  const csvText = await response.text();
  const rows = parseCSV(csvText);

  const headers = rows[0].map((header) =>
    header.replace(/^\uFEFF/, "").trim()
  );

  const species = rows.slice(1).map((row) => {
    const data = Object.fromEntries(
      headers.map((header, index) => [header, (row[index] ?? "").trim()])
    );

    return {
      id: data.ID,
      public: data.Public?.toUpperCase() === "TRUE",
      featured: data.Featured?.toUpperCase() === "TRUE",
      heroPhoto: data.HeroPhoto?.toUpperCase() === "TRUE",
      chineseName: data.ChineseName,
      englishName: data.EnglishName,
      scientificName: data.ScientificName,
      category: data.Category,
      description: data.Description,
      treasureHint: data.TreasureHint,
      imageLayout: data.ImageLayout || "square",
      imageFit: data.ImageFit || "cover",
      thumbnail: data.Thumbnail,
      gallery: data.Gallery
        ? data.Gallery.split(",").map((file) => file.trim())
        : [],
      rarity: data.Rarity,
      depth: data.Depth,
      habitat: data.Habitat,
      location: data.Location,
      firstSeen: data.FirstSeen,
      photographer: data.Photographer,
      searchDifficulty: Number(data.SearchDifficulty || 0),
      bestSeason: data.BestSeason,
      size: data.Size,
      keywords: data.Keywords
        ? data.Keywords.split(",").map((word) => word.trim())
        : [],
      notes: data.Notes,
    };
  });

  return species.filter((item) => item.id?.startsWith("MYS-"));
}