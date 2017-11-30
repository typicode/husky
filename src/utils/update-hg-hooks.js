'use strict'

const fs = require('fs')
const path = require('path')
const findParent = require('./find-parent')

function containsHook(hooks, hookName) {
    return hooks.indexOf(hookName) >= 0
}

module.exports = function updateHgHooks(huskyDir, hooksdir, hookName) {
    const rootDir = findParent(huskyDir, '.hg')
    const vcsDir = path.join(rootDir, '.hg')
    const hgrcFile = path.join(vcsDir, 'hgrc')
    const hgrcData = fs.readFileSync(hgrcFile, 'utf8')
    try {
        const hgrcData = fs.readFileSync(hgrcFile, 'utf8')
        const hooksSectionStartIndex = hgrcData.indexOf('[hooks]')
        const lastSection = hgrcData.search(/\[([^\]]*)\][^\[]*$/g)
        const hooksSectionEndIndex = lastSection === hooksSectionStartIndex ? hgrcData.length : lastSection - 1
        let hooksSection = hgrcData.substring(hooksSectionStartIndex, hooksSectionEndIndex)
        if (!containsHook(hooksSection, hookName)) {
            hooksSection += `\n${hookName}=.hg/hooks/${hookName}`
        }
        fs.writeFileSync(hgrcFile, hgrcData.substring(0, hooksSectionStartIndex) + hooksSection + hgrcData.substring(hooksSectionEndIndex), 'utf8')
    } catch (e) {
        console.error(e)
    }
}