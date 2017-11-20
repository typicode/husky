"use strict";

const fs = require("fs");
const path = require("path");
const findParent = require("./find-parent");

function getVcs(dirname) {
  const vcsProvider = [
    { vcs: "git", dirname: ".git" },
    { vcs: "hg", dirname: ".hg" }
  ];
  let vcs;

  vcsProvider.forEach(provider => {
    const dir = findParent(dirname, provider.dirname);
    if (dir) {
      return Object.assign({ provider, dir: dir });
    }
  });
}

module.exports = getVcs;