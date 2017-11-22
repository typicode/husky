"use strict";

const fs = require("fs");
const path = require("path");
const findParent = require("./find-parent");
const gitHooks = require("../hooks.json");
const hgHooks = require("../hg-hooks.json");

function getVcs(dirname) {
  const vcsProvider = [
    { name: "git", dirname: ".git", hooks: gitHooks },
    { name: "hg", dirname: ".hg", hooks: hgHooks }
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