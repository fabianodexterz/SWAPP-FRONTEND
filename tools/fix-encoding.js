import fs from "fs-extra";
import glob from "glob";
import iconv from "iconv-lite";

const files = glob.sync("src/**/*.{ts,tsx}");

console.log(`🔍 Corrigindo ${files.length} arquivos para UTF-8 sem BOM...\n`);

files.forEach((file) => {
  try {
    const buf = fs.readFileSync(file);
    const text = iconv.decode(buf, "windows-1252");
    fs.writeFileSync(file, text, { encoding: "utf8" });
    console.log(`✅ ${file}`);
  } catch (err) {
    console.error(`❌ Erro ao converter ${file}:`, err.message);
  }
});

console.log("\n✨ Conversão concluída! Todos os arquivos estão em UTF-8.");
