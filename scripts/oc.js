const fs = require('fs')

function renderTier(tier, height) {
  const arr = [`#### ${tier} Sponsors`]
  for (let i = 0; i <= 9; i++) {
    arr.push(
      `<a href="https://opencollective.com/husky/${tier.toLowerCase()}-sponsor/0/website"><img src="https://opencollective.com/husky/${tier.toLowerCase()}-sponsor/0/avatar.svg" height="${height}px"></a>`
    )
  }

  return arr.join('\n')
}

function render() {
  return [['Gold', 60], ['Silver', 45], ['Bronze', 30]]
    .map(([tier, height]) => renderTier(tier, height))
    .join('\n\n')
}

const data = fs.readFileSync('README.md', 'utf-8')
const regex = /<!-- oc -->(.*)<!-- oc-end -->/s

console.log(data.replace(regex, render()))
