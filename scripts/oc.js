/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const fs = require('fs')

function renderTier(tier, height) {
  const baseUrl = `https://opencollective.com/husky/tiers/${tier.toLowerCase()}-sponsor`
  const arr = [`#### ${tier} Sponsors`]
  for (let i = 0; i <= 9; i++) {
    arr.push(
      `<a href="${baseUrl}/${i}/website"><img src="${baseUrl}/${i}/avatar.svg" height="${height}px"></a>`
    )
  }

  return arr.join('\n')
}

function render() {
  return [
    ['Gold', 60],
    ['Silver', 45],
    ['Bronze', 30],
  ]
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
