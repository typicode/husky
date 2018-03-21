'use strict'

const fs = require('fs')
const path = require('path')
const findParent = require('./find-parent')

const SECTION_BEGIN = '#husky-hg:begin'
const SECTION_END = '#husky-hg:end'

function containsHook(section, hookName) {
  return section.data.indexOf(hookName) >= 0
}

function findHooksSection(hgrcData) {
  const hooksSectionStartIndex = hgrcData.indexOf('[hooks]')
  const lastSection = hgrcData.search(/\[([^\]]*)\][^\[]*$/g)
  const hooksSectionEndIndex =
    lastSection === hooksSectionStartIndex ? hgrcData.length : lastSection - 1
  let hooksSection = hgrcData.substring(
    hooksSectionStartIndex,
    hooksSectionEndIndex
  )
  return {
    start: hooksSectionStartIndex,
    end: hooksSectionEndIndex,
    data: hooksSection
  }
}

function findHuskySection(hgrcData) {
  const huskySectionStartIndex = hgrcData.indexOf(SECTION_BEGIN)
  const huskySectionEndIndex = hgrcData.indexOf(SECTION_END)
  const huskySection = hgrcData.substring(
    huskySectionStartIndex,
    huskySectionEndIndex
  )
  return {
    start: huskySectionStartIndex,
    end: huskySectionEndIndex,
    data: huskySection
  }
}

function update(hgrcFile, hgrcData, section) {
  try {
    fs.writeFileSync(
      hgrcFile,
      hgrcData.substring(0, section.start) +
        section.data +
        hgrcData.substring(section.end),
      'utf8'
    )
  } catch (e) {
    console.error(e)
  }
}

function hasHooksSection(hgrcData) {
  return hgrcData.indexOf('[hooks]') > -1
}
function hasHuskySection(hgrcData) {
  return hgrcData.indexOf(SECTION_BEGIN) > -1
}


function init(huskyDir) {
  const rootDir = findParent(huskyDir, '.hg')
  const vcsDir = path.join(rootDir, '.hg')
  const hgrcFile = path.join(vcsDir, 'hgrc')
  if (!fs.existsSync(hgrcFile)) {
    try {
      fs.writeFileSync(hgrcFile, `${SECTION_BEGIN}\n[hooks]\n${SECTION_END}`)
    } catch (e) {
      console.error(e)
    }
  } else {
    try {
      const hgrcData = fs.readFileSync(hgrcFile, 'utf8')
      if (!hasHooksSection(hgrcData)) {
        fs.appendFileSync(
          hgrcFile,
          `\n${SECTION_BEGIN}\n[hooks]\n${SECTION_END}`
        )
      }
      else if(!hasHuskySection(hgrcData)) {
        const hooksSection = findHooksSection(hgrcData)
        hooksSection.data += `\n${SECTION_BEGIN}\n${SECTION_END}`
        update(hgrcFile, hgrcData, hooksSection)
      } 
    } catch (e) {
      console.error(e)
    }
  }
}

function addHook(huskyDir, hooksdir, hookName) {
  const rootDir = findParent(huskyDir, '.hg')
  const vcsDir = path.join(rootDir, '.hg')
  const hgrcFile = path.join(vcsDir, 'hgrc')
  try {
    const hgrcData = fs.readFileSync(hgrcFile, 'utf8')
    const hooksSection = findHooksSection(hgrcData)
    let huskySection = findHuskySection(hgrcData)
    if (!containsHook(huskySection, hookName) && !containsHook(hooksSection, hookName)) {
      huskySection.data += `${hookName}=python:.hg/hooks/${hookName}.py:execute_hook\n`
    }
    update(hgrcFile, hgrcData, huskySection)
  } catch (e) {
    console.error(e)
  }
}

function remove(huskyDir) {
  const rootDir = findParent(huskyDir, '.hg')
  const vcsDir = path.join(rootDir, '.hg')
  const hgrcFile = path.join(vcsDir, 'hgrc')
  try {
    const hgrcData = fs.readFileSync(hgrcFile, 'utf8')
    const section = findHuskySection(hgrcData)
    fs.writeFileSync(
      hgrcFile,
      hgrcData.substring(0, section.start) +
        '' +
        hgrcData.substring(section.end + SECTION_END.length),
      'utf8'
    )
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  init,
  addHook,
  remove
}
