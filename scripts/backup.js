import fs from "fs";
import path from "path";

const srcDir = process.cwd();
const backupDir = path.join(srcDir, "_backup");
fs.mkdirSync(backupDir, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const dest = path.join(backupDir, `frontend-${stamp}`);

function copyRecursive(src, dst) {
  if (["node_modules", ".next", "_backup"].some(x => src.includes(path.sep + x + path.sep))) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dst, { recursive: true });
    for (const f of fs.readdirSync(src)) copyRecursive(path.join(src, f), path.join(dst, f));
  } else {
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
  }
}
copyRecursive(srcDir, dest);
console.log("[backup] frontend copied to", dest);
