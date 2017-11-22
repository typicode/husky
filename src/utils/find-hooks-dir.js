"use strict";

const fs = require("fs");
const path = require("path");
const findParent = require('./find-parent')

function findHooksDir(vcs) {
  if (vcs.dir) {
    let vcsDir = path.join(vcs.dir, vcs.dirname);
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
    return path.resolve(vcs.dir, vcsDir, "hooks");
  }
}

module.exports = findHooksDir;
