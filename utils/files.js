const fs = require("fs");

function getFileName(filePath) {
  let name = filePath;

  while (fs.existsSync(name)) {
    const numMatch = name.match(/\-(\d+)$/);

    if (!numMatch || !numMatch[1]) {
      name = `${name}-1`;
    } else {
      name = `${name.replace(/-\d+$/, "")}-${Number(numMatch[1]) + 1}`;
    }
  }

  return name;
}

module.exports = {
  getFileName
};
