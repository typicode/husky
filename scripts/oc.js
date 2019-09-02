/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')

function renderTier(tier, height) {
  const arr = [`#### ${tier} Sponsors`]
  for (let i = 0; i <= 9; i++) {
    arr.push(
      `<a href="https://opencollective.com/husky/${tier.toLowerCase()}-sponsor/${i}/website"><img src="https://opencollective.com/husky/${tier.toLowerCase()}-sponsor/${i}/avatar.svg" height="${height}px"></a>`
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
const regex = /(<!-- oc -->)(.*)(<!-- oc-end -->)/s

fs.writeFileSync(
  'README.md',
  data.replace(regex, `$1\n${render()}\n$3`),
  'utf-8'
)
