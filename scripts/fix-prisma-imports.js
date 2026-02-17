const fs = require("fs");
const path = require("path");

const backendSrc = path.join(__dirname, "..", "apps", "backend", "src");

function walk(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) {
      walk(filepath, callback);
    } else if (file.endsWith(".ts")) {
      callback(filepath);
    }
  });
}

function relativeImport(fromFile) {
  const depth = fromFile
    .replace(backendSrc, "")
    .split(path.sep)
    .length - 2;

  return "../".repeat(depth) + "prisma";
}

walk(backendSrc, (file) => {
  let content = fs.readFileSync(file, "utf8");

  // Replace any incorrect prisma import
  content = content.replace(
    /import\s+\{\s*prisma\s*\}\s+from\s+["'][^"']*["']/g,
    (match) => {
      const correct = relativeImport(file);
      return `import { prisma } from "${correct}"`;
    }
  );

  fs.writeFileSync(file, content, "utf8");
  console.log("Fixed:", file);
});

console.log("All Prisma imports updated.");
