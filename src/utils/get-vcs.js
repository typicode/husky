"use strict";

const fs = require("fs");
const path = require("path");
const findParent = require("./find-parent");

function getVcs(dirname) {
  const vcsProvider = [
    { name: "git", dirname: ".git" },
    { name: "hg", dirname: ".hg" }
  ];

  let vcs;
  vcsProvider.forEach(provider => {
    const dir = findParent(dirname, provider.dirname);
    if (dir) {
      vcs = Object.assign(provider, { dir: dir });
    }
  });
  return vcs;
}

module.exports = getVcs;