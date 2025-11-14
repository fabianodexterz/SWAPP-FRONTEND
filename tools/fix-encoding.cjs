// tools/fix-encoding.cjs
// Varre src/ e public/ e tenta corrigir mojibake (Ã, Â, â€¦) regravando em UTF-8.
const { readdirSync, statSync, readFileSync, writeFileSync } = require("fs");
const { join, extname } = require("path");
const iconv = require("iconv-lite");

const roots = ["src", "public"];
const allow = new Set([".ts",".tsx",".js",".jsx",".json",".css",".md",".txt",".html"]);

function walk(dir) {
  let list = [];
  try { list = readdirSync(dir); } catch { return; }
  for (const name of list) {
    const p = join(dir, name);
    let st; try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) walk(p);
    else if (allow.has(extname(p).toLowerCase())) fix(p);
  }
}

function looksMojibake(s) {
  return /Ã.|Â.|â€¢|â€“|â€”|â€˜|â€™|â€œ|â€\x9D/.test(s);
}

function fix(p) {
  let buf;
  try { buf = readFileSync(p); } catch { return; }
  const asUtf8 = buf.toString("utf8");
  if (looksMojibake(asUtf8)) {
    const latin = iconv.decode(buf, "windows-1252");
    writeFileSync(p, Buffer.from(latin, "utf8"));
    console.log("fixed:", p);
  }
}

for (const r of roots) walk(r);
console.log("done.");
