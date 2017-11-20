"use strict";

const fs = require("fs");
const path = require("path");

function findHooksDir(vcs) {
  if (vcs.dir) {
    let vcsDir = path.join(vcs.dir, vcs);
    const stats = fs.lstatSync(vcsDir);

    if (stats.isFile()) {
      // Expect following format
      // git: pathToGit
      // On Windows pathToGit can contain ":" (example "gitdir: C:/Some/Path")
      const vcsFileData = fs.readFileSync(vcsDir, "utf-8");
      vcsDir = vcsFileData
        .split(":")
        .slice(1)
        .join(":")
        .trim();
    }

    switch (vcs) {
      case "hg":
        const hooksDir = path.join(vcsDir, "hooks");
        if (!fs.existsSync(hooksDir)) {
          fs.mk
        }
        break;
      default:
        break;
    }

    return path.resolve(dir, vcsDir, "hooks");
  }
}

module.exports = findHooksDir;
