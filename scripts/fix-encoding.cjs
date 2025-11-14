// scripts/fix-encoding.cjs
const fs = require("fs");
const path = require("path");
const glob = require("glob");

// 1) Converte todos .ts/.tsx para UTF-8 (sem BOM)
function saveUtf8NoBom(filePath, text) {
  // grava em UTF-8 sem BOM
  const buf = Buffer.from(text, "utf8");
  fs.writeFileSync(filePath, buf);
}

// 2) (Opcional) Corrige mojibake típico de pt-BR que aparece como Ã©, Ã§, etc.
function fixMojibake(text) {
  const MAP = {
    "Ã¡": "á", "Ã©": "é", "Ã­": "í", "Ã³": "ó", "Ãº": "ú",
    "Ã": "À", "Ã": "Á", "Ã": "É", "Ã": "Í", "Ã": "Ó", "Ã": "Ú",
    "Ã£": "ã", "Ãµ": "õ", "Ã¢": "â", "Ãª": "ê", "Ã´": "ô",
    "Ã": "Â", "Ã": "Ê", "Ã": "Ô",
    "Ã§": "ç", "Ã": "Ç",
    "Ã¼": "ü", "Ã": "Ü",
    "Ã±": "ñ", "Ã": "Ñ",
    "Ã ": "à", "Ã¨": "è", "Ã¬": "ì", "Ã²": "ò", "Ã¹": "ù",
    "â": "’", "â": "–", "â": "—", "â": "“", "â": "”",
    "â¢": "•", "â¦": "…", "Âº": "º", "Âª": "ª", "Â°": "°",
  };
  let out = text;
  for (const [bad, good] of Object.entries(MAP)) {
    out = out.split(bad).join(good);
  }
  return out;
}

function processFile(file) {
  const raw = fs.readFileSync(file);       // lê bytes
  let text = raw.toString("utf8");         // interpreta como UTF-8
  const fixed = fixMojibake(text);         // corrige mojibake comum
  if (fixed !== text) {
    console.log("corrigido:", file);
  }
  saveUtf8NoBom(file, fixed);
}

const patterns = ["src/**/*.ts", "src/**/*.tsx"];
for (const pattern of patterns) {
  const files = glob.sync(pattern, { nodir: true, windowsPathsNoEscape: true });
  files.forEach(processFile);
}

console.log("OK: arquivos salvos em UTF-8 (sem BOM) e mojibake mais comum corrigido.");
